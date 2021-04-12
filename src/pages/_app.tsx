import { GlobalStyles } from '../styles/GlobalStyles';
import { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import {Provider} from 'react-redux'
import store from '../store'
import 'bootstrap/dist/css/bootstrap.min.css';
//import ReactGA from 'react-ga';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {GTMPageView} from '../Util/GTM'

//ReactGA.initialize('G-BBVH66MQTY')



Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
  NProgress.set(0.4)
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  
  const router = useRouter()
  useEffect(() => {
     const handleRouteChange = (url: string) => GTMPageView(url);
        Router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            Router.events.off('routeChangeComplete', handleRouteChange);
        };
  }, [router.events])
  
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
