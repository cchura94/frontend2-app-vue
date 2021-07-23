import { http, httpFile } from "./http"

export const index = async function(){
    /*const authUser = JSON.parse(atob(localStorage.getItem("authUser")))
    const header = {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+authUser.token
    }*/

    return await http().get("/admin/categoria"/*, {headers: header}*/);
}

export const store = async function(datos){
    return await http().post("/admin/categoria", datos);
}

export const show = async function(id){
    return await http().get(`/admin/categoria/${id}`);
}

export const update = async function(id, datos){
    return await http().put(`/admin/categoria/${id}`, datos);
}

export const destroy = async function(id){
    return await http().delete(`/admin/categoria/${id}`);
}