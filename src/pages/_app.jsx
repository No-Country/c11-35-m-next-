import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Provider } from 'react-redux'
import store from '../store/index'
import Navbar from '@/components/Navbar/Navbar'
import '../styles/fonts.css'
import CartContextProvider from '@/context/CartContextProvider'

const theme = extendTheme({
  colors: {
    custom: {
      text: '#1A1A1A',
      primary: '#FAFAFA',
      background: '#C42F6D'
    }
  }
})

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserProvider>
        <ChakraProvider theme={theme}>        
          <Component {...pageProps} />
          <CartContextProvider>
            <Box
            position='sticky'
            top='0'
            zIndex='9999'
          >
            <Navbar />
          </Box>
            <Component {...pageProps} />
          </CartContextProvider>
        </ChakraProvider>
      </UserProvider>
    </Provider>
  )
}
