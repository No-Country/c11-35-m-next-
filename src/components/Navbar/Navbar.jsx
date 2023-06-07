import { useContext, useEffect, useState } from 'react'
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
  Badge,
  Icon,
  Center
} from '@chakra-ui/react'

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { AiOutlineShoppingCart, AiOutlineHome } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { SearchBar } from '../SearchBar/SearchBar'
import { useRouter } from 'next/router'
import { CartContext } from '@/context/CartContextProvider'
import UserLoginLogout from '../UserLoginLogout/UserLoginLogout'
import { UserContext } from '@/context/UserContextProvider'

export default function Navbar () {
  // const btnRef = useRef()
  const router = useRouter()
  const theme = useTheme()
  const buttonMargin = '3px 0px 3px 15px'
  const { countItems, toggleCart } = useContext(CartContext)
  const { privilege } = useContext(UserContext)
  const textColor = theme.colors.custom.text
  const primaryColor = theme.colors.custom.primary
  const backgroundColor = theme.colors.custom.background
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isPageDark, setIsPageDark] = useState(false)
  const [qty, setQty] = useState(0)
  const countQty = countItems()
  useEffect(() => {
    setQty(countItems())
  }, [countQty])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setIsPageDark(!isSidebarOpen)
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
          {isPageDark && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9
              }}
            />
          )}
          {isSidebarOpen && (
            <Flex
              as='nav'
              direction='column'
              align='flex-start'
              justify='flex-start'
              padding={4}
              bg={primaryColor}
              height='100%'
              width='75%'
              borderBottomRightRadius={20}
              borderTopRightRadius={20}
              position='fixed'
              top={0}
              left={0}
              zIndex={10}
              marginTop={0}
            >
              <Flex direction='column' alignItems='flex-start' width='100%'>
                <Box width='100%' justifyContent='flex-start'>
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
                      fontFamily='Playfair'
                      size='6xl'
                    >
                      <Text fontSize='2xl'>SUNKISS</Text>
                    </Button>
                    <IconButton
                      color={textColor}
                      icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
                      variant='ghost'
                      onClick={toggleSidebar}
                      aria-label='Toggle Sidebar'
                      marginLeft={3}
                    />
                  </Flex>
                </Box>
                {privilege === 'customer' ? (
                  <Flex
                    direction='column'
                    marginTop='10px'
                    alignItems='flex-start'
                    width='100%'
                  >
                    <Flex alignItems='center'>
                      <Icon boxSize={8} as={AiOutlineHome} />
                      <Button
                        style={{
                          background: 'none',
                          padding: 0,
                          width: '100%'
                        }}
                        width='100%'
                        fontSize={18}
                        margin={buttonMargin}
                        fontFamily='Playfair'
                        colorScheme='gray'
                        onClick={() => handleClick('home')}
                      >
                        Home
                      </Button>
                    </Flex>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        width: '100%'
                      }}
                      width='100%'
                      fontSize={18}
                      margin={buttonMargin}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Blush')}
                    >
                      <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                      >
                        <Text>Blush</Text>
                        <Icon boxSize={8} as={BiChevronDown} marginRight={10} />
                      </Flex>
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        width: '100%'
                      }}
                      width='100%'
                      fontSize={18}
                      margin={buttonMargin}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Bronzer')}
                    >
                      <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                      >
                        <Text>Bronzer</Text>
                        <Icon boxSize={8} as={BiChevronDown} marginRight={10} />
                      </Flex>
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        width: '100%'
                      }}
                      width='100%'
                      fontSize={18}
                      margin={buttonMargin}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Eyebrow')}
                    >
                      <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                      >
                        <Text>Eyebrow</Text>
                        <Icon boxSize={8} as={BiChevronDown} marginRight={10} />
                      </Flex>
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        width: '100%'
                      }}
                      width='100%'
                      fontSize={18}
                      margin={buttonMargin}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Eyeliner')}
                    >
                      <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                      >
                        <Text>Eyeliner</Text>
                        <Icon boxSize={8} as={BiChevronDown} marginRight={10} />
                      </Flex>
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        width: '100%'
                      }}
                      width='100%'
                      fontSize={18}
                      margin={buttonMargin}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Eyeshadow')}
                    >
                      <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                      >
                        <Text>Eyeshadow</Text>
                        <Icon boxSize={8} as={BiChevronDown} marginRight={10} />
                      </Flex>
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        width: '100%'
                      }}
                      width='100%'
                      fontSize={18}
                      margin={buttonMargin}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Foundation')}
                    >
                      <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                      >
                        <Text>Foundation</Text>
                        <Icon boxSize={8} as={BiChevronDown} marginRight={10} />
                      </Flex>
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        width: '100%'
                      }}
                      width='100%'
                      fontSize={18}
                      margin={buttonMargin}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Lip liner')}
                    >
                      <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                      >
                        <Text>Lip liner</Text>
                        <Icon boxSize={8} as={BiChevronDown} marginRight={10} />
                      </Flex>
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        width: '100%'
                      }}
                      width='100%'
                      fontSize={18}
                      margin={buttonMargin}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Lipstick')}
                    >
                      <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                      >
                        <Text>Lipstick</Text>
                        <Icon boxSize={8} as={BiChevronDown} marginRight={10} />
                      </Flex>
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        width: '100%'
                      }}
                      width='100%'
                      fontSize={18}
                      margin={buttonMargin}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Mascara')}
                    >
                      <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                      >
                        <Text>Mascara</Text>
                        <Icon boxSize={8} as={BiChevronDown} marginRight={10} />
                      </Flex>
                    </Button>
                    <Button
                      style={{
                        background: 'none',
                        padding: 0,
                        width: '100%'
                      }}
                      width='100%'
                      fontSize={18}
                      margin={buttonMargin}
                      fontFamily='Playfair'
                      colorScheme='gray'
                      onClick={() => handleClick('Nail polish')}
                    >
                      <Flex
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                      >
                        <Text>Nail polish</Text>
                        <Icon boxSize={8} as={BiChevronDown} marginRight={10} />
                      </Flex>
                    </Button>
                  </Flex>
                ) : (
                  <NextLink
                    style={{
                      background: 'none',
                      padding: 0,
                      margin: 5
                    }}
                    href='/admin-dashboard'
                  >
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
            <Center
              w='200px' // Ajusta el ancho a tu preferencia
              position='fixed' // Agrega la propiedad para una posición fija
              left='50%' // Centra horizontalmente
              transform='translateX(-50%)'
            >
              <Text fontSize='2xl' color='black'>SUNKISS</Text>
            </Center>
            <Flex alignItems='center' ml='auto'> {/* Utiliza ml='auto' para mover los elementos a la derecha */}
              <SearchBar />
              <IconButton
                color={textColor}
                icon={<AiOutlineShoppingCart />}
                variant='ghost'
                onClick={handleCartClick}
                fontSize='30px'
              />
              {qty > 0 && (
                <Badge
                  position='absolute'
                  w={4}
                  h={4}
                  right={2}
                  top={4}
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
              icon={<AiOutlineShoppingCart />}
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
