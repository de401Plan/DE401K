"use client"

import { Box, Heading, Button, Input, VStack, SimpleGrid } from '@chakra-ui/react'
import Link from 'next/link'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import dynamic from 'next/dynamic'
import { SmartContract } from 'o1js'
// 动态导入 o1js 相关组件
// const SmartContract = dynamic(
//   () => import('o1js').then((mod) => mod.SmartContract),
//   { ssr: false }
// );

// 注册 ChartJS 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Home() {
  // 模拟数据
  const months = ['1月', '2月', '3月', '4月', '5月', '6月']
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' }
      },
      y: {
        ticks: { color: 'white' }
      }
    }
  }

  const enterpriseData = {
    labels: months,
    datasets: [{
      label: '组织总数',
      data: [800, 900, 1000, 1100, 1200, 1234],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }

  const employeeData = {
    labels: months,
    datasets: [{
      label: '雇员总数',
      data: [45000, 48000, 50000, 52000, 54000, 56789],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  }

  const fundData = {
    labels: months,
    datasets: [{
      label: '社保资金总量 (USDT)',
      data: [4500000, 4800000, 5000000, 5200000, 5400000, 5678900],
      borderColor: 'rgb(53, 162, 235)',
      tension: 0.1
    }]
  }

  return (
    <Box className="container" py={8}>
      <VStack spacing={6} align="center">
        <Heading as="h1" size="2xl" mb={6}>Web3去中心化社保平台</Heading>
        <VStack spacing={4} align="center" mb={6}>
          <Box className="card" p={4} borderRadius="md" width="100%" maxWidth="900px">            
            <Box display="flex" justifyContent="space-between">
              <Box flex="1" p={3} borderRadius="md" bg="rgba(255, 255, 255, 0.1)" mr={2} boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
                <VStack spacing={3} align="center">
                  <Box fontSize="md" color="white" fontWeight="semibold">组织</Box>
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
                  <Box fontSize="sm" color="gray.300">U/月</Box>
                </VStack>
              </Box>
            </Box>
          </Box>
        </VStack>
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6} width="100%" maxWidth="1200px">
          <Box className="card" p={4} borderRadius="md">
            <Line options={chartOptions} data={enterpriseData} />
          </Box>
          <Box className="card" p={4} borderRadius="md">
            <Line options={chartOptions} data={employeeData} />
          </Box>
          <Box className="card" p={4} borderRadius="md">
            <Line options={chartOptions} data={fundData} />
          </Box>
        </SimpleGrid>
        {/* <Box display="flex" justifyContent="center" width="100%">
          <Box className="card" flex="1" maxWidth="300px" mr={4}>
            <Link href="/enterprise" passHref>
              <Button width="100%">组织入口</Button>
            </Link>
          </Box>
          <Box className="card" flex="1" maxWidth="300px">
            <Link href="/employee" passHref>
              <Button width="100%">雇员入口</Button>
            </Link>
          </Box>
        </Box> */}
      </VStack>
    </Box>
  )
}
