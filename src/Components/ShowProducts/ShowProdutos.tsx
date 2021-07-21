import Link from 'next/link'
import React from 'react'
import { ICategoria } from '../../typing/Interfaces/ICategoria'
import { IProduto } from '../../typing/Interfaces/IProduto'
import { Wrapper, ProdutosContainer, Container, SideBar } from './ShowProdutos.style'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import { MdExpandMore } from 'react-icons/md'
import Item from '../ProdutoItem/ProdutoItem'
import Title from '../Title'

interface IShowProdutos{
  produtos: Array<IProduto>
  title: string
  categorias:Array<ICategoria>
}

const ShowProdutos: React.FC<IShowProdutos> = ({ produtos, title, categorias }:IShowProdutos) => {
  return (
    <Wrapper className="Container">
      <Title text={title} />
      <ProdutosContainer>
        <SideBar>
          <div className="block">
            <Accordion style={{ background: 'rgba(0,0,0,0)', border: 'none' }}>
              <AccordionSummary expandIcon={<MdExpandMore />}>
                <h2>Categorias</h2>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {categorias && categorias.map(categoria => {
                    return (
                      <li key={categoria._id}>
                        <Link href={`/categoria/${categoria._id}?categoria=${categoria.Nome}`}>
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
          {produtos && produtos.map(produto => {
            return (
              <Link href={`/produto/${produto._id}?produto=${produto.Nome}`} key={produto._id} >
                <a style={{ height: '100%' }}>
                  <Item produto={produto}/>
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
