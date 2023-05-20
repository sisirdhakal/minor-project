import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import CenteredLoading from '../../../common/Loader';
import ViewMarks from '../../../components/teacher/internalmarks/viewmarks';

function InternalMarks({ cookies }) {
    const [loading, setloading] = useState(false)
    const [loadingFalse, setloadingFalse] = useState(false)

    const [values, setvalues] = useState([])

    const [semester, setsemester] = useState(null)
    const [selectedSemester, setselectedSemester] = useState(null)
    useEffect(() => {
        setsemester(localStorage.getItem("semester"))
        setselectedSemester(localStorage.getItem("semester"))
    }, [])
    
    useEffect(() => {
        const getData = async () => {
            if (selectedSemester) {
                try {
                    setloading(true)
                    const { data } = await axios.get(`http://localhost:8000/api/internal-marks/view/student/${selectedSemester}`, {
                        withCredentials: true,
                        headers: {
                            "X-CSRFTOKEN": cookies.csrftoken
                        }
                    })
                    if (data) {
                        setvalues(data)
                        setloading(false)
                    }
                } catch (error) {
                    if (error.response?.data.msg) {
                        setloading(false)
                        setloadingFalse(true)
                        toast.error(error.response.data.msg)
                    }
                }

            }
        }
        getData()
    }, [semester, selectedSemester])

    return (
        <>
            <div>
                {/* <button className={`bg-white rounded-lg flex py-2 text-start items-center px-5 $`} >
                    <p className='text-primary-text my-auto font-bold text-[1rem]'> Sixth Semester </p>
                    <p className='px-2 text-primary-text mt-1'><BsFillCaretDownFill /></p>
                </button> */}
                <div className='mb-4 flex justify-center bg-white rounded-md items-center w-[200px]'>
                    <select
                        className='bg-white py-[0px] flex justify-center items-center h-[36px] border-0 rounded cursor-pointer text-clrgrey1 font-medium focus:ring-0'
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
                
                <div className='py-5'>
                    {
                        loading ?
                            (<div className='py-6 bg-white rounded-md'>
                                <p className='text-secondary-text text-center text-lg font-medium'>Loading Marks ...</p>
                                <CenteredLoading />
                            </div>) :
                            loadingFalse ?
                                (<div>
                                    <div className='py-6'>
                                        <p className='text-[#ff0000] text-center text-xl font-medium'>
                                            Failed to load the Lectures ...</p>

                                    </div>
                                </div>) :
                                <div>
                                    <ViewMarks values={values} />
                                </div>
                    }
                </div>
            </div>
        </>
    )
}

export default InternalMarks

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookies: req.cookies
        }
    };
}


InternalMarks.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

