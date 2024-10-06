import redisClient from "../redis.js";

const authorizedUser=(socket,next)=>{
    if(!socket.request.session||!socket.request.session.user){
        console.log("Bad request");
        next(new Error("Not Authorized"))
    }else{
        socket.user={...socket.request.session.user};
        redisClient.hset(
            `userid:${socket.user.username}`,
             "userid",
             socket.user.userid
        );
        next();
    }
    

}

 

export default authorizedUser;