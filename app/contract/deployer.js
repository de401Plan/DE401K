// deploy-company-factory.js
import {
  isReady,
  Mina,
  PrivateKey,
  PublicKey,
  UInt64,
} from 'o1js';
import { CompanyFactory } from './CompanyFactory.js'; // 确保路径正确

// Import fee payer private key from environment variable
const FEEPAYER_PRIVATE_KEY = process.env.FEEPAYER_PRIVATE_KEY;
if (!FEEPAYER_PRIVATE_KEY) {
  throw new Error('FEEPAYER_PRIVATE_KEY environment variable is not set');
}


async function deployCompanyFactory() {
  // 1. 等待 o1js 初始化（包括 WASM 模块加载）
  await isReady;

  // 2. 连接到 Berkeley 测试网（使用官方提供的 GraphQL 代理）
  const Berkeley = Mina.Network('https://api.minascan.io/node/devnet/v1/graphql');
  Mina.setActiveInstance(Berkeley);

  // 3. 设置手续费支付者（部署交易费支付者）的密钥（请替换为你的测试私钥）
  const feePayerKey = PrivateKey.fromBase58(FEEPAYER_PRIVATE_KEY);
  const feePayerAddress = feePayerKey.toPublicKey();
  console.log('Fee payer address:', feePayerAddress.toBase58());

  // 4. 为 zkApp 部署准备一个专用密钥（用于计算 zkApp 地址）
  //    你可以使用固定密钥或随机生成，部署后 zkApp 的地址即为 zkAppKey 对应的公钥
  const zkAppPrivateKey = PrivateKey.random();
  const zkAppAddress = zkAppPrivateKey.toPublicKey();
  console.log('Deploying CompanyFactory zkApp at address:', zkAppAddress.toBase58());

  // 5. 实例化 CompanyFactory 合约对象
  const companyFactory = new CompanyFactory(zkAppAddress);

  // 6. 构造部署交易
  //    在交易中调用 deploy() 方法（传入 zkApp 私钥）以及 init() 方法初始化合约状态
  const tx = await Mina.transaction(
    { feePayerKey, fee: 100_000_000 }, // 此处手续费设为 0.1 Mina（单位为 nanoMina）
    () => {
      // 部署合约，内部会验证 zkApp 部署密钥
      companyFactory.deploy({ zkappKey: zkAppPrivateKey });
      // 初始化状态：例如将 totalCompanies 设为 0，并写入空的 companiesRoot
      companyFactory.init();
    }
  );

  // 7. 如果 zkApp 中包含证明逻辑，则需要生成 zk-SNARK 证明
  await tx.prove();

  // 8. 发送交易到网络
  const result = await tx.send();
  const txHash = result.hash();
  if (txHash == null) {
    console.error('部署交易提交失败');
  } else {
    console.log('部署交易提交成功，交易哈希：', txHash);
  }
}

// 执行部署
deployCompanyFactory().catch((err) => console.error(err));