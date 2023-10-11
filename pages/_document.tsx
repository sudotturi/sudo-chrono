import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"/>
        <meta name="theme-color" content="#fff" />
        <meta charSet="utf-8"/>
        <meta name="robots" content="index, follow"/>
        <meta name="msapplication-TileColor" content="#FFFFFF"></meta>
        <meta name="keywords" content="to-do, todo, task, list, notes, organize, productivity"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="black"></meta>
        <meta property="og:image:width" content="200"></meta>
        <meta property="og:image:height" content="200"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="Sudo Folks To Do"></meta>
        <meta property="og:site_name" content="Sudo Folks To Do"></meta>
        <meta property="og:url" content="https://todo.sudofolks.com/"></meta>
        <meta property="og:image" content="https://cdn.sudofolks.com/uploads/img/sudofolksb.png"></meta>
        <meta property="og:image:alt" content="Sudo Folks To Do"></meta>
        <meta property="og:locale" content="En"></meta>
        <meta name="twitter:app:country" content="IN"></meta>
        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@SudoFolks"></meta>
        <meta name="twitter:description" content="Sudo Folks To Do is a  online productivity tool. Manage your to-do list and Increases productivity, Provides motivation."></meta>
        <meta name="twitter:title" content="Sudo Folks To Do"></meta>
        <meta name="twitter:creator" content="@SudoFolks"></meta>
        <meta name="twitter:image" content="https://cdn.sudofolks.com/uploads/img/sudofolksb.png"></meta>
        <meta property="og:description" content="Sudo Folks To Do is a  online productivity tool. Manage your to-do list and Increases productivity, Provides motivation."></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
