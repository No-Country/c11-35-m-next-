import ProductDetails from '@/components/ProductDetails/ProductDetails'
import { useRouter } from 'next/router'
import React from 'react'

export default function Page () {
  const router = useRouter()
  return (
    <ProductDetails id={router.query.id} />
  )
}
