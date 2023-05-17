import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'

const Department = () => {
    return (
        <div>
            <CollegeAdminHero title={"Department"} image={"/assets/images/exam.svg"} button={"Add"} url={"/collegeadmin/department/add"} />
        </div>
    )
}

export default Department

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Department.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};