import { ATTENDANCETYPE, DAYATTENDANCE, PUSHSTUDENT } from "../constant";

const initialState = {
    attendanceType: "th",
    dayAttendance: {
        lecture_id: 0,
        date: ""
    },
    studentsList: []
}

const attendance_reducer = (state = initialState, action) => {
    if (action.type === ATTENDANCETYPE) {
        return { ...state, attendanceType: action.payload }
    }
    if (action.type === DAYATTENDANCE) {
        const { lecture_id, date } = action.payload
        return {
            ...state, dayAttendance: {
                lecture_id: lecture_id,
                date: date
            }
        }
    }
    if (action.type === "RESET_STUDENT_LIST") {
        return {
            ...state,
            studentsList: []
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
        if (student) {
            let check = state.studentsList.filter(item => item === student)
            if (check.length > 0) {
                return {
                    ...state
                }
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