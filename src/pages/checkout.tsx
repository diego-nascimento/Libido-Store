import React from 'react'
import Layout from '../Components/Layout/Layout'
import {Wrapper, Container, ProdutosContainer, BotaoFinalizar, Formulario, Methods, ListMethods, PaymentMethods, CardData, CardInformations, FormularioCard, Aside} from '../PageStyles/checkout.style'
import {connect} from 'react-redux'
import Head from 'next/head'
import { useForm } from "react-hook-form";
import Input from '../Components/Input/Input'
import { IProduto } from '../Interfaces/IProduto'
import { SetLocale } from '../Util/SetLocaleYup'
import Router from 'next/router'
import { api } from '../service/api'
import * as CartActions from '../store/modules/cart/actions'
import InputMask from 'react-input-mask'
import { GoAlert } from 'react-icons/go'
import {Container as ContainerInput} from '../Components/Input/Input.style'



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

  const { register, handleSubmit, formState: { errors }, unregister} = useForm();
  const [paymentMethod, setpaymentMethod] = React.useState(0)
  const handleChange = (event:any, newValue: any) => {
    setpaymentMethod(newValue);
  };
  
  const handleSubmitForm = async (data: IDataForm) => {
    console.log(data)
      /*api.post('api/mail', {
      data: {
        data: data,
        produtos: produtos,
        total: total
      }
    })

      dispatch(CartActions.LimparCarrinho());
      Router.push('/success')

      */
  }

  React.useEffect(() => {
    if (paymentMethod === 0) {
      unregister('CardNumber')
      unregister('CardName')
      unregister('CardCVC')
      unregister('CardExpire')
    } else {
      register('CardNumber')
      register('CardName')
      register('CardCVC')
      register('CardExpire')
    }
  }, [paymentMethod])

  React.useEffect(() => {
    
    tamanho_carrinho < 1 && Router.push('/produtos')
  }, [])


  console.log(errors)
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
                name="Nome"
              />
              <ContainerInput>
                <InputMask
                          mask="999.999.999-99"
                          placeholder="CPF"
                          {...register('Cpf', {required: true})}
                        />
                {errors && errors.Cpf && errors.Cpf.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
              </ContainerInput>
              <ContainerInput>
                <InputMask
                  mask="(99) 99999-9999"
                  placeholder="Whatsapp"
                  {...register('Whatsapp', {required: true})}
                />
                {errors && errors.Whatsapp && errors.Whatsapp.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
              </ContainerInput>
             
              <h2>Endereço:</h2>
              <div className="Endereco">
                <Input type="text"
                  placeholder="Endereco"
                  Register={register}
                  Error={errors.Endereco}
                  name="Endereco"
                   />
                <Input type="number"
                  placeholder="Numero"
                  Register={register}
                  Error={errors.Numero}
                  name="Numero"
                />
              </div>  
              <Input type="text"
                placeholder="Bairro"
                Register={register}
                Error={errors.Bairro}
                name="Bairro"
              />
              <div className="Endereco">
                 <Input type="text"
                  placeholder="Cidade"
                  Register={register}
                  Error={errors.Cidade}
                  name="Cidade"
                />
                <ContainerInput>
                  <InputMask
                    mask="99999-999"
                    placeholder="Cep"
                    {...register('Cep', {required: true})}
                  />
                  {errors && errors.Cep && errors.Cep.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
                </ContainerInput>
              </div> 
              <Input type="text"
                placeholder="Estado"
                Register={register}
                Error={errors.Estado}
                name={"Estado"}
              />
              <PaymentMethods>
                <ListMethods>
                  <Methods onClick={() => setpaymentMethod(0)} option={paymentMethod}>Boleto</Methods>
                  <Methods onClick={() => setpaymentMethod(1)} option={paymentMethod}>Cartao de Credito</Methods>
                </ListMethods>
              </PaymentMethods>
            </Formulario>
            <Aside> 
                 {paymentMethod === 1 &&
                <CardData>
                  <h1>Cartão de Credito</h1>
                  <CardInformations>
                  <FormularioCard>
                    <ContainerInput>
                      <InputMask
                        mask="9999 9999 9999 9999"
                        placeholder="Numero do Cartão"
                        {...register('CardNumber', {required: true})}
                        name={'CardNumber'}
                      />
                      {errors && errors.CardNumber && errors.CardNumber.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
                    </ContainerInput>
                    <ContainerInput>
                      <InputMask
                        mask="99/99"
                        placeholder="Expira em"
                        {...register('CardExpire', {required: true})}
                        name={"CardExpire"}
                      />
                      {errors && errors.CardExpire && errors.CardExpire.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
                    </ContainerInput>
                    
                      <Input type="text"
                        placeholder="Nome no Cartão"
                        Register={register}
                      Error={errors.CardName}
                      name="CardName"
                      />
                      <Input type="number"
                        placeholder="CVC"
                        Register={register}
                        Error={errors.CardCVC}
                        name={"CardCVC"}
                      />
                    </FormularioCard>
                  </CardInformations>
                </CardData>}
              <div className="AsideTotal">
             
                  <h2>Total ({tamanho_carrinho} itens): {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                  }).format(total)} </h2>
                  <BotaoFinalizar  onClick={handleSubmit(handleSubmitForm)}>Finalizar Pedido!</BotaoFinalizar>
                </div>
            </Aside>
            
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

