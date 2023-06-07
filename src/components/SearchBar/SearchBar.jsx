import { useState } from 'react'
import { IconButton, Input, InputGroup, InputLeftElement, useTheme, Modal, ModalOverlay, ModalContent, ModalBody, Flex } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { fetchDataHome } from '@/store/reducers/dataHome'
import { useDispatch } from 'react-redux'

export const SearchBar = () => {
  const theme = useTheme()
  const textColor = theme.colors.custom.text
  const primaryColor = theme.colors.custom.primary
  const backgroundColor = theme.colors.custom.background
  const [value, setValue] = useState('')
  const [showInput, setShowInput] = useState(false) // Nuevo estado para controlar la visibilidad del campo de entrada
  const dispatch = useDispatch()

  const onChange = e => {
    setValue(e.target.value)
  }

  const handleSearch = () => {
    dispatch(fetchDataHome({ props: value }))
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    handleSearch()
  }

  const handleClick = () => {
    setShowInput(true)
  }

  const handleClose = () => {
    setShowInput(false)
  }

  return (
    <>
      <InputGroup maxW='50%' name='search' size='sm' as='form' onSubmit={handleOnSubmit}>
        <InputLeftElement pointerEvents='none' />
        {!showInput && (
          <IconButton
            icon={<Search2Icon size='30px' color={textColor} />}
            color='inherit'
            type='button'
            borderColor='transparent'
            bg='transparent'
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            onClick={handleClick}
          />
        )}
        {showInput && (
          <Modal isOpen={showInput} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent marginTop={20}>
              <ModalBody>
                <Flex justifyContent='center' alignItems='center'>
                  <Input
                    type='text'
                    name='search'
                    placeholder='Search...'
                    value={value}
                    onChange={onChange}
                    color='black'
                    borderColor='transparent'
                    bg='transparent'
                    _hover={{ bg: 'transparent' }}
                    _active={{ bg: 'transparent' }}
                    autoFocus
                  />
                  <IconButton onClick={handleSearch} size='sm' bg={backgroundColor} icon={<Search2Icon size='40px' color={primaryColor} />} />
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </InputGroup>
    </>
  )
}
