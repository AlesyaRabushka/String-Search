import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // withCredentials: true,
   
})

const $hostPy = axios.create({
    baseURL: process.env.REACT_APP_API_PYTHON_URL,
})

export default {$host, $hostPy};