import axios from "axios"
import { urlbase } from "./../config"

export function http() {
    let auth = localStorage.getItem("authUser")
    if(auth){
        const authUser = JSON.parse(atob(localStorage.getItem("authUser")))
    
            const jwtInterceptor = axios.create({
                baseURL: urlbase,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+authUser.token
                }
            });

            // verificar errores (401)
            jwtInterceptor.interceptors.response.use(
                (response) => {
                    return response;
                },
                async (error) => {
                    if(error.response.status === 401){

                        // this.$router.push("login");
                        return Promise.reject(error)
                       /* let response = await jwtInterceptor.get(`${urlbase}/auth/refresh`,
                        {
                            withCredentials: true
                        }).catch((error) => {
                            return Promise.reject(error)
                        })

                        if(response && response.data){
                            return axios(error.config)
                        }else{
                            return Promise.reject(error)
                        }*/
                    }else{
                        return Promise.reject(error)
                    }
                }
            )
            return jwtInterceptor;       

    }
    return axios.create({
        baseURL: urlbase
    })
    
}

export function httpFile() {
     const authUser = JSON.parse(atob(localStorage.getItem("authUser")))
    
    return axios.create({
        baseURL: urlbase,
        headers: {
            'Content-Type': 'multipart/form-data',
             'Authorization': 'Bearer '+authUser.token
        }
    })
}