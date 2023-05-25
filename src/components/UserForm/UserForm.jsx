import React, { useContext, useState } from 'react'
import {
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { CartContext } from '@/context/CartContextProvider'

function UserForm({ onSubmit }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [postal, setPostal] = useState('')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [department, setDepartment] = useState('')
  const [dni, setDni] = useState('')

  const { cartList, cartTotalPrice } = useContext(CartContext)

  const totalPrice = cartTotalPrice(cartList)

  const handleSubmit = event => {
    event.preventDefault()
    const formData = {
      firstName,
      lastName,
      email,
      postal,
      province,
      city,
      street,
      number,
      department,
      dni,
      totalPrice
    }

    onSubmit(formData)
  }

  return (
    <>
      <Heading
        padding='20px'
        w='100%'
        textAlign='center'
        fontWeight='normal'
        mb='2%'
      >
        User Registration
      </Heading>
      <FormControl onSubmit={handleSubmit}>
        <Flex padding='0 20px'>
          <FormControl mr='5%'>
            <FormLabel htmlFor='first-name' fontWeight='normal'>
              First name
            </FormLabel>
            <Input
              id='first-name'
              placeholder='First name'
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='last-name' fontWeight='normal'>
              Last name
            </FormLabel>
            <Input
              id='last-name'
              placeholder='Last name'
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />
          </FormControl>
        </Flex>
        <FormControl padding='0 20px' mt='2%'>
          <FormLabel htmlFor='email' fontWeight='normal'>
            Email address
          </FormLabel>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </FormControl>

        <Heading
          padding='20px'
          w='100%'
          textAlign='center'
          fontWeight='normal'
          mb='2%'
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

        <Heading
          padding='20px'
          w='100%'
          textAlign='center'
          fontWeight='normal'
          mb='2%'
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
        <FormControl padding='0 20px' textAlign='center'>
          <Button
            textAlign='center'
            margin='20px auto'
            type='submit'
            variant='solid'
            backgroundColor='#C42F6D'
            color='#FAFAFA'
            width='200px'
          >
            Continue
          </Button>
        </FormControl>
      </FormControl>
    </>
  )
}

export default UserForm
