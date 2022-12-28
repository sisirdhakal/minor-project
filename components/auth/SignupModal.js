import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'

export default function SignupModal() {
    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
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
                                <Dialog.Panel className="bg-white align-middle transition-all self-center transform relative py-4 shadow-xl rounded-2xl w-[800px] h-[200px]">
                                    <p className='text-3xl my-4 text-[#03045E] font-medium'>
                                        Signup As
                                    </p>
                                    <div className='py-2 grid grid-cols-3'>
                                        <div className='flex justify-center items-center'>
                                            <button className='space-x-4 flex justify-center items-center mx-auto'>
                                                <div className='relative w-[40px] h-[40px] rounded-sm'>
                                                    <Image
                                                        alt=''
                                                        priority
                                                        src={"/assets/images/student.svg"}
                                                        className='rounded-md'
                                                        fill
                                                        sizes="(min-width: 6em) 24vw,
                                                           (min-width: 2em) 45vw, 100vw"
                                                    />
                                                </div>
                                                <p className='text-2xl font-semibold text-secondary-text'>Student</p>
                                            </button>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <button className='flex justify-center space-x-4 items-center mx-auto'>
                                                <div className='relative w-[60px] h-[56px] rounded-sm'>
                                                    <Image
                                                        alt=''
                                                        priority
                                                        src={"/assets/images/teacher.svg"}
                                                        className='rounded-md'
                                                        fill
                                                        sizes="(min-width: 6em) 24vw,
                                                           (min-width: 2em) 45vw, 100vw"
                                                    />
                                                </div>
                                                <p className='text-2xl font-semibold text-secondary-text'>Teacher</p>
                                            </button>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <button className='flex justify-center space-x-4 items-center mx-auto'>
                                                <div className='relative w-[44px] h-[44px] rounded-sm'>
                                                    <Image
                                                        alt=''
                                                        priority
                                                        src={"/assets/images/parent.svg"}
                                                        className='rounded-md'
                                                        fill
                                                        sizes="(min-width: 6em) 24vw,
                                                           (min-width: 2em) 45vw, 100vw"
                                                    />
                                                </div>
                                                <p className='text-2xl font-semibold text-secondary-text'>Parent</p>
                                            </button>
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
