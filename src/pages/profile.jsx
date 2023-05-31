import Profile from '@/components/Profile/Profile'
import { UserContext } from '@/context/UserContextProvider'
import { useContext } from 'react'
import Landing from '.'

export default function CheckoutPage () {
  const { currentUser } = useContext(UserContext)

  return (
    <>
      {currentUser ? (
        <Profile />
      ) : (
        <Landing />
      )}
    </>
  )
}
