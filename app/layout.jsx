"use client"; // this is a client component
import { Provider } from 'react-redux'
import store from '../redux/store'
import '../styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='h-screen grid grid-rows-nav'>

        <Provider store={store}>
          <div className='grid grid-rows-auto relative'>

            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}
