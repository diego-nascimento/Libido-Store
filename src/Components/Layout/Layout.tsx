import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import Head from 'next/head'
import React from 'react'
import LoadingPage from '../LoadingPage/LoadingPage'
import { PageContainer, Main } from './Layout.style'
import { connect } from 'react-redux'
import * as CartActions from '../../store/modules/cart/actions'
import * as userActions from '../../store/modules/user/actions'
interface ILayout {
  children: any
  dispatch: any
}

const Layout: React.FC<ILayout> = ({ children, dispatch }) => {
  const [Loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dispatch(CartActions.PegarCarrinhoLocalStorage())
    setTimeout(() => {
      setLoading(false)
    }, Math.floor(Math.random() * (700 - 120 +1)) + 120)
  }, [])

  React.useEffect(() => {
    dispatch(userActions.AutoLogin())
  }, [])

  return (
    Loading ? <LoadingPage /> :
    <PageContainer>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      <Main >
        {children}
      </Main>
      <Footer />
    </PageContainer>
  )
}

export default connect()(Layout)

