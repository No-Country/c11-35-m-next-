import { db } from '@/services/db'
import { Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

export default function Dash () {
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    const ordersDB = collection(db, 'orders')
    const querySnapshot = await getDocs(ordersDB)
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    setOrders(data)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      <Flex align='center'>
        <Heading as='h2' size='lg' m='4px auto'>
          Orders
        </Heading>
      </Flex>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <Card key={index} my={4}>
            <CardBody>
              <Heading as='h3' size='md' mb={2} fontWeight='medium'>
                <strong> Order Id: </strong>
                {order.id}
              </Heading>
              <Text>
                Customer: {order.userName ? order.userName : order.email}
              </Text>
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
