import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Provider } from 'react-redux'
import store from '../store/index'
import '@/styles/globals.css'
import '../components/Navbar/Navbar.css'
import Navbar from '@/components/Navbar/Navbar'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserProvider>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </Provider>
  )
}
