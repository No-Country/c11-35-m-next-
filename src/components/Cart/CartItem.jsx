import { CloseButton, Flex, Link } from '@chakra-ui/react'
import { PriceTag } from './PriceTag'
import { CartProductMeta } from './CartProductMeta'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContextProvider'
import ProductCounter from '../ProductCounter/ProductCounter'
import useCount from '@/hooks/useCount'

export const CartItem = props => {
  const { deleteItem } = useContext(CartContext)
  const {
    id,
    isGiftWrapping,
    name,
    currency,
    price,
    qty
  } = props

  const { counter, increaseCounter, decreaseCounter } = useCount(qty, id)

  const onClickDelete = id => {
    deleteItem(id)
  }

  return (
    <>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        align='center'
      >
        <CartProductMeta
          name={name}
          image={props.image_link}
          isGiftWrapping={isGiftWrapping}
        />

        <Flex
          width='full'
          justify='space-between'
          display={{ base: 'none', md: 'flex' }}
        >
          <ProductCounter
            decreaseCounter={decreaseCounter}
            increaseCounter={increaseCounter}
            counter={counter}
          />
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
          <Link
            fontSize='sm'
            textDecor='underline'
          >
            Delete
          </Link>
          <ProductCounter
            decreaseCounter={decreaseCounter}
            increaseCounter={increaseCounter}
            counter={counter}
          />
          <PriceTag
            price={(price * counter).toFixed(1)}
            currency={currency}
          />
        </Flex>
      </Flex>
    </>
  )
}
