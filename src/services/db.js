// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDU815mDXx1kk5vrlm92Vvcp_T1sDHgaWs',
  authDomain: 'c11-35-m-next.firebaseapp.com',
  projectId: 'c11-35-m-next',
  storageBucket: 'c11-35-m-next.appspot.com',
  messagingSenderId: '288116549761',
  appId: '1:288116549761:web:5ef47444eaa78e9f344580',
  measurementId: 'G-PEVJE5G4WL'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
