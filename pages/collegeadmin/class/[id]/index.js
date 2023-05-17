import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import CollegeAdminHero from '../../../../components/collgeadmin/collegeAdminHero'

const AddClass = () => {
    return (
        <div>
            <CollegeAdminHero parent={"class"} title={"Add Class"} image={"/assets/images/class.svg"} />
        </div>
    )
}

export default AddClass

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

AddClass.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};