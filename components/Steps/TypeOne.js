import React from 'react'
import Step1 from '../SignupParent/Step1'
import Step4 from '../SignupParent/Step4'
import { useSelector } from 'react-redux';

function TypeOne() {

    const { step } = useSelector(state => state.auth)
    return (
        <>
            {
                step === 1 ?
                    (<Step1 />) : (<Step4 />)
            }
        </>
    )
}

export default TypeOne