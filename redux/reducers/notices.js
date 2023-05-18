import { SET_ACTIVE_NOTICE, SET_ACTIVE_NOTICE_DATAS, SET_ALL_NOTICES } from "../constant";

const initialState = {
    allNotices: null,
    activeNotice: 'college',
    activeNoticesDatas: [],
}

const notices_reducer = (state = initialState, action) => {
    if (action.type === SET_ALL_NOTICES) {
        return { ...state, allNotices: action.payload }
    }
    if (action.type === SET_ACTIVE_NOTICE) {
        return { ...state, activeNotice: action.payload }
    }
    if (action.type === SET_ACTIVE_NOTICE_DATAS) {
        return { ...state, activeNoticesDatas: action.payload }
    }
    else {
        return state;
    }

}

export default notices_reducer