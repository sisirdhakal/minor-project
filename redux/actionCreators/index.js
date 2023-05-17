import {
    setAttendanceType, addStudentList, setDayAttendance, fetchTheoryLectures, fetchPracticalLabs, fetchSingleLecture, setAttendanceDate
} from "./attendanceActions";
import {
    setUserName, sidebarToggle, sidebarUser
} from './sidebarActions'
import {
    clearSignup, clearSignupData, setSignUpSteps, setSignUpToggle, setSignupData, setSignupEmail, setSignupType, setVerified, setVerifyDetailsValue,
} from './signUpAcions'

import {
    setActiveNotice, setAllNotices, setActiveNoticeDatas
} from './notices'

import {
    setAllBatches, setAllDepartments, setUserDetails
} from './collegeAdmin'



export {
    setAttendanceType,
    addStudentList,
    setDayAttendance,
    setUserName,
    sidebarToggle,
    sidebarUser,
    clearSignup,
    clearSignupData,
    setSignUpSteps,
    setSignUpToggle,
    setSignupData,
    setSignupEmail,
    setSignupType,
    setVerified,
    setVerifyDetailsValue,
    fetchTheoryLectures,
    fetchPracticalLabs,
    fetchSingleLecture,
    setAttendanceDate,
    setActiveNotice,
    setAllNotices,
    setActiveNoticeDatas,
    setAllBatches,
    setAllDepartments,
    setUserDetails
}