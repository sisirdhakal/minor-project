import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import CollegeAdminHero from '../../../../components/collgeadmin/collegeAdminHero'

const AddDepartment = () => {
    return (
        <div>
            <CollegeAdminHero parent={"department"} title={"Add Department"} image={"/assets/images/exam.svg"} />



        </div>
    )
}

export default AddDepartment

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

AddDepartment.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};