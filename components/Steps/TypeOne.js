import React from 'react'
import Step1 from '../SignupSteps/Step1'
import Step3 from '../SignupSteps/Step3'
import { useSelector } from 'react-redux';

function TypeOne() {

    const { step } = useSelector(state => state.auth)
    return (
        <>
            {
                step === 1 ?
                    (<Step1 />) : (<Step3 />)
            }
        </>
    )
}

export default TypeOne