import React, { useState } from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import CollegeAdminHero from '../../../../components/collgeadmin/collegeAdminHero'
import { useRouter } from 'next/router'

const AddBatch = () => {

    const [process, setprocess] = useState("Add Batch")
    const { query } = useRouter()
    console.log(query)

    const initialValue = {
        year: "",
        startedFrom: ""
    }


    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {

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

                    <form action="" className='w-full mt-6' onSubmit={handleSubmit}>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Year</p>
                            <input
                                value={values.title}
                                onChange={handleChange}
                                type="text"
                                name='year'
                                maxLength={4}
                                placeholder='eg. 2080'
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[180px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Started From</p>
                            <input
                                value={values.title}
                                onChange={handleChange}
                                type="text"
                                name='startedFrom'
                                placeholder='eg. Baisakh-2080'
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[180px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>


                        <div className='mt-12 mb-3 flex items-center justify-center'>
                            <button disabled={process === "Add Batch" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-40 disabled:cursor-not-allowed'>
                                {process}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddBatch

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

AddBatch.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};