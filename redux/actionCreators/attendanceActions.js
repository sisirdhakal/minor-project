import { getPracticalLectures, getTheoryLectures } from "../../utils/teachersAttendance/getLectures"
import {
    ATTENDANCETYPE,
    DAYATTENDANCE,
    GET_lECTURES_BEGIN,
    GET_lECTURES_ERROR,
    GET_lECTURES_SUCCESS,
    GET_PRLABS_SUCCESS,
    PUSHSTUDENT,
    SET_SINGLE_LECTURE
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

export const fetchTheoryLectures = (cookie) => async dispatch => {
    dispatch({ type: GET_lECTURES_BEGIN })
    try {
        const theoryLectures = await getTheoryLectures(cookie)
        dispatch({ type: GET_lECTURES_SUCCESS, payload: theoryLectures })
    } catch (error) {
        console.log(error)
        dispatch({ type: GET_lECTURES_ERROR })
    }
}
export const fetchPracticalLabs = (cookie) => async dispatch => {
    dispatch({ type: GET_lECTURES_BEGIN })
    try {
        const practicalLabs = await getPracticalLectures(cookie)
        dispatch({ type: GET_PRLABS_SUCCESS, payload: practicalLabs })
    } catch (error) {
        dispatch({ type: GET_lECTURES_ERROR })
    }
}
export const fetchSingleLecture = (id, lecture) => async dispatch => {
    dispatch({ type: SET_SINGLE_LECTURE, payload: { id, lecture } })
}
