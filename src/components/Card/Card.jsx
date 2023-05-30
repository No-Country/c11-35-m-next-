// import { CartContext } from '@/context/CartContextProvider'
import { CartContext } from '@/context/CartContextProvider'
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
  Flex,
  useTheme,
  useToast
} from '@chakra-ui/react'
import { useContext } from 'react'
import { BiShoppingBag } from 'react-icons/bi'
import ProductColors from '../ProductColors/ProductColors'
export default function ProductCard ({
  id,
  title,
  description,
  price,
  image,
  onClick,
  colors,
  brand
}) {
  const imagePath = '/images/carousel1.jpg'
  const item = { id, title, description, price, image, colors, brand }
  const theme = useTheme()
  const toast = useToast()
  const { addToCart } = useContext(CartContext)
  const handleAdd = () => {
    addToCart(item, 1)
    toast({
      title: 'Product added to cart',
      status: 'success',
      position: 'top',
      duration: 3000,
      isClosable: true
    })
  }
  return (
    <Card borderRadius='10' size='sm'>
      <Flex direction='column' align='center'>
        <Image
          src={image || imagePath}
          alt='Green double couch with wooden legs'
          maxWidth='150px'
          onClick={onClick}
          _hover={{
            cursor: 'pointer'
          }}
        />
        <CardBody
          minWidth='90%'
          onClick={onClick}
          _hover={{
            cursor: 'pointer'
          }}
        >
          <Stack mt='6' spacing='3'>
            <Text py='2'>{brand && brand.toUpperCase()}</Text>
            <Heading size='md'>{title}</Heading>
            {colors && colors.length > 0 ? (
              <>
                <ProductColors colors={colors} />
              </>
            ) : null}
          </Stack>
        </CardBody>
        <CardFooter gap='20'>
          <Text color='#1A1A1A' fontSize='2xl' fontWeight='extrabold'>
            ${price}
          </Text>
          <ButtonGroup spacing='2' ml='auto'>
            <IconButton
              icon={<BiShoppingBag />}
              backgroundColor={theme.colors.custom.background}
              textColor='#FAFAFA'
              onClick={() => handleAdd()}
            />
          </ButtonGroup>
        </CardFooter>
      </Flex>
    </Card>
  )
}
