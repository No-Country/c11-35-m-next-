import {
  Text,
  Flex,
  Image,
  Stack,
  useColorModeValue as mode
} from '@chakra-ui/react'

import { useContext } from 'react'
import { CartContext } from '@/context/CartContextProvider'
import ProductCounter from '../ProductCounter/ProductCounter'
import useCount from '@/hooks/useCount'
import { DeleteIcon } from '@chakra-ui/icons'

export const CartItem = props => {
  const { deleteItem } = useContext(CartContext)
  const { id, name, price, qty, image, counterEnabled } = props
  const { counter, increaseCounter, decreaseCounter } = useCount(qty, id)
  const onClickDelete = id => {
    deleteItem(id)
  }

  return (
    <>
      <Flex
        direction={{ base: 'row' }}
        justify='space-between'
        align='center'
        borderBottom='solid 1px #EAEAEA'
        paddingBottom='10px'
      >
        <Image
          rounded='lg'
          width='100px'
          height='100px'
          fit='cover'
          src={props.imageLink || image}
          alt={name}
          draggable='false'
          loading='lazy'
        />
        {counterEnabled ? (
          <>
            <Stack spacing='0.5'>
              <Text fontWeight='medium'>{props.title || name}</Text>
              <Text color={mode('gray.600', 'gray.400')} fontSize='sm'>
                {counter}x ${price}
              </Text>

              <ProductCounter
                decreaseCounter={decreaseCounter}
                increaseCounter={increaseCounter}
                counter={counter}
              />
            </Stack>
            <DeleteIcon fontSize='xl' onClick={() => onClickDelete(id)} />
          </>
        ) : (
          <>
            <Stack spacing='0.5'>
              <Text fontWeight='medium'>{props.title || name}</Text>
              <Text color={mode('gray.600', 'gray.400')} fontSize='sm'>
                {counter}x ${price}
              </Text>
            </Stack>
            <Stack spacing='0.5'>
              <Text fontWeight='bold'>${counter * price}</Text>
            </Stack>
          </>
        )}
      </Flex>
    </>
  )
}
