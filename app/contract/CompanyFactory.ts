// CompanyFactory.ts
import {
  SmartContract,
  state,
  State,
  method,
  PublicKey,
  UInt64,
  Field,
  Signature,
  Poseidon,
  MerkleMap,
  MerkleMapWitness,
} from 'o1js';

export class CompanyFactory extends SmartContract {
  // 记录已创建的公司数量
  @state(UInt64) totalCompanies = State<UInt64>();
  // 存储所有公司数据的 MerkleMap 根，映射：companyId (Field) => companyDataHash (Field)
  @state(Field) companiesRoot = State<Field>();

  // 初始化合约，设定初始状态
  init() {
    super.init();
    this.totalCompanies.set(UInt64.from(0));
    const emptyMap = new MerkleMap();
    this.companiesRoot.set(emptyMap.getRoot());
  }

  /**
   * 计算公司数据哈希  
   * 将公司 ID、所有者、名称、所在地和主营业务描述打包后哈希，得到唯一的公司数据承诺
   *
   * @param id        公司 ID
   * @param owner     公司所有者的 PublicKey
   * @param name      公司名称（编码为 Field）
   * @param location  公司所在地（编码为 Field）
   * @param business  主营业务描述（编码为 Field）
   */
  static hashCompany(
    id: UInt64,
    owner: PublicKey,
    name: Field,
    location: Field,
    business: Field
  ): Field {
    return Poseidon.hash([
      id.toField(),
      owner.toField(),
      name,
      location,
      business,
    ]);
  }

  /**
   * 创建一个新公司  
   * 参数：
   * - name, location, business：公司信息（均由调用方预先转换为 Field 类型）  
   * - witness：构造用于该新公司 ID 的 MerkleMap 证明（应证明该 ID 目前未被使用，即对应值为 0）
   *
   * 执行流程：
   * 1. 读取当前 totalCompanies，计算新公司 ID = totalCompanies + 1  
   * 2. 读取当前 companiesRoot，并用 witness 检查该新公司 ID 对应的值为默认值 0  
   * 3. 将调用方（本交易的 feePayer，即 this.sender）作为公司所有者  
   * 4. 计算新公司数据的哈希  
   * 5. 用 witness 更新 MerkleMap 根，并更新 totalCompanies 状态
   */
  @method createCompany(
    name: Field,
    location: Field,
    business: Field,
    witness: MerkleMapWitness
  ) {
    // 1. 读取当前公司数量
    const total = this.totalCompanies.get();
    this.totalCompanies.assertEquals(total);
    const newId = total.add(1);

    // 2. 读取当前公司数据的 Merkle 树根
    const root = this.companiesRoot.get();
    this.companiesRoot.assertEquals(root);

    // 3. 利用 witness 检查新公司 ID 对应的值为 0（默认未使用）
    const currentValue = witness.get(newId.toField(), root);
    currentValue.assertEquals(Field(0), "Company already exists");

    // 4. 以调用方作为公司所有者（假设交易的 feePayer 为所有者）
    const owner = this.sender;
    // 5. 计算新公司数据的哈希
    const newCompanyHash = CompanyFactory.hashCompany(newId, owner, name, location, business);

    // 6. 用 witness 更新 MerkleMap 根
    const newRoot = witness.calculate(newId.toField(), newCompanyHash);
    this.companiesRoot.set(newRoot);
    // 7. 更新公司总数
    this.totalCompanies.set(newId);
  }

  /**
   * 更新已有公司信息  
   * 只有公司所有者才能更新公司数据。为验证，调用者需要提供：
   * - 公司 ID  
   * - 旧数据（oldName, oldLocation, oldBusiness）：用于计算当前记录哈希  
   * - 新数据（newName, newLocation, newBusiness）：更新后的内容  
   * - owner：更新操作的发起者（预期为当前所有者）  
   * - witness：构造用于该公司 ID 的 MerkleMap 证明  
   * - ownerSignature：所有者对本次更新操作的签名（签名消息可以包含公司 ID 和旧、新数据）
   *
   * 执行流程：
   * 1. 读取当前 companiesRoot，并用 witness 得到公司记录  
   * 2. 计算旧数据的哈希，并验证与链上记录一致  
   * 3. 验证 ownerSignature 是否为 owner 对更新消息的有效签名  
   * 4. 计算新数据的哈希，用 witness 更新 MerkleMap 根，并写回状态
   */
  @method updateCompany(
    companyId: UInt64,
    oldName: Field,
    oldLocation: Field,
    oldBusiness: Field,
    newName: Field,
    newLocation: Field,
    newBusiness: Field,
    owner: PublicKey,
    witness: MerkleMapWitness,
    ownerSignature: Signature
  ) {
    // 1. 获取当前 Merkle 树根
    const root = this.companiesRoot.get();
    this.companiesRoot.assertEquals(root);

    // 2. 验证所有者签名。这里将更新相关数据打包成消息：
    const message = [
      companyId.toField(),
      oldName,
      oldLocation,
      oldBusiness,
      newName,
      newLocation,
      newBusiness,
    ];
    ownerSignature.verify(owner, message).assertTrue("Invalid owner signature");

    // 3. 根据旧数据计算公司记录的哈希
    const oldHash = CompanyFactory.hashCompany(companyId, owner, oldName, oldLocation, oldBusiness);
    const currentValue = witness.get(companyId.toField(), root);
    currentValue.assertEquals(oldHash, "Company data mismatch");

    // 4. 计算更新后的公司数据哈希（所有者不变）
    const newHash = CompanyFactory.hashCompany(companyId, owner, newName, newLocation, newBusiness);
    const newRoot = witness.calculate(companyId.toField(), newHash);
    this.companiesRoot.set(newRoot);
  }
}