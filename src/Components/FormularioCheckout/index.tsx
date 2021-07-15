import React from 'react'
import Input from '../Input/Input'
import { GoAlert } from 'react-icons/go'
import { Container as ContainerInput } from '../Input/Input.style'
import { estados } from '../../Util/Estados'
import { styles } from '../../styles/styles'
import { normalize } from '../../Util/Normalize'
import { requiredFields } from '../../Util/EnderecoRequiredFields'
import { IValues } from '../../typing/types/ICheckoutValues'
import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'

import {
  Formulario, SelectEstado, ContainerCep, ErrorContainer
} from './FormularioCheckout.style'
import { GetFactory } from '../../Factory/http/GetFactory'
import { useFrete } from '../../contexts/freteContexts'

const FormularioCheckout: React.FC = () => {
  const { cepValido, loading, setFrete, setcepValido, setError, error, errors, getValues, register, setValue, addressEditable, setAddressEditable, setShowAddress, showAddress, FreteSelected, control } = useFrete()

  const handleCepClick = async () => { // Function que lida com a consulta de informações do cep
    const Get = GetFactory()
    const response = await Get.handle({ body: {}, url: `https://api.pagar.me/1/zipcodes/${normalize(getValues().Cep)}` })
    if (response.StatusCode !== 200) { // se der erro na busca do cep, deu erro
      setError('Por favor, insira um CEP valido')
      return
    }
    const Temporary: any = { ...addressEditable } // Copiando o State de Editaveis
    setcepValido(false)

    requiredFields.forEach((field) => { // Reseta todos os campos antes da consulta
      Temporary[field.field] = true
    })

    if (response.StatusCode === 200) { // Se A consulta der certo
      requiredFields.forEach((field) => { // Prenche os campos Inserindo os valores
        if (response.body[field.response] && response.body[field.response] !== null && response.body[field.response] !== '') { // Se essa condição for verdadeira, entao o cep é valido
          setcepValido(true) // Seta o Cep como valido
          setShowAddress(true) // Seta para mostrar os campos de endereço
          setValue(field.field as keyof IValues, response.body[field.response], { shouldValidate: true }) // inseri o valor no campo e faz a validação atrasves do reacthookform
        } else { // Se uma informção não esta disponivel, o campo fica editavel
          Temporary[field.field] = false
        }
      })
    }
    setAddressEditable(Temporary) // Altera o estado com os campos editaveis
    setError(null)
  }

  return (
            <Formulario show={showAddress} >
              {error &&
                <ErrorContainer >
                 <p>
                  <GoAlert />
                  {error}
                </p>
                </ErrorContainer>
              }
              <h2>Informações do Comprador:</h2>
              <Input
                type="text"
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
              <ContainerInput show>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    max: 9,
                    min: 9
                  }}
                  name='Cpf'
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputMask
                      mask="999.999.999-99"
                      placeholder="CPF"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors && errors.Cpf && errors.Cpf.type === 'required' && (
                  <p>
                    <GoAlert />
                    Esse Campo é Obrigatorio
                  </p>
                )}
              </ContainerInput>
              <ContainerInput show>
                <Controller
                    control={control}
                    rules={{
                      required: true,
                      max: 11,
                      min: 11
                    }}
                    name='Whatsapp'
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputMask
                        mask="(99)99999-9999"
                        placeholder="Whatsapp"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                {errors && errors.Whatsapp && errors.Whatsapp.type === 'required' && (
                <p>
                  <GoAlert />
                  Esse Campo é Obrigatorio
                </p>
                )}
              </ContainerInput>

              <h2 style={{ marginTop: '10px' }}>Endereço de Entrega:</h2>
              <ContainerCep>
                <ContainerInput show readOnly={cepValido}>
                <Controller
                    control={control}
                    rules={{
                      required: true,
                      max: 8,
                      min: 8
                    }}
                    name='Cep'
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputMask
                        mask="99999-999"
                        placeholder="CEP"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  {errors && errors.Cep && errors.Cep.type === 'required' && (
                  <p>
                    <GoAlert />
                    Esse Campo é Obrigatorio
                  </p>
                  )}
                </ContainerInput>
                {
                  loading
                    ? (
                      <button onClick={(e) => {
                      }}
                      >
                        Carregando

                      </button>
                      )
                    : cepValido
                      ? (
                        <button onClick={(e) => {
                          e.preventDefault()
                          setcepValido(false)
                        }}
                        >
                          Trocar

                        </button>
                        )
                      : (
                        <button onClick={(e) => {
                          e.preventDefault()
                          handleCepClick()
                        }}
                        >
                          Buscar
                        </button>
                        )
}
              </ContainerCep>
              <div className="Endereco">
                <Input
                  type="text"
                  placeholder="Endereço"
                  Register={register}
                  Error={errors.Endereco}
                  name="Endereco"
                  show={showAddress}
                  readonly={addressEditable.Endereco}
                />
                <Input
                  type="number"
                  placeholder="Numero"
                  Register={register}
                  Error={errors.Numero}
                  name="Numero"
                  show={showAddress}
                />
              </div>
              <Input
                type="text"
                placeholder="Bairro"
                Register={register}
                Error={errors.Bairro}
                name="Bairro"
                show={showAddress}
                readonly={addressEditable.Bairro}
              />
              <Input
                type="text"
                placeholder="Complemento"
                Register={register}
                Error={errors.Complemento}
                name="Complemento"
                show={showAddress}
              />
              <Input
                type="text"
                placeholder="Cidade"
                Register={register}
                Error={errors.Cidade}
                name="Cidade"
                show={showAddress}
                readonly={addressEditable.Cidade}
              />
              {addressEditable.Estado
                ? (
                  <Input
                    type="text"
                    placeholder="Estado"
                    Register={register}
                    Error={errors.Estado}
                    name="Estado"
                    show={showAddress}
                    readonly={addressEditable.Estado}
                  />
                  )
                : (
                  <SelectEstado placeholder="Estado" {...register('Estado', { required: true })} show>
                    {estados.UF.map((estado, index) => <option value={estado.sigla} key={index}>{estado.nome}</option>)}
                  </SelectEstado>
                  )}
              {cepValido && normalize(getValues().Cep) === '36170000'
                ? (
                  <ContainerInput borderColor={styles.fontColorInDark} show>
                    <input
                      type="text"
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
                  )
                : (
                  <SelectEstado placeholder="Frete" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFrete(Number.parseInt(e.target.value))} show={showAddress} value={FreteSelected}>
                   <option value={0}>PAC</option>
                    <option value={1}>Sedex</option>
                  </SelectEstado>
                  )}
            </Formulario>
  )
}

export default FormularioCheckout
