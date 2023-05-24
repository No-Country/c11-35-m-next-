// import { CartContext } from '@/context/CartContextProvider'
import {
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Image,
  IconButton,
  Flex
} from '@chakra-ui/react'
// import { useContext } from 'react'
import { BsCart2 } from 'react-icons/bs'

export default function ProductCard ({
  title,
  description,
  price,
  image,
  onClick
}) {
  const imagePath = '/images/carousel1.jpg'
  // const item = { title, description, price, image }
  // const { addToCart } = useContext(CartContext)
  const handleAdd = () => {
    // addToCart(item, 1) TODO: hay que identificar el producto al que se le hizo click para agregarlo a la bolsa
  }
  return (
    <Card>
      <Flex
        direction='column'
        align='center'
      >
        <Image
          src={image || imagePath}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <CardBody
          onClick={onClick}
          _hover={{
            cursor: 'pointer'
          }}
        >
          <Stack
            mt='6'
            spacing='3'
          >
            <Heading size='md'>{title}</Heading>
            <Text
              color='#1A1A1A'
              fontSize='2xl'
            >
              ${price}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup
            spacing='2'
            ml='auto'
          >
            <IconButton
              icon={<BsCart2 />}
              bg='#C43F6D'
              textColor='#FAFAFA'
              onClick={() => handleAdd()}
            />
          </ButtonGroup>
        </CardFooter>
      </Flex>
    </Card>
  )
}
