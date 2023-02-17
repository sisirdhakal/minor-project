import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';

function Attendance() {
  return (
    <>
      <div>
        <div className="h-44 grid grid-cols-2 bg-white rounded w-[360px] border-b-2 border-green-500 mx-auto items-center px-4" >
          <div className='relative w-[114px]  h-[140px] flex justify-center items-center rounded-sm'>
            <div className='border-[12px] rounded-full w-[114px] h-[114px] border-t-[#6DC9F7] rotate-[24deg] border-blue-400 bg-red-400 flex justify-center items-center'>
              <p className='text-xl font-bold -rotate-[24deg] text-white'>72 / 80</p>
            </div>
          </div>
          <div >
            <h1 className='text-primary-text mb-3 font-bold text-lg'>Attendance</h1>
            <p className='text-secondary-text font-medium mb-3'>Total-Lectures : </p>
            <p className='text-secondary-text font-medium '>Present : </p>

          </div>
        </div>
        <div>

        </div>
      </div>
    </>
  )
}
Attendance.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Attendance