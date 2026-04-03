import axios from 'axios'
export const token = () => localStorage.getItem('token');
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const userClient = axios.create({
    baseURL: `${BASE_URL}/api/users`,
    headers: {
        Authorization: `Bearer ${token()}`
    }
})

export const projectClient = axios.create({
    baseURL: `${BASE_URL}/api/projects`
})

projectClient.interceptors.request.use((req)=>{
    if (token()) {
        req.headers.Authorization = `Bearer ${token()}`
    }
    return req
})

export const taskClient = axios.create({
    baseURL: `${BASE_URL}/api/projects/:projectId/tasks`
})

taskClient.interceptors.request.use((req)=>{
    if (token()) {
        req.headers.Authorization = `Bearer ${token()}`
    }
    return req
})
