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
  TabPanel,
  TabPanels,
  TabList,
  TabIndicator,
  Button,
  Flex
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import ProductColors from '../ProductColors/ProductColors'
import ProductCounter from '../ProductCounter/ProductCounter'
import { CartContext } from '@/context/CartContextProvider'
import useCount from '@/hooks/useCount'

export default function ProductDetails({ id }) {
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
  }

  const { counter, increaseCounter, decreaseCounter } = useCount(1)
  return (
    <>
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
              <Text py='2'>{product.brand.toUpperCase()}</Text>
              <Heading size='md'>{product.name}</Heading>
              <Box
                display='flex'
                mt='2'
                alignItems='center'
              >
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
              <Text
                color='#1A1A1A'
                fontSize='2xl'
                fontWeight='bold'
              >
                ${product.price}
              </Text>
              <Flex
                marginTop='20px'
                justifyContent='space-between'
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
                  backgroundColor='#C42F6D'
                  color='#FAFAFA'
                  width='200px'
                >
                  Add to cart
                </Button>
              </Flex>
            </CardBody>

            <CardFooter padding='0px'>
              <Tabs
                isFitted
                variant='unstyled'
                defaultIndex={0}
              >
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
                <TabPanels>
                  <TabPanel padding='0px'>
                    <Text py='2'>{product.description}</Text>
                  </TabPanel>
                  <TabPanel padding='0px'>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Aperiam aut fuga incidunt ad ratione accusantium nam ipsa
                      nisi veniam in aliquam magni amet, similique impedit.
                      Assumenda repudiandae, doloribus deleniti nobis officia
                      blanditiis quod minima nemo, distinctio aliquid dolorum.
                      Laboriosam, odio recusandae? Asperiores molestiae beatae
                      nesciunt, eius natus ad numquam. Nulla?
                    </p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardFooter>
          </Stack>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
