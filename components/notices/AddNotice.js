import React, { useState, useRef, useEffect } from 'react'
import DropButtons from '../../common/DropButtons'
import { BsCameraFill } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function AddNotice({ cookie }) {

    const [noticeType, setnoticeType] = useState('')
    const [noticeFor, setnoticeFor] = useState('')
    const [fetchedData, setfetchedData] = useState(null)

    const [process, setprocess] = useState("Add Notice")
    const filePicker = useRef(null)
    const [noticeTypeOptions, setnoticeTypeOptions] = useState([])
    const [noticeForOptions, setnoticeForOptions] = useState([])
    const [selectedFile, setselectedFile] = useState(null)
    const [fileName, setfileName] = useState(null)

    const router=useRouter()

    const initialValue = {
        title: "",
        content: "",
    }

    const addFile = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            setfileName(e.target.files[0].name)
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (event) => {
            setselectedFile(event.target.result)
        }

    }


    const [values, setvalues] = useState(initialValue)

    const handleChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        setprocess("Adding ...")
        let details = {
            noticeFor,
            noticeType: noticeType.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase()),
            title: values.title,
            content: values.content,
            noticeFile: selectedFile
        }
        console.log(details)
        const { data } = await axios.post(`http://localhost:8000/api/add-notice/`, details, {
            withCredentials: true,
            headers: {
                "X-CSRFTOKEN": cookie.csrftoken
            }
        })
        if (data) {
            toast.success(data.msg)
            setprocess("Add Notice")
            router.push()
        }

        } catch (error) {
            setprocess("Add Notice")
            console.log(error)
            if (error.response?.data.msg) {
                toast.error(error.response.data.msg)
            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/add-notice/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFTOKEN": cookie.csrftoken
                    }
                })
                if (data) {
                    const optionsForNoticeType = Object.keys(data)
                    setnoticeTypeOptions(optionsForNoticeType)
                    setfetchedData(data)
                }

            } catch (error) {
                if (error.response?.data.msg) {
                    toast.error(error.response.data.msg)
                }
            }

        }
        getData()
    }, [])

    useEffect(() => {
        if (noticeType === "department") {
            let array = []
            const optionsNoticeFor = fetchedData?.department?.name;
            array.push(optionsNoticeFor)
            setnoticeForOptions(array)
        }
        else if (noticeType === 'class') {
            const optionsNoticeFor = fetchedData?.class?.map((obj) => obj.name.toString());
            setnoticeForOptions(optionsNoticeFor)
        }
        setnoticeFor('')
    }, [noticeType])



    return (
        <>
            <div className='h-full bg-white rounded-sm w-full px-8 py-6'>
                <div className='grid grid-cols-autofirst w-full mb-3 items-center'>
                    <p htmlFor="noticeType" className='text-lg font-semibold capitalize w-40'>Notice Type :</p>
                    <div className="flex items-center justify-start h-full">
                        <DropButtons setnoticeType={setnoticeType} type={"Notice Type"} options={noticeTypeOptions} />
                    </div>

                </div>
                <div className='grid grid-cols-autofirst w-full items-center'>
                    <p htmlFor="noticeFor" className='text-lg font-semibold capitalize w-40'>Notice For :</p>
                    <div className="relative text-left">
                        <DropButtons setnoticeFor={setnoticeFor} type={"Notice For"} options={noticeForOptions} />
                    </div>
                </div>
                <form action="" className='w-full mt-6' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <input
                            value={values.title}
                            onChange={handleChange}
                            type="text"
                            name='title'
                            placeholder='Title of notice'
                            className='rounded text-gray-700 h-10 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[560px] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                    </div>
                    <div className='mb-3'>
                        <textarea
                            value={values.content}
                            onChange={handleChange}
                            type="text"
                            name='content'
                            placeholder='Content of notice'
                            className='rounded text-gray-700 h-28 focus:ring-[#CAF0F8] border-[#CAF0F8] max-w-[560px] w-full bg-background focus:border-[#CAF0F8] placeholder:text-[#676B6B] placeholder:font-medium placeholder:tracking-wide' />
                    </div>
                    <div className='flex space-x-8 w-[560px] mb-3 items-center'>
                        <p htmlFor="noticeType" className='text-lg bg-background py-1 px-3 rounded-md textce font-medium capitalize'>Choose File :</p>
                        <div className="flex items-center h-full">
                            <div className=" mx-auto flex items-center justify-center cursor-pointer rounded-full bg-[#0096C7] h-10 w-10"
                                onClick={() => { filePicker.current.click() }}>
                                <BsCameraFill className='text-white text-xl' />
                            </div>
                            <input ref={filePicker} onChange={addFile} name='noticeFile' type="file" hidden />
                            <p className='ml-5 bg-clrgrey9 rounded px-4 py-2 min-w-[120px]'>
                                {fileName ?? null}
                            </p>
                        </div>
                    </div>
                    <div className='mt-12 mb-3 flex items-center justify-center'>
                        <button disabled={process === "Add Notice" ? false : true} className='bg-[#2091F9] rounded-lg hover: py-[4px] tracking-wider font-medium capitalize text-white text-[20px] px-3 text-clrprimary10 transition-all ease-linear duration-300 w-40 disabled:cursor-not-allowed'>
                            {process}
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default AddNotice

