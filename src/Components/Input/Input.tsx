import React from 'react'
import  {InputComponent, Container} from './Input.style'

interface IInput{
  type: string,
  Register: any
  placeholder: string
  error?: string
}

const Input: React.FC<IInput> = ({type, Register, placeholder, error}) => {
  return (
    <Container>
      <InputComponent type={type} placeholder={placeholder} {...Register(placeholder)} />
      {error? <p>{error}</p>: null }
    </Container>
  )
}

export default Input