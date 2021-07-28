import { http, httpFile } from "./http"

export const index = async function(){
       return await http().get(`/admin/personal`);
}

export const store = async function(datos){
    return await http().post("/admin/personal", datos);
}

export const show = async function(id){
    return await http().get(`/admin/personal/${id}`);
}

export const modificar = async function(id, datos){
    return await http().patch(`/admin/personal/${id}`, datos);
}

export const destroy = async function(id){
    return await http().delete(`/admin/personal/${id}`);
}