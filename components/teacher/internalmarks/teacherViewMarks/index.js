import axios from "axios"
import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import CenteredLoading from "../../../../common/Loader"

const ViewMarks = ({cookies, id}) => {
    const [loading, setloading] = useState(false)
    const [marks, setmarks] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                setloading(true)
                const { data } = await axios.get(`http://localhost:8000/api/internal-marks/view/${id}/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookies.csrftoken
                    }
                })
                if (data) {
                    setloading(false)
                    setmarks(data)
                }

            } catch (error) {
                console.log(error)
                if (error.response?.data.msg) {
                    setloading(false)
                    toast.error(error.response.data.msg)
                }
            }

        }
        getData()
    }, [])
    
    return (
        <div className='bg-white p-5 gap-y-3 rounded-md'>
            {
                !loading ?
            <div>
                <div className='grid grid-cols-7 font-semibold text-xl'>
                    <div className='col-span-3'>Student</div>
                    <div className='text-center'>Theory FM</div>
                    <div className='text-center'>Theory OM</div>
                    <div className='text-center'>Practical FM</div>
                    <div className='text-center'>Practical OM</div>
                </div>
                <div className='h-1 bg-slate-500'></div>
                {
                    marks?.students?.map(item => {
                        const { id, full_name, internalMark:im } = item
                        return <div key={id} className='grid grid-cols-7 my-3 text-lg'>
                            <div className='col-span-3'>{full_name}</div>
                            <div className='text-center'>{im.theoryFM}</div>
                            <div className='text-center font-semibold'>{im.theoryAssessment}</div>
                            <div className='text-center'>{im.practicalFM}</div>
                            <div className='text-center font-semibold'>{im.practicalAssessment}</div>
                            <div className='h-1 bg-slate-200 col-span-8'></div>
                        </div>
                        }
                    )
                }
            </div> : 
            <div className='lg:min-h-[460px] py-2 lg:pt-20 px-5 bg-white w-full rounded-sm'>
                <p className='text-secondary-text text-center text-lg font-medium'>Loading marks...</p>
                <CenteredLoading />
            </div>
            }
        </div>
)}
export default ViewMarks