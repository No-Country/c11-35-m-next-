import { Box, Center, Flex, Icon, Text } from '@chakra-ui/react'
import { BsWhatsapp, BsEnvelope, BsFacebook, BsInstagram } from 'react-icons/bs'
export default function Footer () {
  return (
    <>
      <Box bg='rgba(33, 74, 95, 0.5)'>
        <Box padding={5}>
          <Text>Contact</Text>
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
        <Box padding={5} paddingTop={0}>
          <Text>Follow</Text>
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
        <Center>
          <Text>Copyright Sunkiss - 2023</Text>
        </Center>
        <Center paddingBottom={5}>
          <Text>all rights reserved</Text>
        </Center>
      </Box>
    </>
  )
}
