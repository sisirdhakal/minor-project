import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';
import { BsFillCaretDownFill } from 'react-icons/bs'

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
        <div className='grid grid-cols-2 gap-16 py-5'>
          <div className='grid grid-cols-2 gap-8'>
            <button className={`bg-white rounded-lg py-2 items-center shadow-md shadow-green-500 text-start flex px-5`} >
              <p className='text-primary-text font-bold text-[1rem] my-auto '>Theory Lectures</p>
            </button>
            <button className={`bg-white rounded-lg py-2 text-start items-center px-5 $`} >
              <p className='text-primary-text my-auto font-bold text-[1rem]'>Practical Labs</p>
            </button>
          </div>
          <div className=' flex  justify-end'>
            <button className={`bg-white rounded-lg flex py-2 text-start items-center px-5 $`} >
              <p className='text-primary-text my-auto font-bold text-[1rem]'> Sixth Semester </p>
              <p className='px-2 text-primary-text mt-1'><BsFillCaretDownFill /></p>
            </button>
          </div>

        </div>
      </div>
    </>
  )
}
Attendance.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Attendance