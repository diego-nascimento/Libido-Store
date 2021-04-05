import React from 'react'
import Layout from '../Components/Layout/Layout'
import {Wrapper, Container, ProdutosContainer, Card, ImageContainer, InfoContainer, BotaoFinalizar} from '../PageStyles/carrinho.style'
import {connect} from 'react-redux'
import * as CartActions from '../store/modules/cart/actions'
import { IProduto } from '../Interfaces/IProduto'
import Link from 'next/link'
import Head from 'next/head'
import {FaArrowUp, FaArrowDown} from 'react-icons/fa'
import { remove } from 'nprogress'


interface CarrinhoProps{
  produtos: Array<IProduto>
  tamanho_carrinho: number
  total: number
  dispatch: any
}

const Carrinho: React.FC<CarrinhoProps> = ({
  produtos, 
  tamanho_carrinho,
  total,
  dispatch
})=>{

  const addProduto = (produto: IProduto) => {
    dispatch(CartActions.AdicionarAoCarrinho(produto));
  }

  const removeProduto = (produto: IProduto) =>{
    dispatch(CartActions.RemoverDoCarrinho(produto._id));
  }

  return(
    <Layout>
      <Head>
        <title>Libido LoveShop - Carrinho </title>
      </Head>
       <Wrapper >
         <Container className="Container">
          {tamanho_carrinho <=0? <h1>Seu Carrinho de Compras esta Vazio.</h1>: <h1>Meu Carrinho</h1>}
          
            {tamanho_carrinho <=0? <p>
              Seu carrinho de compras está aqui para servir a você. Dê um propósito a ele!<br/>
              Continue Suas Compras: <Link href="/produtos"><a>Produtos</a></Link>
            </p>: 
            <ProdutosContainer>
              <div>
              {produtos.map(produto =>{
                return(
                  <Card style={{padding: '30px'}} key={produto._id}>
                    <ImageContainer>
                      <img src={produto.imagem.url} alt={produto.Nome} />
                    </ImageContainer>
                    <InfoContainer>
                      <div className="Left">
                        <h2>{produto.Nome}</h2>
                        {produto.pronta && <b className="Pronta">Entrega Imediata</b>}
                        <p>
                          Preço: {produto.preco && Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            }).format(produto.preco)}
                        </p>
                        <p>
                        <b>{produto.subtotal && Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          }).format(produto.subtotal)}
                        </b>
                      </p>
                      </div>
                      <div className="Right">
                        <div className="Quantidade">
                          <FaArrowUp onClick={() =>{ addProduto(produto)}}/>
                          <b>
                            {produto.quantidade}
                          </b>
                          <FaArrowDown onClick={() =>{ removeProduto(produto)}}/>
                        </div> 
                      </div> 
                    </InfoContainer>
                  </Card> 
                )
              })}
              </div>
                <div className="AsideTotal">
                  <h2>Total ({tamanho_carrinho} itens): {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                  }).format(total)} </h2>
                  <BotaoFinalizar >Finalizar Pedido!</BotaoFinalizar>
                </div>
                </ProdutosContainer>
            }
         </Container>
       </Wrapper>
    </Layout>
   
  )
}


const mapStateToProps = (state: any)  => ({
  produtos: state.cart.map((produto: IProduto) => ({
    ...produto,
    subtotal: produto.preco * (produto.quantidade? produto.quantidade: 0),
  })),

  tamanho_carrinho: state.cart.length,

  total: state.cart.reduce((total: number, produto: IProduto) => {
    return total + produto.preco * (produto.quantidade? produto.quantidade: 0);
  }, 0),
});

export default connect(mapStateToProps)(Carrinho);

