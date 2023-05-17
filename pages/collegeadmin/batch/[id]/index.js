import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import CollegeAdminHero from '../../../../components/collgeadmin/collegeAdminHero'

const AddBatch = () => {
    return (
        <div>
            <CollegeAdminHero parent={"batch"} title={"Add Batch"} image={"/assets/images/attendance.svg"} />
        </div>
    )
}

export default AddBatch

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

AddBatch.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};