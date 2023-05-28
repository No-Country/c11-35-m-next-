import React, { useEffect, useState, createContext } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { db } from '@/services/db'
import { doc, getDoc } from 'firebase/firestore'

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const auth = getAuth()
  const [currentUser, setCurrentUser] = useState(null)
  const [privilege, setPrivilege] = useState('customer')

  const privileges = async user => {
    const itemDB = doc(db, 'users', user.uid)
    try {
      const user = await getDoc(itemDB)
      setPrivilege(user.data().role)
    } catch (error) {
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user)
        privileges(user)
      } else {
        // user is signed out
        setCurrentUser(null)
        setPrivilege('customer')
      }
    })
  }, [auth, currentUser])

  return (
    <UserContext.Provider value={{ currentUser, privilege }}>
      {children}
    </UserContext.Provider>
  )
}
