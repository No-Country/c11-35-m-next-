import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import '../components/Navbar/Navbar.css'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  )
}
