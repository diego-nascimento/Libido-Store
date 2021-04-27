import { GlobalStyles } from '../styles/GlobalStyles';
import { AppProps } from 'next/app'
import  { useRouter } from 'next/router'
import {Provider} from 'react-redux'
import store from '../store'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import * as gtag from "../Util/GTM";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  
  React.useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);


  return (
    
      <Provider store={store}>
        <GlobalStyles />
      
          <Component {...pageProps} />
        
      </Provider>
    
  );
}

export default App;
