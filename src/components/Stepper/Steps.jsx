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

const steps = [
  { title: 'Information' },
  { title: 'Payment' },
  { title: 'Confirmation' }
]

export default function Steps () {
  const { activeStep } = useSteps({
    index: 0,
    count: steps.length
  })
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
  )
}
