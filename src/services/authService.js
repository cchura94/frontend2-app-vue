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

export async function refresh(){
    try{
        let {data} = await http().get("/auth/refresh")
        if(data){
            // almacenar el localStorage
            localStorage.setItem("authUser", btoa(JSON.stringify(data)))
            return true
           
          }

    }catch(error){
         console.log("**ERR**: ",error);
         return false;
    }
}