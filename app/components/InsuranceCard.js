import React, { useState } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter, Heading, VStack, HStack, Badge, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText,
  Button, Tooltip, Divider, useColorModeValue, Text,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Input, FormControl, FormLabel
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import CopyableAddress from '../tools/CopyableAddress';

const InsuranceCard = ({ 
  isEmployee,
  insurance, 
  index, 
  symbol, 
  decimals, 
  paidBalance, 
  toBePaidBalance, 
  withdrawableBalance, 
  startWithdrawTime,
  curAvailableFunds,
  walletAddress,
  handleClaimFunds,
  handleDeposit,
  handleWithdrawBalance,
  handleConvertToYieldAsset,
  handleTerminatePolicy,
  handleCloseAccount,
  claimingFunds,
  withdrawing,
  terminatingPolicy,
  emergencyWithdrawing,
  formatAmount,
  _t
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('blue.600', 'blue.300');

  // Add new state for modal and selected date
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const [selectedTerminateDate, setSelectedTerminateDate] = useState('');
  const [contractToTerminate, setContractToTerminate] = useState('');

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Handle modal open
  const openTerminateModal = (contractAddress) => {
    setContractToTerminate(contractAddress);
    setIsTerminateModalOpen(true);
  };

  // Handle modal close
  const closeTerminateModal = () => {
    setIsTerminateModalOpen(false);
    setSelectedTerminateDate('');
    setContractToTerminate('');
  };

  // Handle termination confirmation
  const handleTerminateConfirm = () => {
    if (selectedTerminateDate) {
      handleTerminatePolicy(contractToTerminate, new Date(selectedTerminateDate).getTime() / 1000);
      closeTerminateModal();
    }
  };

  const modalBgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  // 添加这个自定义样式
  const customInputStyle = {
    _hover: {
      cursor: 'text'
    }
  };

  return (
    <>
      <Card 
        bg={bgColor}
        borderColor={borderColor}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
      >
        <CardHeader bg={useColorModeValue('blue.50', 'blue.900')} py={4}>
          <HStack justify="space-between" width="100%">
            <VStack align="start" spacing={0}>
              {
                isEmployee ? 
                <Heading size="md" color={headingColor}>{(insurance.companyName + ' #' + insurance.companyId) || _t("未命名员工", "Unnamed Employee")}</Heading>
                :
                <Heading size="md" color={headingColor}>{insurance.employeeName || _t("未命名员工", "Unnamed Employee")}</Heading>
              }
              <Text fontSize="sm" color={headingColor}>{_t("保单", "Policy")} #{index + 1}</Text>
            </VStack>
            <Badge colorScheme={insurance.isContractActive ? "green" : "red"} fontSize="0.8em" py={1} px={2}>
              {insurance.isContractActive ? _t("活跃", "Active") : _t("已关闭", "Closed")}
            </Badge>
          </HStack>
        </CardHeader>
        <CardBody>
          <VStack align="start" spacing={4}>
            <SimpleGrid columns={2} spacing={4} width="100%">
              <Stat>
                <StatLabel fontSize="sm" fontWeight="medium">{_t("合约地址", "Contract Address")}</StatLabel>
                <StatNumber fontSize="md"><CopyableAddress address={insurance.contractAddress} /></StatNumber>
              </Stat>
              <Stat>
                <StatLabel fontSize="sm" fontWeight="medium">{_t("投保时间", "Insurance Time")}</StatLabel>
                <StatNumber fontSize="md">{new Date(insurance.initialTime * 1000).toLocaleDateString()}</StatNumber>
              </Stat>
            </SimpleGrid>
            <Divider />
            <SimpleGrid columns={2} spacing={4} width="100%">
                  <Stat>
                  <StatLabel fontSize="sm" fontWeight="medium">{_t("投保Token", "Insured Token")}</StatLabel>
                  <StatNumber fontSize="md">{symbol}</StatNumber>
                  <StatHelpText>
                      <CopyableAddress address={insurance.depositedToken} />
                  </StatHelpText>
                  </Stat>
                  <Stat>
                  <StatLabel fontSize="sm" fontWeight="medium">{_t("每月缴纳", "Monthly Contribution")}</StatLabel>
                  <StatNumber fontSize="md">{formatAmount(new BigNumber(insurance.monthlyContribution).shiftedBy(-1 * decimals))} {symbol}</StatNumber>
                  </Stat>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={4} width="100%">
                  <Stat>
                  <StatLabel fontSize="sm" fontWeight="medium">{_t("已缴纳", "Paid")}</StatLabel>
                  <StatNumber fontSize="md">{formatAmount(paidBalance.shiftedBy(-1 * decimals))} {symbol}</StatNumber>
                  </Stat>
                  <Stat>
                  <StatLabel fontSize="sm" fontWeight="medium">{_t("待补充", "To Be Paid")}</StatLabel>
                  <StatNumber fontSize="md">{formatAmount(toBePaidBalance.shiftedBy(-1 * decimals))} {symbol}</StatNumber>
                  </Stat>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={4} width="100%">
                  <Stat>
                  <StatLabel fontSize="sm" fontWeight="medium">{_t("每月领取", "Monthly Withdrawal")}</StatLabel>
                  <StatNumber fontSize="md">{formatAmount(new BigNumber(insurance.monthlyWithdrawal).shiftedBy(-1 * decimals))} {symbol}</StatNumber>
                  </Stat>
                  <Stat>
                  <StatLabel fontSize="sm" fontWeight="medium">{_t("当前可领取", "Currently Available")}</StatLabel>
                  <StatNumber fontSize="md">{formatAmount(new BigNumber(curAvailableFunds).shiftedBy(-1 * decimals))} {symbol}</StatNumber>
                  </Stat>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={4} width="100%">
                  <Stat>
                  <StatLabel fontSize="sm" fontWeight="medium">{_t("保单余额", "Policy Balance")}</StatLabel>
                  <StatNumber fontSize="md">{formatAmount(withdrawableBalance.shiftedBy(-1 * decimals))} {symbol}</StatNumber>
                  </Stat>
                  <Stat>
                  <StatLabel fontSize="sm" fontWeight="medium">{_t("开始领取日", "Start Withdrawal Date")}</StatLabel>
                  <StatNumber fontSize="md">{new Date(startWithdrawTime * 1000).toLocaleDateString()}</StatNumber>
                  </Stat>
              </SimpleGrid>
              <Divider />
              <SimpleGrid columns={2} spacing={4} width="100%">
                  <Stat>
                  <StatLabel fontSize="sm" fontWeight="medium">{_t("投保人", "Policy Holder")}</StatLabel>
                  <StatNumber fontSize="md"><CopyableAddress address={insurance.policyHolder} /></StatNumber>
                  </Stat>
                  <Stat>
                  <StatLabel fontSize="sm" fontWeight="medium">{_t("员工社保ID", "Employee Social Security ID")}</StatLabel>
                  <StatNumber fontSize="md"><CopyableAddress address={insurance.beneficiary} /></StatNumber>
                  </Stat>
              </SimpleGrid>
              <Stat>
                  <StatLabel fontSize="sm" fontWeight="medium">{_t("紧急联系人", "Emergency Contact")}</StatLabel>
                  <StatNumber fontSize="md"><CopyableAddress address={insurance.emergencyAddress} /></StatNumber>
              </Stat>
              {insurance.isContractActive && isEmployee != true && (
                  <Tooltip label={_t("停止保单后，雇主资金将不再转入保单，余额将退回到雇主账号", "After terminating the policy, employer funds will no longer be transferred to the policy and the balance will be returned to the employer's account")}>
                      <Button
                          bg="#E53E3E"
                          color="white"
                          _hover={{ bg: "#C53030" }}
                          onClick={() => openTerminateModal(insurance.contractAddress)}
                          isLoading={terminatingPolicy}
                          loadingText={_t("终止中", "Terminating")}
                          width="100%"
                      >
                          {_t("停止保单", "Terminate Policy")}
                      </Button>
                  </Tooltip>
              )}
          </VStack>
        </CardBody>
        <CardFooter bg={useColorModeValue('gray.50', 'gray.900')} borderTop="1px" borderColor={borderColor}>
          <VStack spacing={2} width="100%">
            {insurance.isContractActive && (
              <>
                {isEmployee == true && walletAddress.toUpperCase() === insurance.beneficiary.toUpperCase() && (
                  <Button 
                    bg="#48BB78" 
                    color="white" 
                    _hover={{ bg: "#38A169" }}
                    onClick={() => handleClaimFunds(insurance.contractAddress)} 
                    isLoading={claimingFunds} 
                    loadingText={_t("领取中", "Claiming")} 
                    width="100%"
                  >
                    {_t("领取社保", "Claim Insurance")}
                  </Button>
                )}
                {isEmployee != true && walletAddress.toUpperCase() === insurance.policyHolder.toUpperCase() && (
                  <>
                    <Button 
                      bg="#4299E1" 
                      color="white" 
                      _hover={{ bg: "#3182CE" }}
                      onClick={() => handleDeposit(insurance.contractAddress, insurance.depositedToken, symbol, decimals)} 
                      width="100%"
                    >
                      {_t("充值", "Deposit")}
                    </Button>
                    <Tooltip label={_t("余额将转入投保人账户", "Balance will be transferred to the policy holder's account")}>
                      <Button 
                        bg="#ECC94B" 
                        color="black" 
                        _hover={{ bg: "#D69E2E" }}
                        onClick={() => handleWithdrawBalance(insurance.contractAddress)} 
                        isLoading={withdrawing} 
                        loadingText={_t("提取中", "Withdrawing")} 
                        width="100%"
                      >
                        {_t("提取余额", "Withdraw Balance")}
                      </Button>
                    </Tooltip>
                  </>
                )}
                {isEmployee == true && walletAddress.toUpperCase() === insurance.policyHolder.toUpperCase() && (
                  <Tooltip label={_t("将保单资产转换为生息资产，收益来自AAVE或其他可生息产品", "Convert policy assets to interest-bearing assets, with returns from AAVE or other yield-generating products")}>
                    <Button 
                      bg="#319795" 
                      color="white" 
                      _hover={{ bg: "#2C7A7B" }}
                      onClick={() => handleConvertToYieldAsset(insurance.contractAddress)} 
                      width="100%"
                    >
                      {_t("将保单token转为生息资产", "Convert Policy Token to Yield Asset")}
                    </Button>
                  </Tooltip>
                )}
                {isEmployee == true && walletAddress.toUpperCase() === insurance.policyHolder.toUpperCase() && (
                  <Button 
                    bg="#DD6B20" 
                    color="white" 
                    _hover={{ bg: "#C05621" }}
                    onClick={() => handleTerminatePolicy(insurance.contractAddress)} 
                    isLoading={terminatingPolicy} 
                    loadingText={_t("终止中", "Terminating")} 
                    width="100%"
                  >
                    {_t("终止保单", "Terminate Policy")}
                  </Button>
                )}
                {isEmployee != true && (walletAddress.toUpperCase() === insurance.policyHolder.toUpperCase() || walletAddress.toUpperCase() === insurance.emergencyAddress.toUpperCase()) && (
                  <Tooltip label={_t("保单中的所有资产都将转入受益人账户", "All assets in the policy will be transferred to the beneficiary's account")}>
                    <Button 
                      bg="#E53E3E" 
                      color="white" 
                      _hover={{ bg: "#C53030" }}
                      onClick={() => handleCloseAccount(insurance.contractAddress)} 
                      isLoading={emergencyWithdrawing} 
                      loadingText={_t("销户&提现中", "Closing & Withdrawing")} 
                      width="100%"
                    >
                      {_t("销户&提现", "Close Account & Withdraw")}
                    </Button>
                  </Tooltip>
                )}
              </>
            )}
          </VStack>
        </CardFooter>
      </Card>

      {/* Termination Modal with updated styling */}
      <Modal isOpen={isTerminateModalOpen} onClose={closeTerminateModal}>
        <ModalOverlay />
        <ModalContent bg={modalBgColor}>
          <ModalHeader color={textColor}>
            {_t("选择保单截止日期", "Select Policy End Date")}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel color={textColor}>
                {_t("截止日期", "End Date")}
              </FormLabel>
              <Input
                type="date"
                value={selectedTerminateDate}
                onChange={(e) => setSelectedTerminateDate(e.target.value)}
                min={today}
                bg="white"
                color="black"
                sx={customInputStyle}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme="blue" 
              mr={3} 
              onClick={handleTerminateConfirm}
              isDisabled={!selectedTerminateDate}
            >
              {_t("确认终止", "Confirm Termination")}
            </Button>
            <Button variant="ghost" onClick={closeTerminateModal}>
              {_t("取消", "Cancel")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InsuranceCard;
