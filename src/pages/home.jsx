import ProductCard from '@/components/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { fetchData } from '@/store/reducers/data'

export default function Home() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data.data) // Acceder al estado 'data'

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  return (
    <>
      <main className='main'>
        {data &&
          data.map(
            (
              item // Verificar si 'data' existe antes de iterar
            ) => (
              <ProductCard
                key={item.name}
                title={item.name}
                description={item.description} // Corregir el nombre de la propiedad 'description'
                price={item.price}
                image={item.image_link}
              />
            )
          )}
      </main>
    </>
  )
}
