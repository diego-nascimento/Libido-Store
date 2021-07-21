import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import Head from 'next/head'
import React from 'react'
import LoadingPage from '../LoadingPage/LoadingPage'
import { PageContainer, Main } from './Layout.style'
import { connect } from 'react-redux'
import * as CartActions from '../../store/modules/cart/actions'
import { ICategoria } from '../../typing/Interfaces/ICategoria'
import { useRouter } from 'next/router'
import NavBag from '../NavBag/NavBag'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { useFrete } from '../../contexts/freteContexts'
import { usePagamento } from '../../contexts/pagamentoContexts'
interface ILayout {
  children: any
  dispatch: any
  carrinho?: boolean
  categorias?: Array<ICategoria>
}

const Layout: React.FC<ILayout> = ({ children, dispatch, carrinho, categorias }: ILayout) => {
  const [Loading, setLoading] = React.useState(true)
  const Router = useRouter()
  const { loading: LoadingFrete } = useFrete()
  const { loading: LoadingPayment } = usePagamento()
  React.useEffect(() => {
    dispatch(CartActions.PegarCarrinhoLocalStorage())
    setTimeout(() => {
      setLoading(false)
    }, Math.floor(Math.random() * (700 - 120 + 1)) + 120)
  }, [])

  return (
    Loading
      ? <LoadingPage />
      : <PageContainer>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        {Router.pathname === '/carrinho' ? <NavBag /> : <Nav carrinho={carrinho} categorias={categorias}/>}
        <Backdrop open={LoadingFrete || LoadingPayment} style={{ zIndex: 99 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Main >
          {children}
        </Main>
        <Footer />
      </PageContainer>
  )
}

export default connect()(Layout)
