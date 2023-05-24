import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/store/reducers/data'
import {
  Box,
  Image,
  SimpleGrid,
  Text,
  useBreakpointValue,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Button,
  Icon,
  Input
} from '@chakra-ui/react'
import ProductCard from '@/components/Card/Card'
import Pagination from '../Pagination/Pagination'
import { useRouter } from 'next/router'
import { BsFilterRight } from 'react-icons/bs'
import Cart from '../Cart/Cart'
import Swal from 'sweetalert2'

export default function Home () {
  const router = useRouter()
  const dispatch = useDispatch()
  const data = useSelector(state => state.data.data)
  const itemType = router.query.type
  const [filteredData, setFilteredData] = useState(data || [])
  const [currentPage, setCurrentPage] = useState(1)
  const [orderBy, setOrderBy] = useState('') // Estado para almacenar el tipo de ordenamiento seleccionado
  const itemsPerPage = 8
  const cardColumns = useBreakpointValue({ base: 1, sm: 2, md: 4 })
  const filteredDataLength = filteredData ? filteredData.length : 0
  const currentItems = filteredData.length > 0 ? filteredData : data || []
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const brandOptions = [...new Set(currentItems.map(item => item.brand))]

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleOptionSelect = () => {
    setIsDropdownOpen(false)
  }
  const totalPages = Math.ceil(filteredDataLength / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const handleClickProduct = productId => {
    router.push(`/product-details/${productId}`)
  }

  const handleOrderByChange = event => {
    setOrderBy(event.target.value)
    setMinPrice('')
    setMaxPrice('')
    setSelectedBrand('')
    setCurrentPage(1) // Restablecer la página actual al cambiar el tipo de ordenamiento
  }

  const sortItems = (items, orderBy) => {
    const sortedItems = items.slice()

    switch (orderBy) {
      case 'name':
        sortedItems.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'price':
        sortedItems.sort((a, b) => a.price - b.price)
        break
      default:
        break
    }

    let filteredItems = sortedItems

    if (minPrice !== '') {
      filteredItems = filteredItems.filter(item => item.price >= parseInt(minPrice))
    }

    if (maxPrice !== '') {
      filteredItems = filteredItems.filter(item => item.price <= parseInt(maxPrice))
    }

    if (selectedBrand !== '') {
      filteredItems = filteredItems.filter(item => item.brand === selectedBrand)
    }

    if (filteredItems.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No items found!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      setMinPrice('')
      setMaxPrice('')
      setSelectedBrand('')
    }

    return filteredItems
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(fetchData())
    }
  }, [dispatch])

  useEffect(() => {
    if (itemType && data) {
      const filteredItems = data.filter(
        item => item.product_type === itemType.toLowerCase()
      )
      setFilteredData(filteredItems)
      setCurrentPage(1) // Restablecer la página actual al cambiar el tipo de producto o los filtros
    } else {
      setFilteredData([])
      setCurrentPage(1) // Restablecer la página actual cuando no hay un tipo de producto seleccionado
    }
  }, [data, itemType, minPrice, maxPrice, selectedBrand])

  const sortedItems = sortItems(currentItems, orderBy)

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  return (
    <>
      <Cart />
      <main
        className='main'
        style={{ width: '100%' }}
      >
        {!filteredData.length && (
          <Box width='100%'>
            <Image
              src='images/carousel1.jpg'
              alt='Descripción de la imagen'
            />
          </Box>
        )}
        {filteredData.length && (
          <>
            <Text>
              Home <Text as='span'>&gt;</Text> {itemType}
            </Text>
            <Flex width='100%'>
              <FormControl>
                <Flex
                  align='center'
                  direction='row'
                >
                  <FormLabel
                    htmlFor='orderBy'
                    width='70%'
                    margin={0}
                  >
                    Order by:
                  </FormLabel>
                  <Select
                    id='orderBy'
                    value={orderBy}
                    onChange={handleOrderByChange}
                    border='none'
                    _focus={{ outline: 'none' }}
                    margin={0}
                  >
                    <option value=''>Select</option>
                    <option value='name'>Name</option>
                    <option value='price'>Price</option>
                  </Select>
                  <Text>Filter</Text>
                  <Button
                    leftIcon={<Icon as={BsFilterRight} />}
                    colorScheme='blue'
                    variant='unstyled'
                    onClick={handleDropdownToggle}
                  />
                  {isDropdownOpen && (
                    <Box
                      position='absolute'
                      top='100%'
                      zIndex='dropdown'
                      bg='white'
                      border='1px solid'
                      borderColor='gray.200'
                      boxShadow='sm'
                    >
                      <Flex
                        direction='column'
                        p={4}
                      >
                        <FormControl mb={4}>
                          <FormLabel htmlFor='minPrice'>Min Price:</FormLabel>
                          <Input
                            id='minPrice'
                            type='number'
                            value={minPrice}
                            onChange={event => setMinPrice(event.target.value)}
                          />
                        </FormControl>
                        <FormControl mb={4}>
                          <FormLabel htmlFor='maxPrice'>Max Price:</FormLabel>
                          <Input
                            id='maxPrice'
                            type='number'
                            value={maxPrice}
                            onChange={event => setMaxPrice(event.target.value)}
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel htmlFor='brand'>Brand:</FormLabel>
                          <Select
                            id='brand'
                            value={selectedBrand}
                            onChange={event =>
                              setSelectedBrand(event.target.value)}
                            border='1px solid'
                            borderColor='gray.200'
                          >
                            <option value=''>All Brands</option>
                            {brandOptions.map(brand => (
                              <option
                                key={brand}
                                value={brand}
                              >
                                {brand}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <Button
                          mt={4}
                          onClick={handleOptionSelect}
                        >
                          Apply
                        </Button>
                      </Flex>
                    </Box>
                  )}
                </Flex>
              </FormControl>
            </Flex>
          </>
        )}
        <Box>
          <SimpleGrid
            columns={cardColumns}
            spacing={10}
            margin='50px'
          >
            {sortedItems.slice(indexOfFirstItem, indexOfLastItem).map(item => (
              <ProductCard
                onClick={() => handleClickProduct(item.id)}
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
        </Box>
      </main>
    </>
  )
}
