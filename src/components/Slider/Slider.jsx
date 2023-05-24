import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Image } from '@chakra-ui/react'

export const Carousel = () => {
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

  return (
    <Slider {...settings}>
      <Box>
        <Image src='/images/carousel1.jpg' alt='Image 1' />
      </Box>
      <Box>
        <Image src='/images/carousel2.jpg' alt='Image 2' />
      </Box>
      <Box>
        <Image src='/images/carousel3.jpg' alt='Image 3' />
      </Box>
    </Slider>
  )
}
