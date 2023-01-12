import Head from 'next/head'
import Image from 'next/image'
import SigninComp from '../components/auth/SigninComp'
import SignupModal from '../components/auth/SignupModal'

export default function Home() {
  return (
    <div>
      <Head>
        <title>WRCMS</title>
        <meta name="description" content="College management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <SignupModal />
        <SigninComp />
      </div>
    </div>
  )
}
