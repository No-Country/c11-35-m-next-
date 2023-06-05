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
        width='44px'
        height='44px'
        color='#1A1A1A'
        fontSize='2xl'
        fontWeight='bold'
        borderRadius='10px'
      >
        -
      </Box>
      <Square>
        <Text
          color='#1A1A1A'
          fontSize='1x1'
          fontWeight='bold'
          marginEnd='15px'
          marginStart='15px'
        >
          {counter}
        </Text>
      </Square>
      <Box
        as='button'
        onClick={increaseCounter}
        backgroundColor='#D9D9D9'
        width='44px'
        height='44px'
        color='#1A1A1A'
        fontSize='2xl'
        fontWeight='bold'
        borderRadius='10px'
      >
        +
      </Box>
    </Flex>
  )
}
