
import {
    SIGNUPTOGGLE
} from '../constant'

/**
 * signup toggle
 */
export const setSignUpToggle = (value) => dispatch => {
    dispatch({ type: SIGNUPTOGGLE, payload: value })
}