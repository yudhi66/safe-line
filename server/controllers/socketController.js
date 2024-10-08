 
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
    socket.join(socket.user.userid);
   await redisClient.hset(
        `userid:${socket.user.username}`,
        'userid',
       
        socket.user.userid,
         "connected",
         true
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
     
     const friend= await redisClient.hgetall(`userid:${friendName}` );
     if(!friend){
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
     await redisClient.lpush(`friends:${socket.user.username}`,[friendName,friend.userid].join("."));
     cb({done:true})
}

const onDisconnsect=async (socket)=>{

    await redisClient.hset(
        `userid:${socket.user.username}`,
        "connected",false
       );

}
const parseFriendList =async (friendList)=>{
    const newFriendList=[];
    for(let friend of friendList){
        const parsedFriend=friend.split(".")
      const friendConnected= await redisClient.hget(`userid:${parseFriendList[0]}`,"connected")
    
      newFriendList.push({
        username:parseFriend[0],
        userid:parsedFriend[1],
        connected:friendConnected
      })
    }
   return newFriendList;
};


export { authorizedUser, initializeUser ,addFriend,onDisconnsect};
