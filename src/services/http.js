import axios from "axios"
import { urlbase } from "./../config"

export function http() {
    return axios.create({
        baseURL: urlbase,
        /*headers: {
            'Accept': 'application/json'
        }*/ 
    })
}

export function httpFile() {
    return axios.create({
        baseURL: urlbase,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}