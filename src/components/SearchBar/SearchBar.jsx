import { useState } from 'react'
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

export const SearchBar = ({ data, search }) => {
  const [value, setValue] = useState('')

  const onChange = e => {
    setValue(e.target.value)
  }

  const handleSearch = () => {
    const searchedData = data.filter(product => {
      const nameLowerCase = product.name.toLowerCase()
      return nameLowerCase.includes(value.toLowerCase())
    })
    search(searchedData) // Llamar a la función de búsqueda pasando los datos filtrados
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    handleSearch() // Llamar a la función de búsqueda
  }

  return (
    <>
      <InputGroup
        borderRadius={5}
        size='sm'
        as='form'
        onSubmit={handleOnSubmit}
      >
        <InputLeftElement pointerEvents='none'>
          <Search2Icon color='gray.600' />
        </InputLeftElement>
        <Input
          type='text'
          placeholder='Search...'
          border='1px solid #949494'
          value={value}
          onChange={onChange}
        />
        <InputRightAddon
          p={0}
          border='none'
        >
          <Button
            type='submit'
            size='sm'
            borderLeftRadius={0}
            borderRightRadius={3.3}
            border='1px solid #949494'
          >
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  )
}
