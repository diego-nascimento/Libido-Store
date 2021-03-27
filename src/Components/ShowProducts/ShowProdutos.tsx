import React from 'react'
import { IProduto } from '../../Interfaces/IProduto'
import {Card, ProdutosContainer, Container} from './Produtos.style'

interface IShowProdutos{
  produtos: Array<IProduto>
  title: string
}

const ShowProdutos: React.FC<IShowProdutos> = ({produtos, title}) =>{
  return(
      <ProdutosContainer>
        <h1>{title}</h1>
        <Container>
          {produtos && produtos.map(produto =>{
            return (
              <Card key={produto._id}>
                {produto.imagem? <img src={produto.imagem.url} alt={produto.Nome} />:<img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />}
                <div className="info">
              <h2>Nome do Produto</h2>
              <p>Loren Ipsum do loren ipsun</p>
            </div>
          </Card>
            )
          })}
        </Container>
      </ProdutosContainer>
  )
}

export default ShowProdutos