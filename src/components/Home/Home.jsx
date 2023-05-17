import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/store/reducers/data'
import { SimpleGrid, Text, useBreakpointValue } from '@chakra-ui/react'
import ProductCard from '@/components/Card/Card'
import Pagination from '../Pagination/Pagination'
import { useRouter } from 'next/router'
import { SearchBar } from '../SearchBar/SearchBar'

export default function Home() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data.data)
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(fetchData())
    }
  }, [])

  const cardColumns = useBreakpointValue({ base: 1, sm: 2, md: 4 })
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const items = data && data.slice(indexOfFirstItem, indexOfLastItem)
  const [currentItems, setCurrentItems] = useState(items)
  // const currentItems = items
  console.log(items)
  const totalPages = Math.ceil((data && data.length) / itemsPerPage)

  const handlePageChange = page => {
    console.log(page)
    setCurrentPage(page)
  }
  const handleClick = productId => {
    router.push(`/product-details/${productId}`)
  }

  const search = searchedData => {
    console.log(searchedData)
    setCurrentItems(searchedData)
  }

  return (
    <>
      <SearchBar
        data={data}
        search={search}
      />
      <main className='main'>
        <SimpleGrid
          columns={cardColumns}
          spacing={10}
          margin='50px'
        >
          {currentItems &&
            currentItems.map(item => (
              <ProductCard
                onClick={() => handleClick(item.id)}
                key={item.name}
                title={item.name}
                description={item.description}
                price={item.price}
                image={item.image_link}
              />
            ))}
        </SimpleGrid>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Text
          textAlign='center'
          mt={2}
          marginBottom='20px'
        >
          Page {currentPage} of {totalPages}
        </Text>
      </main>
    </>
  )
}
