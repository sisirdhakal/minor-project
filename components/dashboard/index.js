import React from 'react'
import MainBody from '../mainbody'
import Sidebar from '../sidebar'

function Dashboard() {
  return (
    <>
      <div className='flex h-screen'>
        <Sidebar />
        <MainBody />
      </div>
    </>
  )
}

export default Dashboard