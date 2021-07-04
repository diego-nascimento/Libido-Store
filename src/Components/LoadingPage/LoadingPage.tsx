import React from 'react'
import { Container } from './LoadingPage.style'
import { PuffLoader } from 'react-spinners'

const LoadingPage = () => {
  return (
    <Container>
      <PuffLoader color={'white'} size={60} />
    </Container>
  )
}

export default LoadingPage
