import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import CollegeAdminHero from '../../../../components/collgeadmin/collegeAdminHero'
import { useRouter } from 'next/router'
import AddDepartmentComp from '../../../../components/collgeadmin/department/addDepartment'
import EditDepartment from '../../../../components/collgeadmin/department/editDepartment'

const AddDepartment = ({ cookie }) => {

    const { query: { id } } = useRouter()

    return (
        <div>
            {
                id === "add" ? <AddDepartmentComp cookie={cookie} /> : <EditDepartment cookie={cookie} id={id} />
            }
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