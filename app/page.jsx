"use client"; // this is a client component
import Image from 'next/image'
import Head from 'next/head'
import SignupModal from '../components/auth/SignupModal';
import SigninComp from '../components/auth/SigninComp';


export default function Home() {
  return (
    <div>
      <Head>
        <title>WRCMS</title>
        <meta name="description" content="College management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Dashboard /> */}
      <div>
        <SignupModal />
        <SigninComp />
      </div>
    </div>
  )
}
