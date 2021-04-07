import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App:any) => (props:any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="pt_BR">
        <Head>  
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" type="text/css" href="/nprogress.css"/>
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,300&display=swap" rel="stylesheet" />
          <link
            rel="preload"
            href="/fonts/Vintage/Vintage-Edge.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Vintage/Vintage-Modern.ttf"
            as="font"
            crossOrigin=""
          />
          <link href="https://fonts.googleapis.com/css2?family=Khula&display=swap" rel="stylesheet" />
          <script src="https://unpkg.com/react/umd/react.production.min.js"></script>

          <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
          <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-00GF13YP96`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-00GF13YP96', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
