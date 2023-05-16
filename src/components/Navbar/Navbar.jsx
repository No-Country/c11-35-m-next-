import {
  Link as ChakraLink,
  Text,
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import NextLink from 'next/link'

export default function Navbar() {
  const { user } = useUser()
  console.log(user)

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      padding={4}
      bg='teal.600'
      color='white'
    >
      <Box>
        <Flex alignItems='center'>
          <NextLink href='/home'>
            <ChakraLink
              className='navlink'
              mr={4}
            >
              Home
            </ChakraLink>
          </NextLink>
          <NextLink href='/services'>
            <ChakraLink
              className='navlink'
              mr={4}
            >
              Services
            </ChakraLink>
          </NextLink>
          <NextLink href='/about'>
            <ChakraLink className='navlink'>About</ChakraLink>
          </NextLink>
        </Flex>
      </Box>
      <Box>
        {!user ? (
          <Button>
            <NextLink href='/api/auth/login'>
              <ChakraLink className='navlink'>Login</ChakraLink>
            </NextLink>
          </Button>
        ) : (
          <Menu>
            <MenuButton
              as={Flex}
              alignItems='center'
            >
              <Image
                src={user.picture}
                alt='user picture'
                boxSize={10}
                borderRadius='full'
                mr={2}
              />
            </MenuButton>
            <MenuList>
              <NextLink href='/api/auth/logout'>
                <MenuItem color='blackAlpha.700'>Logout</MenuItem>
              </NextLink>
              <NextLink href='/profile'>
                <MenuItem color='blackAlpha.700'>Profile</MenuItem>
              </NextLink>
            </MenuList>
          </Menu>
        )}
      </Box>
    </Flex>
  )
}
