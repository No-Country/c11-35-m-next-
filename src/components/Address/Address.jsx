import React, { useContext, useEffect, useState } from 'react'
import { fetchUser } from '@/services/firebase-auth'
import { UserContext } from '@/context/UserContextProvider'
import { FiArrowLeft } from 'react-icons/fi'
import { Card, CardBody, Heading, Text, Link, Button, Flex } from '@chakra-ui/react'

export default function Orders () {
  const { currentUser } = useContext(UserContext)
  const [address, setAddress] = useState([])
  // console.log(orders)

  const callUser = async (currentUser) => {
    const user = await fetchUser(currentUser)
    const userAddress = user.address || []
    setAddress(userAddress)
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
      {address.length > 0 ? (
        address.map((order, index) => (
          <Card key={order.id} my={4}>
            <CardBody>
              <Heading as='h3' size='md' mb={2}>
                Address #{index + 1}
              </Heading>
              <Text>Province: {order.province}</Text>
              <Text>City: {order.city}</Text>
              <Text>Postal: {order.postal}</Text>
              <Text>Street: {order.street}</Text>
              <Text>Number: {order.number}</Text>
              <Text>Department: {order.department}</Text>
            </CardBody>
            <Button>Edit</Button>
          </Card>
        ))
      ) : (
        <Text>No orders found.</Text>
      )}
    </>
  )
}
