import {
  GoogleAuthProvider,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  collection
} from 'firebase/firestore'
import { app, db } from './db'

const provider = new GoogleAuthProvider()
const auth = getAuth(app)

const storeUser = async (authCredentials, id, name) => {
  const user = {
    displayName: name,
    email: authCredentials.email,
    // orders: [],
    // address: [],
    role: 'customer'
  }
  await setDoc(doc(db, 'users', id), user, { merge: true })
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

export const addUserAddress = async (id, data) => {
  /*   const updatedAddress = []
  updatedAddress.push(data) */
  const user = {
    address: data
  }
  await setDoc(doc(db, 'users', id), user, { merge: true })
}

export const fetchUser = async currentUser => {
  const itemDB = doc(db, 'users', currentUser && currentUser.uid)
  try {
    const userInDb = await getDoc(itemDB)
    const userData = userInDb.data()
    if (userData) {
      const orders = await Promise.all(
        userData.orders
          ? userData.orders.map(orderId => getDoc(doc(db, 'orders', orderId)))
          : []
      )
      const orderData = orders.map(order => order.data())
      userData.orders = orderData
    }
    return userData
  } catch (error) {
    console.log(error)
  }
}

export const createOrder = async (currentUser, orderData) => {
  const userId = currentUser.uid
  const userName = currentUser.displayName
  const email = currentUser.email
  try {
    const orderRef = await addDoc(collection(db, 'orders'), {
      userId,
      userName,
      email,
      ...orderData
    })

    const orderId = orderRef.id

    // Actualiza el documento del usuario para agregar la orden
    await updateDoc(doc(db, 'users', userId), {
      orders: arrayUnion(orderId)
    })

    console.log('Orden creada con éxito')

    return orderId
  } catch (error) {
    console.error('Error al crear la orden:', error)
    throw error
  }
}
