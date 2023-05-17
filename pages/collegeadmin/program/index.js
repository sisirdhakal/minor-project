import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'

const Program = () => {
    return (
        <div>
            <CollegeAdminHero title={"Program"} image={"/assets/images/program.svg"} button={"Add"} url={"/collegeadmin/program/add"} />
        </div>
    )
}

export default Program

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Program.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};