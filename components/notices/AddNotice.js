import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    return (
        <div className='h-full bg-white rounded-sm w-full px-8 py-8'>
            <div className='grid grid-cols-2 w-96 mb-3'>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-0 focus:ring-offset-gray-100">
                            Options
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Account settings
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}








// import React, { useState } from 'react'

// function AddNotice() {

//     const [noticeType, setnoticeType] = useState('')
//     const [noticeFor, setnoticeFor] = useState('')

//     return (
//         <>
//             <div className='h-full bg-white rounded-sm w-full px-8 py-8'>
//                 <div className='grid grid-cols-2 w-96 mb-3'>
//                     <label htmlFor="noticeType" className='text-lg font-medium capitalize'>Notice Type</label>
//                     <div className="relative inline-block text-left">
//                         <div>
//                             <button type="button" className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
//                                 Options
//                             </button>
//                         </div>
//                         <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
//                             <div className="py-1" role="none">
//                                 <p href="#" className="text-gray-700 cursor-pointer block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</p>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//                 <div className='grid grid-cols-2 w-96'>
//                     <label htmlFor="noticeFor" className='text-lg font-medium capitalize'>Notice For</label>

//                 </div>
//             </div>
//         </>
//     )
// }

// export default AddNotice

