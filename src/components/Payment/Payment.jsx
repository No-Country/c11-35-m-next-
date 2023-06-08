import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Box,
  useTheme,
  Heading
} from '@chakra-ui/react'
import React, { useRef, useContext } from 'react'
import { useRouter } from 'next/router'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import Swal from 'sweetalert2'
import { createOrder } from '@/services/firebase-auth'
import { UserContext } from '@/context/UserContextProvider'
import { CartContext } from '@/context/CartContextProvider'

export default function PaymentForm ({ formData, confirmation }) {
  const theme = useTheme()
  const primaryColor = theme.colors.custom.primary
  const backgroundColor = theme.colors.custom.background
  const { currentUser } = useContext(UserContext)
  const { removeList, toggleCart } = useContext(CartContext)
  const stripe = useStripe()
  const router = useRouter()
  const elements = useElements()

  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)

  const createPayment = async () => {
    const requestBody = {
      amount: formData.totalPrice * 100, // poner el payment correcto
      description: 'pay of "producto seleccionado"' // colocar nombre del producto
    }
    try {
      const res = await fetch('/api/intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      const data = await res.json()
      confirmPayment(data.paymentIntent.client_secret)
    } catch (error) {
      console.error(error)
    }
  }

  const confirmPayment = async paymentIntentClientSecret => {
    if (stripe) {
      try {
        const results = await stripe?.confirmCardPayment(
          paymentIntentClientSecret,
          {
            payment_method: {
              card: elements?.getElement(CardElement),
              billing_details: {
                name: `${firstNameRef.current.value} ${lastNameRef.current.value}`
              }
            }
          }
        )
        if (results.paymentIntent.status === 'succeeded') {
          confirmation()
          Swal.fire(
            'Good job!',
            'your purchase was successful!!',
            'success'
          ).then(() => {
            // Redireccionar al Home
            router.push('/')
            createOrder(currentUser, formData)
            removeList()
            toggleCart()
          })
        } else {
          Swal.fire(
            'Error',
            'There was an error processing your payment.',
            'error'
          )
        }
      } catch (error) {
        console.error(error)
        Swal.fire(
          'Error',
          'There was an error processing your payment.',
          'error'
        )
      }
    }
  }

  return (
    <>
      <Box
        margin={{ base: '50px auto', md: '50px auto' }}
        width={{ base: '85%', md: '60%' }}
      >
        <Heading
          padding='20px'
          w='100%'
          textAlign='left'
          mb='2%'
          fontSize='32'
          fontWeight='600'
        >
          Payment Information
        </Heading>
        <FormControl>
          <FormLabel>First name credit card</FormLabel>
          <Input ref={firstNameRef} placeholder='First name' />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Last name credit card</FormLabel>
          <Input ref={lastNameRef} placeholder='Last name' />
        </FormControl>
        <div style={{ marginTop: '30px' }}>
          <CardElement options={{ style: { base: { fontSize: '15px' } } }} />
        </div>
        <Center>
          <Button
            colorScheme='blue'
            mt={4}
            onClick={createPayment}
            backgroundColor={backgroundColor}
            color={primaryColor}
          >
            Buy
          </Button>
        </Center>
      </Box>
    </>
  )
}
