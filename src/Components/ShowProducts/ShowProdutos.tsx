import Link from 'next/link'
import React from 'react'
import { ICategoria } from '../../Interfaces/ICategoria'
import { IProduto } from '../../Interfaces/IProduto'
import { Card, Wrapper, ProdutosContainer, Container, SideBar } from './Produtos.style'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import { MdExpandMore } from 'react-icons/md';



interface IShowProdutos{
  produtos: Array<IProduto>
  title: string
  categorias:Array<ICategoria>
}



const ShowProdutos: React.FC<IShowProdutos> = ({ produtos, title, categorias}) => {

  

  return(
    <Wrapper className="Container">
      <h1>{title}</h1>
      <ProdutosContainer>
        <SideBar>
          <div className="block">
            <Accordion style={{background: 'rgba(0,0,0,0)', border: 'none'}}> 
              <AccordionSummary  expandIcon={<MdExpandMore />}>
                  <h2>Categorias</h2>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {categorias && categorias.map(categoria => {
                    return (
                      <li key={categoria._id}>
                        <Link href={`/categoria/${categoria._id}`}>
                          <a>
                            <p>{categoria.Nome}</p>
                          </a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
        </AccordionDetails>
      </Accordion> 
          </div>
        </SideBar>
        <Container className="Container">
          {produtos && produtos.map(produto =>{
            return (
              <Link href={`/produto/${produto._id}`} key={produto._id} >
                <a style={{height: '100%'}}> 
                  <Card >
                  {produto.imagem? <img src={produto.imagem.url} alt={produto.Nome} />:<img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="No Image" />}
                  <div className="info">
                    <h2>{(produto.Nome.toLowerCase())}</h2>
                    <b>Por {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                  }).format(produto.preco)}</b>
                  </div>
                 
              </Card>
                </a>
            </Link>
            )
          })}
        </Container>
      </ProdutosContainer>
      </Wrapper>
  )
}


export default ShowProdutos