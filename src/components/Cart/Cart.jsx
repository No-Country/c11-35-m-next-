import { CartContext } from '@/context/CartContextProvider'
import React, { useContext } from 'react'

import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode
} from '@chakra-ui/react'
import { CartItem } from './CartItem'
import { CartOrderSummary } from './CartOrderSummary'
import { useRouter } from 'next/router'

export default function Cart() {
  const router = useRouter()
  const { cartList, countItems } = useContext(CartContext)
  const cartQty = countItems()

  return (
    <Box
      maxW={{ base: '3xl', lg: '7xl' }}
      mx='auto'
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
      >
        <Stack
          spacing={{ base: '8', md: '10' }}
          flex='2'
        >
          <Heading
            fontSize='2xl'
            fontWeight='extrabold'
          >
            Shopping Cart ({cartQty} items)
          </Heading>

          <Stack spacing='6'>
            {cartList.length > 0 ? (
              cartList.map(item => (
                <CartItem
                  key={item.id}
                  {...item}
                />
              ))
            ) : (
              <h2>no hay nada en el cart</h2>
            )}
          </Stack>
        </Stack>

        <Flex
          direction='column'
          align='center'
          flex='1'
        >
          <CartOrderSummary />
          <HStack
            mt='6'
            fontWeight='semibold'
          >
            <p>or</p>
            <Link
              to='/home'
              color={mode('blue.500', 'blue.200')}
              onClick={() => router.push('/home')}
            >
              Continue shopping
            </Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  )
}
