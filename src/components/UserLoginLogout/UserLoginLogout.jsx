import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAuth
} from 'firebase/auth'

import { app } from '../../services/db'
import { UserContext } from '@/context/UserContextProvider'
import NextLink from 'next/link'

const provider = new GoogleAuthProvider()
const auth = getAuth(app)

export default function UserLoginLogout () {
  const { currentUser } = useContext(UserContext)

  const login = () => {
    signInWithPopup(auth, provider)
      .then(result => {})
      .catch(error => {
        console.log(error)
      })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {})
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Flex alignItems='center'>
      {!currentUser ? (
        <Button
          variant='solid'
          onClick={login}
          colorScheme='gray'
        >
          Login
        </Button>
      ) : (
        <Menu>
          <MenuButton
            as={Flex}
            alignItems='center'
          >
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
              <Button
                variant='ghost'
                onClick={logout}
              >
                Logout
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  )
}
