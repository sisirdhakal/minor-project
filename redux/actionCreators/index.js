
import moment from 'moment'
import {
    ATTENDANCETYPE,
    CLEARSIGNUP,
    CLEARSIGNUPDATA,
    DAYATTENDANCE,
    PUSHSTUDENT,
    SIDEBARTOGGLE,
    SIDEBARUSER,
    SIGNUPDATA,
    SIGNUPEMAIL,
    SIGNUPSTEPS,
    SIGNUPTOGGLE,
    SIGNUPTYPE,
    USERNAME,
    VERIFIED,
    VERIFYDATA,
    VERIFYDETAILSVALUE
} from '../constant'

/**
 * sidebars
 */
export const sidebarToggle = (value) => dispatch => {
    dispatch({ type: SIDEBARTOGGLE, payload: value })
}
export const sidebarUser = (value) => dispatch => {
    dispatch({ type: SIDEBARUSER, payload: value })
}
export const setUserName = (value) => dispatch => {
    dispatch({ type: USERNAME, payload: value })
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
    if (value === "Student" || "Teacher") { localStorage.setItem("signupRole", "one") }
    if (value === "Parent") {
        localStorage.setItem("signupRole", "two")
    }
    dispatch({ type: SIGNUPTYPE, payload: value })
}

export const clearSignup = () => dispatch => {

    dispatch({ type: CLEARSIGNUP })

}

/**
 * Signup steps data verification
 */

export const setSignupData = (e) => async dispatch => {
    try {
        let name = e.target.name
        let value = e.target.value

        dispatch({ type: SIGNUPDATA, payload: { name, value } })
    } catch (error) {

    }
}
export const setSignupEmail = (value) => async dispatch => {
    try {

        dispatch({ type: SIGNUPEMAIL, payload: value })
    } catch (error) {

    }
}
export const setVerifyDetailsValue = (e) => async dispatch => {
    try {
        let name = e.target.name
        let value = e.target.value

        dispatch({ type: VERIFYDETAILSVALUE, payload: { name, value } })
    } catch (error) {

    }
}

export const setVerified = (value) => async dispatch => {
    dispatch({ type: VERIFIED, payload: value })
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


/**
 * Attendance
 */

export const setAttendanceType = (value) => async dispatch => {
    dispatch({ type: ATTENDANCETYPE, payload: value })
}
export const setDayAttendance = (lecture_id, date) => async dispatch => {
    dispatch({ type: DAYATTENDANCE, payload: { lecture_id: lecture_id, date: date } })
}

export const addStudentList = (student, status) => dispatch => {
    dispatch({ type: PUSHSTUDENT, payload: { student: student, status: status } })
}




