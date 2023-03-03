import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <meta charSet="utf-8" />
        <meta name="description" content="Riasu player, site para assistir filmes e canais de tv" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
