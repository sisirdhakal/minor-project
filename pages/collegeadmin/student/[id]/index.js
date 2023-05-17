import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import CollegeAdminHero from '../../../../components/collgeadmin/collegeAdminHero'
import { useRouter } from 'next/router'
import AddStudentComp from '../../../../components/collgeadmin/student/addstudent'
import StudentDetails from '../../../../components/collgeadmin/student/studentdetails'

const AddStudent = ({ cookie }) => {
    const router = useRouter()
    const { query: { id } } = router

    return (
        <div>
            {
                id === "add" ? <AddStudentComp cookie={cookie} /> : <StudentDetails cookie={cookie} id={id} />
            }

        </div>
    )
}

export default AddStudent

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

AddStudent.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};