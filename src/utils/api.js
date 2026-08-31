import axios from "axios"; // axios used to connect front and backed.
import { getToken } from "./auth";
const API_BASE_URL =  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const api = axios.create(
    {
        baseURL:API_BASE_URL,
    }
)
// Actual one is like axios.post("http://localhost:500/user/login");
//this api creation will enable that we can write like api.post("/user/login"); --> ie not using everytime from baseUrl. 


// this will add/modify the request every time -> in simple we can define common thing of all urls like sending token every time, sending type of content like appplication/json....
// Managing request.
api.interceptors.request.use(
    (config)=>{
        const token = getToken();
        if(token) config.headers.token = token;
        return config;
    },
    (error)=>{
        return Promise.reject(error); // passing the error to API which uses this interceptor
    }
)

// Handling response
api.interceptors.response.use(
    (response) =>response,
    (error)=>{
        if(error.response?.status === 401){
            console.log("Unauthorized - token may be expired");
        }
        return Promise.reject(error);
    }
)

export const unwrap = (response)=>{
    return response?.data;
}
export const getErrorMessage =(error)=> error?.response?.data?.message || error?.response?.data?.error || error?.message || error?.error || "some thing wet wrong."

export default api;