import React from 'react'
import { Container } from './Input.style'
import { GoAlert } from 'react-icons/go'
import { DeepMap } from 'react-hook-form'

interface IInput{
  type: string,
  Register: any
  placeholder: string
  Error?: DeepMap<any, any>
  name: string
  border?: string | null
  show?: boolean
  readonly?: boolean
}

const Input: React.FC<IInput> = ({ type, Register, placeholder, Error, name, border = null, show = true, readonly = false }:IInput) => {
  return (
    <Container borderColor={border} show={show} readOnly={readonly}>
      <input type={type} placeholder={placeholder} readOnly={readonly} {...Register(name, {
        required: true
      })} />
      {Error?.type === 'required' && <p><GoAlert />Esse Campo é Obrigatorio</p>}
    </Container>
  )
}

export default Input
