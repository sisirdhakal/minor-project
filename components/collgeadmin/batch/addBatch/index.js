import React, { useState } from 'react'
import CollegeAdminHero from '../../collegeAdminHero'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../redux';
import { useDispatch } from 'react-redux';

const AddBatchComp = ({ cookie }) => {

    const dispatch = useDispatch()
    const [process, setprocess] = useState("Add Batch")
    const router = useRouter()
    const {setSuccessFalse} = bindActionCreators(actionCreators, dispatch)


    const initialValue = {
        year: "",
        startedFrom: ""
    }


    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        if (e.target.name === "year" && Number(e.target.value) > 9999) {
            return;
        }
        else { setvalues({ ...values, [e.target.name]: e.target.value }) }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (values.year > 2100) {
            return toast.error("Maximum year date is 2100 B.S")
        }
        if (values.year < 2058) {
            return toast.error("Minimum year date is 2058 B.S")
        }

        try {
            setprocess("Adding ...")
            const { data } = await axios.post(`http://localhost:8000/api/admin/batch/add/`, values, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Add Batch")
                setSuccessFalse("collegeadmin_allBatches")
                router.push("/collegeadmin/batch")
                setvalues(initialValue)
            }

        } catch (error) {
            setprocess("Add Batch")
            console.log(error)
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }

    }


    return (
        <div>
            <div>
                <CollegeAdminHero parent={"batch"} title={"Add Batch"} image={"/assets/images/attendance.svg"} />
            </div>
            <div>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>

                    <div>
                        <h1 className='text-[#023E8A] mb-10 text-2xl font-medium'>
                            Add Batch
                        </h1>
                    </div>

                    <form className='w-full mt-6' onSubmit={handleSubmit}>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Year</p>
                            <input
                                value={values.year}
                                onChange={handleChange}
                                type="number"
                                name='year'
                                required
                                placeholder='eg. 2080'
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[180px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Started From</p>
                            <input
                                value={values.startedFrom}
                                onChange={handleChange}
                                type="text"
                                name='startedFrom'
                                required
                                placeholder='eg. Baisakh-2080'
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[180px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>


                        <div className='mt-12 mb-3 flex items-center justify-center'>
                            <button type='submit' disabled={process === "Add Batch" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-40 disabled:cursor-not-allowed'>
                                {process}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddBatchComp
