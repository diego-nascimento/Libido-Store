import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import Head from 'next/head'
import React from 'react'
import LoadingPage from '../LoadingPage/LoadingPage'
import {PageContainer, Main} from './Layout.style'

const Layout: React.FC = ({ children }) => {
  const [Loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, Math.floor(Math.random() * (700 - 120 +1)) + 120)
  })

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

export default Layout

