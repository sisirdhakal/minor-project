import React, { useState } from 'react'
import { useRouter } from 'next/router'

const EditBatch = () => {

    const [process, setprocess] = useState("Edit Batch")
    const { query } = useRouter()
    console.log(query)

    const initialValue = {
        title: "",
        content: ""
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
                                value={values.title}
                                onChange={handleChange}
                                type="text"
                                name='title'
                                placeholder=''
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[140px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className='mb-4 flex justify-start items-center'>
                            <p className='text-[#023E8A] text-xl w-32 font-medium mr-5'>Started From</p>
                            <input
                                value={values.title}
                                onChange={handleChange}
                                type="text"
                                name='title'
                                placeholder=''
                                className='rounded text-gray-700 h-9 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[140px] bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                        </div>
                        <div className='mb-4 flex justify-start items-center'>
                            <div className='mr-8 cursor-pointer'>
                                <input
                                    value={values.title}
                                    onChange={handleChange}
                                    type="checkbox"
                                    name='title'
                                    placeholder=''
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