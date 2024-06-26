import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';
import { BsFillCaretDownFill } from 'react-icons/bs'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { GET_lECTURES_BEGIN, GET_lECTURES_ERROR, GET_lECTURES_SUCCESS } from '../../../redux/constant';
import CenteredLoading from '../../../common/Loader';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../redux';
import ViewAttendance from '../../../common/lectures/StudentAttendance';
import { data } from 'autoprefixer';

function Attendance({ cookies }) {

  const dispatch = useDispatch()
  const { setAttendanceType } = bindActionCreators(actionCreators, dispatch)
  const { attendanceType } = useSelector(state => state.attendance)
  const { theoryLectures, lectures_loading, lectures_error, practicalLectures } = useSelector(state => state.teachersData)
  const [Data, setData] = useState(null)
  const [values, setvalues] = useState({
    totalPresent: 0,
    totalLectures: 0
  })

  const [semester, setsemester] = useState(null)
  const [selectedSemester, setselectedSemester] = useState(null)
  useEffect(() => {
    setsemester(localStorage.getItem("semester"))
    setselectedSemester(localStorage.getItem("semester"))
  }, [])

  useEffect(() => {
    const getData = async () => {
      if (selectedSemester) {
        dispatch({ type: GET_lECTURES_BEGIN })
        try {
          const { data } = await axios.get(`http://localhost:8000/api/view-student-attendance/${selectedSemester}/`, {
            withCredentials: true,
            headers: {
              "X-CSRFTOKEN": cookies.csrftoken
            }
          })
          if (data) {
            dispatch({ type: GET_lECTURES_SUCCESS, payload: data })
            setData(data)
          }
        } catch (error) {
          console.log(error)
          dispatch({ type: GET_lECTURES_ERROR })
          if (error.response?.data.msg) {
            toast.error(error.response.data.msg)
          }
        }
      }

    }
    getData()
  }, [selectedSemester])

  useEffect(() => {
    if (Data) {
      let totalLectures = 0, totalPresent = 0;
      Data.forEach(item => {
        totalLectures += item.totalLectureDays;
        totalPresent += item.presentDays
      })
      setvalues({
        totalLectures,
        totalPresent
      })
    }
  }, [Data])



  return (
    <>
      <div>
        <div className="h-44 grid grid-cols-2 bg-white rounded w-[360px] border-b-2 border-green-500 mx-auto items-center px-4" >
          <div className='relative w-[114px]  h-[140px] flex justify-center items-center rounded-sm'>
            <div className='border-[12px] rounded-full w-[114px] h-[114px] border-t-[#6DC9F7] rotate-[24deg] border-blue-400 bg-red-400 flex justify-center items-center'>
              <p className='text-xl font-bold -rotate-[24deg] text-white'>{ Number(values.totalPresent / values.totalLectures * 100).toFixed(0)} %</p>
            </div>
          </div>
          <div >
            <h1 className='text-primary-text mb-3 font-bold text-lg'>Attendance</h1>
            <p className='text-secondary-text font-medium mb-3'>Total-Lectures : {values.totalLectures} </p>
            <p className='text-secondary-text font-medium '>Present : {values.totalPresent} </p>

          </div>
        </div>
        <div className='grid grid-cols-2 gap-16 py-5'>
          <div className='grid grid-cols-2 gap-8'>
            <button className={`bg-white rounded-lg py-2 items-center ${attendanceType === "th" ? "shadow-md shadow-green-500" : ""} text-start flex px-5`} onClick={() => { setAttendanceType("th") }}>
              <p className='text-primary-text font-bold text-[1rem] my-auto '>Theory Lectures</p>
            </button>
            <button className={`bg-white rounded-lg py-2 text-start ${attendanceType === "pr" ? "shadow-md shadow-green-500" : ""} items-center px-5 $`} onClick={() => { setAttendanceType("pr") }}>
              <p className='text-primary-text my-auto font-bold text-[1rem]'>Practical Labs</p>
            </button>
          </div>
          <div className=' flex  justify-end'>
            <div className=' flex justify-center bg-white rounded-md items-center w-[200px]'>
              <select
                className='bg-white py-[0px] flex justify-center items-center h-full border-0 rounded cursor-pointer text-clrgrey1 font-medium focus:ring-0'
                placeholder='hod'
                name='lecture'
                value={selectedSemester ?? 0}
                onChange={e => setselectedSemester(e.target.value)}
              >
                <option value="" disabled defaultValue>Select semester</option>
                {Array.from({ length: semester }, (_, index) => (
                  <option key={index + 1} value={index + 1} className=''>{index + 1} Semester</option>
                ))}
              </select>
            </div>
          </div>

        </div>
        <div className='py-5'>
          {
            lectures_loading ?
              (<div className='py-6 bg-white rounded-md'>
                <p className='text-secondary-text text-center text-lg font-medium'>Loading Lectures list ...</p>
                <CenteredLoading />
              </div>) :
              lectures_error ?
                (<div>
                  <div className='py-6'>
                    <p className='text-[#ff0000] text-center text-xl font-medium'>
                      Failed to load the Lectures ...</p>

                  </div>
                </div>) :
                attendanceType === "th" ?
                  (<ViewAttendance lectures={theoryLectures} />)
                  : (
                    <ViewAttendance lectures={practicalLectures} />
                  )
          }
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.cookies
    }
  };
}


Attendance.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Attendance