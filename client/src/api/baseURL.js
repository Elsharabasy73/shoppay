import axios from 'axios'


const baseUrl = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000"
})

export default baseUrl