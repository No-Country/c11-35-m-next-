import React, { useState } from 'react'
import Steps from '../Stepper/Steps'
import UserForm from '../UserForm/UserForm'
import ModalPayment from '../Payment/Payment'
import PurchaseDetails from '../PurchaseDetails/PurchaseDetails'

export default function Checkout () {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  // console.log(formData)

  const handleFormSubmit = (data) => {
    setFormData(data)
    setCurrentStep(1)
  }

  return (
    <>
      <Steps />
      <PurchaseDetails />
      {currentStep === 0 ? (
        <UserForm onSubmit={handleFormSubmit} />
      ) : (
        <ModalPayment formData={formData} />
      )}
    </>
  )
}
