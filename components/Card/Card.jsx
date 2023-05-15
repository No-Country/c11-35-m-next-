import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image
} from '@chakra-ui/react'

export default function ProductCard({ title, descripction, price, image }) {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src={image}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <Stack
          mt='6'
          spacing='3'
        >
          <Heading size='md'>{title}</Heading>
          <Text>{descripction.substring(0, 100)}...</Text>
          <Text
            color='blue.600'
            fontSize='2xl'
          >
            ${price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button
            variant='solid'
            colorScheme='blue'
          >
            Buy now
          </Button>
          <Button
            variant='ghost'
            colorScheme='blue'
          >
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
