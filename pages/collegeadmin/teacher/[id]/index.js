import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import CollegeAdminHero from '../../../../components/collgeadmin/collegeAdminHero'
import { useRouter } from 'next/router'
import AddTeacherComp from '../../../../components/collgeadmin/teacher/addteacher'
import TeacherDetails from '../../../../components/collgeadmin/teacher/teacherdetails'


const AddTeacher = ({ cookie }) => {
    const router = useRouter()
    const { query: { id } } = router

    return (
        <div>
            {
                id === "add" ? <AddTeacherComp cookie={cookie} /> : <TeacherDetails cookie={cookie} id={id} />
            }

        </div>
    )
}

export default AddTeacher

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

AddTeacher.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};