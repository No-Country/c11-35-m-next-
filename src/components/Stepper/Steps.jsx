import {
  Box,
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
    console.log(ind)
  }, [ind])

  console.log(activeStep)
  return (
    <Stepper size='sm' index={activeStep} p='10px'>
      {steps.map((step, index) => (
        <Step key={index}>
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

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
  /*  const { activeStep } = useSteps({
    index: 2,
    count: steps.length
  })
  console.log(activeStep.index)
  return (
    <Stepper
      size='sm'
      index={activeStep}
      p='10px'
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <Flex direction='column' align='center'>
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
  ) */
}
