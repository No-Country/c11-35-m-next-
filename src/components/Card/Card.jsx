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

export default function ProductCard({ title, descripction, price, image, onClick }) {
  return (
    <Card
      maxW='sm'
      onClick={onClick}
    >
      <CardBody
        _hover={{
          cursor: 'pointer'
        }}
      >
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
          <Text>{descripction}...</Text>
          <Text
            color='teal.600'
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
            colorScheme='teal'
          >
            Buy now
          </Button>
          <Button
            variant='ghost'
            colorScheme='teal'
          >
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
