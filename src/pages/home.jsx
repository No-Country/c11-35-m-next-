import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/store/reducers/data'
import { SimpleGrid, Button, HStack, Text, Flex } from '@chakra-ui/react'
import ProductCard from '@/components/Card/Card'

export default function Home() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data.data)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(fetchData())
    }
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data && data.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil((data && data.length) / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  return (
    <>
      <main className='main'>
        <SimpleGrid
          columns={4}
          spacing={10}
          margin='50px'
        >
          {currentItems &&
            currentItems.map(item => (
              <ProductCard
                key={item.name}
                title={item.name}
                description={item.description}
                price={item.price}
                image={item.image_link}
              />
            ))}
        </SimpleGrid>
        <Flex
          justifyContent='center'
          alignItems='center'
          margin='50px'
        >
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            mx={2}
          >
            Prev
          </Button>
          <HStack spacing={2}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                variant={currentPage === index + 1 ? 'solid' : 'outline'}
                colorScheme={currentPage === index + 1 ? 'teal' : 'gray'}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            mx={2}
          >
            Next
          </Button>
        </Flex>
        <Text
          textAlign='center'
          mt={2}
          marginTop='-40px'
          marginBottom='20px'
        >
          Page {currentPage} of {totalPages}
        </Text>
      </main>
    </>
  )
}
