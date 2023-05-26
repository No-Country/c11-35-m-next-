import React, { useState } from 'react'
import Steps from '../Stepper/Steps'
import UserForm from '../UserForm/UserForm'
import ModalPayment from '../Payment/Payment'
import PurchaseDetails from '../PurchaseDetails/PurchaseDetails'

export default function Checkout () {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  // console.log(formData)

  const handleFormSubmit = data => {
    setFormData(data)
    setCurrentStep(2)
    console.log(data)
  }

  return (
    <>
      <Steps ind={currentStep} />
      <PurchaseDetails />
      {currentStep === 1 ? (
        <UserForm onSubmit={data => handleFormSubmit(data)} />
      ) : (
        <ModalPayment formData={formData} />
      )}
    </>
  )
}
