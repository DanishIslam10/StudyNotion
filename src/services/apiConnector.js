import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    withCredentials: true, // This is important for sending cookies
})

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null
    })
}