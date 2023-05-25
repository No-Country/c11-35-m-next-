import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ProductCard from '@/components/Card/Card'
import { useRouter } from 'next/router'

export const SliderComponent = ({ data }) => {
  const router = useRouter()

  const settings = {
    dots: true, // Muestra los puntos de navegación
    infinite: true, // Permite navegar de forma infinita
    speed: 500, // Velocidad de transición entre las imágenes
    slidesToShow: 1, // Número de imágenes que se muestran al mismo tiempo
    slidesToScroll: 1, // Número de imágenes que se desplazan al avanzar o retroceder
    autoplay: true, // Reproduce automáticamente el carrusel
    autoplaySpeed: 5000, // Tiempo de espera entre las transiciones de imágenes
    arrows: true // Muestra las flechas de navegación
  }

  const handleClickProduct = (productId) => {
    router.push(`/product-details/${productId}`)
  }

  return (
    <Slider {...settings}>
      {Array.isArray(data) && data.map((item) => (
        <ProductCard
          onClick={() => handleClickProduct(item.id)}
          id={item.id}
          key={item.name}
          title={item.name}
          description={item.description}
          price={item.price}
          image={item.image_link}
        />
      ))}
    </Slider>
  )
}
