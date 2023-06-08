import React from 'react'
import { HStack } from '@chakra-ui/react'
import ProductCard from '@/components/Card/Card'
import { useRouter } from 'next/router'

export const SliderComponent = ({ data }) => {
  const router = useRouter()

  const handleClickProduct = productId => {
    router.push(`/product-details/${productId}`)
  }

  return (
    <HStack marginLeft='10px' spacing='20px'>
      {Array.isArray(data) &&
        data.map(item => (
          <ProductCard
            onClick={() => handleClickProduct(item.id)}
            id={item.id}
            key={item.id}
            title={item.name}
            description={item.description}
            price={item.price}
            image={item.imageLink}
            brand={item.brand}
            colors={[
              item.productColors0HexValue,
              item.productColors1HexValue,
              item.productColors2HexValue
            ]}
          />
        ))}
    </HStack>
  )
}
