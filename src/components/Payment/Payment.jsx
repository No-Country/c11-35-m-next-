import { FormControl, FormLabel, Input, Button, Center, Box } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import Swal from 'sweetalert2'

export default function PaymentForm ({ formData }) {
  const stripe = useStripe()
  const router = useRouter()
  const elements = useElements()
  console.log(formData.totalPrice)

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
      console.log(data)
      confirmPayment(data.paymentIntent.client_secret)
    } catch (error) {
      console.error(error)
    }
  }

  const confirmPayment = async (paymentIntentClientSecret) => {
    if (stripe) {
      try {
        const results = await stripe?.confirmCardPayment(paymentIntentClientSecret, {
          payment_method: {
            card: elements?.getElement(CardElement),
            billing_details: {
              name: `${firstNameRef.current.value} ${lastNameRef.current.value}`
            }
          }
        })
        console.log(results)
        if (results.paymentIntent.status === 'succeeded') {
          Swal.fire(
            'Good job!',
            'your purchase was successful!!',
            'success'
          ).then(() => {
            // Redireccionar al Home
            router.push('/')
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
      <Box m={7}>
        <FormControl>
          <FormLabel>first name credit card</FormLabel>
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

          <Button colorScheme='blue' mt={4} onClick={createPayment}>
            Buy
          </Button>
        </Center>
      </Box>
    </>
  )
}
