// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
	    <link rel="stylesheet" href="/static/main.css" type="text/css"/>
	    </Head>
        <body className="myBody">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
