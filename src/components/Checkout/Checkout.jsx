import React from 'react'
import Steps from '../Stepper/Steps'
import PurchaseDetails from '../PurchaseDetails/PurchaseDetails'
import UserForm from '../UserForm/UserForm'

export default function Checkout () {
  return (
    <>
      <Steps />
      <PurchaseDetails />
      <UserForm />
    </>
  )
}
