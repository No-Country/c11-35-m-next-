import { Flex, Box, Text, Square } from '@chakra-ui/react'

export default function ProductCounter ({
  decreaseCounter,
  increaseCounter,
  counter
}) {
  return (
    <Flex>
      <Box
        as='button'
        onClick={decreaseCounter}
        backgroundColor='#D9D9D9'
        width='30px'
        height='100%'
        color='#1A1A1A'
        fontSize='2xl'
        fontWeight='bold'
      >
        -
      </Box>
      <Square>
        <Text
          color='#1A1A1A'
          fontSize='1x1'
          fontWeight='bold'
          marginEnd='20px'
          marginStart='20px'
        >
          {counter}
        </Text>
      </Square>
      <Box
        as='button'
        onClick={increaseCounter}
        backgroundColor='#D9D9D9'
        width='30px'
        height='100%'
        color='#1A1A1A'
        fontSize='2xl'
        fontWeight='bold'
      >
        +
      </Box>
    </Flex>
  )
}
