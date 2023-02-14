import { SIDEBARTOGGLE, SIDEBARUSER, USERNAME } from "../constant";

const initialState = {
    sidebarToggle: true,
    sidebarUser: "",
    userName: ""

}

const dashboard_reducer = (state = initialState, action) => {
    if (action.type === SIDEBARTOGGLE) {
        return { ...state, sidebarToggle: action.payload }
    }
    if (action.type === USERNAME) {
        return { ...state, userName: action.payload }
    }
    if (action.type === SIDEBARUSER) {
        localStorage.setItem('user', action.payload)
        return { ...state, sidebarUser: action.payload }
    }
    else {
        return state;
    }

}

export default dashboard_reducer