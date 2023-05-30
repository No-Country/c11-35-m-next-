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
import { useEffect } from 'react'

const steps = [
  { title: 'Information' },
  { title: 'Payment' },
  { title: 'Confirmation' }
]

export default function Steps ({ ind }) {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length
  })

  useEffect(() => {
    setActiveStep(ind)
  }, [ind])

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
