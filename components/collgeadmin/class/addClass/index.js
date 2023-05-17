import React, { useState } from 'react'
import CollegeAdminHero from '../../collegeAdminHero'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const AddClassComp = ({ cookie }) => {

    const [process, setprocess] = useState("Add Class")
    const router = useRouter()



    const initialValue = {
        name: '',
        department: null,
        batch: null,
        program: null,
        semester: null
    }


    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     if (values.contact.length < 10 && !values.contact.startsWith("98")) {
    //         return;
    //     }

    //     try {
    //         setprocess("Adding ...")
    //         console.log(values)
    //         const { data } = await axios.post(`http://localhost:8000/api/admin/department/add/`, values, {
    //             withCredentials: true,
    //             headers: {
    //                 "X-CSRFTOKEN": cookie.csrftoken
    //             }
    //         })
    //         if (data) {
    //             toast.success(data.msg)
    //             setprocess("Add Department")
    //             router.push("/collegeadmin/department")
    //             setvalues(initialValue)
    //         }

    //     } catch (error) {
    //         setprocess("Add Department")
    //         console.log(error)
    //         if (error.response?.data.msg) {
    //             toast.error(error.response.data.msg)
    //         }
    //     }

    // }


    return (
        <div>
            <div>
                <CollegeAdminHero parent={"department"} title={"Add Department"} image={"/assets/images/attendance.svg"} />
            </div>
            
        </div>
    )
}

export default AddDepartmentComp
