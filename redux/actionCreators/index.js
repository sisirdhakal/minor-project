
import {
    SIGNUPSTEPS,
    SIGNUPTOGGLE
} from '../constant'

/**
 * signup toggle
 */
export const setSignUpToggle = (value) => dispatch => {
    dispatch({ type: SIGNUPTOGGLE, payload: value })
}

export const setSignUpSteps = (value) => dispatch => {
    dispatch({ type: SIGNUPSTEPS, payload: value })
}

