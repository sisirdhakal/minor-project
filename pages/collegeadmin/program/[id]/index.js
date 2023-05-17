import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import CollegeAdminHero from '../../../../components/collgeadmin/collegeAdminHero'

const AddProgram = () => {
    return (
        <div>
            <CollegeAdminHero parent={"program"} title={"Add Program"} image={"/assets/images/program.svg"} />
        </div>
    )
}

export default AddProgram

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

AddProgram.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};