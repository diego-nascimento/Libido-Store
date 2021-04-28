import React from 'react'
import Layout from '../Components/Layout/Layout'
import {Wrapper, Container, ErrorContainer,ProdutosContainer, BotaoFinalizar, Formulario, Methods, ListMethods, PaymentMethods, CardData, CardInformations, FormularioCard, Aside} from '../PageStyles/checkout.style'
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
import { styles } from '../styles/styles'
import { ICardPaymentInfo } from '../Interfaces/ICardInfo'
import {normalize} from '../Util/Normalize'
import { IBoletoInfo } from './api/pagamento/boleto'
import {estados} from '../Util/Estados'

interface CarrinhoProps{
  produtos: Array<IProduto>
  tamanho_carrinho: number
  total: number
  dispatch: any
}

interface IDataForm{
  Nome: string,
  Cpf: string
  Whatsapp: string,
  Estado: string,
  Cidade: string,
  Endereco: string,
  Numero: string,
  Cep: string,
  Bairro: string
  email: string
  CardNumber: string
  CardExpire: string
  CardName: string
  CardCVC: string
}

const Checkout: React.FC<CarrinhoProps> = ({
  produtos,
  tamanho_carrinho,
  total,
  dispatch
}) => {
  SetLocale()

  const { register, handleSubmit, formState: { errors }, unregister } = useForm();
  const [paymentMethod, setpaymentMethod] = React.useState(0)
  const [loading, setloading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const handleSubmitForm = async (data: IDataForm) => {
    try {
      setloading(true)
      setError(false);
      let response
      switch (paymentMethod) {
        case 0: //Metodo de pagamentot boleto
          const boletoInfo: IBoletoInfo = {
            cpf: normalize(data.Cpf),
            nome: data.Nome,
            bairro: data.Bairro,
            cep: normalize(data.Cep),
            cidade: data.Cidade,
            estado: data.Estado,
            numero: data.Numero,
            rua: data.Endereco,
            email: data.email,
            whatsapp: data.Whatsapp
          }
          response = await api.post('api/pagamento/boleto', {
            data: {
              info: boletoInfo,
              total: total,
              Produtos: produtos
            }
          })
          if (response.data.status === 'processing') {
            dispatch(CartActions.LimparCarrinho())
            return Router.replace('/success')
          } else {
            setError(true)
          }
          break;
        default: //metodo de pagamento cartao de credito
          const cardInfo: ICardPaymentInfo = {
            Bairro: data.Bairro,
            Nome: data.Nome,
            Cpf: normalize(data.Cpf),
            Cidade: data.Cidade,
            Endereco: data.Endereco,
            Estado: data.Estado,
            Numero: normalize(data.Numero),
            Whatsapp: normalize(data.Whatsapp),
            Cep: normalize(data.Cep),
            email: data.email,
            cardInfo: {
              CardCVC: normalize(data.CardCVC),
              CardExpire: normalize(data.CardExpire),
              CardName: data.CardName,
              CardNumber: normalize(data.CardNumber)
            }
          }
          response = await api.post('api/pagamento/cartao', {
            data: {
              info: cardInfo,
              produtos: produtos,
              total: total
            }
          })
          
          if (response.data.status === 'paid' || response.data.status === 'processing') {
            dispatch(CartActions.LimparCarrinho()) 
            Router.replace('/success')
          } else {
            setError(true)
          }
          break;
      }

    } catch (error) {
      setError(true)
    } finally {
      setloading(false)
    }
    
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

  return(
    <Layout>
      <Head>
        <title>Libido LoveShop - Checkout </title>
      </Head>
       <Wrapper >
         <Container className="Container">
          <h1>Checkout </h1>
          {error? <ErrorContainer><p><GoAlert/> Algo deu errado! Verifique as informações e tente novamente</p></ErrorContainer>: null}
            <ProdutosContainer>
              <Formulario >
              <Input type="text"
                placeholder="Nome"
                Register={register}
                Error={errors.Nome}
                name="Nome"
              />
              <Input
                  type="text"
                  placeholder="Email"
                  Register={register}
                  Error={errors.email}
                  name="email"
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
              <select placeholder="Estado"{...register('Estado', {required: true})}>
                {estados.UF.map((estado, index) => {
                  return <option value={estado.sigla} key={index} >{estado.nome}</option>
                })}
              </select>
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
                    <Input type="text"
                        border={styles.fontColorInDark}
                        placeholder="Nome no Cartão"
                        Register={register}
                      Error={errors.CardName}
                      name="CardName"
                      />
                    <ContainerInput borderColor={styles.fontColorInDark}>
                      <InputMask
                        mask="9999 9999 9999 9999"
                        placeholder="Numero do Cartão"
                        {...register('CardNumber', {required: true})}
                        name={'CardNumber'}
                      />
                      {errors && errors.CardNumber && errors.CardNumber.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
                    </ContainerInput>
                    <ContainerInput borderColor={styles.fontColorInDark}>
                      <InputMask
                        mask="99/99"
                        placeholder="Expira em"
                        {...register('CardExpire', {required: true})}
                        name={"CardExpire"}
                      />
                      {errors && errors.CardExpire && errors.CardExpire.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
                    </ContainerInput>
                    
                    <Input type="number"
                        border={styles.fontColorInDark}
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
                  <BotaoFinalizar  onClick={handleSubmit(handleSubmitForm)} disabled={loading}>Finalizar Pedido!</BotaoFinalizar>
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

