import {
    CLEARSIGNUPDATA,
    SIGNUPDATA,
    VERIFIED,
    VERIFYDATA,
    VERIFYDETAILSVALUE,
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
    if (action.type === VERIFYDETAILSVALUE) {
        const { name, value } = action.payload

        return {
            ...state,
            verifyDetails: { ...state.verifyDetails, [name]: value }
        }
    }
    if (action.type === VERIFIED) {
        return {
            ...state,
            id: action.payload,
            verifiedStatus: true
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