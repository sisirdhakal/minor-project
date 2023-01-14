
import moment from 'moment'
import {
    CLEARSIGNUP,
    SIDEBARTOGGLE,
    SIGNUPDATA,
    SIGNUPSTEPS,
    SIGNUPTOGGLE,
    SIGNUPTYPE,
    VERIFYDATA
} from '../constant'

/**
 * sidebar toggle
 */
export const sidebarToggle = (value) => dispatch => {
    dispatch({ type: SIDEBARTOGGLE, payload: value })
}

/**
 * signup toggle
 */
export const setSignUpToggle = (value) => dispatch => {
    dispatch({ type: SIGNUPTOGGLE, payload: value })
}

export const setSignUpSteps = (value) => dispatch => {
    dispatch({ type: SIGNUPSTEPS, payload: value })
}

export const setSignupType = (value) => dispatch => {
    dispatch({ type: SIGNUPTYPE, payload: value })
}

export const clearSignup = () => dispatch => {

    dispatch({ type: CLEARSIGNUP })

}

/**
 * Signup steps data verification
 */

export const signupData = (e) => async dispatch => {
    try {
        let name = e.target.name
        let value = e.target.value

        dispatch({ type: SIGNUPDATA, payload: { name, value } })
    } catch (error) {

    }
}
export const verifyData = (e) => async dispatch => {
    try {
        let name = e.target.name
        let value = e.target.value

        if (name === "dofStudent") {

        }

        dispatch({ type: VERIFYDATA, payload: { name, value } })
    } catch (error) {

    }
}




