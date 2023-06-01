import React, { useContext, useEffect, useState } from 'react'
import { fetchUser } from '@/services/firebase-auth'
import { UserContext } from '@/context/UserContextProvider'
import { FiArrowLeft } from 'react-icons/fi'
import { Card, CardBody, Heading, Text, Link, Button, Flex } from '@chakra-ui/react'

export default function Orders () {
  const { currentUser } = useContext(UserContext)
  const [orders, setOrders] = useState([])
  console.log(orders)

  const callUser = async (currentUser) => {
    const user = await fetchUser(currentUser)
    const userOrders = user.orders || []
    setOrders(userOrders)
  }

  useEffect(() => {
    if (currentUser) {
      callUser(currentUser)
    }
  }, [currentUser])

  return (
    <>
      <Flex align='center'>
        <Link href='/profile'>
          <Button as='a' leftIcon={<FiArrowLeft />} m={2} variant='unstyled' />
        </Link>
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
