import React from 'react'
import Layout from '../Components/Layout/Layout'
import {Wrapper, Container, ErrorContainer,ProdutosContainer, BotaoFinalizar, Formulario, Methods, ListMethods, PaymentMethods, CardData, CardInformations, FormularioCard, Aside, ContainerInfoCard, SelectParcelas, SelectEstado, ContainerCep, TotalsInfo} from '../styles/PageStyles/checkout.style'
import {connect} from 'react-redux'
import Head from 'next/head'
import { useForm } from "react-hook-form";
import Input from '../Components/Input/Input'
import { IProduto } from '../typing/Interfaces/IProduto'
import Router from 'next/router'
import * as CartActions from '../store/modules/cart/actions'
import InputMask from 'react-input-mask'
import { GoAlert } from 'react-icons/go'
import {Container as ContainerInput} from '../Components/Input/Input.style'
import { styles } from '../styles/styles'
import {normalize} from '../Util/Normalize'
import { IBoletoInfo } from './api/pagamento/boleto'
import {estados} from '../Util/Estados'
import { Parcelas } from '../Util/Parcelas'
import { requiredFields } from '../Util/EnderecoRequiredFields'
import { GetFactory } from '../Factory/http/GetFactory'
import { IValues } from '../typing/types/ICheckoutValues'
import { IDataForm } from '../typing/Interfaces/IReactHookDataForm'
import { PostFactory } from '../Factory/http/PostFactory'
import { PagamentoCard } from '../Util/Pagamentos/PagamentoCard'
import { IFreteInfo } from '../typing/Interfaces/IFreteInfo'
import { PagamentoBoleto } from '../Util/Pagamentos/PagamentoBoleto'
import { ICategoria } from '../typing/Interfaces/ICategoria'

interface CarrinhoProps{
  produtos: Array<IProduto>
  tamanho_carrinho: number
  total: number
  dispatch: any
  categorias: Array<ICategoria>
}


const Checkout: React.FC<CarrinhoProps> = ({
  produtos,
  tamanho_carrinho,
  total,
  dispatch,
  categorias
}) => {

  const { register, handleSubmit, formState: { errors}, unregister, setValue, getValues } = useForm();
  const [paymentMethod, setpaymentMethod] = React.useState(0)
  const [loading, setloading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [errorsMessages, setErrorsMessages] = React.useState<string[]>([])
  const [parcelas, setParcelas] = React.useState(1)
  const [totalPagar, settotalPagar] = React.useState(total)
  const [addressEditable, setAddressEditable] = React.useState({ //State se campos estão editaveis ou não
    Cidade: true,
    Estado: true,
    Bairro: true,
    Endereco: true
  })
  const [Frete, setFrete] = React.useState(0) //Qual frete foi selecionado, 0 para boleto, 1 para cartao
  const [cepValido, setcepValido] = React.useState(false) //estado que define se um cep valido foi inserido ou nao
  const [fretes, setFretes] = React.useState([ //estado onde sao salvos as informações sobre os serviços de frete
    {
      FreteValor: 0,
      prazo: 0
    }, {
      FreteValor: 0,
      prazo: 0
    }
  ])
  const [showAddress, setShowAddress] = React.useState(false) //State se deve ou não mostrar os campos de endereço

  
  React.useEffect(() => { //se nao tiver produtos no carrinho, vai pra pagina de produtos
    tamanho_carrinho < 1 && Router.push('/produtos')
  }, [])

  React.useEffect(() => { //calcula o valor atualizado baseado no numero de parcelas
    if (paymentMethod === 0) { //se o metodo for boleto
      setParcelas(1) //vai ser sempre apenas uma parcela
      settotalPagar(total + fretes[Frete].FreteValor) //e o valor vai ser sempre o inicial
    } else {
      if (total < 200) { //acima de 200 reais sem juros
        settotalPagar((total + fretes[Frete].FreteValor) + ((total + Frete) * Parcelas[parcelas - 1].acrescimo / 100))
        
        
        /*
          calculando o valor atualizado baseado na parcela -
          (valor dos produtos + valor do frete) + ((valor dos produtos + frete) * a porcentagem de acrescimo do parcelamento))

          fretes = estado onde estao salvos as informações referente aos serviços de frete
          Frete = Qual serviço esta selecionado, PAC ou sedex
          Parcelas = Array com as quantidades de parcelas e os seus acrescimos
          parcelas = numero de parcelas selecionada pelo usuario
        */
      }
    }
  }, [parcelas, paymentMethod, Frete, fretes])


  
  React.useEffect(() => { //atualiza os campos de endereço se o estado de cep valido alterar
    if (!cepValido) {
      unregister('Cidade') //faz com q o react hook form nao registre os valores de endereço 
      unregister('Estado')
      unregister('Bairro')
      unregister('Numero')
      unregister('Endereco')
      unregister('Complemento')
      requiredFields.forEach(field => { //Limpa os campos de Endereço quando um Cep valido nao esta inserido
        setValue(field.field as keyof IValues, '')
      });
      setValue('Cep', '')
      setShowAddress(false)
      setFretes([ //reseta valores de frete
        {
          FreteValor: 0,
          prazo: 2
        },
        {
          FreteValor: 0,
          prazo: 2
        }
      ])
    } else {
      getFreteValues()
      register('Cidade')
      register('Estado')
      register('Bairro')
      register('Numero')
      register('Endereco')
      register('Complemento')
      
    }
  }, [cepValido])


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



  
  const handleCepClick = async () => { //FUnction que lida com a consulta de informações do cep
    const Get = GetFactory()
    const response = await Get.handle({ body: {}, url: `https://api.pagar.me/1/zipcodes/${getValues().Cep}` })
    if (response.StatusCode !== 200) { //se der erro na busca do cep, deu erro
      setError(true)
      if(!errorsMessages.find(error => error === 'Por favor, insira um CEP valido' )){
        setErrorsMessages([...errorsMessages, 'Por favor, insira um CEP valido'])
      }
      return
    }
    setErrorsMessages(errorsMessages.filter(error => error !== 'Por favor, insira um CEP valido'))
    let Temporary: any = { ...addressEditable } //Copiando o State de Editaveis
    setcepValido(false)
    
    requiredFields.forEach(field => { //Reseta todos os campos antes da consulta
      Temporary[field.field] = true
    });

    
    if (response.StatusCode === 200) { //Se A consulta der certo
      requiredFields.forEach(field => { //Prenche os campos Inserindo os valores
        if (response.body[field.response] && response.body[field.response] !== null && response.body[field.response] !== '') { // Se essa condição for verdadeira, entao o cep é valido
          setcepValido(true) //Seta o Cep como valido
          setShowAddress(true)  //Seta para mostrar os campos de endereço
          setValue(field.field as keyof IValues, response.body[field.response], {shouldValidate: true}) //inseri o valor no campo e faz a validação atrasves do reacthookform
        } else {  //Se uma informção não esta disponivel, o campo fica editavel
          Temporary[field.field] = false 
        }
      });
      
    }
    setAddressEditable(Temporary) //Altera o estado com os campos editaveis
    setError(false)
  }  

  
  
  const getFreteValues = async () => { //função que conslta no correio os valores e serviços de frete
    setloading(true)
    if (normalize(getValues().Cep) === '36170000' || !cepValido) { // se o cep é de pirauba, prazo é de 2 dias e o valor é 0
      setloading(false)
      return setFretes([
        {
          FreteValor: 0,
          prazo: 2
        },
        {
          FreteValor: 0,
          prazo: 2
        }
      ])
    } else {
      const postApi = PostFactory()
      let response = await postApi.handle({
        url: 'api/correios',
        body: {
          cep: getValues().Cep,
          servico: '04510'
        }
      })
      
      let ValorStr: string = response.body.Servicos.cServico.Valor._text //a informação vem em xml e como texto
      if (Number.parseFloat(ValorStr.replace(',', '.')) === 0) { //se o valor do serviço retornado, quer dizer que algo esta errado nas informações do correio
        setloading(false)  //finaliza o esado de carregamento
        return setcepValido(false) //com isso o cep fica invalido
      }

      const PAC: IFreteInfo = { //organiza as informações do PAC
        FreteServico: 'PAC',
        prazo: Number.parseInt(response.body.Servicos.cServico.PrazoEntrega._text),
        FreteValor: Number.parseFloat(ValorStr.replace(',', '.'))
      }
      response = await postApi.handle({
        url: 'api/correios',
        body: {
          cep: getValues().Cep,
          servico: '04014'
        }
      })
      ValorStr = response.body.Servicos.cServico.Valor._text //xml em texto
      const SEDEX: IFreteInfo = {
        FreteServico: 'Sedex',
        prazo: Number.parseInt(response.body.Servicos.cServico.PrazoEntrega._text),
        FreteValor: Number.parseFloat(ValorStr.replace(',', '.'))
      }
      if(total > 250){
        setloading(false)
        return setFretes([
          {
            FreteValor: 0,
            prazo: PAC.prazo
          },
          {
            FreteValor: 0,
            prazo: SEDEX.prazo
          }
        ])
      }
      setFretes([ //seta o estado com os novos valores dos serviços de frete
        {
          FreteValor: PAC.FreteValor,
          prazo: PAC.prazo
        },
        {
          FreteValor: SEDEX.FreteValor,
          prazo: SEDEX.prazo
        }
      ])
    }   
    setloading(false)
  }



  const handleChangeParcelas = (e: any) => { //seta o numero de parcelas
    const indice = Number.parseInt(e.target.value) //transforma o valor em numero
    setParcelas(Parcelas[indice].numero) //pega da tabela de parcelas o numero dela baseado no indice do select
  }
  
  const handleSubmitForm = async (data: IDataForm) => {
    if (!cepValido) { //se ao apertar em finalizar pedido, o cep estiver invalido. Setar como error
      setError(true)
      if(!errorsMessages.find(error => error === 'Um CEP valido deve ser buscado' )){
        setErrorsMessages([...errorsMessages, 'Um CEP valido deve ser buscado'])
      }
      return
    }
    setErrorsMessages(errorsMessages.filter(error => error !== 'Um CEP valido deve ser buscado'))
    
    let FreteServico: string
    if(normalize(data.Cep) === '36170000'){ //se o frete é para o cep 36170000, iremos entregar na casa
      FreteServico = 'Entregaremos em sua casa'
    }else{
      FreteServico = Frete === 0 ? 'PAC': 'SEDEX';
    }
    data.parcelas = parcelas //recupera o numero de parcelas
    try {
      setloading(true)
      setError(false);
      switch (paymentMethod) {
        case 0: //Metodo de pagamentot boleto
          const boletoPaymentResponse = await PagamentoBoleto({
            produtos,
            data, 
            FreteServico,
            Frete: fretes[Frete],
            totalPagar
          })
          if (boletoPaymentResponse.body.status === 'waiting_payment') { //se o estado esta como processing, quer dizer que deu certo
            dispatch(CartActions.LimparCarrinho()) //limpa carrinho
            return Router.replace('/success') //vai pra pagina de sucesso
          } else {
            setError(true)
            if(!errorsMessages.find(error => error === 'Algo deu Errado, por favor verifique as informações e tente novamente' )){
              setErrorsMessages([...errorsMessages, 'Algo deu Errado, por favor verifique as informações e tente novamente'])
            }
          }
          break;
        default: //metodo de pagamento cartao de credito
          const cardPaymentResponse = await PagamentoCard({
            produtos,
            data,
            FreteServico,
            Frete: fretes[Frete],
            totalPagar
          })
          if (cardPaymentResponse.body.status === 'paid' || cardPaymentResponse.body.status === 'processing') { //se retornar paid or processing, quer dizer q deu certo, a menos que o algo errado aconteça. 
            dispatch(CartActions.LimparCarrinho()) 
            Router.replace('/success')
          } else {
            setError(true)
            if(!errorsMessages.find(error => error === 'Algo deu Errado, por favor verifique as informações e tente novamente' )){
              setErrorsMessages([...errorsMessages, 'Algo deu Errado, por favor verifique as informações e tente novamente'])
            }
          }
          break;
      }

    } catch (error) { //se algo der errado, set o erro
      setError(true)
      if(!errorsMessages.find(error => error === 'Algo deu errado, verifique as informações e tente novamente!' )){
        setErrorsMessages([...errorsMessages, 'Algo deu errado, verifique as informações e tente novamente!'])
      }
    } finally {
      setloading(false)
    }
  }


  return(
    <Layout carrinho={true} categorias={categorias}>
      <Head>
        <title>Libido LoveShop - Checkout </title>
      </Head>
       <Wrapper >
         <Container className="Container">
          <h1>Checkout </h1>
          {error? errorsMessages.map((error, index) => {
            return <ErrorContainer key={index}><p><GoAlert/>{error}</p></ErrorContainer>
          }): null}
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
                  {...register('Cpf', { required: true })}
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
             
              <h2 style={{marginTop: '10px'}}>Endereço de Entrega:</h2>
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
                {
                  loading ?
                    <button onClick={(e) => {
                    }}>Carregando</button> :
                    cepValido ? 
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
                <SelectEstado placeholder="Estado"{...register('Estado', {required: true})} show={true}>
                  {estados.UF.map((estado, index) => {
                    return <option value={estado.sigla} key={index} >{estado.nome}</option>
                  })}
                </SelectEstado>
              }
              {cepValido && normalize(getValues().Cep) === '36170000' ? 
                <ContainerInput borderColor={styles.fontColorInDark} show={true}>
                  <input type="text"
                    value="Entregamos na sua casa"
                    disabled
                    style={
                      {
                        cursor: 'default',
                        background: styles.componentsDest,
                        color: styles.fontColorInDark
                      }
                    }
                  />
                </ContainerInput>
                  :
                <SelectEstado placeholder="Frete" onChange={(e) => setFrete(Number.parseInt(e.target.value))}  show={showAddress}>
                <option value={0}  >PAC</option>
                <option value={1} >Sedex</option>
              </SelectEstado>
            }
              <PaymentMethods>
              <h2>Metodo de Pagamento:</h2>
                <ListMethods>
                  <Methods onClick={() => setpaymentMethod(0)} option={paymentMethod}>Boleto</Methods>
                  <Methods onClick={() => setpaymentMethod(1)} option={paymentMethod}>Cartão de Credito</Methods>
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
                    <ContainerInput borderColor={styles.fontColorInDark} show={true}>
                      <InputMask
                        mask="9999 9999 9999 9999"
                        placeholder="Numero do Cartão"
                        {...register('CardNumber', {required: true})}
                        name={'CardNumber'}
                      />
                      {errors && errors.CardNumber && errors.CardNumber.type === "required" && <p><GoAlert />Esse Campo é Obrigatorio</p>}
                    </ContainerInput>
                    <ContainerInfoCard>
                      <ContainerInput borderColor={styles.fontColorInDark} show={true}>
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
                              }).format((total + Frete) * parcela.acrescimo/100)} de juros`}`} 
                          </option>)
                      })}
                    </SelectParcelas>
                    </FormularioCard>
                  </CardInformations>
                </CardData>}
              <div className="AsideTotal">
                <TotalsInfo>
                  <h2>SubTotal: {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(total)}  {fretes[Frete].FreteValor === 0 ? null: '+'}   
                  </h2>
                  
                  {fretes[Frete].FreteValor === 0 ? null: 
                    <h2>Frete: {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(fretes[Frete].FreteValor)} +
                      <p style={{ padding: '0px', margin: '0px'}}>Prazo de entrega: {fretes[Frete].prazo} dias</p>
                  </h2>
                  }

                  {(total + Frete) * Parcelas[parcelas - 1].acrescimo / 100 === 0 ? null : 
                    <h2>Juros: {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                  }).format((total + Frete) * Parcelas[parcelas - 1].acrescimo/100)} </h2>
                  }
                  <h2>Total ({tamanho_carrinho} {tamanho_carrinho === 1? 'Item': 'Itens'}): {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                  }).format(totalPagar)} </h2>
                </TotalsInfo>
                <BotaoFinalizar onClick={handleSubmit(handleSubmitForm)} disabled={loading}>{loading? 'Carregando!!': 'Finalizar Pedido!'}</BotaoFinalizar>
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

export async function getStaticProps({ params }: any) {
  const api = GetFactory()
 
  const responseCategorias = await api.handle({
    body: null,
    url: `${process.env.APIURL}/categorias`
  })
  
   const revalidateTime: string | undefined = process.env.REVALIDATETIME 
  return {
    props: {
      categorias: responseCategorias.body,
    },
  }
}

