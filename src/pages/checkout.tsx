import React from 'react'
import Layout from '../Components/Layout/Layout'
import {Wrapper, Container, ProdutosContainer, BotaoFinalizar, Formulario} from '../PageStyles/checkout.style'
import {connect} from 'react-redux'
import Head from 'next/head'
import { useForm } from "react-hook-form";
import Input from '../Components/Input/Input'
import { IProduto } from '../Interfaces/IProduto'
import { SetLocale } from '../Util/SetLocaleYup'
import Router from 'next/router'
import { api } from '../service/api'
import * as CartActions from '../store/modules/cart/actions'
import * as gtag from '../lib/gtag'

interface CarrinhoProps{
  produtos: Array<IProduto>
  tamanho_carrinho: number
  total: number
  dispatch: any
}

interface IDataForm{
  Nome: string,
  Whatsapp: string,
  Estado: string,
  Cidade: string,
  Endereco: string,
  Numero: number,
  Cep: string,
  Bairro: string
}

const Checkout: React.FC<CarrinhoProps> = ({
  produtos,
  tamanho_carrinho,
  total,
  dispatch
}) => {
  SetLocale()

  const { register, handleSubmit, formState: { errors } } = useForm();

  
  const handleSubmitForm = async (data: IDataForm) => {
      api.post('api/mail', {
      data: {
        data: data,
        produtos: produtos,
        total: total
      }
    })
     gtag.event({
      action: 'Orçamento enviado',
      category: 'Contato',
       label: data.Nome + 'orçamento',
      value: data.Whatsapp
    })

      dispatch(CartActions.LimparCarrinho());
      Router.push('/success')
  }

  React.useEffect(() => {
    
    tamanho_carrinho < 1 && Router.push('/produtos')
  }, [])

  
  return(
    <Layout>
      <Head>
        <title>Libido LoveShop - Checkout </title>
        
      </Head>
       <Wrapper >
         <Container className="Container">
            <h1>Dados: </h1>
          <ProdutosContainer>
            <Formulario >
              <Input type="text"
                placeholder="Nome"
                Register={register}
                Error={errors.Nome}
                
                 />
              <Input type="text"
                placeholder="Whatsapp"
                Register={register}
                Error={errors.Whatsapp}
              
                 />
              <h2>Endereço:</h2>
              <div className="Endereco">
                <Input type="text"
                  placeholder="Endereco"
                  Register={register}
                  Error={errors.Endereco}
                  
                   />
                <Input type="text"
                  placeholder="Numero"
                  Register={register}
                  Error={errors.Numero}
                  
                />
              </div>  
              <Input type="text"
                placeholder="Bairro"
                Register={register}
                Error={errors.Bairro}
                
              />
              <div className="Endereco">
                 <Input type="text"
                  placeholder="Cidade"
                  Register={register}
                  Error={errors.Cidade}
                   />
                <Input type="text"
                  placeholder="Cep"
                  Register={register}
                  Error={errors.Cep}
                  
                  
                /> 
              </div> 
              <Input type="text"
                placeholder="Estado"
                Register={register}
                Error={errors.Estado}
                
              />
              
            </Formulario>
                <div className="AsideTotal">
                  <h2>Total ({tamanho_carrinho} itens): {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                  }).format(total)} </h2>
                  <BotaoFinalizar  onClick={handleSubmit(handleSubmitForm)}>Finalizar Pedido!</BotaoFinalizar>
                </div>
            </ProdutosContainer>
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

export default connect(mapStateToProps)(Checkout);

