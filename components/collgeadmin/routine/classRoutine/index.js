import React, {useState, useEffect} from "react"
import CollegeAdminHero from "../../collegeAdminHero"
import Link from "next/link"
import { toast } from "react-hot-toast"
import axios from "axios"
import DeleteRoutineModal from "../deleteRoutine"

const ClassRoutineComp = ({cookie, id}) => {
    const classId = id.split('_')[1]
    const [routine, setRoutine] = useState(null)

    const [showModal, setShowModal] = useState(false)
    const [activeId, setactiveId] = useState(null)

    const handleClick = (id) => {
        setactiveId(id)
        setShowModal(true)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/routine/class/${classId}`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setRoutine(data)
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
            <CollegeAdminHero parent={"routine"} title={"Class Routine"} image={"/assets/images/routine.svg"} button={"Add"} url={"/collegeadmin/routine/add"} />
            <div className="bg-white p-2 mb-2 flex justify-between">
                <p>Class Routine of <span className="font-bold">{routine? routine.routineFor : ''}</span></p>
                <div className='flex justify-center items-center gap-x-3'>
                    <Link href={`/collegeadmin/routine/${routine?.id}`}>
                        <button className='bg-[#2091F9] rounded-lg hover: py-[2px] font-medium capitalize text-white text-[16px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block'>
                            Edit
                        </button>
                    </Link>
                    <button className='bg-red-500 rounded-lg hover: py-[2px] font-medium capitalize text-white text-[16px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block' onClick={() => { handleClick(routine?.id) }}>
                        Delete
                    </button>
                </div>
            </div>
            <div className="bg-white p-2">
                <p>{routine?.information}</p>
                <div className="px-10">
                    <img src={routine?.routineImage} alt={`Class Routine of ${routine? routine.routineFor : ''}`}/>
                </div>
            </div>
            
            <div>
                <DeleteRoutineModal showModal={showModal} setShowModal={setShowModal} cookie={cookie} id={activeId} />
            </div>
        </div>
    )
}
export default ClassRoutineComp