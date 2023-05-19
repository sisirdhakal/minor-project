import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero';
import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import CenteredLoading from '../../../common/Loader';

function TeacherAdvice({ cookie }) {

  const [advices, setadvices] = useState([])
  const [loading, setloading] = useState(true)

  var LocalizedFormat = require('dayjs/plugin/localizedFormat')
  dayjs.extend(LocalizedFormat)

  const [showModal, setShowModal] = useState(false)
  const [activeId, setactiveId] = useState(null)


  useEffect(() => {
    const getData = async () => {
      setloading(true)
      try {
        const { data } = await axios.get(`http://localhost:8000/api/get-advice/`, {
          withCredentials: true,
          headers: {
            "X-CSRFTOKEN": cookie.csrftoken
          }
        })
        if (data) {
          setloading(false)
          console.log(data)
          setadvices(data)
        }

      } catch (error) {
        setloading(false)
        console.log(error)
        if (error.response?.data.msg) {

          toast.error(error.response.data.msg)
        }
      }
    }
    getData()
  }, [])
  const handleClick = (id) => {
    setactiveId(id)
    setShowModal(true)

  }


  return (
    <>
      <div>
        <CollegeAdminHero title={"Teacher Advice"} image={"/assets/images/feedback.svg"} />
      </div>
      {
        loading ? <div className='py-6 bg-white rounded overflow-y-scroll scrollbar-hide px-8'>
          <p className='text-secondary-text text-center text-lg font-medium'>Loading Advices ...</p>
          <CenteredLoading />
        </div> :
          <div className='grid grid-cols-2 gap-12'>
            {
              advices?.map(item => {
                const { lecture_name, posted_datetime, student_name, teacher_name, advice } = item
                console.log(item)
                return <div key={item.id} className='bg-white py-4 px-8'>
                  <div className=' font-medium text-clrgrey1'>
                    <div className='flex justify-between items-center mb-3'>
                      <p className=''>
                        <span className='text-[#023E8A] mr-2 font-semibold'>To Student :</span> {student_name}
                      </p>
                      <p className=''>
                        <span className='text-[#023E8A] font-semibold mr-2'>Date :</span>  {dayjs(posted_datetime).format("LL")}
                      </p>
                    </div>
                    <p className='mb-2'>
                      <span className='text-[#023E8A] mr-2 font-semibold'>Lecture :</span>   {lecture_name}
                    </p>
                    <div className=''>
                      <p className=''>
                        <span className='text-[#023E8A] mr-2 font-semibold '>Advice :</span>   {advice}
                      </p>
                    </div>
                  </div>
                </div>
              })
            }

          </div>
      }
    </>
  )
}

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      cookie: req.cookies
    }
  };
}


TeacherAdvice.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default TeacherAdvice