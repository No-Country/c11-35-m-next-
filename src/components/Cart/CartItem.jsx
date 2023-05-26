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
  const { id, name, price, qty, image } = props

  const { counter, increaseCounter, decreaseCounter } = useCount(qty, id)

  const onClickDelete = id => {
    deleteItem(id)
  }

  return (
    <>
      <Flex
        direction={{ base: 'row', md: 'row' }}
        justify='space-between'
        align='center'
        borderBottom='solid 1px gray'
        paddingBottom='10px'
      >
        {/* <CartProductMeta
          name={name}
          image={props.image_link}
        /> */}
        <Image
          rounded='lg'
          width='100px'
          height='100px'
          fit='cover'
          src={props.image_link || image}
          alt={name}
          draggable='false'
          loading='lazy'
        />
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

        {/*  <Flex
          width='full'
          justify='space-between'
          display={{ base: 'none', md: 'flex' }}
        >
          <PriceTag price={(price * counter).toFixed(1)} />
          <CloseButton
            aria-label={`Delete ${name} from cart`}
            onClick={() => onClickDelete(id)}
          />
        </Flex>

        <Flex
          mt='4'
          alignItems='center'
          width='full'
          justify='space-between'
          display={{ base: 'flex', md: 'none' }}
        >
        </Flex> */}
      </Flex>
    </>
  )
}
