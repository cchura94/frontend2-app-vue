import { http, httpFile } from "./http"

export const index = async function(){
    return await http().get("/categoria");
}

export const store = async function(datos){
    return await http().post("/categoria", datos);
}

export const show = async function(id){
    return await http().get(`/categoria/${id}`);
}

export const update = async function(id, datos){
    return await http().put(`/categoria/${id}`, datos);
}

export const destroy = async function(id){
    return await http().delete(`/categoria/${id}`);
}