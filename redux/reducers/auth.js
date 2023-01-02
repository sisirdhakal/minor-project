import {
    SIGNUPSTEPS,
    SIGNUPTOGGLE
} from "../constant";

const initialState = {
    signUpToggle: false,
    step: 1
}

const auth_reducer = (state = initialState, action) => {
    if (action.type === SIGNUPTOGGLE) {
        return { ...state, signUpToggle: action.payload }
    }

    if (action.type === SIGNUPSTEPS) {

        return { ...state, step: action.payload }
    }
    else {
        return state;
    }

}

export default auth_reducer