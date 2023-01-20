
import moment from 'moment'
import {
    CLEARSIGNUP,
    CLEARSIGNUPDATA,
    SIDEBARTOGGLE,
    SIGNUPDATA,
    SIGNUPSTEPS,
    SIGNUPTOGGLE,
    SIGNUPTYPE,
    VERIFYDATA,
    VERIFYDETAILSVALUE
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
export const setVerifyDetailsValue = (e) => async dispatch => {
    try {
        let name = e.target.name
        let value = e.target.value

        if (name === "dofStudent") {

        }

        dispatch({ type: VERIFYDETAILSVALUE, payload: { name, value } })
    } catch (error) {

    }
}
export const verifyData = (e) => async dispatch => {
    try {
        
        
            // let result = date_regex.test(dobStudent)
            // if (!result) {
            //     toast.error("Wrong date format !!")
            //     return;
            // }

            // const { data } = await axios.post("http://localhost:8000/api/parent-verify/", verifyDetails, { withCredentials: true })
            // if (data) {
            //     console.log(data)
            //     // console.log(payload)
            //     // () => { setSignUpSteps(step + 1) }
            // }
    

        dispatch({ type: VERIFYDATA, payload: { name, value } })
    } catch (error) {

    }
}



export const clearSignupData = (e) => async dispatch => {
    try {

        dispatch({ type: CLEARSIGNUPDATA })
    } catch (error) {

    }
}





