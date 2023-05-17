import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/store/reducers/data'
import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  Text,
  ButtonGroup,
  Box
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import ProductColors from '../ProductColors/ProductColors'
import { useRouter } from 'next/router'

export default function ProductDetails({ id }) {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data.data)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(fetchData())
    }
  }, [])

  const product = data && data.find(product => product.id === parseInt(id))

  return (
    <>
      {product ? (
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          padding='2rem'
          width='90vw'
          margin='2rem auto'
        >
          <Image
            src={product.api_featured_image}
            alt='product image'
            borderRadius='lg'
            boxSize='300px'
            padding='50px'
          />

          <Stack>
            <CardBody>
              <Heading size='md'>{product.name}</Heading>
              <Text py='2'>Brand: {product.brand.toUpperCase()}</Text>
              <Box
                display='flex'
                mt='2'
                alignItems='center'
              >
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < product.rating ? 'teal.500' : 'gray.300'}
                    />
                  ))}
              </Box>
              <Text py='2'>{product.description}</Text>
              <Text
                color='teal.600'
                fontSize='2xl'
              >
                ${product.price}
              </Text>
              {product.product_colors.length > 0 ? (
                <>
                  <Text fontSize='2xl'>Available Colors:</Text>
                  <ProductColors colors={product.product_colors} />
                </>
              ) : null}
            </CardBody>

            <CardFooter>
              <ButtonGroup spacing='2'>
                <Button
                  variant='solid'
                  colorScheme='teal'
                >
                  Buy now
                </Button>
                <Button
                  variant='ghost'
                  colorScheme='teal'
                >
                  Add to cart
                </Button>
                <Button
                  variant='solid'
                  colorScheme='teal'
                  onClick={() => {
                    router.back()
                  }}
                >
                  Back to Store
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Stack>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
