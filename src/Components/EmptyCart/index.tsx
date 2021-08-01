import React from 'react'
import * as SC from './EmptyCart.style'
import Link from 'next/link'

const EmptyCart:React.FC = () => {
  return (
    <SC.Container>
      <h1 >Seu Carrinho de Compras esta Vazio.</h1>
      <p>
                 Seu carrinho de compras está aqui para servir a você. Dê um propósito a ele!<br/>
                Continue Suas Compras: <Link href="/"><a>Produtos</a></Link>
      </p>
    </SC.Container>
  )
}

export default EmptyCart
