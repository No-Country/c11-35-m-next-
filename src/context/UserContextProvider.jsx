import React, { useEffect, useState, createContext } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const auth = getAuth()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    })
  }, [currentUser, auth])

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  )
}
