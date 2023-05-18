import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'


export default function ApproveApplicationModal({ showModal, setShowModal, cookie, id }) {

    const [process, setprocess] = useState("Yes")
    const router = useRouter()


    function closeModal() {
        setShowModal(false)
    }

    function handleClick(value) {
        setShowModal(true)
    }

    const handleApprove = async () => {
        try {
            setprocess("Approving ...")
            const { data } = await axios.get(`http://localhost:8000/api/leave-request/approve/${id}`, {
                withCredentials: true,
                headers: {
                    "X-CSRFTOKEN": cookie.csrftoken
                }
            })
            if (data) {
                toast.success(data.msg)
                setprocess("Yes")
                setShowModal(false)
                router.push("/teacher/leaveapplication")
            }

        } catch (error) {
            setprocess("Yes")
            console.log(error)
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }
    }

    return (
        <>
            <Transition appear show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="bg-white relative flex justify-center items-center shadow-xl rounded-2xl w-[600px] h-[220px]">
                                    <div className=' w-full'>
                                        <p className='text-2xl mb-4 font-medium'>ARE YOU SURE ?</p>
                                        


                                        <button disabled={process === "Yes" ? false : true} className='bg-green-500 rounded-lg hover: py-2 tracking-wider font-medium capitalize text-white text-[16px] px-4 text-clrprimary10 transition-all ease-linear duration-300 w-44 disabled:cursor-not-allowed block mx-auto' onClick={handleApprove} >
                                            {process}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
