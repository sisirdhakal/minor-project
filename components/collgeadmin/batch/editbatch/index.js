import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CollegeAdminHero from '../../collegeAdminHero'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const EditBatch = ({ cookie, id }) => {

    const [process, setprocess] = useState("Edit Batch")
    const router = useRouter()
    const initialValue = {
        year: "",
        startedFrom: "",
        graduated: false
    }


    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        if (e.target.name === "graduated") {
            setvalues({ ...values, [e.target.name]: e.target.checked })
        }
        else {
            setvalues({ ...values, [e.target.name]: e.target.value })
        }
    }


    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/batch/${id}/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setvalues(data)
                }

            } catch (error) {
                if (error) {
                    console.log(error)
                }
            }

        }
        getData()
    }, [])
    console.log(values)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (values.year > 2100) {
            return toast.error("Maximum year date is 2100 B.S")
        }
        if (values.year < 2058) {
            return toast.error("Minimum year date is 2058 B.S")
        }

        try {
            setprocess("Editing ...")
            const { data } = await axios.put(`http://localhost:8000/api/admin/batch/${id}/edit/`, values, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Edit Batch")
                router.push("/collegeadmin/batch")
            }

        } catch (error) {
            setprocess("Edit Batch")
            console.log(error)
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }
    }



    return (
        <div>
            <div>
                <CollegeAdminHero parent={"batch"} title={"Edit Batch"} image={"/assets/images/attendance.svg"} />
            </div>
            <div>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>

                    <div>
                        <h1 className='text-[#023E8A] mb-10 text-2xl font-medium'>
                            Edit Batch
                        </h1>
                    </div>

                    <form action="" className='w-full mt-6' onSubmit={handleSubmit}>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Year</p>
                            <input
                                value={values.year}
                                onChange={handleChange}
                                type="text"
                                name='year'
                                placeholder=''

                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[140px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Started From</p>
                            <input
                                value={values.startedFrom}
                                onChange={handleChange}
                                type="text"
                                name='startedFrom'
                                placeholder=''
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[140px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className='mb-4 flex justify-start items-center'>
                            <div className='mr-8 cursor-pointer'>
                                <input
                                    onChange={handleChange}
                                    type="checkbox"
                                    value={values.graduated}
                                    name='graduated'
                                    placeholder=''
                                    checked={values.graduated}
                                    className='rounded text-gray-700 h-8 focus:ring-[#CAF0F8] border-[#CAF0F8] w-8 bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium cursor-pointer placeholder:tracking-wide' />
                            </div>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Graduated</p>
                        </div>


                        <div className='mt-12 mb-3 flex items-center justify-center'>
                            <button disabled={process === "Edit Batch" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-40 disabled:cursor-not-allowed'>
                                {process}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default EditBatch