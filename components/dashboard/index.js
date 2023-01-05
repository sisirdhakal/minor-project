import React from 'react'
import MainBody from '../mainbody'
import Sidebar from '../sidebar'

function Dashboard() {
  return (
    <>
      <div className='flex h-screen'>
        <div className='sticky bg-white top-0 h-screen'>
          <Sidebar />
        </div>
        <div className='overflow-y-scroll'>
          <MainBody />

        </div>
      </div>
    </>
  )
}

export default Dashboard