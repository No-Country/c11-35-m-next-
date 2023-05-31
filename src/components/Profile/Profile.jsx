import { UserContext } from '@/context/UserContextProvider'
import { fetchUser } from '@/services/firebase-auth'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
  Flex,
  useTheme
} from '@chakra-ui/react'

import { useContext, useEffect, useState } from 'react'

export default function Profile () {
  const theme = useTheme()
  const primaryColor = theme.colors.custom.primary
  const backgroundColor = theme.colors.custom.background

  const { currentUser } = useContext(UserContext)
  const [address, setAddress] = useState('')
  const [orders, setOrders] = useState('')

  const callUser = async currentUser => {
    const user = await fetchUser(currentUser)
    setAddress(user.address)
    setOrders(user.orders)
  }
  useEffect(() => {
    callUser(currentUser)
  }, [currentUser])

  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      bg='gray.100'
    >
      {currentUser && ( // Verificación de seguridad para 'user'
        <Card maxWidth='500px' width='100%' bg='white' boxShadow='lg'>
          <CardBody>
            <Stack spacing={4} align='center'>
              <Image
                src={currentUser.photoURL}
                alt={currentUser.displayName}
                borderRadius='full'
                boxSize='150px'
              />
              <Heading as='h2' size='lg'>
                {currentUser.displayName}
              </Heading>
              <Text>{currentUser.email}</Text>
              <Divider />
              <Text fontWeight='bold'>My saved Address</Text>
              {address &&
                address.map(item => (
                  <Flex
                    key={item.dni}
                    flexDirection='column'
                    alignItems='left'
                    width='100%'
                  >
                    <Text>Province: {item.province}</Text>
                    <Text>City: {item.city}</Text>
                    <Text>Street: {item.street}</Text>
                    <Text>Number: {item.number}</Text>
                    <Text>Department: {item.department}</Text>
                  </Flex>
                ))}
              <Divider />
              <Text fontWeight='bold'>My Orders</Text>
              {orders.lenght > 0 ? (
                <Text>Aqui va la info de las ordenes</Text> // TODO: falta traer informacion de las ordenes en firebase
              ) : (
                <Text>No orders Yet</Text>
              )}
            </Stack>
          </CardBody>
          <CardFooter>
            <Button
              margin='0 auto'
              backgroundColor={backgroundColor}
              color={primaryColor}
            >
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
      )}
    </Flex>
  )
}
