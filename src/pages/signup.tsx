import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Wrapper } from '../PageStyles/checkout.style'
import { Formulario, Container, Botao, ContainerLinks } from '../PageStyles/login.style'
import {useForm} from 'react-hook-form'
import Head from 'next/head'
import Input from '../Components/Input/Input'
import Link from 'next/link'

const Signup: React.FC = () => {
  const {handleSubmit, register, formState:{errors}} = useForm()

  const handleSignup = (data: any) => {
    
  }

  return (
   <Layout>
      <Head>
         <title>Libido LoveShop - Login</title>
      </Head>
      <Wrapper>
        <Container className="Container" >
          <Formulario onSubmit={handleSubmit(handleSignup) }>
            <p>Criar sua conta</p>
            <Input type="text" placeholder="Email" Register={register} Error={errors.Email} />
            <Input type="text" placeholder="Nome" Register={register} Error={errors.Nome} />
            <Input type="password" placeholder="Senha" Register={register} Error={errors.Senha}/>
            <Botao type='submit'>Criar</Botao>
          </Formulario>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default Signup