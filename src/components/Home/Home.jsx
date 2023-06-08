import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/store/reducers/data'
import { fetchDataHome } from '@/store/reducers/dataHome'
import {
  Box,
  SimpleGrid,
  Text,
  useBreakpointValue,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Button,
  Icon,
  Input,
  Heading
} from '@chakra-ui/react'
import ProductCard from '@/components/Card/Card'
import Pagination from '../Pagination/Pagination'
import { useRouter } from 'next/router'
import { BsFilterRight } from 'react-icons/bs'
import Cart from '../Cart/Cart'
import { Carousel } from '../Slider/Slider'
import { SliderComponent } from '../SliderCards/SliderCards'

export default function Home () {
  const router = useRouter()
  const dispatch = useDispatch()
  const data = useSelector(state => state.data.data)
  // console.log(data)
  const dataHome = useSelector(state => state.dataHome.dataHome)
  const [filteredData, setFilteredData] = useState(data || [])
  const [currentPage, setCurrentPage] = useState(1)
  const [orderBy, setOrderBy] = useState('') // Estado para almacenar el tipo de ordenamiento seleccionado
  const itemsPerPage = 8
  const cardColumns = useBreakpointValue({ base: 1, sm: 2, md: 4 })
  const [filteredDataLength, setFilteredDataLength] = useState(filteredData ? filteredData.length : 0)
  const currentItems = filteredData.length > 0 ? filteredData : data || []
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const brandOptions = [...new Set(currentItems.map(item => item.brand))]
  const itemType = router.query.type

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
    let sortedItems = items.slice()

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

    if (minPrice !== '') {
      sortedItems = sortedItems.filter(item => item.price >= parseInt(minPrice))
    }

    if (maxPrice !== '') {
      sortedItems = sortedItems.filter(item => item.price <= parseInt(maxPrice))
    }

    if (selectedBrand !== '') {
      sortedItems = sortedItems.filter(item => item.brand === selectedBrand)
    }

    return sortedItems
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(fetchDataHome())
      dispatch(fetchData({ props: itemType }))
    }
  }, [dispatch, itemType])

  useEffect(() => {
    if (itemType && data) {
      let filteredItems = data.filter(
        item => item.productType === itemType.toLowerCase()
      )

      if (minPrice !== '') {
        filteredItems = filteredItems.filter(item => item.price >= parseInt(minPrice))
      }

      if (maxPrice !== '') {
        filteredItems = filteredItems.filter(item => item.price <= parseInt(maxPrice))
      }

      if (selectedBrand !== '') {
        filteredItems = filteredItems.filter(item => item.brand === selectedBrand)
      }

      setFilteredData(filteredItems)
      setFilteredDataLength(filteredItems.length) // Actualizar la longitud de los datos filtrados
      setCurrentPage(1) // Restablecer la página actual al aplicar filtros adicionales
    } else {
      setFilteredData([])
      setFilteredDataLength(0) // Restablecer la longitud de los datos filtrados
      setCurrentPage(1) // Restablecer la página actual cuando no hay un tipo de producto seleccionado
    }
  }, [data, itemType, minPrice, maxPrice, selectedBrand])

  const sortedItems = sortItems(currentItems, orderBy)
  const handlePageChange = page => {
    setCurrentPage(page)
  }
  return (
    <Box width='100%' margin='0 auto'>
      <Cart />
      <Box width='100%'>
        {!filteredData.length > 0 && (
          <>
            <Box width='100%'>
              <Carousel />
            </Box>
            <Heading margin={10}>Top rated</Heading>
            <Box
              margin='25px auto'
              padding={5}
              overflowX='scroll'
              width='85vw'
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px'
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#EAEAEA',
                  borderRadius: '24px'
                }
              }}
            >
              {dataHome && dataHome.slice(0, 10) && (
                <SliderComponent data={dataHome.slice(0, 10)} />
              )}
            </Box>
            <Heading margin={10}>Best sellers</Heading>
            <Box
              margin='25px auto'
              padding={5}
              overflowX='scroll'
              width='85vw'
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px'
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#EAEAEA',
                  borderRadius: '24px'
                }
              }}
            >
              {dataHome && dataHome.slice(10, 15) && (
                <SliderComponent data={dataHome.slice(10, 20)} />
              )}
            </Box>
          </>
        )}
      </Box>
      {filteredData.length > 0 && (
        <Box padding='5px 15px'>
          <Text>
            Home <Text as='span'>&gt;</Text> {itemType}
          </Text>
          <Flex width='100%'>
            <FormControl>
              <Flex align='center' direction='row'>
                <FormLabel htmlFor='orderBy' width='70%' margin={0}>
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
                    <Flex direction='column' p={4}>
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
                            <option key={brand} value={brand}>
                              {brand}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <Button mt={4} onClick={handleOptionSelect}>
                        Apply
                      </Button>
                    </Flex>
                  </Box>
                )}
              </Flex>
            </FormControl>
          </Flex>
        </Box>
      )}
      <Box>
        {filteredData.length > 0 && (
          <Box>
            <SimpleGrid columns={cardColumns} spacing={10} margin='30px'>
              {sortedItems
                .slice(indexOfFirstItem, indexOfLastItem)
                .map(item => (
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
            </SimpleGrid>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <Text textAlign='center' mt={2} marginBottom='20px'>
              Page {currentPage} of {totalPages}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
