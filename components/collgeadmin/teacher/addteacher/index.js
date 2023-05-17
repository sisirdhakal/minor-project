import React from 'react'
import { useRouter } from 'next/router'
import CollegeAdminHero from '../../collegeAdminHero'

const AddTeacherComp = ({ cookie }) => {

    return (
        <div>
            <CollegeAdminHero parent={"teacher"} title={"Add Teacher"} image={"/assets/images/teacher.svg"} />

            <div className='mt-10'>
                <div className='h-full bg-white rounded-sm w-full px-8 py-6'>

                </div>
            </div>

        </div>
    )
}

export default AddTeacherComp
