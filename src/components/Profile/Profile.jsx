import { UserContext } from '@/context/UserContextProvider'
import {
  Button,
  Card,
  Heading,
  Stack,
  Image,
  Flex,
  Box
} from '@chakra-ui/react'
import { FiUser, FiPackage, FiMapPin, FiHelpCircle, FiChevronRight } from 'react-icons/fi'
import { useContext } from 'react'
import Link from 'next/link'

export default function Profile () {
  const { currentUser } = useContext(UserContext)

  return (
    <>
      <Card direction='column' alignItems='center' minHeight='100%' bg='transparent' boxShadow='none' mt={10}>
        <Image
          src={currentUser.photoURL}
          alt={currentUser.displayName}
          borderRadius='full'
          boxSize='100px'
        />
        <Heading as='h2' size='lg'>
          {currentUser.displayName}
        </Heading>
      </Card>

      <Flex justifyContent='flex-start'>
        <Stack direction='column' spacing={4} align='stretch' width='100%'>
          <Link href='/profileEdit'>
            <Box height='48px' margin='20px' marginTop='60px'>
              <Button
                as='a'
                leftIcon={<FiUser />}
                rightIcon={<FiChevronRight />}
                justifyContent='space-between'
                m={2}
                width='100%'
                variant='unstyled'
              >
                Profile
              </Button>
            </Box>
          </Link>
          <Link href='/orders'>
            <Box height='48px' margin='20px' marginTop='8px'>
              <Button
                as='a'
                leftIcon={<FiPackage />}
                rightIcon={<FiChevronRight />}
                justifyContent='space-between'
                m={2}
                width='100%'
                variant='unstyled'
              >
                Orders
              </Button>
            </Box>
          </Link>
          <Link href='/address'>
            <Box height='48px' margin='20px' marginTop='8px'>
              <Button
                as='a'
                leftIcon={<FiMapPin />}
                rightIcon={<FiChevronRight />}
                justifyContent='space-between'
                m={2}
                width='100%'
                variant='unstyled'
              >
                Address
              </Button>
            </Box>
          </Link>
          <Link href='/help'>
            <Box height='48px' margin='20px' marginTop='8px'>
              <Button
                as='a'
                leftIcon={<FiHelpCircle />}
                rightIcon={<FiChevronRight />}
                justifyContent='space-between'
                m={2}
                width='100%'
                variant='unstyled'
              >
                Help
              </Button>
            </Box>
          </Link>
        </Stack>
      </Flex>
    </>
  )
}
