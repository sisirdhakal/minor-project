import React from 'react'
import { useRouter } from 'next/router'
import CollegeAdminHero from '../../collegeAdminHero'
import DateComp from '../../../../common/DatePicker'

const AddStudentComp = ({ cookie }) => {

    return (
        <div>
            <CollegeAdminHero parent={"student"} title={"Add Student"} image={"/assets/images/student.svg"} />

            <div className='mt-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>
                    <div className='grid grid-cols-7 gap-5'>
                        <div className='col-span-1'>
                            <label className='text-sm'>Title</label>
                            <select type='text' name='courtesyTitle' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]'>
                                <option value='Ms.'>Ms.</option>
                                <option value='Mr.'>Mr.</option>
                                <option value='Mrs.'>Mrs.</option>
                            </select>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm'>First Name</label>
                            <input type='text' name='firstName' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm'>Middle Name</label>
                            <input type='text' name='middleName' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm'>Last Name</label>
                            <input type='text' name='lastName' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                        </div>
                    </div>
                    <div className='grid grid-cols-7 gap-5 mt-5'>
                        <div className='col-span-3'>
                            <label className='text-sm'>Email</label>
                            <input type='email' name='email' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm'>Address</label>
                            <input type='text' name='address' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm'>Contact</label>
                            <input type='text' name='contact' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                        </div>
                    </div>
                    <div className='grid grid-cols-8 gap-5 mt-5'>
                        <div className='col-span-3'>
                            <label className='text-sm'>Father's Name</label>
                            <input type='text' name='fathersName' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm'>Mother's Name</label>
                            <input type='text' name='mothersName' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                        </div>
                        <div className='col-span-2'>
                            <label className='text-sm'>Date Of Birth</label>
                            {/* <input type='text' name='dateOfBirth' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input> */}
                            <DateComp/>
                        </div>
                    </div>
                    <div className='grid grid-cols-8 gap-5 mt-5'>
                        <div className='col-span-2'>
                            <label className='text-sm'>Nationality</label>
                            <input type='text' name='nationality' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm'>ID Type</label>
                            <select type='text' name='idType' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]'>
                                <option value='Citizenship'>Citizenship</option>
                                <option value='Passport'>Passport</option>
                            </select>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm'>ID Number</label>
                            <input type='text' name='idNumber' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-5 mt-5'>
                        <div className='col-span-1'>
                            <label className='text-sm'>Batch</label>
                            <select type='text' name='batch' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]'>
                                <option value='id'>batch 1</option>
                            </select>
                        </div>
                        <div className='col-span-1'>
                            <label className='text-sm'>Department</label>
                            <select type='text' name='department' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]'>
                                <option value='id'>department 1</option>
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-5 mt-5'>
                        <div className='col-span-1'>
                            <label className='text-sm'>Class</label>
                            <select type='text' name='cLass' className='w-full text-sm bg-[#caf0f8] border-none outline-none h-8 p-[-3px]'>
                                <option value='id'>batch 1</option>
                            </select>
                        </div>
                        <div className='col-span-3'>
                            <label className='text-sm'>Roll Number</label>
                            <input type='text' name='rollNumber' className='w-full bg-[#caf0f8] border-none outline-none h-8'></input>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddStudentComp
