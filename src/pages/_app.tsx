import { GlobalStyles } from '../styles/GlobalStyles';
import { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
  NProgress.set(0.4)
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default App;
