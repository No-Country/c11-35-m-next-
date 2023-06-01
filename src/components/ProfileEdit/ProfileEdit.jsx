import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/context/UserContextProvider'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Link,
  Flex
} from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'

export default function Profile () {
  const { currentUser } = useContext(UserContext)
  const toast = useToast()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dni: '',
    phone: ''
  })

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dni: '',
    phone: ''
  })

  useEffect(() => {
    if (currentUser) {
      const [firstName, lastName] = currentUser.displayName.split(' ')
      setFormData({
        firstName: firstName || '',
        lastName: lastName || '',
        email: currentUser.email || '',
        dni: currentUser.dni || '',
        phone: currentUser.phone || ''
      })
    }
  }, [currentUser])

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = {}

    if (!formData.firstName) {
      errors.firstName = 'First name is required'
    }

    if (!formData.lastName) {
      errors.lastName = 'Last name is required'
    }

    if (!formData.email) {
      errors.email = 'Email is required'
    }

    if (!formData.dni) {
      errors.dni = 'DNI is required'
    }

    if (!formData.phone) {
      errors.phone = 'Phone is required'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    toast({
      title: 'Form Submitted',
      description: 'Your profile has been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true
    })
  }

  return (
    <Box p={4}>
      <Flex align='center'>
        <Link href='/profile'>
          <Button as='a' leftIcon={<FiArrowLeft />} m={2} variant='unstyled' />
        </Link>
        <Heading as='h2' size='lg' mb={4}>
          Edit Profile
        </Heading>
      </Flex>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!formErrors.firstName}>
            <FormLabel htmlFor='firstName'>First Name</FormLabel>
            <Input
              type='text'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.firstName}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors.lastName}>
            <FormLabel htmlFor='lastName'>Last Name</FormLabel>
            <Input
              type='text'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.lastName}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors.email}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors.dni}>
            <FormLabel htmlFor='dni'>DNI</FormLabel>
            <Input
              type='text'
              id='dni'
              name='dni'
              value={formData.dni}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.dni}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formErrors.phone}>
            <FormLabel htmlFor='phone'>Phone</FormLabel>
            <Input
              type='text'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.phone}</FormErrorMessage>
          </FormControl>

          <Button colorScheme='blue' type='submit'>
            Edit
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
