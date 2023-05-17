import { useState } from 'react'
import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useDispatch } from 'react-redux'
import { fetchData } from '@/store/reducers/data'

export default function Navbar() {
  const { user } = useUser()
  const dispatch = useDispatch()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const isMobile = useBreakpointValue({ base: true, lg: false, sm: false })

  const handleClick = itemName => {
    dispatch(fetchData(itemName))
  }

  return (
    <>
      {isMobile && (
        <>
          {isSidebarOpen && (
            <Flex
              as='nav'
              direction='column'
              align='flex-start'
              justify='flex-start'
              padding={4}
              bg='teal.600'
              color='white'
              height='100vh'
              width='30%'
              position='fixed'
              top={0}
              left={0}
              zIndex={1}
            >
              <Flex
                direction='column'
                alignItems='flex-start'
              >
                <Box
                  w='100%'
                  justifyContent='flex-start'
                >
                  <IconButton
                    icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
                    variant='ghost'
                    onClick={toggleSidebar}
                    aria-label='Toggle Sidebar'
                  />
                </Box>
                <NextLink href='/home'>Home</NextLink>
                <Menu>
                  <MenuButton
                    as={Flex}
                    alignItems='center'
                  >
                    Product type
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => handleClick('Blush')}
                      color='blackAlpha.700'
                    >
                      Blush
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClick('Bronzer')}
                      color='blackAlpha.700'
                    >
                      Bronzer
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClick('Eyebrow')}
                      color='blackAlpha.700'
                    >
                      Eyebrow
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClick('Eyeliner')}
                      color='blackAlpha.700'
                    >
                      Eyeliner
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClick('Eyeshadow')}
                      color='blackAlpha.700'
                    >
                      Eyeshadow
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClick('Foundation')}
                      color='blackAlpha.700'
                    >
                      Foundation
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClick('Lip liner')}
                      color='blackAlpha.700'
                    >
                      Lip liner
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClick('Lipstick')}
                      color='blackAlpha.700'
                    >
                      Lipstick
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClick('Mascara')}
                      color='blackAlpha.700'
                    >
                      Mascara
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClick('Nail polish')}
                      color='blackAlpha.700'
                    >
                      Nail polish
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              <Box
                mt='auto'
                px={4}
              >
                {!user ? (
                  <Button>
                    <NextLink href='/api/auth/login'>Login</NextLink>
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
          )}
          <Box
            display={isSidebarOpen ? 'none' : 'block'}
            as='nav'
            align='center'
            justify='space-between'
            width='100%'
            padding={4}
            bg='teal.600'
            color='white'
            zIndex={2}
          >
            <Box>
              <IconButton
                icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
                variant='ghost'
                onClick={toggleSidebar}
                aria-label='Toggle Sidebar'
              />
            </Box>
            <Box />
          </Box>
        </>
      )}
      {!isMobile && (
        <Flex
          as='nav'
          align='center'
          padding={4}
          bg='teal.600'
          color='white'
          justifyContent='space-between'
        >
          <Flex gap={5}>
            <NextLink href='/home'>Home</NextLink>
            <Menu>
              <MenuButton
                as={Flex}
                alignItems='center'
              >
                Product type
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => handleClick('Blush')}
                  color='blackAlpha.700'
                >
                  Blush
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick('Bronzer')}
                  color='blackAlpha.700'
                >
                  Bronzer
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick('Eyebrow')}
                  color='blackAlpha.700'
                >
                  Eyebrow
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick('Eyeliner')}
                  color='blackAlpha.700'
                >
                  Eyeliner
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick('Eyeshadow')}
                  color='blackAlpha.700'
                >
                  Eyeshadow
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick('Foundation')}
                  color='blackAlpha.700'
                >
                  Foundation
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick('Lip liner')}
                  color='blackAlpha.700'
                >
                  Lip liner
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick('Lipstick')}
                  color='blackAlpha.700'
                >
                  Lipstick
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick('Mascara')}
                  color='blackAlpha.700'
                >
                  Mascara
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick('Nail polish')}
                  color='blackAlpha.700'
                >
                  Nail polish
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Flex alignItems='center'>
            {!user ? (
              <Button>
                <NextLink href='/api/auth/login'>Login</NextLink>
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
          </Flex>
        </Flex>
      )}
    </>
  )
}
