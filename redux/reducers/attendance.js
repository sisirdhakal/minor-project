import { ATTENDANCETYPE, DAYATTENDANCE, PUSHSTUDENT } from "../constant";

const initialState = {
    attendanceType: "th",
    dayAttendance: {
        lecture_id: 0,
        date: "",
        students: []
    },
    studentsList: []
}

const attendance_reducer = (state = initialState, action) => {
    if (action.type === ATTENDANCETYPE) {
        return { ...state, attendanceType: action.payload }
    }
    if (action.type === DAYATTENDANCE) {
        const { lecture_id, date, students } = action.payload
        return {
            ...state, dayAttendance: {
                lecture_id: lecture_id,
                date: date,
                students: [...students]
            }
        }
    }
    if (action.type === PUSHSTUDENT) {
        const { student, status } = action.payload
        if (!status) {
            return {
                ...state,
                studentsList: state.studentsList.filter(item => item === student ? 0 : item)
            }
        }
        return {
            ...state,
            studentsList: [...state.studentsList, student]
        }
    }
    else {
        return state;
    }

}

export default attendance_reducer