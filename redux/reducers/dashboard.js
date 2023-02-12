import { SIDEBARTOGGLE, SIDEBARUSER } from "../constant";

const initialState = {
    sidebarToggle: true,
    sidebarUser: []

}

const dashboard_reducer = (state = initialState, action) => {
    if (action.type === SIDEBARTOGGLE) {
        return { ...state, sidebarToggle: action.payload }
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