import { GlobalStyles } from '../styles/GlobalStyles';
import { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import {Provider} from 'react-redux'
import store from '../store'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'


Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
  NProgress.set(0.4)
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  
const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log(url)
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      console.log('aqui')
      router.events.off('routeChangeComplete', handleRouteChange)
    }
}, [router.events])
  

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
