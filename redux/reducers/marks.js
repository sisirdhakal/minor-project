
const initialState = {
    objects: null,
    fetched: false
}

const marks_reducer = (state = initialState, action) => {
    if (action.type === "SET_ALL_MARKS_OBJECT") {
        return { ...state, objects: action.payload, fetched: true }
    }
    if (action.type === "SET_ALL_MARKS_OBJECT_FALSE") {
        return { ...state, fetched: false }
    }
    // if (action.type === SET_ACTIVE_NOTICE_DATAS) {
    //     return { ...state, activeNoticesDatas: action.payload }
    // }
    else {
        return state;
    }

}

export default marks_reducer