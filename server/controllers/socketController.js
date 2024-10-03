const authorizedUser=(socket,next)=>{
    if(!socket.request.session||!socket.request.session.user){
        console.log("Bad request");
        next(new Error("Not Authorized"))
    }else{
        next();
    }
    

}


export default authorizedUser;