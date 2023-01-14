import React from 'react'
import { typeTwoButton } from '../../utils/constants'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';

function Button2() {

    const dispatch = useDispatch()
    const { setSignUpToggle, setSignUpSteps } = bindActionCreators(actionCreators, dispatch)

    const { step } = useSelector(state => state.auth)

    return (
        <>
            {
                typeTwoButton.map(button => {
                    const { id, name } = button
                    return <button key={id} className={`${step === id ? "active" : "test"} relative flex justify-center items-center h-10 w-full`} onClick={() => { setSignUpSteps(id) }}>
                        <p className='absolute rounded-r-sm ml-8 text-white font-medium tracking-wide'>
                            {name}
                        </p>
                    </button>
                })
            }
        </>
    )
}

export default Button2