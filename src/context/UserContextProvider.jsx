import React, { useEffect, useState, createContext } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
// import { db } from '@/services/db'

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  /* const privilegios = usuerio => {
    const itemDB = doc(db, 'users', usuerio.uid)
    getDoc(itemDB).then(user => {
      console.log('el usuario es', user)
    })
  } */
  const auth = getAuth()
  const [currentUser, setCurrentUser] = useState(null)
  //  const [privilege, setPrivilege] = useState('customer')
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user)
        // privilegios(user)
      } else {
        setCurrentUser(null)
      }
    })

    /*  const itemDB = doc(db, 'users', currentUser.uid)
    getDoc(itemDB).then(user => {
      console.log("el usuario es", user)
    }) */
  }, [currentUser, auth])

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  )
}
