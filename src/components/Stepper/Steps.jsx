import {
  Box,
  Flex,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps
} from '@chakra-ui/react'
import { useEffect, useCallback } from 'react'

const steps = [
  { title: 'Information' },
  { title: 'Payment' },
  { title: 'Confirmation' }
]

export default function Steps ({ ind }) {
  const { activeStep, setActiveStep } = useSteps({
    initialStep: ind,
    steps: steps.length
  })

  const handleSetActiveStep = useCallback(
    (stepIndex) => {
      setActiveStep(stepIndex)
    },
    [setActiveStep]
  )
  useEffect(() => {
    handleSetActiveStep(ind)
  }, [ind, handleSetActiveStep])

  return (
    <Stepper size='sm' index={activeStep} p='5px 20px'>
      {steps.map((step, index) => (
        <Step key={index}>
          <Flex flexDirection='column' alignItems='center'>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
            </Box>
          </Flex>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}
