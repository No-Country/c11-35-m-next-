import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function SignupCard ({ handleSignUp, handleClickSign }) {
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({
    displayName: '',
    email: '',
    password: ''
  })

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleClick = () => {
    handleSignUp(credentials)
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
          <Heading fontSize='4xl' textAlign='center'>
            Sign up
          </Heading>
          <Text fontSize='lg' color='gray.600'>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id='displayName' isRequired>
              <FormLabel>First and Last Name</FormLabel>
              <Input
                type='text'
                onChange={handleChange}
                name='displayName'
                value={credentials.displayName}
              />
            </FormControl>

            <FormControl id='email' isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                onChange={handleChange}
                name='email'
                value={credentials.email}
              />
            </FormControl>
            <FormControl id='password' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  name='password'
                  value={credentials.password}
                />
                <InputRightElement h='full'>
                  <Button
                    variant='ghost'
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleClick}
                loadingText='Submitting'
                size='lg'
                bg='blue.400'
                color='white'
                _hover={{
                  bg: 'blue.500'
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align='center'>
                Already a user?{' '}
                <Link color='blue.400' onClick={handleClickSign}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
