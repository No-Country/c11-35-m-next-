import { Flex, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { formatPrice } from './PriceTag'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContextProvider'

const OrderSummaryItem = props => {
  const { label, value, children } = props

  return (
    <Flex justify='space-between' fontSize='sm'>
      <Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight='medium'>{value}</Text> : children}
    </Flex>
  )
}

export const CartOrderSummary = () => {
  const { cartTotalPrice, cartList } = useContext(CartContext)
  const totalPrice = cartTotalPrice(cartList) ? cartTotalPrice(cartList) : 0

  return (
    <Stack spacing='8' rounded='lg' padding='2' width='full'>
      <Stack spacing='6'>
        <OrderSummaryItem label='Subtotal' value={formatPrice({ totalPrice })}>
          <Text>0</Text>
        </OrderSummaryItem>
        <OrderSummaryItem label='Shipping'>
          <a href='#' style={{ textDecoration: 'underline' }}>
            Free
          </a>
        </OrderSummaryItem>
        <OrderSummaryItem label='Discounts'>
          <a href='#' style={{ textDecoration: 'underline' }}>
            -
          </a>
        </OrderSummaryItem>
        <Flex justify='space-between'>
          <Text fontSize='lg' fontWeight='semibold'>
            Total
          </Text>
          <Text fontSize='xl' fontWeight='extrabold'>
            {formatPrice({ totalPrice })}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  )
}
