import React from 'react'
import { Flex, Box } from '@chakra-ui/react'

export default function ProductColors ({ colors }) {
  const defaultColors = colors.slice(0, 5)
  console.log(colors)
  return (
    <>
      <Flex wrap='wrap'>
        {defaultColors.map(color => (
          <Box
            key={color}
            p='4'
            bg={color}
            color='white'
            borderRadius='50%'
            margin='15px'
            marginLeft='1px'
          />
        ))}
      </Flex>
    </>
  )
}
