"use client"

import { useState, useEffect } from 'react';
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
  useDisclosure
} from '@chakra-ui/react';
import InsuranceCard from '../../components/InsuranceCard';
import BigNumber from 'bignumber.js';


// 模拟的员工保单数据
const initialPolicies = [
  {
    employeeName: "张三",
    contractAddress: 'B62qpXPvmKDf4SaFJynPsT6DyvuxMS9H1pT4TGonDT26m599m7dS9gP',
    isContractActive: true,
    initialTime: Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60, // 1 year ago
    depositedToken: 'xnyyp6sfZiibd4WJBVPiPKCr97Z8J39AkXQ5G3wmgAhRmS6q3C', // USDC address
    monthlyContribution: new BigNumber(1000).shiftedBy(6).toString(), // 1000 USDC
    monthlyWithdrawal: new BigNumber(0).shiftedBy(6).toString(), // 500 USDC
    policyHolder: 'B62qrZXbP3KgSGQJYSL7NfypA6prcCt8UTJpnzg4SR2vXW4QrMBRbPy',
    beneficiary: 'B62qrZXbP3KgSGQJYSL7NfypA6prcCt8UTJpnzg4SR2vXW4QrMBRbPy',
    emergencyAddress: 'B62qrZXbP3KgSGQJYSL7NfypA6prcCt8UTJpnzg4SR2vXW4QrMBRbPy',
    withdrawalDelay: 10 * 365 * 24 * 60 * 60
  },
  {
    employeeName: "李四",
    contractAddress: 'B62qodtSGWiVPzeXa2yaoAfYEW82qoVRUJozSQqbDYpTbaFYFeQeGCM',
    isContractActive: false,
    initialTime: Math.floor(Date.now() / 1000) - 730 * 24 * 60 * 60, // 2 years ago
    depositedToken: 'xnyyp6sfZiibd4WJBVPiPKCr97Z8J39AkXQ5G3wmgAhRmS6q3C', // USDC address
    monthlyContribution: new BigNumber(800).shiftedBy(6).toString(), // 800 USDC
    monthlyWithdrawal: new BigNumber(400).shiftedBy(6).toString(), // 400 USDC
    policyHolder: 'B62qk864H65caK77iugPEP25jTB7Miv5AZQdqpezQzgjQsDeynjsu7m',
    beneficiary: 'B62qk864H65caK77iugPEP25jTB7Miv5AZQdqpezQzgjQsDeynjsu7m',
    emergencyAddress: 'B62qk864H65caK77iugPEP25jTB7Miv5AZQdqpezQzgjQsDeynjsu7m',
    withdrawalDelay: 335 * 24 * 60 * 60
  },
  {
    employeeName: "王五",
    contractAddress: 'B62qodtSGWiVPzeXa2yaoAfYEW82qoVRUJozSQqbDYpTbaFYFeQeGCM',
    isContractActive: false,
    initialTime: Math.floor(Date.now() / 1000) - 90 * 24 * 60 * 60, // 90 days ago
    depositedToken: 'wqt8AFhKhv3Z1wkRoWFgJ66Sx4Yep1EEeaSSQDYwRyhoTDxSin', // USDC address
    monthlyContribution: new BigNumber(2000).shiftedBy(6).toString(), // 2000 USDC
    monthlyWithdrawal: new BigNumber(0).shiftedBy(6).toString(), // 1000 USDC
    policyHolder: 'B62qjwDWxjf4LtJ4YWJQDdTNPqZ69ZyeCzbpAFKN7EoZzYig5ZRz8JE',
    beneficiary: 'B62qjwDWxjf4LtJ4YWJQDdTNPqZ69ZyeCzbpAFKN7EoZzYig5ZRz8JE',
    emergencyAddress: 'B62qjwDWxjf4LtJ4YWJQDdTNPqZ69ZyeCzbpAFKN7EoZzYig5ZRz8JE',
    withdrawalDelay: 3 * 365 * 24 * 60 * 60
  }
];

export default function EmployeePoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPolicy, setNewPolicy] = useState({
    employeeName: '',
    socialSecurityId: '',
    tokenAddress: '',
    monthlyContribution: '',
    withdrawalDelay: '',
    emergencyContact: ''
  });

  const textColor = useColorModeValue('gray.800', 'gray');
  const titleColor = useColorModeValue('white.800', 'white');

  useEffect(() => {
    const savedPolicies = JSON.parse(localStorage.getItem('employeePolicies') || '[]');
    setPolicies([...initialPolicies, ...savedPolicies]);
  }, []);

  const handleInputChange = (e) => {
    setNewPolicy({ ...newPolicy, [e.target.name]: e.target.value });
  };

  const handleAddPolicy = () => {
    const newPolicyData = {
      contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`, // 生成随机地址
      isContractActive: true,
      initialTime: Math.floor(Date.now() / 1000),
      depositedToken: newPolicy.tokenAddress,
      monthlyContribution: new BigNumber(newPolicy.monthlyContribution).shiftedBy(6).toString(),
      monthlyWithdrawal: new BigNumber(newPolicy.monthlyContribution).dividedBy(2).shiftedBy(6).toString(), // 假设每月领取是缴纳的一半
      policyHolder: `0x${Math.random().toString(16).substr(2, 40)}`, // 生成随机地址
      beneficiary: `0x${Math.random().toString(16).substr(2, 40)}`, // 生成随机地址
      emergencyAddress: newPolicy.emergencyContact,
      employeeName: newPolicy.employeeName,
      socialSecurityId: newPolicy.socialSecurityId,
      withdrawalDelay: parseInt(newPolicy.withdrawalDelay) * 30 * 24 * 60 * 60 // 转换为秒
    };

    const updatedPolicies = [...policies, newPolicyData];
    setPolicies(updatedPolicies);
    localStorage.setItem('employeePolicies', JSON.stringify(updatedPolicies.slice(initialPolicies.length)));
    onClose();
  };

  // 模拟函数
  const mockFunction = () => console.log("Function called");
  const mockFormatAmount = (amount) => amount.toFixed(2);
  const mock_t = (cn, en) => cn; // 使用中文

  return (
    <Box className="container" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl" color={titleColor} textAlign="center">员工保单列表</Heading>
        <Button colorScheme="blue" onClick={onOpen} alignSelf="flex-end">
          添加员工保单
        </Button>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {policies.map((policy, index) => (
            <InsuranceCard
              key={policy.contractAddress}
              insurance={policy}
              index={index}
              symbol="MINA"
              decimals={6}
              paidBalance={new BigNumber(policy.monthlyContribution).multipliedBy(3)} // 模拟已缴纳3个月
              toBePaidBalance={new BigNumber(0)} // 模拟无待缴纳金额
              withdrawableBalance={new BigNumber(policy.monthlyContribution).multipliedBy(3)} // 模拟可提取金额等于已缴纳金额
              startWithdrawTime={policy.initialTime + policy.withdrawalDelay} // 使用设定的延迟时间
              curAvailableFunds={new BigNumber(policy.monthlyWithdrawal)} // 模拟当前可用资金为一个月的提取金额
              walletAddress="0x1111111111111111111111111111111111111111" // 模拟当前钱包地址
              handleClaimFunds={mockFunction}
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
          <ModalHeader color="black">添加新员工保单</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel color="black">员工称呼</FormLabel>
              <Input name="employeeName" value={newPolicy.employeeName} onChange={handleInputChange} color="black" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="black">社保ID</FormLabel>
              <Input name="socialSecurityId" value={newPolicy.socialSecurityId} onChange={handleInputChange} color="black" />
              <FormLabel color="black" fontSize={12}>需要将企业ID告诉员工，并由员工生成社保ID，你再填入此处</FormLabel>              
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="black">Token地址</FormLabel>
              <Input name="tokenAddress" value={newPolicy.tokenAddress} onChange={handleInputChange} color="black" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="black">每月缴纳数量</FormLabel>
              <Input name="monthlyContribution" value={newPolicy.monthlyContribution} onChange={handleInputChange} type="number" color="black" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="black">可领取等待时间 (月)</FormLabel>
              <Input name="withdrawalDelay" value={newPolicy.withdrawalDelay} onChange={handleInputChange} type="number" color="black" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="black">紧急处理人地址</FormLabel>
              <Input name="emergencyContact" value={newPolicy.emergencyContact} onChange={handleInputChange} color="black" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddPolicy}>
              添加
            </Button>
            <Button variant="ghost" onClick={onClose}>取消</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
