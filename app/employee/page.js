"use client"

import { useState, useCallback } from 'react';
import {
  Box,
  Heading,
  VStack,
  Button,
  useColorModeValue,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Text,
  HStack,
  useToast,
  InputGroup,
  InputRightElement,
  Progress
} from '@chakra-ui/react';
import InsuranceCard from '../components/InsuranceCard';
import BigNumber from 'bignumber.js';
// import CryptoJS from 'crypto-js';
import { useWallet } from '@/app/context/WalletContext';

// // 模拟的 Pedersen 承诺函数
// function pedersenCommitment(message, randomness) {
//     // 注意：这只是一个模拟实现，不是真正的 Pedersen 承诺
//     return CryptoJS.SHA256(message + randomness).toString();
//   }

// 模拟的员工保单数据
const employeePolicies = [
  {
    employeeName: "张三",
    contractAddress: 'B62qpXPvmKDf4SaFJynPsT6DyvuxMS9H1pT4TGonDT26m599m7dS9gP',
    isContractActive: true,
    initialTime: Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60, // 1 year ago
    depositedToken: 'xnyyp6sfZiibd4WJBVPiPKCr97Z8J39AkXQ5G3wmgAhRmS6q3C', // USDC address
    monthlyContribution: new BigNumber(1000).shiftedBy(6).toString(), // 1000 USDC
    monthlyWithdrawal: new BigNumber(500).shiftedBy(6).toString(), // 500 USDC
    policyHolder: 'B62qoa4bT3m19nusva6tBxTLSqA1oXsX9ZJ9uxLd4tXj7KN7r1ZHsRx',
    beneficiary: 'B62qrZXbP3KgSGQJYSL7NfypA6prcCt8UTJpnzg4SR2vXW4QrMBRbPy',
    emergencyAddress: 'B62qrZXbP3KgSGQJYSL7NfypA6prcCt8UTJpnzg4SR2vXW4QrMBRbPy',
    companyName: "Uniswap",
    companyId: 3,
  },
  {
    employeeName: "李四",
    contractAddress: 'B62qodtSGWiVPzeXa2yaoAfYEW82qoVRUJozSQqbDYpTbaFYFeQeGCM',
    isContractActive: false,
    initialTime: Math.floor(Date.now() / 1000) - 730 * 24 * 60 * 60, // 2 years ago
    depositedToken: 'xnyyp6sfZiibd4WJBVPiPKCr97Z8J39AkXQ5G3wmgAhRmS6q3C', // USDC address
    monthlyContribution: new BigNumber(800).shiftedBy(6).toString(), // 800 USDC
    monthlyWithdrawal: new BigNumber(400).shiftedBy(6).toString(), // 400 USDC
    policyHolder: 'B62qoa4bT3m19nusva6tBxTLSqA1oXsX9ZJ9uxLd4tXj7KN7r1ZHsRx',
    beneficiary: 'B62qk864H65caK77iugPEP25jTB7Miv5AZQdqpezQzgjQsDeynjsu7m',
    emergencyAddress: 'B62qk864H65caK77iugPEP25jTB7Miv5AZQdqpezQzgjQsDeynjsu7m',
    companyName: "AAVE",
    companyId: 6,
  }
];

export default function EmployeePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [socialSecurityInfo, setSocialSecurityInfo] = useState({
    enterpriseId: '',
    key: '',
    password: ''
  });
  const [socialSecurityId, setSocialSecurityId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { walletAddress, isConnected } = useWallet();

  const textColor = useColorModeValue('gray.800', 'white');
  const titleColor = useColorModeValue('white.800', 'white');
  const modalTextColor = "black";

  const toast = useToast();

  const handleInputChange = (e) => {
    setSocialSecurityInfo({ ...socialSecurityInfo, [e.target.name]: e.target.value });
  };

  // 生成随机密钥的函数
  const generateRandomKey = useCallback(() => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 32; // 你可以调整这个长度
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setSocialSecurityInfo(prevState => ({ ...prevState, key: result }));
  }, []);

  const handleGenerateSocialSecurityId = () => {
    // const { enterpriseId, key, password } = socialSecurityInfo;
    
    // // 第一步：使用 SHA-256 哈希企业 ID 和密码的组合
    // const sha256Hash = CryptoJS.SHA256(enterpriseId + password).toString();
    
    // // 第二步：使用 Pedersen 承诺（这里用模拟函数）结合 key 和 SHA-256 哈希结果
    // const pedersenHash = pedersenCommitment(sha256Hash, key);
    
    // // 设置生成的社保 ID
    // setSocialSecurityId(pedersenHash);
    
    // navigator.clipboard.writeText(pedersenHash).then(() => {
    //     toast({
    //       title: "复制成功",
    //       description: `您的社保 ID 是: ${pedersenHash}, 已复制到粘贴板`,
    //       status: "success",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //   }).catch((err) => {
    //     console.error('Failed to copy: ', err);
    //     toast({
    //       title: "复制失败",
    //       description: `您的社保 ID 是: ${pedersenHash}, 已手动复制到粘贴板`,
    //       status: "error",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //   });

    // onClose();
  };

  // 模拟函数
  const mockFunction = () => console.log("Function called");
  const mockFormatAmount = (amount) => amount.toFixed(2);
  const mock_t = (cn, en) => cn; // 使用中文

  const handleCopyKey = useCallback(() => {
    navigator.clipboard.writeText(socialSecurityInfo.key).then(() => {
      toast({
        title: "复制成功",
        description: "密钥已成功复制到剪贴板",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      toast({
        title: "复制失败",
        description: "无法复制密钥，请手动复制",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  }, [socialSecurityInfo.key]);

  // 新增状态和函数
  const [claimInfo, setClaimInfo] = useState({ key: '', password: '' });
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimProgress, setClaimProgress] = useState(0);
  const [claimStatus, setClaimStatus] = useState('');

  const handleClaimInputChange = (e) => {
    setClaimInfo({ ...claimInfo, [e.target.name]: e.target.value });
  };

  const handleClaimFunds = useCallback(() => {
    setIsClaimModalOpen(true);
  }, []);

  const handleConfirmClaim = useCallback(() => {
    setClaimStatus('生成零知识证明中...');
    setClaimProgress(33);

    setTimeout(() => {
      setClaimStatus('正在提交交易...');
      setClaimProgress(66);

      setTimeout(() => {
        setClaimStatus('交易完成');
        setClaimProgress(100);

        setTimeout(() => {
          setIsClaimModalOpen(false);
          setClaimProgress(0);
          setClaimStatus('');
          toast({
            title: "领取成功",
            description: "社保已成功领取",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }, 1000);
      }, 3000);
    }, 3000);
  }, [toast]);

  return (
    <Box className="container" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" color={titleColor} textAlign="center">我的保单列表</Heading>
        {/* <Button colorScheme="blue" onClick={onOpen} alignSelf="flex-end">
          生成社保ID
        </Button> */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {employeePolicies.map((policy, index) => (
            <InsuranceCard
              isEmployee={true}
              key={policy.contractAddress}
              insurance={policy}
              index={index}
              symbol="MINA"
              decimals={6}
              paidBalance={new BigNumber(policy.monthlyContribution).multipliedBy(12)} // 模拟已缴纳12个月
              toBePaidBalance={new BigNumber(0)} // 模拟无待缴纳金额
              withdrawableBalance={new BigNumber(policy.monthlyContribution).multipliedBy(12)} // 模拟可提取金额等于已缴纳金额
              startWithdrawTime={policy.initialTime + 365 * 24 * 60 * 60} // 一年后开始提取
              curAvailableFunds={new BigNumber(policy.monthlyWithdrawal)} // 模拟当前可用资金为一个月的提取金额
              walletAddress={walletAddress} // 模拟当前钱包地址
              handleClaimFunds={handleClaimFunds}
              handleDeposit={mockFunction}
              handleWithdrawBalance={mockFunction}
              handleConvertToYieldAsset={mockFunction}
              handleTerminatePolicy={mockFunction}
              handleCloseAccount={mockFunction}
              claimingFunds={false}
              withdrawing={false}
              terminatingPolicy={false}
              emergencyWithdrawing={false}
              formatAmount={mockFormatAmount}
              _t={mock_t}
            />
          ))}
        </SimpleGrid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={modalTextColor}>生成社保ID</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel color={modalTextColor}>企业ID</FormLabel>
              <Input 
                name="enterpriseId" 
                value={socialSecurityInfo.enterpriseId} 
                onChange={handleInputChange} 
                color={modalTextColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color={modalTextColor}>
                Key
              </FormLabel>
              <Text color="red" fontSize="12px">
                (请务必保存好，领取社保时需要)
              </Text>
              <Input 
                name="key" 
                value={socialSecurityInfo.key} 
                color={modalTextColor}
                bg="gray.100"  // 添加背景色以表明这是只读的
                _placeholder={{ color: 'gray.500' }}
              />
              <HStack mt={2} spacing={2}>
                <Button onClick={generateRandomKey} size="sm">生成随机Key</Button>
                <Button onClick={() => handleCopyKey()} size="sm">复制Key</Button>
              </HStack>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color={modalTextColor}>密码</FormLabel>
              <Text color="red" fontSize="12px">
                (请务必保存好，领取社保时需要)
              </Text>
              <InputGroup>
                <Input 
                  name="password" 
                  type={showPassword ? "text" : "password"}
                  value={socialSecurityInfo.password} 
                  onChange={handleInputChange} 
                  color={modalTextColor}
                  _placeholder={{ color: 'gray.500' }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "隐藏" : "显示"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleGenerateSocialSecurityId}>
              生成
            </Button>
            <Button variant="ghost" onClick={onClose}>取消</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 新增领取社保的模态框 */}
      <Modal isOpen={isClaimModalOpen} onClose={() => setIsClaimModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={modalTextColor}>领取社保</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel color={modalTextColor}>Key</FormLabel>
              <Input 
                name="key" 
                value={claimInfo.key} 
                onChange={handleClaimInputChange} 
                color={modalTextColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color={modalTextColor}>密码</FormLabel>
              <Input 
                name="password" 
                type="password"
                value={claimInfo.password} 
                onChange={handleClaimInputChange} 
                color={modalTextColor}
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            {claimStatus && (
              <VStack mt={4} align="stretch">
                <Text color={textColor}>{claimStatus}</Text>
                <Progress value={claimProgress} size="sm" colorScheme="blue" />
              </VStack>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleConfirmClaim} isDisabled={claimProgress > 0}>
              确认领取
            </Button>
            <Button variant="ghost" onClick={() => setIsClaimModalOpen(false)} isDisabled={claimProgress > 0}>取消</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}