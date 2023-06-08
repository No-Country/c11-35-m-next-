import React, { useContext, useEffect, useState } from 'react'
import { fetchUser } from '@/services/firebase-auth'
import { UserContext } from '@/context/UserContextProvider'
import { FiArrowLeft } from 'react-icons/fi'
import {
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  Flex
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Orders () {
  const router = useRouter()
  const { currentUser } = useContext(UserContext)
  const [orders, setOrders] = useState([])

  const callUser = async currentUser => {
    const user = await fetchUser(currentUser)
    const userOrders = user.orders || []
    setOrders(userOrders)
  }

  useEffect(() => {
    if (currentUser) {
      callUser(currentUser)
    }
  }, [currentUser])

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <Flex align='center'>
        <Button
          leftIcon={<FiArrowLeft />}
          m={2}
          variant='unstyled'
          onClick={handleBack}
        />

        <Heading as='h2' size='lg' mb={4}>
          Orders
        </Heading>
      </Flex>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <Card key={order.id} my={4}>
            <CardBody>
              <Heading as='h3' size='md' mb={2}>
                Order #{index + 1}
              </Heading>
              <Text>City: {order.city}</Text>
              <Text>State: pending delivery</Text>
              <Text>Total: {order.totalPrice}$</Text>
            </CardBody>
          </Card>
        ))
      ) : (
        <Text>No orders found.</Text>
      )}
    </>
  )
}
