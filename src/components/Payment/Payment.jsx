import { FormControl, FormLabel, Input, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import React from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

export default function ModalPayment() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const stripe = useStripe()
  const elements = useElements()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const createPayment = async () => {
    const requestBody = {
      amount: 10 * 100, // poner el payment correcto
      description: 'pay of "prducto seleccionado"' // colocar nomber del product
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
      const { token } = await stripe?.createToken(elements?.getElement(CardElement))
      const results = await stripe?.confirmCardPayment(paymentIntentClientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement),
          billing_details: {
            name: 'matias ferrari',
            email: 'matias.ferrari@gmail.com'
          }
        }
      })
      console.log(results)
      console.log(token)
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Pay</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
            <div style={{ marginTop: '30px' }}>
              <CardElement options={{ style: { base: { fontSize: '25px' } } }} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={createPayment}>
              Buy
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
