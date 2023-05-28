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

export const signWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    storeUser(user, user.uid, user.displayName)
  } catch (error) {
    console.error(error)
  }
}

export const createUser = async credentials => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
    const user = result.user
    const displayName = credentials.displayName
    storeUser(user, user.uid, displayName)
  } catch (error) {
    return error
  }
}

export const signWithEmail = async credentials => {
  try {
    await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
  } catch (error) {
    return error
  }
}

export const logOut = () => {
  signOut(auth)
    .then(() => {})
    .catch(error => {
      console.log(error)
    })
}
