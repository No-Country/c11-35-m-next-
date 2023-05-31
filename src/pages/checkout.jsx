import Checkout from '@/components/Checkout/Checkout'
import { UserContext } from '@/context/UserContextProvider'
import { useContext } from 'react'
import Landing from '.'

export default function CheckoutPage () {
  const { currentUser } = useContext(UserContext)

  return (
    <>
      {currentUser ? (
        <Checkout />
      ) : (
        <Landing />
      )}
    </>
  )
}
