import React from 'react'
import { Carousel } from 'react-bootstrap'
import { Container } from './Banner.style'
import Link from 'next/link'

const Banners = [
  {
    url: '/fretegratis.jpeg',
    link: null,
    alt: 'FreteGratis'
  },
  {
    url: '/mes-orgasmo.jpeg',
    link: ' https://www.instagram.com/loveshoplibido/',
    alt: 'Love Shop Libido'
  },
  {
    url: '/banner-aflorarse.jpeg',
    link: 'https://aflorar-se.vercel.app/sobre',
    alt: 'Aflorar-se'
  }
]

const Banner: React.FC = () => {
  return (
    Banners && Array.isArray(Banners) && Banners.length > 0
      ? <Container>
      <Carousel
            controls={true}
            touch={true}
            indicators={true}
            slide={true}
            interval={5000}

          >
            {Banners.map((banner, index) => {
              return (
                <Carousel.Item key={index}>
                  {banner.link !== null
                    ? <Link href={banner.link}>
                      <a style={{ width: '100%', cursor: 'pointer' }} target='blank'>
                        <img src={banner.url} alt={banner.alt} />
                      </a>
                    </Link>
                    : <a style={{ width: '100%', cursor: 'default' }}>
                     <img src={banner.url} alt={banner.alt} />
                   </a>
                  }

                </Carousel.Item>
              )
            })}
      </Carousel>
    </Container>
      : null
  )
}

export default Banner
