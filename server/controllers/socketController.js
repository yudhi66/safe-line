 
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
      "userid",
      socket.user.userid,
      "connected",
      true
    );
    const friendList = await redisClient.lrange(
      `friends:${socket.user.username}`,
      0,
      -1
    );
    const parsedFriendList = await parseFriendList(friendList);
    const friendRooms = parsedFriendList.map(friend => friend.userid);
  
    if (friendRooms.length > 0)
      socket.to(friendRooms).emit("connected", true, socket.user.username);
  
    socket.emit("friends", parsedFriendList);
    
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
     const newFriend={
        username:friendName,
        userid:friend.userid,
        connected:friend.connected
     }
     cb({done:true,newFriend})
}

const onDisconnsect=async (socket)=>{

    await redisClient.hset(
        `userid:${socket.user.username}`,
        "connected",
        false
      );
      const friendList = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
      );
      const friendRooms = await parseFriendList(friendList).then(friends =>
        friends.map(friend => friend.userid)
      );
      socket.to(friendRooms).emit("connected", false, socket.user.username);
    
}
const parseFriendList =async (friendList)=>{
    const newFriendList = [];
    for (let friend of friendList) {
      const parsedFriend = friend.split(".");
      const friendConnected = await redisClient.hget(
        `userid:${parsedFriend[0]}`,
        "connected"
      );
      newFriendList.push({
        username: parsedFriend[0],
        userid: parsedFriend[1],
        connected: friendConnected,
      });
    }
    return newFriendList;
};


export { authorizedUser, initializeUser ,addFriend,onDisconnsect};
