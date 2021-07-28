import { http, httpFile } from "./http"

export const index = async function(page, limit){
       return await http().get(`/admin/producto?page=${page}&limite=${limit}`);
}

export const store = async function(datos){
    return await http().post("/admin/producto", datos);
}

export const show = async function(id){
    return await http().get(`/admin/producto/${id}`);
}

export const modificar = async function(id, datos){
    return await http().patch(`/admin/producto/${id}`, datos);
}

export const destroy = async function(id){
    return await http().delete(`/admin/producto/${id}`);
}