import { http } from "./http"

// fun simple
export async function login(params) {
    /*
    http().post("http://localhost:8000/api/auth/login", params)
        .then(function(res) {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    */
   try{
       return await http().post("/auth/login", params)
       
   }catch(error){
        console.log(error);
   }
}