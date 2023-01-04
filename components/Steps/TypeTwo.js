import React from 'react'
import Step1 from '../SignupParent/Step1'
import Step2 from '../SignupParent/Step2'
import Step3 from '../SignupParent/Step3'
import { useSelector } from 'react-redux';

function TypeTwo() {
    const { step } = useSelector(state => state.auth)

    return (
        <>
            {
                step === 1 ?
                    (<Step1 />) : step === 2 ? (<Step2 />) : (<Step3 />)
            }
        </>
    )
}

export default TypeTwo