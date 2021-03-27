import Head from 'next/head'
import Layout from '../Components/Layout/Layout'
import {SobreContainer} from '../PageStyles/sobre.style'

const Sobre: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Libido Store - Sobre</title>
      </Head>
      <SobreContainer>
        <h1>Sobre</h1>
      </SobreContainer>
    </Layout>
  )
}

export default Sobre
