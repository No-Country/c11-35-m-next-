import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center
} from '@chakra-ui/react'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function LoginCard ({ handleLogin, handleClickSign, handleGoogle }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleClick = () => {
    handleLogin(credentials)
  }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading fontSize='4xl'>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id='email' isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                onChange={handleChange}
                name='email'
                value={credentials.email}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                onChange={handleChange}
                value={credentials.password}
                name='password'
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={handleClick}
                bg='blue.400'
                color='white'
                _hover={{
                  bg: 'blue.500'
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align='center'>
                Don't have an acount yet?{' '}
                <Link color='blue.400' onClick={handleClickSign}>
                  Sign Up
                </Link>
              </Text>
              <Text align='center'>OR</Text>
              <Center p={8}>
                <Button
                  w='full'
                  maxW='md'
                  variant='outline'
                  leftIcon={<FcGoogle />}
                  onClick={handleGoogle}
                >
                  <Center>
                    <Text>Sign in with Google</Text>
                  </Center>
                </Button>
              </Center>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
