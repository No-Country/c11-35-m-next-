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
  useToast,
  Flex,
  IconButton,
  Text,
  useBreakpointValue
} from '@chakra-ui/react'
import { FiMapPin } from 'react-icons/fi'
import { CartContext } from '@/context/CartContextProvider'
import { UserContext } from '@/context/UserContextProvider'
import { fetchUser } from '@/services/firebase-auth'
function UserForm({ onSubmit }) {
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
  const [edit, setEdit] = useState(false)
  const isMobile = useBreakpointValue({ base: true, lg: false, sm: false })

  const callUser = async currentUser => {
    const user = await fetchUser(currentUser)
    setAddress(user && user.address)
  }
  useEffect(() => {
    callUser(currentUser)
  }, [])

  let formData
  const handleSubmit = event => {
    event.preventDefault()

    if (address && Object.keys(address).length > 0) {
      formData = address
      formData.totalPrice = totalPrice
    } else {
      formData = {
        postal,
        province,
        city,
        street,
        number,
        department,
        dni,
        totalPrice
      }
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
    }
  }

  return (
    <Box
      backgroundColor={{ base: 'none', md: '#EEEEEE' }}
      borderRadius={10}
      marginTop='10px'
      marginBottom='20px'
    >
      <Heading
        padding='20px'
        w='100%'
        textAlign='left'
        mb='2%'
        fontSize='32'
        fontWeight='600'
      >
        User Information
      </Heading>
      <FormControl onSubmit={handleSubmit}>
        <FormControl
          padding='0 20px'
          mt='2%'
          width={{ base: '100%', md: '50%' }}
        >
          <FormLabel htmlFor='first-name' fontWeight='normal'>
            User name
          </FormLabel>
          <Input
            id='first-name'
            placeholder='First name'
            value={currentUser && currentUser.displayName}
            backgroundColor='#EDF2F7'
            disabled
          />
        </FormControl>
        <FormControl
          padding='0 20px'
          mt='2%'
          mb='20px'
          width={{ base: '100%', md: '50%' }}
        >
          <FormLabel htmlFor='email' fontWeight='normal'>
            Email address
          </FormLabel>
          <Input
            id='email'
            type='email'
            value={currentUser && currentUser.email}
            backgroundColor='#EDF2F7'
            disabled
          />
        </FormControl>
        {address && !edit ? (
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
              backgroundColor={{ base: 'white', sm: '#EEEEEE' }}
              icon={<FiMapPin />}
            />

            <Flex
              key={address.dni}
              flexDirection='column'
              alignItems='left'
              width='80%'
            >
              <Text>
                <strong>Street:</strong> {address.street}
              </Text>
              <Text>
                <strong>Number:</strong> {address.number}
              </Text>
              <Text>
                <strong>Department:</strong> {address.department}
              </Text>
              <Text>
                <strong>Province:</strong> {address.province}
              </Text>
              <Text>
                <strong>City:</strong> {address.city}
              </Text>
            </Flex>

            <Button
              backgroundColor={{ base: 'white', sm: '#EEEEEE' }}
              textColor='teal'
              width='30%'
            >
              Edit
            </Button>
          </Flex>
        ) : isMobile ? (
          <>
            <Heading
              padding='20px'
              w='100%'
              textAlign='left'
              mb='2%'
              fontSize='32'
              fontWeight='600'
            >
              Shipping Address
            </Heading>

            <FormControl padding='0 20px' mt='2%'>
              <FormLabel htmlFor='postal' fontWeight='normal'>
                Postal Code
              </FormLabel>
              <Input
                backgroundColor='white'
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
                backgroundColor='white'
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
                backgroundColor='white'
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
                backgroundColor='white'
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
                backgroundColor='white'
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
                backgroundColor='white'
                id='department'
                value={department}
                onChange={event => setDepartment(event.target.value)}
              />
            </FormControl>
          </>
        ) : (
          <>
            <Heading
              padding='20px'
              w='100%'
              textAlign='left'
              mb='2%'
              fontSize='32'
              fontWeight='600'
            >
              Shipping Address
            </Heading>

            <FormControl padding='0 20px' mt='2%' width='50%'>
              <FormLabel htmlFor='postal' fontWeight='normal'>
                Postal Code
              </FormLabel>
              <Input
                backgroundColor='white'
                id='postal'
                type='number'
                value={postal}
                onChange={event => setPostal(event.target.value)}
              />
            </FormControl>

            <FormControl
              padding='0 20px'
              mt='2%'
              width='100%'
              display='flex'
              justifyContent='space-between'
            >
              <Box width='47%'>
                <FormLabel htmlFor='province' fontWeight='normal'>
                  Province
                </FormLabel>
                <Input
                  backgroundColor='white'
                  id='province'
                  value={province}
                  onChange={event => setProvince(event.target.value)}
                />
              </Box>
              <Box width='47%'>
                <FormLabel htmlFor='city' fontWeight='normal'>
                  City
                </FormLabel>
                <Input
                  backgroundColor='white'
                  id='city'
                  value={city}
                  onChange={event => setCity(event.target.value)}
                />
              </Box>
            </FormControl>

            <FormControl
              padding='0 20px'
              mt='2%'
              width='100%'
              display='flex'
              justifyContent='space-between'
            >
              <Box width='47%'>
                <FormLabel htmlFor='street' fontWeight='normal'>
                  Street
                </FormLabel>
                <Input
                  backgroundColor='white'
                  id='street'
                  value={street}
                  onChange={event => setStreet(event.target.value)}
                />
              </Box>
              <Box width='47%'>
                <FormLabel htmlFor='number' fontWeight='normal'>
                  Number
                </FormLabel>
                <Input
                  backgroundColor='white'
                  id='number'
                  value={number}
                  onChange={event => setNumber(event.target.value)}
                />
              </Box>
            </FormControl>
            <FormControl padding='0 20px' mt='2%' width='50%'>
              <FormLabel htmlFor='department' fontWeight='normal'>
                Department
              </FormLabel>
              <Input
                backgroundColor='white'
                id='department'
                value={department}
                onChange={event => setDepartment(event.target.value)}
              />
            </FormControl>
          </>
        )}

        <Heading
          padding='20px'
          w='100%'
          textAlign='left'
          mb='2%'
          fontSize='32'
          fontWeight='600'
        >
          Bill Data
        </Heading>

        <FormControl
          padding='0 20px'
          mt='2%'
          width={{ base: '100%', md: '50%' }}
        >
          <FormLabel htmlFor='postal' fontWeight='normal'>
            DNI or CUIL
          </FormLabel>
          <Input
            backgroundColor='white'
            id='dni'
            type='number'
            value={dni}
            onChange={event => setDni(event.target.value)}
          />
        </FormControl>
        <Box display='flex' width='100%'>
          <Button
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
    </Box>
  )
}

export default UserForm
