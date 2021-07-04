import React from 'react'
import { Carousel } from 'react-bootstrap'
import { Container } from './Banner.style'

const Banner: React.FC = () => {
  return (
    <Container>
      <Carousel
            controls={true}
            touch={true}
            indicators={false}
            slide={true}
            interval={5000}
          >
            <Carousel.Item >
                <a style={{ width: '100%', cursor: 'default' }}>
                  <img src="/namorados_banner.png" alt="Dia dos Namorados na Libido" />
                </a>
            </Carousel.Item>
            <Carousel.Item >
                <a style={{ width: '100%', cursor: 'default' }}>
                  <img src="/fretegratis_libido.png" alt="Frete Gratis Libido LoveShop" />
                </a>
            </Carousel.Item>

      </Carousel>
    </Container>

  )
}

export default Banner
