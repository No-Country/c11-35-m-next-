import { Flex, Box, Text, Square } from '@chakra-ui/react'

export default function ProductCounter({ initial, stock, onAdd }) {
  const [counter, setCounter] = useState(initial)
  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1)
    }
  }
  const increaseCounter = () => {
    if (counter < stock) {
      setCounter(counter + 1)
    }
  }
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
