import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Footer from '../components/footer'
import { useRouter } from 'next/router'
import NextJSProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return <>
    <Provider store={store}>
      <div key={router.pathname} className='h-screen grid grid-rows-nav'>
        <NextJSProgress
          color="cyan"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <div className='grid grid-rows-auto relative'>
          <Component {...pageProps} />
          {/* <div className='bottom-0 absolute w-full'>
            <Footer />
          </div> */}
        </div>
      </div>
    </Provider>
  </>
}

export default MyApp
