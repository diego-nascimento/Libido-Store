import React from 'react'
import { Carousel } from 'react-bootstrap';
import Link from 'next/link'
import {Container} from './Banner.style'

const Banner: React.FC= () => {
  return(
    <Container>
      <Carousel
            controls={true}
            touch={true}
            indicators={false}
            slide={true}
          >                
            <Carousel.Item >
                <a style={{width: '100%', cursor: 'default'}}>
                  <img src="/MainPanel.png" alt="" />
                </a>
            </Carousel.Item>
      </Carousel>
    </Container>
    
  )
}

export default Banner