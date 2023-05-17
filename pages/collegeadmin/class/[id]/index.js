import React from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import { useRouter } from 'next/router'
import AddClassComp from '../../../../components/collgeadmin/class/addClass'
import EditClassComp from '../../../../components/collgeadmin/class/editClass'

const AddClass = ({ cookie }) => {

    const { query: { id } } = useRouter()

    return (
        <div>
            {
                id === "add" ? <AddClassComp cookie={cookie} /> : <EditClassComp cookie={cookie} id={id} />
            }
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