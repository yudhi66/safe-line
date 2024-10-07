import { useContext, useEffect } from "react"
import socket from "../../Socket"
import { AccountContext } from "../AccountContext"

const useSocketSetup=(setFriendList)=>{
    const {setUser}=useContext(AccountContext);
      useEffect(()=>{
        socket.connect();
        socket.on("friends",friendList=>{
            setFriendList(friendList);
        })
        socket.on("connect_error",()=>{
             setUser({loggedIn:false})
        });
        return()=>{
            socket.off("connect error");
        };
        
      },[setUser])
};


export default useSocketSetup;