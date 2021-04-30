import React from 'react';
import { IProduto } from '../../typing/Interfaces/IProduto';
import {Botao} from './BotaoComprar.style'

interface Botao{
  Click: any
  Style: any
  Produto: IProduto
}

const BotaoComprar: React.FC<Botao>  = ({children, Click, Style, Produto}) =>{
  return(
    <Botao onClick={() => Click(Produto)} style={Style}>{children}</Botao>
  )
}

export default BotaoComprar