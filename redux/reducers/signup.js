import {
    CLEARSIGNUPDATA,
    SIGNUPDATA,
    VERIFYDATA,
} from "../constant";

const initialState = {
    verifyDetails: {
        text: "",
        idType: "",
        idNumber: "",
        dobStudent: ""
    },
    id: 0,
    verifiedStatus: false

}

const signup_reducer = (state = initialState, action) => {
    if (action.type === VERIFYDATA) {
        const { name, value } = action.payload

        return {
            ...state,
            verifyDetails: { ...state.verifyDetails, [name]: value }
        }
    }
    if (action.type === CLEARSIGNUPDATA) {
        return {
            ...state,
            verifyDetails: {
                ...state.verifyDetails,
                text: "",
                idType: "",
                idNumber: "",
                dobStudent: ""
            },
            id: 0,
            verifiedStatus: false
        }
    }
    else {
        return state;
    }

}

export default signup_reducer