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
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProductColors from '../ProductColors/ProductColors'
export default function ProductCard ({
  id,
  title,
  description,
  price,
  image,
  onClick,
  brand,
  colors
}) {
  const imagePath = '/images/carousel1.jpg'
  const item = { id, title, description, price, image, colors, brand }
  const theme = useTheme()
  const primaryColor = theme.colors.custom.primary
  const backgroundColor = theme.colors.custom.background
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
    <Card
      borderRadius='10'
      width={{ base: '80%', sm: '40%', lg: '20%' }}
      flexShrink='0'
      minHeight={{ base: '60vh', sm: '50vh', lg: '30vh' }}
    >
      <Flex direction='column' align='center'>
        <Image
          src={image || imagePath}
          alt='Green double couch with wooden legs'
          maxWidth='150px'
          height='150'
          onClick={onClick}
          _hover={{
            cursor: 'pointer'
          }}
        />
        <CardBody
          width='100%'
          onClick={onClick}
          _hover={{
            cursor: 'pointer'
          }}
        >
          <Stack mt='6' spacing='3'>
            <Text py='2'>{brand && brand.toUpperCase()}</Text>
            <Heading
              maxWidth='80%'
              minHeight={{ base: '110px', sm: '120px' }}
              size='md'
              flexWrap='wrap'
            >
              {title}
            </Heading>
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
              icon={<AiOutlineShoppingCart size={22} />}
              backgroundColor={backgroundColor}
              color={primaryColor}
              onClick={() => handleAdd()}
            />
          </ButtonGroup>
        </CardFooter>
      </Flex>
    </Card>
  )
}
