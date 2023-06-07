import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/store/reducers/data/index.js'
import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Image,
  Text,
  Box,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  TabIndicator,
  Button,
  Flex,
  useToast,
  Spinner
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
// import ProductColors from '../ProductColors/ProductColors'
import ProductCounter from '../ProductCounter/ProductCounter'
import { CartContext } from '@/context/CartContextProvider'
import useCount from '@/hooks/useCount'
import Cart from '../Cart/Cart'
import { useTheme } from '@emotion/react'
import ProductColors from '../ProductColors/ProductColors'
import { BsCreditCard } from 'react-icons/bs'
import { MdOutlineLocalShipping, MdStorefront } from 'react-icons/md'
import { SliderComponent } from '../SliderCards/SliderCards'

export default function ProductDetails ({ id }) {
  const toast = useToast()
  const theme = useTheme()
  const primaryColor = theme.colors.custom.primary
  const backgroundColor = theme.colors.custom.background
  const dispatch = useDispatch()
  const data = useSelector(state => state.dataHome.dataHome)

  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(fetchData())
    }
  }, [dispatch])

  const product = data ? data.find(product => product.id === id) : null

  const handleAdd = qty => {
    addToCart(product, qty)
    toast({
      title: 'Product added to cart',
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true
    })
  }
  let colors = []
  if (product) {
    colors = [
      product.productColors0HexValue,
      product.productColors1HexValue,
      product.productColors2HexValue
    ]
  }

  const { counter, increaseCounter, decreaseCounter } = useCount(1)
  return (
    <>
      <Cart />
      {product ? (
        <>
          <Card
            overflow='hidden'
            variant='outline'
            padding='1rem'
            width={{ base: '100vw', md: '75vw' }}
            margin='2rem auto'
            border='none'
          >
            <Stack>
              <CardBody
                padding='0px'
                display='flex'
                flexDirection={{ base: 'column', sm: 'row' }}
                justifyContent='space-between'
                gap={10}
              >
                <Box
                  width={{ base: '100%', sm: '50%' }}
                  display='flex'
                  alignItems='center'
                  borderRadius={10}
                  border={{ base: 'none', md: 'solid 1px #EEEEEE' }}
                >
                  <Image
                    src={product.imageLink}
                    alt='product image'
                    borderRadius='lg'
                    boxSize='lg'
                    maxHeight='230px'
                    maxWidth='200px'
                    margin='0 auto'
                    padding='0px'
                  />
                </Box>
                <Box
                  width={{ base: '100%', sm: '50%' }}
                  padding={{ base: '10px', sm: '20px' }}
                  borderRadius={10}
                  border={{ base: 'none', md: 'solid 1px #FAFAFA' }}
                  backgroundColor={{ base: '#FAFAFA', md: '#EEEEEE' }}
                >
                  <Text py='2'>
                    {product.brand && product.brand.toUpperCase()}
                  </Text>
                  <Heading size='md'>{product.name}</Heading>
                  <Box display='flex' mt='2' alignItems='center'>
                    <Box>
                      {Array(5)
                        .fill('')
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            color={i < product.rating ? '#C42F6D' : 'gray.300'}
                          />
                        ))}
                      {colors.length > 0 ? (
                        <>
                          <ProductColors colors={colors} />
                        </>
                      ) : null}
                    </Box>
                  </Box>
                  <Text color='#1A1A1A' fontSize='2xl' fontWeight='bold'>
                    ${product.price}
                  </Text>
                  <Flex
                    marginTop='20px'
                    justifyContent='space-between'
                    gap={10}
                  >
                    <ProductCounter
                      decreaseCounter={decreaseCounter}
                      increaseCounter={increaseCounter}
                      counter={counter}
                    />
                    <Button
                      onClick={() => {
                        handleAdd(counter)
                      }}
                      variant='solid'
                      backgroundColor={backgroundColor}
                      color={primaryColor}
                      width='200px'
                      height='44px'
                    >
                      Add to cart
                    </Button>
                  </Flex>
                  <Flex justifyContent='space-around' mt={7}>
                    <Flex
                      direction='column'
                      alignItems='center'
                      textAlign='center'
                      padding='0 2px'
                    >
                      <BsCreditCard fontSize={35} />
                      <Text fontSize={{ base: '14px', md: '16px' }} padding={2}>
                        Payment Methods
                      </Text>
                    </Flex>
                    <Flex
                      direction='column'
                      alignItems='center'
                      textAlign='center'
                      borderRight='solid 1px #DADADA'
                      borderLeft='solid 1px #DADADA'
                      padding='0 2px'
                    >
                      <MdOutlineLocalShipping fontSize={35} />
                      <Text fontSize={{ base: '14px', md: '16px' }} padding={2}>
                        Calculate Shipping
                      </Text>
                    </Flex>
                    <Flex
                      direction='column'
                      alignItems='center'
                      textAlign='center'
                      padding='0 2px'
                    >
                      <MdStorefront fontSize={35} />
                      <Text fontSize={{ base: '14px', md: '16px' }} padding={2}>
                        Free PickUp
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </CardBody>

              <CardFooter padding='0px'>
                <Tabs
                  isFitted
                  variant='unstyled'
                  defaultIndex={0}
                  minHeight={150}
                >
                  <TabList width='30%'>
                    <Tab>Details</Tab>
                    <Tab>Reviews</Tab>
                  </TabList>
                  <TabIndicator
                    mt='-1.5px'
                    height='2px'
                    backgroundColor={backgroundColor}
                    borderRadius='1px'
                  />
                  <TabPanels>
                    <TabPanel
                      padding='10px'
                      backgroundColor={{ base: '#FAFAFA', md: '#EEEEEE' }}
                      borderRadius={5}
                      marginTop='10px'
                    >
                      <Text>{product.description}</Text>
                    </TabPanel>
                    <TabPanel
                      padding='10px'
                      backgroundColor={{ base: '#FAFAFA', md: '#EEEEEE' }}
                      borderRadius={5}
                      marginTop='10px'
                    >
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Aperiam aut fuga incidunt ad ratione accusantium
                        nam ipsa nisi veniam in aliquam magni amet, similique
                        impedit. Assumenda repudiandae, doloribus deleniti nobis
                        officia blanditiis quod minima nemo, distinctio aliquid
                        dolorum. Laboriosam, odio recusandae? Asperiores
                        molestiae beatae nesciunt, eius natus ad numquam. Nulla?
                      </p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardFooter>
            </Stack>
          </Card>
          <Heading margin={{ base: '23px', md: '20px 100px' }}>
            Related Products
          </Heading>
          <Box
            margin='25px auto'
            padding={5}
            overflowX='scroll'
            width='85vw'
            css={{
              '&::-webkit-scrollbar': {
                width: '4px'
              },
              '&::-webkit-scrollbar-track': {
                width: '6px'
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#EAEAEA',
                borderRadius: '24px'
              }
            }}
          >
            {data && data.slice(0, 10) && (
              <SliderComponent data={data.slice(0, 10)} />
            )}
          </Box>
        </>
      ) : (
        <Flex height='70vh' justifyContent='center' alignItems='center'>
          <Spinner size='xl' margin='0 auto' />
        </Flex>
      )}
    </>
  )
}
