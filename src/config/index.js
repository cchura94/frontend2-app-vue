import * as authService from "./../services/authService"
export const urlbase = "//127.0.0.1/backlaravelapp/public/api"

export const estaAuthenticado = async function(){
    return await authService.refresh();
}