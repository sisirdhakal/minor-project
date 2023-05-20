import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../../redux'
import CenteredLoading from '../../../../common/Loader'

function AddAttendance({ cookies }) {

  const { query: { id: lectureId, type } } = useRouter()
  const { attendanceDate } = useSelector(state => state.teachersData)
  const dispatch = useDispatch()
  const { addStudentList, setDayAttendance, resetStudentList } = bindActionCreators(actionCreators, dispatch)
  const { studentsList, dayAttendance } = useSelector(state => state.attendance)
  const router = useRouter()
  const [values, setValues] = useState(null)
  const [process, setProcess] = useState("submit")
  const [dateValue, setdateValue] = useState(new Date())

  useEffect(() => {
    resetStudentList()
  }, [dateValue])

  useEffect(() => {
    const getData = async () => {

      try {
        const { data } = await axios.get(`http://localhost:8000/api/internal-marks/add/${lectureId}/`, {
          withCredentials: true,
          headers: {
            "X-CSRFTOKEN": cookies.csrftoken
          }
        })
        if (data) {
          setValues(data)
        }
      } catch (error) {
        if (error.response?.data.msg) {
          toast.error(error.response.data.msg)
        }
      }

    }
    getData()
  }, [])


  const submitAttendance = async () => {
    try {
      setProcess("submitting ...")
      const date = dayjs(dateValue).format("YYYY/MM/DD")
      setDayAttendance(lectureId, date)
      const details = {
        date: date,
        attendance: [...studentsList]
      }
      const { data } = await axios.post(`http://localhost:8000/api/add-attendance/${lectureId}/`, details, {
        withCredentials: true,
        headers: {
          "X-CSRFTOKEN": cookies.csrftoken
        }
      })
      if (data) {
        toast.success(data.msg)
        resetStudentList()
        router.push("/teacher/attendance")
      }

    } catch (error) {
      setProcess("submit")
      if (error.response?.data.msg) {
        toast.error(error.response.data.msg)
      }
    }
  }

  const pushStudent = (e) => {
    let status = e.target.checked ? 1 : 0
    addStudentList(Number(e.target.id), status)
  }
  console.log(values)
  return (
    <div>
      <div className='h-full py-5'>

        <div className='bg-white h-full py-3 px-8'>
          <div>
            <div className="grid grid-cols-marksTop mb-3">
              <div className='px-4'>
                <p className='text-primary-text capitalize font-medium text-lg'>
                  roll Number
                </p>
              </div>
              <div className='px-4'>
                <p className='text-primary-text capitalize  font-medium text-lg'>
                  full name
                </p>
              </div>
              <div className='px-4'>
                <p className='text-primary-text capitalize  font-medium text-lg'>
                  Theory FM
                </p>
              </div>
              <div>
                <p className='text-clrgrey1 capitalize  font-medium text-lg'>
                  Theory
                </p>
              </div>
              <div>
                <p className='text-clrgrey1 text-center capitalize  font-medium text-lg'>
                  Practical FM
                </p>
              </div>
              <div>
                <p className='text-clrgrey1  capitalize  text-center  font-medium text-lg'>
                  Practical
                </p>
              </div>
            </div>
          </div>
          {
            !values ? (
              <div className='py-6'>
                <p className='text-secondary-text text-center text-lg font-medium'>Loading Students list ...</p>
                <CenteredLoading />
              </div>
            ) : (
              <div>
                {values?.students.map(item => {
                  const { id, rollNumber, full_name } = item
                  return <div key={id} className="grid grid-cols-marksBottom mb-1">
                    <div className=''>
                      <p className='text-clrgrey1 font-medium text-lg'>
                        {rollNumber}
                      </p>
                    </div>
                    <div className=''>
                      <p className='text-clrgrey1  font-medium text-lg text-start'>
                        {full_name}
                      </p>
                    </div>
                    <div className="w-full">
                      <form action='' className="grid grid-cols-4 gap-6 w-full " onSubmit={(e) => e.preventDefault()}>
                        <div className=''>
                          <p className='text-clrgrey1  font-medium text-lg text-center'>
                            25
                          </p>
                        </div>
                        <div>
                          <input
                            // value={values.title}
                            // onChange={handleChange}
                            type="text"
                            name='title'
                            placeholder=''
                            className='rounded text-gray-700 h-8 focus:ring-[#CAF0F8] border-[#CAF0F8] w-24 bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className=''>
                          <p className='text-clrgrey1  font-medium text-lg text-center'>
                            25
                          </p>
                        </div>
                        <div>
                          <input
                            // value={values.title}
                            // onChange={handleChange}
                            type="text"
                            name='title'
                            placeholder=''
                            className='rounded text-gray-700 w-24 h-8 focus:ring-[#CAF0F8] border-[#CAF0F8] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>

                      </form>
                    </div>
                  </div>
                })}
                <div className='mt-12 mb-3 flex items-center justify-center'>
                  <button disabled={process === "submit" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-52 disabled:cursor-not-allowed' onClick={submitAttendance}>
                    {process}
                  </button>
                </div>
              </div>
            )

          }

        </div>
      </div>
    </div>
  )
}

export default AddAttendance