import { UserContext } from '@/context/UserContextProvider'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
  Flex
} from '@chakra-ui/react'
import { useContext } from 'react'

export default function Profile () {
  const { currentUser } = useContext(UserContext)
  console.log(currentUser)
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      bg='gray.100'
    >
      {currentUser && ( // Verificación de seguridad para 'user'
        <Card
          maxWidth='500px'
          width='100%'
          bg='white'
          boxShadow='lg'
        >
          <CardBody>
            <Stack
              spacing={4}
              align='center'
            >
              <Image
                src={currentUser.photoURL}
                alt={currentUser.displayName}
                borderRadius='full'
                boxSize='150px'
              />
              <Heading
                as='h2'
                size='lg'
              >
                {currentUser.displayName}
              </Heading>
              <Text>{currentUser.email}</Text>
              <Divider />
              <Text>Additional profile information goes here...</Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button colorScheme='red'>Edit Profile</Button>
          </CardFooter>
        </Card>
      )}
    </Flex>
  )
}
