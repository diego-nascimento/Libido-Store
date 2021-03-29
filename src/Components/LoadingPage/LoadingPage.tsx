import React from 'react'
import {Container} from './LoadingPage.style'
import {PulseLoader} from 'react-spinners'

const LoadingPage = () => {
  return (
    <Container>
      <PulseLoader color={'white'} size={20} />
    </Container>
  )
}

export default LoadingPage