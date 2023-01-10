import Head from 'next/head'
import Image from 'next/image'
import Dashboard from '../components/dashboard'

export default function Home() {
  return (
    <div>
      <Head>
        <title>WRCMS</title>
        <meta name="description" content="College management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </div>
  )
}
