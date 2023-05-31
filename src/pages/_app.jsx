/* eslint-disable */

import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from '../store/index'
import Navbar from '@/components/Navbar/Navbar'
import '../styles/fonts.css'
import CartContextProvider from '@/context/CartContextProvider'
import Footer from '@/components/Footer/Footer'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { UserContextProvider } from '@/context/UserContextProvider'

const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC}`)

const theme = extendTheme({
  colors: {
    custom: {
      text: '#1A1A1A',
      primary: '#FAFAFA',
      background: '#214A5F'
    }
  }
})

export default function App ({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <Elements stripe={stripe}>
          <ChakraProvider theme={theme}>
            <CartContextProvider>
              <Box
                position='sticky'
                top='0'
                zIndex='10'
              >
                <Navbar />
              </Box>
              <Component {...pageProps} />
              <Footer />
            </CartContextProvider>
          </ChakraProvider>
        </Elements>
      </UserContextProvider>
    </Provider>
  )
}
