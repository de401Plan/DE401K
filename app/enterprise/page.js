"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Heading,
  VStack,
  Button,
  useDisclosure,
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
  Card,
  CardBody,
  Text,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';

// 添加这个自定义样式
const customInputStyle = {
  _hover: {
    cursor: 'text'
  }
};

export default function EnterprisePage() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [enterprise, setEnterprise] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    business: ''
  });

  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const modalBgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  // 从 localStorage 加载企业信息
  useEffect(() => {
    const savedEnterprise = localStorage.getItem('enterprise');
    if (savedEnterprise) {
      setEnterprise(JSON.parse(savedEnterprise));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let enterpriseNumber = parseInt(localStorage.getItem('enterpriseNumber') || '0');
    enterpriseNumber++;

    const newEnterprise = {
      ...formData,
      employeeCount: 0,
      number: enterpriseNumber
    };
    setEnterprise(newEnterprise);
    // 保存到 localStorage
    localStorage.setItem('enterprise', JSON.stringify(newEnterprise));
    localStorage.setItem('enterpriseNumber', enterpriseNumber.toString());
    onClose();
  };

  const handleManageEmployees = () => {
    router.push('/enterprise/policy');
  };

  return (
    <Box className="container" py={8}>
      <VStack spacing={6} align="center">
        <Heading as="h1" size="2xl" color={'white'}>企业/DAO管理页面</Heading>
        <Box display="flex" justifyContent="center" width="100%">
          <Button colorScheme="blue" mr={4} onClick={onOpen}>
            {enterprise ? "更新企业/DAO信息" : "注册新企业/DAO"}
          </Button>
        </Box>

        {enterprise && (
          <Card width="100%" maxWidth="500px" bg={bgColor}>
            <CardBody>
              <Stack spacing={3}>
                <Heading size="md" color={textColor}>{enterprise.name}</Heading>
                <Text color={textColor}>企业编号: {enterprise.number}</Text>
                <Text color={textColor}>总部所在地: {enterprise.location}</Text>
                <Text color={textColor}>主营业务: {enterprise.business}</Text>
                <Text color={textColor}>当前缴纳社保的员工数量: {4}</Text>
                <Button colorScheme="purple" onClick={handleManageEmployees}>管理员工社保</Button>
              </Stack>
            </CardBody>
          </Card>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={modalBgColor}>
          <ModalHeader color={textColor}>
            {enterprise ? "更新企业/DAO信息" : "注册新企业/DAO"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel color={textColor}>企业/DAO名称</FormLabel>
              <Input 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                bg="white" 
                sx={customInputStyle}
                placeholder="输入企业/DAO名称"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color={textColor}>总部所在地</FormLabel>
              <Input 
                name="location" 
                value={formData.location} 
                onChange={handleInputChange} 
                bg="white" 
                sx={customInputStyle}  // 应用自定义样式
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color={textColor}>主营业务</FormLabel>
              <Input 
                name="business" 
                value={formData.business} 
                onChange={handleInputChange} 
                bg="white" 
                sx={customInputStyle}  // 应用自定义样式
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              确认
            </Button>
            <Button variant="ghost" onClick={onClose}>取消</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
