import { useState } from 'react'
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useTheme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  useBreakpointValue,
  Grid
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

export const SearchBar = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false, sm: true })
  const theme = useTheme()
  const router = useRouter()
  const textColor = theme.colors.custom.text
  const primaryColor = theme.colors.custom.primary
  const [value, setValue] = useState('')
  const [showInput, setShowInput] = useState(false)

  const onChange = e => {
    setValue(e.target.value)
  }

  const handleSearch = () => {
    router.push(`/?type=${value}`)
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
      {isMobile ? (
        <>
          <InputGroup
            maxW='50%'
            name='search'
            size='sm'
            as='form'
            onSubmit={handleOnSubmit}
          >
            <InputLeftElement pointerEvents='none' />
            {!showInput && (
              <IconButton
                icon={<Search2Icon size='30px' color={textColor} />}
                color='inherit'
                type='button'
                borderColor='#EAEAEA'
                bg='#EAEAEA'
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
                        backgroundColor='transparent'
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                        autoFocus
                      />
                      <IconButton
                        onClick={handleSearch}
                        size='sm'
                        color='transparent'
                        icon={<Search2Icon size='40px' color={primaryColor} />}
                      />
                    </Flex>
                  </ModalBody>
                </ModalContent>
              </Modal>
            )}
          </InputGroup>
        </>
      ) : (
        <Flex justifyContent='center' alignItems='center'>
          <Grid templateColumns='1fr auto' width='50vw'>
            <Input
              type='text'
              name='search'
              value={value}
              onChange={onChange}
              color='black'
              border='1px solid #8C8C8C'
              borderRadius='20px'
              bg='transparent'
              _hover={{ bg: 'transparent' }}
              _active={{ bg: 'transparent' }}
              autoFocus
            />
            <IconButton
              onClick={handleSearch}
              size='sm'
              backgroundColor='transparent'
              icon={<Search2Icon size='40px' color='#8C8C8C' />}
              _hover={{ bg: 'transparent' }}
              ml='-40px'
              mt='5px'
            />
          </Grid>
        </Flex>
      )}
    </>
  )
}
