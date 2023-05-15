import ProductCard from '@/components/Card/Card'
import Navbar from '@/components/Navbar/Navbar'
import data from '@/data/data.json'
import '@/styles/globals.css'

const filteredData = data.filter(item => item.rating > 4.9)

export default function Home() {
  return (
    <>
      <Navbar />
      <main className='main'>
        {filteredData.map(item => (
          <ProductCard
            key={item.name}
            title={item.name}
            descripction={item.description}
            price={item.price}
            image={item.image_link}
          />
        ))}
      </main>
    </>
  )
}
