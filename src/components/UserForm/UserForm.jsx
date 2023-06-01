/* eslint-disable */

import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  useTheme,
  Box,
  useToast
} from '@chakra-ui/react'
import { CartContext } from '@/context/CartContextProvider'
import { UserContext } from '@/context/UserContextProvider'
import { fetchUser } from '@/services/firebase-auth'
function UserForm ({ onSubmit }) {
  const theme = useTheme()
  const backgroundColor = theme.colors.custom.background
  const [postal, setPostal] = useState('')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [department, setDepartment] = useState('')
  const [dni, setDni] = useState('')
  const toast = useToast()
  const { cartList, cartTotalPrice } = useContext(CartContext)
  const { currentUser } = useContext(UserContext)
  const totalPrice = cartTotalPrice(cartList)
  const [address, setAddress] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    const formData = {
      postal,
      province,
      city,
      street,
      number,
      department,
      dni,
      totalPrice
    }
    if (
      (!postal ||
        !province ||
        !city ||
        !street ||
        !number ||
        !department ||
        !dni) &&
      !address
    ) {
      toast({
        title: 'Please fill out all information',
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true
      })
    } else {
      onSubmit(formData)
      console.log(formData)
    }
  }

  const callUser = async currentUser => {
    const user = await fetchUser(currentUser)
    setAddress(user && user.address)
  }
  useEffect(() => {
    console.log('rendering')
    callUser(currentUser)
  }, [])
  return (
    <>
      <Heading
        padding='20px'
        w='100%'
        textAlign='center'
        fontWeight='normal'
        mb='2%'
        fontSize='2xl'
      >
        User Information
      </Heading>
      <FormControl onSubmit={handleSubmit}>
        <FormControl padding='0 20px' mt='2%'>
          <FormLabel htmlFor='first-name' fontWeight='normal'>
            User name
          </FormLabel>
          <Input
            id='first-name'
            placeholder='First name'
            value={currentUser && currentUser.displayName}
            disabled='true'
          />
        </FormControl>
        <FormControl padding='0 20px' mt='2%' mb='20px'>
          <FormLabel htmlFor='email' fontWeight='normal'>
            Email address
          </FormLabel>
          <Input
            id='email'
            type='email'
            value={currentUser && currentUser.email}
            disabled='true'
          />
        </FormControl>
        {/*  {address ? (
          <Flex
            p='10px'
            margin='0 auto'
            maxW='90%'
            alignItems='center'
            border='solid 1px'
            borderRadius='10px'
          >
            <IconButton
              fontSize='25px'
              width='30%'
              backgroundColor='white'
              icon={<FiMapPin />}
            />
            {address.map(item => (
              <Flex
                key={item.dni}
                flexDirection='column'
                alignItems='left'
                width='100%'
              >
                <Text>Street: {item.street}</Text>
                <Text>Number: {item.number}</Text>
                <Text>Department: {item.department}</Text>
                <Text>Province: {item.province}</Text>
                <Text>City: {item.city}</Text>
              </Flex>
            ))}
            <Button backgroundColor='white' textColor='teal'>
              Edit or Add
            </Button>
          </Flex>
        ) : ( */}
        <>
          <Heading
            padding='20px'
            w='100%'
            textAlign='center'
            fontWeight='normal'
            mb='2%'
            fontSize='2xl'
          >
            Shipping Address
          </Heading>

          <FormControl padding='0 20px' mt='2%'>
            <FormLabel htmlFor='postal' fontWeight='normal'>
              Postal Code
            </FormLabel>
            <Input
              id='postal'
              type='number'
              value={postal}
              onChange={event => setPostal(event.target.value)}
            />
          </FormControl>

          <FormControl padding='0 20px' mt='2%'>
            <FormLabel htmlFor='province' fontWeight='normal'>
              Province
            </FormLabel>
            <Input
              id='province'
              value={province}
              onChange={event => setProvince(event.target.value)}
            />
          </FormControl>

          <FormControl padding='0 20px' mt='2%'>
            <FormLabel htmlFor='city' fontWeight='normal'>
              City
            </FormLabel>
            <Input
              id='city'
              value={city}
              onChange={event => setCity(event.target.value)}
            />
          </FormControl>

          <FormControl padding='0 20px' mt='2%'>
            <FormLabel htmlFor='street' fontWeight='normal'>
              Street
            </FormLabel>
            <Input
              id='street'
              value={street}
              onChange={event => setStreet(event.target.value)}
            />
          </FormControl>

          <FormControl padding='0 20px' mt='2%'>
            <FormLabel htmlFor='number' fontWeight='normal'>
              Number
            </FormLabel>
            <Input
              id='number'
              value={number}
              onChange={event => setNumber(event.target.value)}
            />
          </FormControl>

          <FormControl padding='0 20px' mt='2%'>
            <FormLabel htmlFor='department' fontWeight='normal'>
              Department
            </FormLabel>
            <Input
              id='department'
              value={department}
              onChange={event => setDepartment(event.target.value)}
            />
          </FormControl>
        </>
        {/*  )} */}

        <Heading
          padding='20px'
          w='100%'
          textAlign='center'
          fontWeight='normal'
          mb='2%'
          fontSize='2xl'
        >
          Bill Data
        </Heading>

        <FormControl padding='0 20px' mt='2%'>
          <FormLabel htmlFor='postal' fontWeight='normal'>
            DNI or CUIL
          </FormLabel>
          <Input
            id='dni'
            type='number'
            value={dni}
            onChange={event => setDni(event.target.value)}
          />
        </FormControl>
        <Box display='flex'>
          <Button
            textAlign='center'
            margin='20px auto'
            type='submit'
            onClick={handleSubmit}
            variant='solid'
            backgroundColor={backgroundColor}
            color='#FAFAFA'
            width='200px'
          >
            Continue
          </Button>
        </Box>
      </FormControl>
    </>
  )
}

export default UserForm
