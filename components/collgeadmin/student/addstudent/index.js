import React from 'react'
import { useRouter } from 'next/router'
import CollegeAdminHero from '../../collegeAdminHero'

const AddStudentComp = ({ cookie }) => {

    return (
        <div>
            <CollegeAdminHero parent={"student"} title={"Add Student"} image={"/assets/images/student.svg"} />

            <div className='mt-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>

                </div>
            </div>

        </div>
    )
}

export default AddStudentComp
