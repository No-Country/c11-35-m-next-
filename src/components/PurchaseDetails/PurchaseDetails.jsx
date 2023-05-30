import { CartContext } from '@/context/CartContextProvider'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Stack,
  Text
} from '@chakra-ui/react'
import { useContext } from 'react'
import { CartItem } from '../Cart/CartItem'
import { CartOrderSummary } from '../Cart/CartOrderSummary'

export default function PurchaseDetails () {
  const { cartList, cartTotalPrice } =
    useContext(CartContext)
  const totalPrice = cartTotalPrice(cartList)

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as='span'
              flex='1'
              textAlign='left'
              fontWeight='extrabold'
              flexDirection='row'
            >
              Purchase details
            </Box>
            <Text fontWeight='extrabold'> ${totalPrice}</Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p={4}>
          <Stack spacing='6'>
            {cartList.length > 0 ? (
              cartList.map(item => <CartItem key={item.id} {...item} counterEnabled={false} />)
            ) : (
              <>
                <Text m='50px auto' fontWeight='semibold' height='200px'>
                  Your Cart is Empty
                </Text>
              </>
            )}
          </Stack>
          <CartOrderSummary />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
