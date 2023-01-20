import React from 'react'
import Step1 from '../SignupSteps/Step1'
import Step2 from '../SignupSteps/Step2'
import { useSelector } from 'react-redux';
import Step3 from '../SignupSteps/Step3';

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