import React from 'react'
import { Box, HStack } from '@chakra-ui/react'
import ProductCard from '@/components/Card/Card'
import { useRouter } from 'next/router'

export const SliderComponent = ({ data }) => {
  const router = useRouter()

  const handleClickProduct = (productId) => {
    router.push(`/product-details/${productId}`)
  }

  return (
    <Box overflowX='scroll'>
      <HStack marginLeft={100} spacing='220px'>
        {Array.isArray(data) && data.map((item) => (
          <ProductCard
            onClick={() => handleClickProduct(item.id)}
            id={item.id}
            key={item.name}
            title={item.name}
            description={item.description}
            price={item.price}
            image={item.imageLink}
          />
        ))}
      </HStack>
    </Box>
  )
}
