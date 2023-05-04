import axios from 'axios';
import Head from 'next/head'
import SigninComp from '../components/auth/SigninComp'
import SignupModal from '../components/auth/SignupModal'

export default function Home({ csrf }) {
  return (
    <div className='h-full'>
      <Head>
        <title>WRCMS</title>
        <meta name="description" content="College management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=''>
        <SignupModal />
        <SigninComp csrf={csrf} />
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  try {

    await axios.get(`http://localhost:8000/api/get-csrf/`, { withCredentials: true });
  } catch (error) {
    // console.log(error)
  }

  const token = req?.cookies?.csrftoken || null

  if (token) {
    return {
      props: {
        csrf: token,
      },
    };
  } else {
    return {
      props: {
        csrf: "null"
      },
    };
  }
};
