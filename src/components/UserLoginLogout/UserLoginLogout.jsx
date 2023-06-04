import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Icon
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { UserContext } from '@/context/UserContextProvider'
import NextLink from 'next/link'
import SignupCard from './SignUpCard'
import LoginCard from './LoginCard'
import { useRouter } from 'next/router'
import {
  createUser,
  signWithGoogle,
  signWithEmail,
  logOut
} from '@/services/firebase-auth'

import { FiUser } from 'react-icons/fi'

export default function UserLoginLogout () {
  const toast = useToast()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { currentUser } = useContext(UserContext)
  const [singup, setSingup] = useState(false)

  const handleClick = () => {
    onOpen()
  }
  const handleGoogle = () => {
    signWithGoogle()
    onClose()
    router.push('/')
  }
  const handleSignUp = async credentials => {
    const error = await createUser(credentials)
    if (!error) {
      toast({
        title: 'User Created Successfully',
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true
      })
      onClose()
      router.push('/')
    } else {
      toast({
        title: 'There is a problem with your email',
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true
      })
    }
  }

  const handleLogin = async credentials => {
    const error = await signWithEmail(credentials)
    if (error) {
      toast({
        title: 'Ooops!!',
        description: 'Invalid Email/Password',
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Welcome Back!',
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true
      })
      onClose()
      router.push('/')
    }
  }

  const handleClickSign = () => {
    setSingup(!singup)
  }

  const handleLogout = () => {
    logOut()
    router.push('/')
  }
  console.log(currentUser)
  return (
    <>
      <Flex alignItems='center'>
        {!currentUser ? (
          <Button
            leftIcon={<Icon as={FiUser} />}
            variant='ghost'
            onClick={handleClick}
            padding={0}
            m='5px'
          >
            My Account
          </Button>
        ) : (
          <Menu>
            <MenuButton as={Flex} alignItems='center'>
              {currentUser.photoURL ? (
                <Image
                  src={currentUser.photoURL}
                  alt='user picture'
                  boxSize={10}
                  borderRadius='full'
                  mr={2}
                />
              ) : (
                <Button
                  leftIcon={<Icon as={FiUser} />}
                  variant='ghost'
                  onClick={handleClick}
                  padding={0}
                  m='5px'
                >
                  My Account
                </Button>
              )}
            </MenuButton>
            <MenuList>
              <MenuItem color='blackAlpha.700'>
                <NextLink href='/profile'>
                  <Button variant='ghost'>Profile</Button>
                </NextLink>
              </MenuItem>
              <MenuItem color='blackAlpha.700'>
                <Button variant='ghost' onClick={handleLogout}>
                  Logout
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size='sm'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          {singup ? (
            <SignupCard
              handleSignUp={credentials => handleSignUp(credentials)}
              handleClickSign={handleClickSign}
            />
          ) : (
            <LoginCard
              handleLogin={credentials => handleLogin(credentials)}
              handleClickSign={handleClickSign}
              handleGoogle={handleGoogle}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
