import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import CollegeAdminHero from '../../../../components/collgeadmin/collegeAdminHero'

const AddLecture = () => {
    return (
        <div>
            <CollegeAdminHero parent={"lecture"} title={"Add Lecture"} image={"/assets/images/lecture.svg"} />
        </div>
    )
}

export default AddLecture

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

AddLecture.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};