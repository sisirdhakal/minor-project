import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'

const Lecture = () => {
    return (
        <div>
            <CollegeAdminHero title={"Lecture"} image={"/assets/images/lecture.svg"} button={"Add"} url={"/collegeadmin/lecture/add"} />
        </div>
    )
}

export default Lecture

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Lecture.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};