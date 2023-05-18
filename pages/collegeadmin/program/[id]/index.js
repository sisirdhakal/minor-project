import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import { useRouter } from 'next/router'
import AddProgramComp from '../../../../components/collgeadmin/program/addProgram'
import EditProgramComp from '../../../../components/collgeadmin/program/editProgram'

const AddProgram = ({ cookie }) => {

    const { query: { id } } = useRouter()

    return (
        <div>
            {
                id === "add" ? <AddProgramComp cookie={cookie} /> : <EditProgramComp cookie={cookie} id={id} />
            }
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