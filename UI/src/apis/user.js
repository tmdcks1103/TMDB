import axios from "axios";

const apiAxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json'
    }
});

const getAxiosInstance = (token) => {
    return axios.create({
        baseURL: 'http://localhost:3000/',
        headers: {
            Authorization: `Bearer ${token}`,
        }

    });
}

export {apiAxiosInstance, getAxiosInstance}