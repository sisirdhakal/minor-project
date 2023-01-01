import Head from 'next/head'
import Image from 'next/image'
import Signin from '../components/auth/Signin'
import Signup from '../components/auth/Signup'
import SignupModal from '../components/auth/SignupModal'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>WRCMS</title>
        <meta name="description" content="College management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignupModal />
      {/* <Signin /> */}
      <Signup />
    </div>
  )
}
