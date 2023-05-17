import React from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'

const ClassComp = () => {
    return (
        <div>
            <CollegeAdminHero title={"Class"} image={"/assets/images/class.svg"} button={"Add"} url={"/collegeadmin/class/add"} />
        </div>
    )
}

export default ClassComp

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

ClassComp.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};