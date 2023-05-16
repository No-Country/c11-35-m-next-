import { Button, Flex, HStack } from '@chakra-ui/react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  return (
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
            onClick={() => onPageChange(index + 1)}
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
  )
}
