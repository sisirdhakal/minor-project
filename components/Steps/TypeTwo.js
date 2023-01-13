import React from 'react'
import Step1 from '../SignupSteps/Step1'
import Step2 from '../SignupSteps/Step2'
import { useSelector } from 'react-redux';
import Step4 from '../SignupSteps/Step4';

function TypeTwo() {
    const { step } = useSelector(state => state.auth)

    return (
        <>
            {
                step === 1 ?
                    (<Step1 />) : step === 2 ? (<Step2 />) : (<Step4 />)
            }
        </>
    )
}

export default TypeTwo