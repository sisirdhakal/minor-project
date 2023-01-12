
import {
    CLEARSIGNUP,
    SIDEBARTOGGLE,
    SIGNUPSTEPS,
    SIGNUPTOGGLE,
    SIGNUPTYPE
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




