import React from 'react'
import { usePagamento } from '../../contexts/pagamentoContexts'
import { Parcelas } from '../../Util/Parcelas'
import { useFrete } from '../../contexts/freteContexts'
import { Container, EnderecoContainer, EntregaInformation, InfoContainer, Endereco, ClientInformation, PagamentoWrapper, PagamentoContainer, MethodsContainer, Method, WrapperPayment } from './Pagamento.style'
import { useStep } from '../../contexts/cartStep'
import { ImBarcode, ImCreditCard } from 'react-icons/im'
import { GrDeliver } from 'react-icons/gr'
import Boleto from './Components/Boleto/index'
import PaymentOnDelivery from './Components/PaymentOnDelivery'
import CreditCard from './Components/Cartao'

const Pagamento:React.FC = () => {
  const { AvailableMethods, setMethod, method: SelectedMethod } = usePagamento()
  const { getFormularioInformations, returnFreteSelected } = useFrete()
  const { setStep } = useStep()
  const ClienteInformations = getFormularioInformations()
  const FreteInformation = returnFreteSelected()
  const { cepValido, getValues } = useFrete()
  const { Methods, setavailableMethods } = usePagamento()

  React.useEffect(() => {
    cepValido && getValues && getValues().Cep === '36170-000'
      ? setavailableMethods(Methods)
      : setavailableMethods([Methods[0], Methods[1]])
  }, [cepValido])

  return (
    <Container>
      <PagamentoWrapper>
        <h2>Escolha a melhor forma de pagamento</h2>
        <PagamentoContainer>
          <MethodsContainer>
              {AvailableMethods.map((method, index) => {
                return (
                  <Method key={index} onClick={() => setMethod(index)} selected={SelectedMethod === index}>
                    {method === 'Boleto' && <ImBarcode />}
                    {method === 'Cartao' && <ImCreditCard />}
                    {method === 'Pagamento na entrega' && <GrDeliver />}
                    <span>{method}</span>
                  </Method>
                )
              })}
          </MethodsContainer>
          <WrapperPayment>
              {SelectedMethod === 0 && <Boleto />}
              {SelectedMethod === 1 && <CreditCard />}
              {SelectedMethod === 2 && <PaymentOnDelivery />}
          </WrapperPayment>
        </PagamentoContainer>
      </PagamentoWrapper>
      <EnderecoContainer>
        <InfoContainer>
          <Endereco>
            <h4>Endereço de entrega:</h4>
            <p>{ClienteInformations.Endereco}, {ClienteInformations.Numero}</p>
            <p>{ClienteInformations.Cep}</p>
            <p>{ClienteInformations.Bairro} - {ClienteInformations.Cidade} - {ClienteInformations.Estado}</p>
          </Endereco>
          <ClientInformation>
            <h4>Informaçoes:</h4>
            <p>{ClienteInformations.Nome}</p>
            <p>{ClienteInformations.email}</p>
            <p>{ClienteInformations.Whatsapp}</p>
          </ClientInformation>
          <p className='Editar' onClick={() => setStep(1)}>Editar</p>
        </InfoContainer>
        <EntregaInformation>
          <p>{ClienteInformations.Cep === '36170-000' ? 'Entregamos pessoalmente' : FreteInformation.servico}: {FreteInformation.FreteValor === 0
            ? 'Gratis'
            : Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(FreteInformation.FreteValor)}</p>
          <p>Prazo de entrega: até {FreteInformation.prazo} dias úteis</p>
        </EntregaInformation>
      </EnderecoContainer>
    </Container>
  )
}

export default Pagamento
