import React from 'react'
import  {Container} from './Input.style'
import {GoAlert} from 'react-icons/go'
import { DeepMap } from 'react-hook-form'

interface IInput{
  type: string,
  Register: any
  placeholder: string
  Error?: DeepMap<any, any>
  name: string
  border?: string | null
}



const Input: React.FC<IInput> = ({ type, Register, placeholder, Error, name, border = null }) => {
  return (
    <Container borderColor={border}>
      <input type={type}   placeholder={placeholder}  {...Register(name, {
        required: true,
      })} />
      {Error?.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
    </Container>
  )
}

export default Input