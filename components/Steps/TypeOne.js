import React from 'react'
import Step1 from '../SignupSteps/Step1'
import Step4 from '../SignupSteps/Step4'
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