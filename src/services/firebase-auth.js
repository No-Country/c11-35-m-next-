import {
  GoogleAuthProvider,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { app, db } from './db'

const provider = new GoogleAuthProvider()
const auth = getAuth(app)

const storeUser = async (authCredentials, id, name) => {
  const user = {
    displayName: name,
    email: authCredentials.email,
    orders: [],
    role: 'customer'
  }
  await setDoc(doc(db, 'users', id), user)
}

export const signWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user
      storeUser(user, user.uid)
    })
    .catch(error => {
      console.error(error)
    })
}

export const createUser = credentials => {
  createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then(result => {
      const user = result.user
      const displayName = credentials.displayName
      storeUser(user, user.uid, displayName)
      // ...
    })
    .catch(error => {
      const errorCode = error.code
      console.log(errorCode)
      const errorMessage = error.message
      console.log(errorMessage)
      // ..
    })
}

export const signWithEmail = credentials => {
  signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then(userCredential => {
      // Signed in

      // ...
    })
    .catch(error => {
      const errorCode = error.code
      console.log(errorCode)
      const errorMessage = error.message
      console.log(errorMessage)
    })
}

export const logOut = () => {
  signOut(auth)
    .then(() => {})
    .catch(error => {
      console.log(error)
    })
}
