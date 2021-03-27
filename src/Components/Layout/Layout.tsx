import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import Head from 'next/head'

const Layout: React.FC = ({children}) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      <main >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout