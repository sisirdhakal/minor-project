import axios from "axios"


export const getTheoryLectures = async (cookie) => {
    const { data: theoryData } = await axios.get("http://localhost:8000/api/get-lectures/", {
        withCredentials: true,
        headers: {
            "X-CSRFTOKEN": cookie.csrftoken
        }
    })
    return theoryData;
}
export const getPracticalLectures = async (cookie) => {
    const { data: practicalData } = await axios.get("http://localhost:8000/api/get-practical-classes/", {
        withCredentials: true,
        headers: {
            "X-CSRFTOKEN": cookie.csrftoken
        }
    })
    return practicalData;
}