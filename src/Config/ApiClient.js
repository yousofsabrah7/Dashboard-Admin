import axios from "axios";


export const  api = axios.create({
    baseURL: "https://e-commerce-api-3wara.vercel.app"
})

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token")

        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return promise.reject(error)
    }
)