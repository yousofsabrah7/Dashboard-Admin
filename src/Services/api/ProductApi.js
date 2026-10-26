import {api} from "../../Config/ApiClient"

export const getProducts = async ()=>{
    const response= await api.get("/products")
    console.log(response.data)
    return response.data
}