import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DropButtons({ type, options, setnoticeType, setnoticeFor }) {

    const [value, setValue] = useState(type)

    const handleClick = (item) => {
        if (type === "Notice Type") {
            setnoticeType(item)
            setValue(item)
        }
        if (type === "Notice For") {
            setnoticeFor(item)
            setValue(item)
        }
    }
    useEffect(() => {
        if (type === "Notice For") {
            setnoticeFor('')
            setValue(type)
        }

    }, [options])


    return (
        <div className=' bg-white rounded-sm w-full'>
            <div className='w-full'>
                <Menu as="div" className="relative  text-left">
                    <div className='w-full '>
                        <Menu.Button id='test' className="inline-flex w-full justify-center rounded-md border border-gray-300 py-2 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-0 capitalize focus:ring-offset-gray-100 px-2">
                            <p className=' text-ellipsis whitespace-nowrap overflow-hidden'>
                                {value}
                            </p>
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
                        <Menu.Items className="absolute right-0 z-10 w-full origin-top-right rounded-md bg-[#CAF0F8] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {
                                options.map(item => {
                                    return <div key={item} className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 w-full text-start py-2 capitalize text-sm'
                                                    )}
                                                    onClick={() => handleClick(item)}
                                                >
                                                    {item}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                })

                            }

                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}