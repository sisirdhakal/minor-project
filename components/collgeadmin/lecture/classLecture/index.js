import React, {useState, useEffect} from "react"
import CollegeAdminHero from "../../collegeAdminHero"
import Link from "next/link"
import { toast } from "react-hot-toast"
import axios from "axios"
import DeleteLectureModal from "../deleteLecture"

const ClassLectureComp = ({cookie, id}) => {
    const classId = id.split('_')[1]
    const [lectures, setlectures] = useState(null)

    const [showModal, setShowModal] = useState(false)
    const [activeId, setactiveId] = useState(null)

    const handleClick = (id) => {
        setactiveId(id)
        setShowModal(true)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/admin/lecture/class/${classId}`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    setlectures(data)
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
            <CollegeAdminHero parent={"lecture"} title={"Class Lecture"} image={"/assets/images/lecture.svg"} button={"Add"} url={"/collegeadmin/lecture/add"} />
            <div className="bg-white p-2 mb-2">
                All <span className="font-bold">theory</span> lectures of <span className="font-bold">{lectures?.class_name}</span>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
                {
                    lectures?.theoryLectures?.map(item => {
                        return <div className='w-full px-4 py-2 bg-white rounded'>
                            <div className='text-xl text-[#023E8A] text-medium'>
                                {item.subject_name}
                            </div>
                            <div className='my-2'>
                                <p className='text-sm text-clrgrey5'>Total Lectures: </p>
                                <p className='text-md'>{item.totalLectureDays}</p>
                            </div>
                            <div className='my-2'>
                                <p className='text-sm text-clrgrey5'>Teachers: </p>
                                <Link href={`/collegeadmin/teacher/${item.teacher}`}>
                                    <p className='text-md hover:text-[#023E8A]'>{item.teacher_name}</p>
                                </Link>
                                <Link href={`/collegeadmin/teacher/${item.teacher2}`}>
                                    <p className='text-md hover:text-[#023E8A]'>{item.teacher2_name}</p>
                                </Link>
                            </div>
                            <div className='flex justify-center items-center gap-x-3 mt-5'>
                                <Link href={`/collegeadmin/lecture/${item.id}`}>
                                    <button className='bg-[#2091F9] rounded-lg hover: py-[2px] font-medium capitalize text-white text-[16px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block'>
                                        Edit
                                    </button>
                                </Link>
                                <button className='bg-red-500 rounded-lg hover: py-[2px] font-medium capitalize text-white text-[16px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block' onClick={() => { handleClick(item.id) }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="bg-white p-2 mb-2">
                All <span className="font-bold">practical</span> labs of <span className="font-bold">{lectures?.class_name}</span>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-2">
                {
                    lectures?.practicalLectures?.map(item => {
                        return <div className='w-full px-4 py-2 bg-white rounded'>
                            <div className='col-span-3 text-xl text-[#023E8A] text-medium'>
                                {item.subject_name}
                            </div>
                            <div className='my-2'>
                                <p className='text-sm text-clrgrey5'>Total Labs: </p>
                                <p className='text-md'>{item.totalLectureDays}</p>
                            </div>
                            <div className='my-2'>
                                <p className='text-sm text-clrgrey5'>Teachers: </p>
                                <Link href={`/collegeadmin/teacher/${item.teacher}`}>
                                    <p className='text-md hover:text-[#023E8A]'>{item.teacher_name}</p>
                                </Link>
                                <Link href={`/collegeadmin/teacher/${item.teacher2}`}>
                                    <p className='text-md hover:text-[#023E8A]'>{item.teacher2_name}</p>
                                </Link>
                            </div>
                            <div className='flex justify-center items-center gap-x-3 mt-5'>
                                <Link href={`/collegeadmin/lecture/${item.id}`}>
                                    <button className='bg-[#2091F9] rounded-lg hover: py-[2px] font-medium capitalize text-white text-[16px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block'>
                                        Edit
                                    </button>
                                </Link>
                                <button className='bg-red-500 rounded-lg hover: py-[2px] font-medium capitalize text-white text-[16px] px-2 text-clrprimary10 transition-all ease-linear duration-300 w-[70px] disabled:cursor-not-allowed block' onClick={() => { handleClick(item.id) }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
            <div>
                <DeleteLectureModal showModal={showModal} setShowModal={setShowModal} cookie={cookie} id={activeId} />
            </div>
        </div>
    )
}
export default ClassLectureComp