import React from 'react'
import { IProduto } from '../../typing/Interfaces/IProduto'
import { Botao } from './BotaoComprar.style'

interface IBotao{
  Click: any
  Style: any
  Produto: IProduto
}

const BotaoComprar: React.FC<IBotao> = ({ children, Click, Style, Produto }) => {
  return (
    <Botao onClick={() => Click(Produto)} style={Style}>{children}</Botao>
  )
}

export default BotaoComprar
