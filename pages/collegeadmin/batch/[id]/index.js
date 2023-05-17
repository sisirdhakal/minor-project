import React, { useState } from 'react'
import { DashboardLayout } from '../../../../components/layout/dashboard'
import { useRouter } from 'next/router'
import AddBatchComp from '../../../../components/collgeadmin/batch/addBatch'
import EditBatch from '../../../../components/collgeadmin/batch/editbatch'

const Batches = ({cookie}) => {

    const { query: { id } } = useRouter()



    return (
        <div>
            {
                id === "add" ? <AddBatchComp cookie={cookie} /> : <EditBatch cookie={cookie} id={id} />
            }

        </div>
    )
}

export default Batches

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Batches.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};