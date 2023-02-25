import {
    ATTENDANCETYPE,
    DAYATTENDANCE,
    PUSHSTUDENT
} from "../constant"

export const setAttendanceType = (value) => async dispatch => {
    dispatch({ type: ATTENDANCETYPE, payload: value })
}

export const setDayAttendance = (lecture_id, date) => async dispatch => {
    dispatch({ type: DAYATTENDANCE, payload: { lecture_id: lecture_id, date: date } })
}

export const addStudentList = (student, status) => dispatch => {
    dispatch({ type: PUSHSTUDENT, payload: { student: student, status: status } })
}