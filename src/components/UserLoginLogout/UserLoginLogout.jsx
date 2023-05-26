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
  useDisclosure
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

export default function UserLoginLogout () {
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
  const handleSignUp = credentials => {
    createUser(credentials)
    onClose()
    router.push('/')
  }

  const handleLogin = credentials => {
    signWithEmail(credentials)
    onClose()
    router.push('/')
  }

  const handleClickSign = () => {
    setSingup(!singup)
  }

  const handleLogout = () => {
    logOut()
    router.push('/')
  }

  return (
    <>
      <Flex alignItems='center'>
        {!currentUser ? (
          <Button variant='solid' onClick={handleClick} colorScheme='gray'>
            Login
          </Button>
        ) : (
          <Menu>
            <MenuButton as={Flex} alignItems='center'>
              <Image
                src={currentUser.photoURL}
                alt='user picture'
                boxSize={10}
                borderRadius='full'
                mr={2}
              />
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
