import React from 'react'
import { usePagamento } from '../../contexts/pagamentoContexts'
import { Parcelas } from '../../Util/Parcelas'
import { useFrete } from '../../contexts/freteContexts'
import { Container, EnderecoContainer, EntregaInformation, InfoContainer, Endereco, ClientInformation, PagamentoContainer } from './Pagamento.style'
import { useStep } from '../../contexts/cartStep'

const Pagamento:React.FC = () => {
  const { AvailableMethods, setMethod, method } = usePagamento()
  const { getFormularioInformations, returnFreteSelected } = useFrete()
  const { setStep } = useStep()
  const ClienteInformations = getFormularioInformations()
  const FreteInformation = returnFreteSelected()
  return (
    <Container>
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
      <PagamentoContainer>

      </PagamentoContainer>
    </Container>
  )
}

export default Pagamento
