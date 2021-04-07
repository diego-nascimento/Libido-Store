import React from 'react'
import  {InputComponent, Container} from './Input.style'
import {GoAlert} from 'react-icons/go'
import { DeepMap } from 'react-hook-form'

interface IInput{
  type: string,
  Register: any
  placeholder: string
  Error?: DeepMap<any, any>

}

const Input: React.FC<IInput> = ({ type, Register, placeholder, Error }) => {

   

  return (
    <Container>
      <InputComponent type={type} placeholder={placeholder}  {...Register(placeholder, {
        required: true,
      })} />
      {Error?.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
    </Container>
  )
}

export default Input