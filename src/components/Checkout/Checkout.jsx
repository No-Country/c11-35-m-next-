import React, { useContext, useState } from 'react'
import Steps from '../Stepper/Steps'
import UserForm from '../UserForm/UserForm'
import ModalPayment from '../Payment/Payment'
import PurchaseDetails from '../PurchaseDetails/PurchaseDetails'
import { UserContext } from '@/context/UserContextProvider'
import { addUserAddress } from '@/services/firebase-auth'

export default function Checkout () {
  const { currentUser } = useContext(UserContext)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})

  const handleFormSubmit = data => {
    setFormData(data)
    setCurrentStep(1)
    addUserAddress(currentUser.uid, data)
  }
  const handleConfirmation = () => {
    setCurrentStep(3)
  }

  return (
    <>
      <Steps ind={currentStep} />
      {currentStep === 0 ? (
        <>
          <PurchaseDetails />
          <UserForm onSubmit={data => handleFormSubmit(data)} />
        </>
      ) : (
        <ModalPayment formData={formData[0]} confirmation={handleConfirmation} />
      )}
    </>
  )
}
