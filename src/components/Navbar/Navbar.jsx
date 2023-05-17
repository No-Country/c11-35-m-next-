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
  useBreakpointValue,
  Text
} from '@chakra-ui/react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/store/reducers/data'
import { BsCart2 } from 'react-icons/bs'
import { SearchBar } from '../SearchBar/SearchBar'

export default function Navbar() {
  const { user } = useUser()
  const dispatch = useDispatch()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const data = useSelector(state => state.data.data)

  const isMobile = useBreakpointValue({ base: true, lg: false, sm: false })

  const handleClick = itemName => {
    console.log(itemName)
    dispatch(fetchData(itemName))
  }

  return (
    <>
      {isMobile && (
        <>
          <SearchBar data={data} />
          {isSidebarOpen && (
            <Flex
              as='nav'
              direction='column'
              align='flex-start'
              justify='flex-start'
              padding={4}
              bg='#FAFAFA'
              height='100%'
              width='50%'
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
                    color='#1A1A1A'
                    icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
                    variant='ghost'
                    onClick={toggleSidebar}
                    aria-label='Toggle Sidebar'
                  />
                </Box>
                <Flex
                  direction='column'
                  marginTop='20px'
                >
                  <NextLink href='/home'>
                    <Text color='#1A1A1A'>Home</Text>
                  </NextLink>
                  <Menu>
                    <MenuButton
                      as={Flex}
                      alignItems='center'
                      marginTop='20px'
                      color='#1A1A1A'
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
              </Flex>
              <Box
                mt='auto'
                px={4}
              >
                {!user ? (
                  <Button>
                    <NextLink href='/api/auth/login'>
                      <Text color='#1A1A1A'>Login</Text>
                    </NextLink>
                  </Button>
                ) : (
                  <Menu>
                    <MenuButton
                      as={Flex}
                      alignItems='center'
                    >
                      <Flex justifyContent='center'>
                        <Image
                          src={user.picture}
                          alt='user picture'
                          boxSize={10}
                          borderRadius='full'
                          mr={2}
                        />
                        <Text color='#1A1A1A'>My account</Text>
                      </Flex>
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
            minH='73px'
            as='nav'
            align='center'
            justify='space-between'
            width='100%'
            padding={4}
            bg='#FAFAFA'
            color='white'
            zIndex={2}
            position='fixed'
          >
            <IconButton
              color='#1A1A1A'
              size='lg'
              icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant='ghost'
              onClick={toggleSidebar}
              aria-label='Toggle Sidebar'
              position='absolute'
              left={0}
            />
            <Box
              position='absolute'
              right={0}
            >
              <IconButton
                color='#1A1A1A'
                size='lg'
                icon={<BsCart2 />}
                variant='ghost'
                onClick={toggleSidebar}
                aria-label='Toggle Sidebar'
              />
            </Box>
          </Box>
        </>
      )}
      {!isMobile && (
        <Flex
          as='nav'
          align='center'
          padding={4}
          bg='#FAFAFA'
          color='white'
          justifyContent='space-between'
        >
          <Flex gap={5}>
            <NextLink href='/home'>
              <Text color='#1A1A1A'>Home</Text>
            </NextLink>
            <Menu>
              <MenuButton
                as={Flex}
                alignItems='center'
                color='#1A1A1A'
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
