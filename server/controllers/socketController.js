 
import redisClient from "../redis.js";

const authorizedUser = (socket, next) => {
    if (!socket.request.session || !socket.request.session.user) {
        console.log("Bad request");
        next(new Error("Not Authorized"));
    } else {
        next();
    }
};

const initializeUser =async (socket) => {
    socket.user = { ...socket.request.session.user };
   await redisClient.hset(
        `userid:${socket.user.username}`,
        'userid',
        socket.user.userid
    );
    const friendList=await redisClient.lrange(
        `friends:${socket.user.username}`,0,-1
    )
    socket.emit("friends",friendList);
    console.log(friendList);
};

const addFriend=async (socket,friendName,cb)=>{
     if(friendName===socket.user.username){
        cb({done:false,errorMsg:"cannot add self"});
        return ;
     }
     
     const FriendUserID = await redisClient.hget(`userid:${friendName}`,"userid");
     if(!FriendUserID){
        cb({done:false,errorMsg:"User not existing"});
        return;
     }
     
     const currentFriendList=await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,-1
         
     )

     
    
     if(currentFriendList && currentFriendList.indexOf(friendName)!==-1){
          cb({done:false,errorMsg:"Friend Already added"});
          return ;
     }
     await redisClient.lpush(`friends:${socket.user.username}`,friendName)
     cb({done:true})
}

export { authorizedUser, initializeUser ,addFriend};
