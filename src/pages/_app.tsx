import { GlobalStyles } from '../styles/GlobalStyles';
import { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import {Provider} from 'react-redux'
import store from '../store'
import 'bootstrap/dist/css/bootstrap.min.css';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
  NProgress.set(0.4)
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
