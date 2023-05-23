import { CartContext } from '@/context/CartContextProvider'
import React, { useContext } from 'react'

import {
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerBody
} from '@chakra-ui/react'
import { CartItem } from './CartItem'
import { useRouter } from 'next/router'
import { formatPrice } from './PriceTag'

import { CloseIcon, DeleteIcon } from '@chakra-ui/icons'

export default function Cart () {
  const router = useRouter()
  const { cartList, toggleCartStatus, toggleCart, cartTotalPrice, removeList } =
    useContext(CartContext)

  const handleClick = () => {
    toggleCart()
  }

  const totalPrice = cartTotalPrice(cartList)
  return (
    <Drawer
      isOpen={toggleCartStatus}
      placement='right'
      zIndex={10}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Flex
          width='100%'
          margin='0 auto'
          align='center'
          justify='space-between'
          p='30px'
        >
          <Text fontSize='xx-large'>Your Cart</Text>
          <CloseIcon onClick={handleClick} />
        </Flex>
        <DrawerBody>
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
                <Stack spacing='6'>
                  {cartList.length > 0 ? (
                    cartList.map(item => (
                      <CartItem
                        key={item.id}
                        {...item}
                      />
                    ))
                  ) : (
                    <>
                      <Text
                        m='50px auto'
                        fontWeight='semibold'
                        height='200px'
                      >
                        Your Cart is Empty
                      </Text>
                    </>
                  )}
                </Stack>
              </Stack>

              <Flex
                direction='column'
                align='center'
                flex='1'
              >
                <HStack
                  mt='6'
                  fontWeight='semibold'
                />
              </Flex>
            </Stack>
          </Box>
        </DrawerBody>

        <DrawerFooter borderTop='solid 1px gray'>
          <Flex
            margin='0 auto'
            align='center'
            direction='column'
            gap='5'
          >
            {cartList.length > 0 ? (
              <>
                <Text
                  fontSize='xl'
                  fontWeight='extrabold'
                >
                  Subtotal: {formatPrice({ totalPrice })}
                </Text>
                <Button
                  onClick={() => router.push('/checkout')}
                  variant='solid'
                  backgroundColor='#C42F6D'
                  color='#FAFAFA'
                  width='100%'
                >
                  Checkout
                </Button>
                <Button
                  href=''
                  onClick={removeList}
                  variant='ghost'
                >
                  Delete Cart
                  <DeleteIcon
                    m='5px'
                    fontSize='xl'
                  />
                </Button>
              </>
            ) : (
              <Button
                onClick={handleClick}
                variant='solid'
                backgroundColor='#C42F6D'
                color='#FAFAFA'
                width='100%'
              >
                Continue shopping
              </Button>
            )}
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    /*  */
  )
}
