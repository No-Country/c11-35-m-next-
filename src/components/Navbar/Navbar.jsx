import { useContext, useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Button,
  IconButton,
  useBreakpointValue,
  Text,
  useTheme,
  Badge,
  Icon,
  Center,
  Heading
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
                      <Heading fontSize='2xl'>SUNKISS</Heading>
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
              <Heading fontSize='2xl' color='black'>
                SUNKISS
              </Heading>
            </Center>
            <Flex alignItems='center' ml='auto'>
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
        <Box bg={primaryColor}>
          <Heading
            fontSize='76px'
            fontWeight='600'
            textAlign='center'
            bg={primaryColor}
          >
            <NextLink href='/'> SUNKISS</NextLink>
          </Heading>
          <Flex
            margin='0 auto'
            align='center'
            padding='3px'
            width='90%'
            bg={primaryColor}
            color='white'
            justifyContent='right'
            gap={5}
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              width='75%'
            >
              <SearchBar />
            </Box>
            <UserLoginLogout />
            <Flex alignItems='center' ml='30px'>
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
                  w='15px'
                  h='15px'
                  right={20}
                  top='45%'
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
          <Box width='100%' margin='0 auto' backgroundColor={primaryColor} padding='10px'>
            <Flex gap={5}>
              {privilege === 'customer' ? (
                <Flex
                  direction='row'
                  marginTop='10px'
                  alignItems='flex-start'
                  width='90%'
                  margin='0 auto'
                  backgroundColor={primaryColor}
                >
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
                <Flex
                  justifyContent='center'
                  alignItems='center'
                  margin='0 auto'
                >
                  <NextLink href='/admin-dashboard'>
                    <Text color={textColor}>Admin</Text>
                  </NextLink>
                  <UserLoginLogout />
                </Flex>
              )}
            </Flex>
          </Box>
        </Box>
      )}
    </>
  )
}
