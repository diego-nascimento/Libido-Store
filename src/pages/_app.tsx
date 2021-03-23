import { GlobalStyles } from '../styles/GlobalStyles';
import {AppProps} from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default App;
