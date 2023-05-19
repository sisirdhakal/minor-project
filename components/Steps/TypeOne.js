import React from 'react'
import Step1 from '../SignupSteps/Step1'
import Step3 from '../SignupSteps/Step3'
import { useSelector } from 'react-redux';

function TypeOne({csrf}) {

    const { step } = useSelector(state => state.auth)
    return (
        <>
            {
                step === 1 ?
                    (<Step1 csrf={csrf} />) : (<Step3 csrf={csrf} />)
            }
        </>
    )
}

export default TypeOne