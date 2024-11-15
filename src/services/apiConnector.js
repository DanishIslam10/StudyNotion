import axios from "axios";

// Create axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, // Ensure the prefix if using CRA
    withCredentials: true, // Important for cookies
});

// Function to make API requests
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    });
};