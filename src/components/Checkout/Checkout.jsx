import React, { useContext, useState } from 'react'
import Steps from '../Stepper/Steps'
import UserForm from '../UserForm/UserForm'
import ModalPayment from '../Payment/Payment'
import PurchaseDetails from '../PurchaseDetails/PurchaseDetails'
import { UserContext } from '@/context/UserContextProvider'
import { addUserAddress } from '@/services/firebase-auth'
import { useBreakpointValue, Flex, Box } from '@chakra-ui/react'

export default function Checkout () {
  const { currentUser } = useContext(UserContext)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const isMobile = useBreakpointValue({ base: true, lg: false, sm: false })
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
      {isMobile ? (
        <>
          <Steps ind={currentStep} />
          {currentStep === 0 ? (
            <>
              <PurchaseDetails />
              <UserForm onSubmit={data => handleFormSubmit(data)} />
            </>
          ) : (
            <ModalPayment
              formData={formData}
              confirmation={handleConfirmation}
            />
          )}
        </>
      ) : (
        <Flex width='100%' justifyContent='space-around'>
          <Box width='60%'>
            <Steps ind={currentStep} />
            {currentStep === 0 ? (
              <UserForm onSubmit={data => handleFormSubmit(data)} />
            ) : (
              <ModalPayment
                formData={formData}
                confirmation={handleConfirmation}
              />
            )}
          </Box>
          <Box width='30%'>
            <PurchaseDetails />
          </Box>
        </Flex>
      )}
    </>
  )
}
