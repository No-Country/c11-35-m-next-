import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/store/reducers/data'
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
  TabList,
  TabIndicator,
  Button,
  Flex,
  useToast,
  Spinner
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import ProductColors from '../ProductColors/ProductColors'
import ProductCounter from '../ProductCounter/ProductCounter'
import { CartContext } from '@/context/CartContextProvider'
import useCount from '@/hooks/useCount'
import Cart from '../Cart/Cart'

export default function ProductCart ({ id }) {
  const toast = useToast()
  const dispatch = useDispatch()
  const data = useSelector(state => state.data.data)

  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(fetchData())
    }
  }, [dispatch])

  const product = data && data.find(product => product.id === parseInt(id))

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

  const { counter, increaseCounter, decreaseCounter } = useCount(1)
  return (
    <>
      <Cart />
      {product ? (
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          padding='1rem'
          width='100vw'
          margin='2rem auto'
          border='none'
        >
          <Image
            src={product.api_featured_image}
            alt='product image'
            borderRadius='lg'
            boxSize='lg'
            padding='0px'
          />

          <Stack>
            <CardBody padding='0px'>
              <Text py='2'>{product.brand && product.brand.toUpperCase()}</Text>
              <Heading size='md'>{product.name}</Heading>
              <Box display='flex' mt='2' alignItems='center'>
                <Box>
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < product.rating ? 'teal.500' : 'gray.300'}
                      />
                    ))}
                  {product.product_colors.length > 0 ? (
                    <>
                      <ProductColors colors={product.product_colors} />
                    </>
                  ) : null}
                </Box>
              </Box>
              <Text color='#1A1A1A' fontSize='2xl' fontWeight='bold'>
                ${product.price}
              </Text>
              <Flex marginTop='20px' justifyContent='space-between'>
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
                  backgroundColor='#C42F6D'
                  color='#FAFAFA'
                  width='200px'
                >
                  Add to cart
                </Button>
              </Flex>
            </CardBody>

            <CardFooter padding='0px'>
              <Tabs isFitted variant='unstyled' defaultIndex={0}>
                <TabList>
                  <Tab>Details</Tab>
                  <Tab>Reviews</Tab>
                </TabList>
                <TabIndicator
                  mt='-1.5px'
                  height='2px'
                  bg='#C42F6D'
                  borderRadius='1px'
                />
              </Tabs>
            </CardFooter>
          </Stack>
        </Card>
      ) : (
        <Flex height='70vh' justifyContent='center' alignItems='center'>
          <Spinner size='xl' margin='0 auto' />
        </Flex>
      )}
    </>
  )
}
