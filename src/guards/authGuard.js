export const authGuard = function(to, from, next){
    try{
        const authUser = JSON.parse(atob(localStorage.getItem("authUser")))

        console.log(authUser);
        if(authUser && authUser.token){
            next()
        }else{
            next({name: 'Login'})
        }

    }catch(error){
        console.log(error)
        localStorage.clear()
        next({name: 'Login'})
    }

} 