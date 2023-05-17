import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'

const Batch = () => {
    return (
        <div>
            <CollegeAdminHero title={"Batch"} image={"/assets/images/attendance.svg"} button={"Add"} url={"/collegeadmin/batch/add"} />
        </div>
    )
}

export default Batch

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Batch.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};