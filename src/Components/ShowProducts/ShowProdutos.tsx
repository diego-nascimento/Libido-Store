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
                {produto.imagem? <img src={produto.imagem.url} alt={produto.Nome} />:<img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="No Image" />}
                <div className="info">
              <h2>{produto.Nome}</h2>
              <p>{produto.descricao}</p>
              <b> {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(produto.preco)}</b>
            </div>
          </Card>
            )
          })}
        </Container>
      </ProdutosContainer>
  )
}

export default ShowProdutos