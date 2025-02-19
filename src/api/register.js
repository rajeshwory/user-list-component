import axios from "axios";
import config from "../constant";
 

const registerApi = axios.create({
    baseURL: "http://192.168.1.33:4000",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000,
})

export default registerApi 