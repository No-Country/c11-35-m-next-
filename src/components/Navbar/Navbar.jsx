import { useContext, useEffect, useRef, useState } from 'react'
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  useBreakpointValue,
  Text,
  useTheme,
  Badge
} from '@chakra-ui/react'

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { BiShoppingBag } from 'react-icons/bi'
import { SearchBar } from '../SearchBar/SearchBar'
import { useRouter } from 'next/router'
import { CartContext } from '@/context/CartContextProvider'
import UserLoginLogout from '../UserLoginLogout/UserLoginLogout'
import { UserContext } from '@/context/UserContextProvider'

export default function Navbar () {
  // const btnRef = useRef()
  const router = useRouter()
  const theme = useTheme()
  const { countItems, toggleCart } = useContext(CartContext)
  const { privilege } = useContext(UserContext)
  const textColor = theme.colors.custom.text
  const primaryColor = theme.colors.custom.primary
  const backgroundColor = theme.colors.custom.background
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [qty, setQty] = useState(0)
  const countQty = countItems()
  useEffect(() => {
    setQty(countItems())
  }, [countQty])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const isMobile = useBreakpointValue({ base: true, lg: false, sm: false })
  const handleClick = itemName => {
    router.push(`/?type=${itemName}`)
  }
  const handleCartClick = () => {
    toggleCart()
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
              bg={primaryColor}
              height='100%'
              width='50%'
              position='fixed'
              top={0}
              left={0}
              zIndex={10}
              marginTop={0}
            >
              <Flex direction='column' alignItems='flex-start'>
                <Box w='100%' justifyContent='flex-start'>
                  <Flex
                    width='100%'
                    marginTop='10px'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Button
                      style={{
                        background: 'none'
                      }}
                      color={textColor}
                      ml={2}
                      fontFamily='Playfair'
                      size='xxl'
                    >
                      SUNKISS
                    </Button>
                    <IconButton
                      color={textColor}
                      icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
                      variant='ghost'
                      onClick={toggleSidebar}
                      aria-label='Toggle Sidebar'
                      marginLeft='50%'
                    />
                  </Flex>
                </Box>
                {privilege === 'customer' ? (
                  <Flex
                    direction='column'
                    marginTop='10px'
                    alignItems='flex-start'
                  >
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        margin: 5
                      }}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('home')}
                    >
                      Home
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        margin: 5
                      }}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Blush')}
                    >
                      Blush
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        margin: 5
                      }}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Bronzer')}
                    >
                      Bronzer
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        margin: 5
                      }}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Eyebrow')}
                    >
                      Eyebrow
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        margin: 5
                      }}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Eyeliner')}
                    >
                      Eyeliner
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        margin: 5
                      }}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Eyeshadow')}
                    >
                      Eyeshadow
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        margin: 5
                      }}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Foundation')}
                    >
                      Foundation
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        margin: 5
                      }}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Lip liner')}
                    >
                      Lip liner
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        margin: 5
                      }}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Lipstick')}
                    >
                      Lipstick
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        margin: 5
                      }}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Mascara')}
                    >
                      Mascara
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        margin: 5
                      }}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Nail polish')}
                    >
                      Nail polish
                    </Button>
                  </Flex>
                ) : (
                  <NextLink href='/admin-dashboard'>
                    <Text color={textColor}>Admin</Text>
                  </NextLink>
                )}
              </Flex>
              <UserLoginLogout />
            </Flex>
          )}
          <Box
            minH='73px'
            as='nav'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            width='100%'
            height='8%'
            padding={4}
            bg={primaryColor}
            color='white'
            zIndex={1}
            marginTop={0}
          >
            <IconButton
              color={textColor}
              size='lg'
              icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant='ghost'
              onClick={toggleSidebar}
              aria-label='Toggle Sidebar'
              position='absolute'
              left={0}
            />
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              width='100%'
            >
              <SearchBar />
            </Box>
            <Flex alignItems='center'>
              <IconButton
                color={textColor}
                icon={<BiShoppingBag />}
                variant='ghost'
                onClick={handleCartClick}
                right={0}
                fontSize='30px'
              />
              {qty > 0 && (
                <Badge
                  position='absolute'
                  w={4}
                  h={4}
                  right={4}
                  top={6}
                  fontSize='10px'
                  backgroundColor={backgroundColor}
                  color={theme.colors.custom.primary}
                  borderRadius='50%'
                >
                  {qty}
                </Badge>
              )}
            </Flex>
          </Box>
        </>
      )}
      {!isMobile && (
        <Flex
          as='nav'
          align='center'
          padding={4}
          bg={primaryColor}
          color='white'
          justifyContent='space-between'
        >
          <Flex gap={5}>
            {' '}
            {/* TODO renderizado opcional por privilegio admin o user */}
            <NextLink href='/'>
              <Text color={textColor}>Home</Text>
            </NextLink>
            {privilege === 'customer' ? (
              <Menu>
                <MenuButton as={Flex} alignItems='center' color={textColor}>
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
                    onClick={() => handleClick('lip_liner')}
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
            ) : (
              <NextLink href='/admin-dashboard'>
                <Text color={textColor}>Admin</Text>
              </NextLink>
            )}
          </Flex>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            width='100%'
          >
            <SearchBar />
          </Box>
          <UserLoginLogout />
          <Flex alignItems='center'>
            <IconButton
              color={textColor}
              icon={<BiShoppingBag />}
              variant='ghost'
              onClick={handleCartClick}
              right={0}
              fontSize='30px'
            />
            {qty > 0 && (
              <Badge
                position='absolute'
                w={4}
                h={4}
                right={4}
                top={6}
                fontSize='10px'
                backgroundColor={backgroundColor}
                color={theme.colors.custom.primary}
                borderRadius='50%'
              >
                {qty}
              </Badge>
            )}
          </Flex>
        </Flex>
      )}
    </>
  )
}
