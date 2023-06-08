import { Box, Text, Flex, Icon, Heading, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { BsWhatsapp, BsEnvelope, BsFacebook, BsInstagram } from 'react-icons/bs'
import { FiArrowLeft } from 'react-icons/fi'

export default function Help () {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <Box minH='50vh' paddingTop='5%'>
      <Flex align='center'>
        <Button
          leftIcon={<FiArrowLeft />}
          m={2}
          variant='unstyled'
          onClick={handleBack}
        />
        <Heading as='h2' size='lg' mb={4}>
          Need Help? Contact Us
        </Heading>
      </Flex>
      <Flex
        margin='0 auto'
        direction={{ base: 'column' }}
        justifyContent='space-evenly'
        maxWidth='80%'
      >
        <Box>
          <Box paddingLeft={5} paddingTop={2}>
            <Flex gap='2' alignItems='center' mb='3'>
              <Icon boxSize={6} as={BsWhatsapp} />
              <Text>11 293-292</Text>
            </Flex>
            <Flex gap='2' alignItems='center' mb='3'>
              <Icon boxSize={6} as={BsEnvelope} />
              <Text>sunkiss.makeup@gmail.com</Text>
            </Flex>
          </Box>
        </Box>
        <Box>
          <Box paddingLeft={5} paddingTop={2}>
            <Flex gap='2' alignItems='center' mb='3'>
              <Icon boxSize={6} as={BsFacebook} />
              <Text>Sunkiss Make up</Text>
            </Flex>
            <Flex gap='2' alignItems='center' mb='3'>
              <Icon boxSize={6} as={BsInstagram} />
              <Text>sunkiss.makeup</Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
