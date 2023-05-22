import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { formatPrice } from './PriceTag'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContextProvider'

const OrderSummaryItem = props => {
  const { label, value, children } = props

  return (
    <Flex
      justify='space-between'
      fontSize='sm'
    >
      <Text
        fontWeight='medium'
        color={mode('gray.600', 'gray.400')}
      >
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
    <Stack
      spacing='8'
      borderWidth='1px'
      rounded='lg'
      padding='8'
      width='full'
    >
     {/*  <Heading size='md'>Order Summary</Heading> */}

      <Stack spacing='6'>
        <OrderSummaryItem
          label='Subtotal'
          value={formatPrice({ totalPrice })}
        >
          <Text>0</Text>
        </OrderSummaryItem>
        <OrderSummaryItem label='Shipping'>
          <Link
            href='#'
            textDecor='underline'
          >
            Free
          </Link>
        </OrderSummaryItem>
        <OrderSummaryItem label='Discounts'>
          <Link
            href='#'
            textDecor='underline'
          >
            -
          </Link>
        </OrderSummaryItem>
        <Flex justify='space-between'>
          <Text
            fontSize='lg'
            fontWeight='semibold'
          >
            Total
          </Text>
          <Text
            fontSize='xl'
            fontWeight='extrabold'
          >
            {formatPrice({ totalPrice })}
          </Text>
        </Flex>
      </Stack>
      {/* <Button
        colorScheme='blue'
        size='lg'
        fontSize='md'
        rightIcon={<FaArrowRight />}
      >
        Checkout
      </Button> */}
    </Stack>
  )
}
