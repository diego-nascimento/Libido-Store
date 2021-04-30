import React from 'react'
import Layout from '../Components/Layout/Layout'
import {Wrapper, Container, ErrorContainer,ProdutosContainer, BotaoFinalizar, Formulario, Methods, ListMethods, PaymentMethods, CardData, CardInformations, FormularioCard, Aside, ContainerInfoCard, SelectParcelas, SelectEstado, ContainerCep} from '../PageStyles/checkout.style'
import {connect} from 'react-redux'
import Head from 'next/head'
import { useForm } from "react-hook-form";
import Input from '../Components/Input/Input'
import { IProduto } from '../Interfaces/IProduto'
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
import { Parcelas } from '../Util/Parcelas'
import { requiredFields } from '../Util/EnderecoRequiredFields'
import {GetFactory} from '../Factory/http/GetFactory'

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
  Complemento: string,
  Numero: string,
  Cep: string,
  Bairro: string
  email: string
  CardNumber: string
  CardExpire: string
  CardName: string
  CardCVC: string
  parcelas: number
}

type IValues = {
  Nome: string,
  Cpf: string
  Whatsapp: string,
  Estado: string,
  Cidade: string,
  Endereco: string,
  Complemento: string,
  Numero: string,
  Cep: string,
  Bairro: string
  email: string
  CardNumber: string
  CardExpire: string
  CardName: string
  CardCVC: string
  parcelas: number
}

const Checkout: React.FC<CarrinhoProps> = ({
  produtos,
  tamanho_carrinho,
  total,
  dispatch
}) => {

  const { register, handleSubmit, formState: { errors}, unregister, setValue, getValues } = useForm();
  const [paymentMethod, setpaymentMethod] = React.useState(0)
  const [loading, setloading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [parcelas, setParcelas] = React.useState(1)
  const [totalPagar, settotalPagar] = React.useState(total)
  const [Frete, setFrete] = React.useState(0)
  const [cepValido, setcepValido] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('Algo deu errado! Verifique as informações e tente novamente')

  const [addressEditable, setAddressEditable] = React.useState({ //State se campos estão editaveis ou não
    Cidade: true,
    Estado: true,
    Bairro: true,
    Endereco: true
  })
  const [showAddress, setShowAddress] = React.useState(false) //State se deve ou não mostrar os campos de endereço

  React.useEffect(() => { //calcula o valor atualizado baseado no numero de parcelas
    if (paymentMethod === 0) { //se o metodo for boleto
      setParcelas(1) //vai ser sempre apenas uma parcela
      settotalPagar(total + Frete) //e o valor vai ser sempre o inicial
    } else {
      if (total < 200) { //acima de 200 reais sem juros
         settotalPagar(total + (total * Parcelas[parcelas - 1].acrescimo/100) + Frete) //calculando o valor atualizado baseado na parcela
      }
    }
  }, [parcelas, paymentMethod])

  
  React.useEffect(() => { //se eh boleto, nao registrar no react hook form os campos de cartao
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


  const handleChangeParcelas = (e: any) => { //seta o numero de parcelas
    const indice = Number.parseInt(e.target.value) //transforma o valor em numero
    setParcelas(Parcelas[indice].numero) //pega da tabela de parcelas o numero dela baseado no indice do select
  }
  const handleSubmitForm = async (data: IDataForm) => {
    if (!cepValido) {
      setError(true)
      return
    }
    data.parcelas = parcelas
    try {
      setloading(true)
      setError(false);
      let response
      switch (paymentMethod) {
        case 0: //Metodo de pagamentot boleto
          const boletoInfo: IBoletoInfo = { //preenchendo as informações de comprador do boleto
            cpf: normalize(data.Cpf),
            nome: data.Nome,
            bairro: data.Bairro,
            cep: normalize(data.Cep),
            cidade: data.Cidade,
            estado: data.Estado,
            numero: data.Numero,
            rua: data.Endereco,
            email: data.email,
            whatsapp: data.Whatsapp,
            complemento: data.Complemento
          }
          response = await api.post('api/pagamento/boleto', { //chamado para realizar o pedido pelo boleto
            data: {
              info: boletoInfo,
              total: totalPagar,
              Produtos: produtos
            }
          })
          if (response.data.status === 'processing') { //se o estado esta como processing, quer dizer que deu certo
            dispatch(CartActions.LimparCarrinho()) //limpa carrinho
            return Router.replace('/success') //vai pra pagina de sucesso
          } else {
            setError(true) //caso contrario, deu error
          }
          break;
        default: //metodo de pagamento cartao de credito
          const cardInfo: ICardPaymentInfo = { //preenche informações do comprador para compra com cartao
            Bairro: data.Bairro,
            Nome: data.Nome,
            Cpf: normalize(data.Cpf),
            Cidade: data.Cidade,
            Endereco: data.Endereco,
            complemento: data.Complemento,
            Estado: data.Estado,
            Numero: normalize(data.Numero),
            Whatsapp: normalize(data.Whatsapp),
            Cep: normalize(data.Cep),
            email: data.email,
            cardInfo: {
              CardCVC: normalize(data.CardCVC),
              CardExpire: normalize(data.CardExpire),
              CardName: data.CardName,
              CardNumber: normalize(data.CardNumber),
              parcelas: data.parcelas
            }
          }
          response = await api.post('api/pagamento/cartao', { //realiza chamada na api para compra com cartao
            data: {
              info: cardInfo, //informaçoes do comprador e do cartao
              produtos: produtos, //lista de produtos
              total: totalPagar.toFixed(2) //valor total a se pagar
            }
          })
          
          if (response.data.status === 'paid' || response.data.status === 'processing') { //se retornar paid or processing, quer dizer q parece q vai dar certo
            dispatch(CartActions.LimparCarrinho()) 
            Router.replace('/success')
          } else {
            setError(true)
          }
          break;
      }

    } catch (error) { //se algo der errado, set o erro
      setError(true)
    } finally {
      setloading(false)
    }
    
  }

  React.useEffect(() => { //se nao tiver produtos no carrinho, vai pra pagina de produtos
    tamanho_carrinho < 1 && Router.push('/produtos')
  }, [])


  const handleCepClick = async () => { //FUnction que lida com a consulta do cep
    const Get = GetFactory()
    const response = await Get.handle({ body: {}, url: `https://ws.apicep.com/cep/${getValues().Cep}.json` })
    if (response.StatusCode !== 200) { //se der erro na busca do cep, deu erro
      return
    }
    let Temporary: any = { ...addressEditable } //Copiando o State de Editaveis
    setcepValido(false)
    
    requiredFields.forEach(field => { //Reseta todos os campos antes da consulta
      Temporary[field.field] = true
    });

    
    if (response.body.status === 200) { //Se A consulta der certo
      requiredFields.forEach(field => { //Prenche os campos Inserindo os valores
        if (response.body[field.response] !== '') {
          setShowAddress(true)  //Seta para mostrar os campos de endereço
          setcepValido(true)
          
          setValue(field.field as keyof IValues, response.body[field.response], {shouldValidate: true})
        } else {  //Se uma informção não esta disponivel, o campo fica editavel
          Temporary[field.field] = false
        }
      });
      
    } if (response.body.status === 400 || response.body.status === 404) { //Se a consulta falhou, todos sao editaveis
      requiredFields.forEach(field => {
          Temporary[field.field] = false
      });
    }
    setAddressEditable(Temporary) //Seta os Campos selecionados
    
  }  


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
            <Formulario show={showAddress}>
              <h2>Informações do Comprador:</h2>
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
              <ContainerInput show={true}>
                <InputMask
                          mask="999.999.999-99"
                          placeholder="CPF"
                          {...register('Cpf', {required: true})}
                        />
                {errors && errors.Cpf && errors.Cpf.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
              </ContainerInput>
              <ContainerInput show={true} >
                <InputMask
                  mask="(99) 99999-9999"
                  placeholder="Whatsapp"
                  {...register('Whatsapp', {required: true})}
                />
                {errors && errors.Whatsapp && errors.Whatsapp.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
              </ContainerInput>
             
              <h2>Endereço de Entrega:</h2>
              <ContainerCep >
                  <ContainerInput show={true} readOnly={cepValido}>
                    <InputMask
                      mask="99999-999"
                      placeholder="Cep"
                    {...register('Cep', { required: true })}
                    disabled={cepValido}
                    />
                    {errors && errors.Cep && errors.Cep.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
                </ContainerInput>
                {cepValido ? 
                  <button onClick={(e) => {
                    e.preventDefault()
                    setcepValido(false)
                  }}>Trocar</button>
                :
                  <button onClick={(e) => {
                    e.preventDefault()
                    handleCepClick()
                  }}>Buscar</button>}
                  
                </ContainerCep>
              <div className="Endereco">
                <Input type="text"
                  placeholder="Endereco"
                  Register={register}
                  Error={errors.Endereco}
                  name="Endereco"
                  show={showAddress}
                  readonly={addressEditable.Endereco}
                />
                <Input type="number"
                  placeholder="Numero"
                  Register={register}
                  Error={errors.Numero}
                  name="Numero"
                  show={showAddress}
                />
              </div>  
              <Input type="text"
                placeholder="Bairro"
                Register={register}
                Error={errors.Bairro}
                name="Bairro"
                show={showAddress}
                readonly={addressEditable.Bairro}
              />
              <Input type="text"
                placeholder="Complemento"
                Register={register}
                Error={errors.Complemento}
                name="Complemento"
                show={showAddress}
              />
                 <Input type="text"
                  placeholder="Cidade"
                  Register={register}
                  Error={errors.Cidade}
                  name="Cidade"
                  show={showAddress}
                  readonly={addressEditable.Cidade}
              />
              {addressEditable.Estado ?
                <Input type="text"
                  placeholder="Estado"
                  Register={register}
                  Error={errors.Estado}
                  name="Estado"
                  show={showAddress}
                  readonly={addressEditable.Estado}
                /> :
                <SelectEstado placeholder="Estado"{...register('Estado', {required: true})} show={showAddress}>
                  {estados.UF.map((estado, index) => {
                    return <option value={estado.sigla} key={index} >{estado.nome}</option>
                  })}
                </SelectEstado>
              }
              
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
                    <ContainerInfoCard>
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
                    </ContainerInfoCard>
                    <SelectParcelas placeholder="Parcelas" onChange={e => handleChangeParcelas(e)}>
                      {Parcelas.map((parcela, index) => {
                        return (
                          <option
                            value={index}
                            key={index} 
                          >
                            {`${parcela.numero}x - ${parcela.numero === 1 || total > 200 ? 'Sem Juros': `Com ${Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                              }).format((parcela.acrescimo / 100) * total)} de juros`}`} 
                          </option>)
                      })}
                    </SelectParcelas>
                    </FormularioCard>
                  </CardInformations>
                </CardData>}
              <div className="AsideTotal">
             
                  <h2>Total ({tamanho_carrinho} itens): {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                  }).format(totalPagar)} </h2>
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

