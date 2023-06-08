import React, { useContext, useEffect, useState } from 'react'
import { fetchUser } from '@/services/firebase-auth'
import { UserContext } from '@/context/UserContextProvider'
import { FiArrowLeft } from 'react-icons/fi'
import { Card, CardBody, Heading, Text, Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Orders () {
  const router = useRouter()
  const { currentUser } = useContext(UserContext)
  const [address, setAddress] = useState([])
  // console.log(orders)

  const callUser = async currentUser => {
    const user = await fetchUser(currentUser)
    // console.log(user.address)
    const userAddress = user.address || []
    setAddress(userAddress)
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
          Address
        </Heading>
      </Flex>
      {address ? (
        <Card key={address.id} my={4}>
          <CardBody>
            <Heading as='h3' size='md' mb={2}>
              Street: {address.street}, Number: {address.number}
            </Heading>
            <Text>Province: {address.province}</Text>
            <Text>City: {address.city}</Text>
            <Text>Postal: {address.postal}</Text>
            <Text>Department: {address.department}</Text>
          </CardBody>
          <Button>Edit</Button>
        </Card>
      ) : (
        <Text>No address found.</Text>
      )}
    </>
  )
}
