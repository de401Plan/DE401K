import { Box, Heading, Button, Input, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <Box className="container" py={8}>
      <VStack spacing={6} align="center">
        <Heading as="h1" size="2xl" mb={6}>Web3企业/DAO组织社保平台</Heading>
        <VStack spacing={4} align="center" mb={6}>
          <Box className="card" p={4} borderRadius="md" width="100%" maxWidth="900px">            
            <Box display="flex" justifyContent="space-between">
              <Box flex="1" p={3} borderRadius="md" bg="rgba(255, 255, 255, 0.1)" mr={2} boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
                <VStack spacing={3} align="center">
                  <Box fontSize="md" color="white" fontWeight="semibold">企业</Box>
                  <Box fontSize="2xl" fontWeight="bold" color="white">1,234</Box>
                  <Box fontSize="sm" color="gray.300">总数量</Box>
                </VStack>
              </Box>
              <Box flex="1" p={3} borderRadius="md" bg="rgba(255, 255, 255, 0.1)" mr={2} boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
                <VStack spacing={3} align="center">
                  <Box fontSize="md" color="white" fontWeight="semibold">雇员</Box>
                  <Box fontSize="2xl" fontWeight="bold" color="white">56,789</Box>
                  <Box fontSize="sm" color="gray.300">总人数</Box>
                </VStack>
              </Box>
              <Box flex="1" p={3} borderRadius="md" bg="rgba(255, 255, 255, 0.1)" mr={2}  boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
                <VStack spacing={3} align="center">
                  <Box fontSize="md" color="white" fontWeight="semibold">保单</Box>
                  <Box fontSize="2xl" fontWeight="bold" color="white">9,876</Box>
                  <Box fontSize="sm" color="gray.300">总数量</Box>
                </VStack>
              </Box>
              <Box flex="1" p={3} borderRadius="md" bg="rgba(255, 255, 255, 0.1)" boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
                <VStack spacing={3} align="center">
                  <Box fontSize="md" color="white" fontWeight="semibold">人均保费</Box>
                  <Box fontSize="2xl" fontWeight="bold" color="white">1,000</Box>
                  <Box fontSize="sm" color="gray.300">USDT/月</Box>
                </VStack>
              </Box>
            </Box>
          </Box>
        </VStack>
        <Box display="flex" justifyContent="center" width="100%">
          <Box className="card" flex="1" maxWidth="300px" mr={4}>
            <Link href="/enterprise" passHref>
              <Button width="100%">企业/DAO</Button>
            </Link>
          </Box>
          <Box className="card" flex="1" maxWidth="300px">
            <Link href="/employee" passHref>
              <Button width="100%">雇员/DAO成员</Button>
            </Link>
          </Box>
        </Box>
      </VStack>
    </Box>
  )
}
