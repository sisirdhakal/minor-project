import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
/**
 * for importing the actioncreators
*/
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link';
import { signupOptions } from "../../utils/constants"

export default function SignupModal() {

    const { signUpToggle } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { setSignUpToggle, setSignupType } = bindActionCreators(actionCreators, dispatch)


    function closeModal() {
        setSignUpToggle(false)
    }

    function handleClick(value) {
        setSignupType(value)
        closeModal()
    }

    return (
        <>
            <Transition appear show={signUpToggle} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                <Dialog.Panel className="bg-white relative flex justify-center items-center shadow-xl rounded-2xl w-[800px] h-[220px]">
                                    <div className=' w-full'>
                                        <p className='text-3xl my-4 text-[#03045E] font-medium'>
                                            Signup As
                                        </p>
                                        <div className='py-2 h-20 grid grid-cols-3'>
                                            {

                                                signupOptions.map((options) => {
                                                    const { id, name, image, width, height } = options
                                                  

                                                    return <div key={id} className='flex justify-center items-center'>
                                                        <Link href={"/signup"}>
                                                            <button className='space-x-4 flex justify-center items-center mx-auto' onClick={() => { handleClick(name) }}>
                                                                <div style={{ width: width, height: height }} className={`relative rounded-sm'`}>
                                                                    <Image
                                                                        alt=''
                                                                        priority
                                                                        src={image}
                                                                        className='rounded-md'
                                                                        fill
                                                                        sizes="(min-width: 6em) 24vw,
                                                               (min-width: 2em) 45vw, 100vw"
                                                                    />
                                                                </div>
                                                                <p className='text-2xl font-semibold text-secondary-text'>{name}</p>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                })
                                            }
                                        </div>
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
