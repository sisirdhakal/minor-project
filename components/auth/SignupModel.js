import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';

function SignupModel() {


    const [modal, setmodal] = useState(true)

    const handleClose = () => {
        setmodal(false)
    };

    return (
        <>
            {
                < Transition.Root show={modal} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={() => handleClose()}
                    >
                        <div
                            className={`flex items-end justify-center h-full pt-0 lg:pt-4 px-4  lg:pb-20 text-center sm:block sm:p-0 `}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
                            </Transition.Child>
                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className='bg-white inline-block   align-middle transition-all self-center transform relative py-6 shadow-xl rounded-2xl w-[500px] h-[500px]'>

                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root >
            }
        </>
    )
}

export default SignupModel