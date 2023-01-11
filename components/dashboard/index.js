import React from 'react'
import MainBody from '../mainbody'
import Sidebar from '../sidebar'
import Topbar from '../topbar'

function Dashboard() {
  return (
    <>
      <div className='flex h-screen'>
        <div className='sticky hidden lg:block bg-white top-0 h-screen'>
          <Sidebar />
        </div>
        <div className='overflow-y-scroll px-12'>
          <Topbar />
          <MainBody />
        </div>
      </div>
    </>
  )
}

export default Dashboard