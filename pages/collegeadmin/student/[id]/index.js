import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import CollegeAdminHero from '../../../../components/collgeadmin/collegeAdminHero'

const AddStudent = () => {
    return (
        <div>
            <CollegeAdminHero parent={"student"} title={"Add Student"} image={"/assets/images/student.svg"} />
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