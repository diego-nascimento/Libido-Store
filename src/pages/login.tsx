import Layout from '../Components/Layout/Layout'
import React from 'react'
import { Wrapper } from '../PageStyles/checkout.style'
import {Formulario, Container, Botao, ContainerLinks} from '../PageStyles/login.style'
import Head from 'next/head'
import Input from '../Components/Input/Input'
import {useForm} from 'react-hook-form'
import Link from 'next/link'
import { connect } from 'react-redux'
import * as userActions from '../store/modules/user/actions'
import {useRouter} from 'next/router'
import { IUserInfo } from '../Interfaces/IUserInfo'
import {IDataLogin} from '../Interfaces/IDataLogin'


interface ILogin{
  dispatch: any
  userInfo: IUserInfo | null
}
const Login: React.FC<ILogin> = ({dispatch, userInfo}) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const Router = useRouter()

  const handleLogin = (data: IDataLogin) => {
    dispatch(userActions.Login({ Email: data.Email, Senha: data.Senha }))
    Router.back();
  }

  React.useEffect(() => {
    if (userInfo) {
      Router.back();
    }
  })
  
  return (
    <Layout>
      <Head>
         <title>Libido LoveShop - Login</title>
      </Head>
      <Wrapper>
        <Container className="Container" >
          <Formulario onSubmit={handleSubmit(handleLogin) }>
            <p>Acesso com seu email</p>
            <Input type="text" placeholder="Email"  Register={register} Error={errors.Email}/>
            <Input type="password" placeholder="Senha" Register={register} Error={errors.Senha}/>
            <Botao type='submit'>Entrar</Botao>
            <ContainerLinks>
              <Link href="/">
                <a>Esqueci a Senha</a>
              </Link>
              <Link href="/signup">
               <a>Cadastre-se</a>
              </Link>
            </ContainerLinks>
          </Formulario>
        </Container>
      </Wrapper>
    </Layout>
  )
}


const mapStateToProps = (state: any)  => ({
  userInfo: state.user
});

export default connect(mapStateToProps)(Login)