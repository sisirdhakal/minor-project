import React, { useEffect } from 'react'
import { DashboardLayout } from '../../../components/layout/dashboard'
import CollegeAdminHero from '../../../components/collgeadmin/collegeAdminHero'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../../redux'

const Batch = ({ cookie }) => {
    const { allBatches } = useSelector(state => state.collegeadmin)
    const dispatch = useDispatch()
    const { setAllBatches } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/batch/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                console.log(data)
                if (data) {
                    setAllBatches(data)
                }

            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }

        }
        getData()
    }, [])

    return (
        <div>
            <CollegeAdminHero title={"Batch"} image={"/assets/images/attendance.svg"} button={"Add"} url={"/collegeadmin/batch/add"} />

            <div>
                {
                    allBatches?.map(item=>{
                        console.log(item)
                        return true;
                    })
                }
            </div>
        </div>
    )
}

export default Batch

export const getServerSideProps = async ({ req }) => {
    return {
        props: {
            cookie: req.cookies
        }
    };
}

Batch.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};