import React from 'react'

function ViewMarks({ values }) {

    const { subjects, marks } = values

    return (
        <div className='bg-white p-5 gap-y-3 rounded-md'>
            <div className='grid grid-cols-8 font-semibold text-xl'>
                <div className='col-span-3'>Subject</div>
                <div className='text-center'>Type</div>
                <div className='text-center'>Theory FM</div>
                <div className='text-center'>Theory OM</div>
                <div className='text-center'>Practical FM</div>
                <div className='text-center'>Practical OM</div>
            </div>
            <div className='h-1 bg-slate-500'></div>
            {
                subjects?.map(item => {
                    const { id, name } = item
                    return <div key={id} className='grid grid-cols-8 my-3 text-lg'>
                        <div className='col-span-3'>{name}</div>
                        <div className='text-center'>{item.type}</div>
                        {
                            item.type === "Both" | item.type === "Theory" ? 
                            <div className='text-center'>{item.theoryAssessment}</div> :
                            <div className='text-center'>-</div>
                        }
                        {
                            item.type === "Both" | item.type === "Theory" ? 
                            <div className='text-center'>{
                                marks?.internalMarks?.map(mark => {
                                    if(mark.subject===id){
                                        return mark.theoryAssessment
                                    }
                                })
                            }</div> :
                            <div className='text-center'>-</div>
                        }
                        {
                            item.type === "Both" | item.type === "Practical" ? 
                            <div className='text-center'>{item.practicalAssessment}</div> :
                            <div className='text-center'>-</div>
                        }
                        {
                            item.type === "Both" | item.type === "Practical" ? 
                            <div className='text-center'>{
                                marks?.internalMarks?.map(mark => {
                                    if(mark.subject===id){
                                        return mark.practicalAssessment
                                    }
                                })
                            }</div> :
                            <div className='text-center'>-</div>
                        }
                        <div className='h-1 bg-slate-200 col-span-8'></div>
                    </div>
                    }
                )
                }
            
            {/* <div className='grid grid-cols-1 gap-y-2 relative bg-white px-4 py-2 w-full h-full rounded-sm'>
                {
                    subjects?.map(item => {
                        const { id, name, rollNumber, } = item
                        return <div key={id} className=''>
                            <div>
                                <h1 className='text-primary-text text-[18px] font-semibold capitalize'>{name}</h1>
                            </div>
                            <div className='grid grid-cols-9 gap-1 py-1'>
                            </div>
                        </div>
                    })
                }
            </div> */}
        </div>
    )
}

export default ViewMarks