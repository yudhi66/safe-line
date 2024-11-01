import { useContext, useEffect } from "react"
import socket from "../../Socket"
import { AccountContext } from "../AccountContext"

const useSocketSetup = (setFriendList,setMessages) => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect();
    socket.on("friends", friendList => {
      setFriendList(friendList);
    });
    socket.on("messages", messages => {
      setMessages(messages);
    });
  socket.on("dm", message => {
    setMessages((prevMsgs) => [message, ...prevMsgs]);

    setFriendList((prevFriends) => {
      const friendIndex = prevFriends.findIndex(friend => friend.userid === message.from || friend.userid === message.to);
      
      if (friendIndex === -1) return prevFriends;  
      
      const updatedFriends = [...prevFriends];
      const [friend] = updatedFriends.splice(friendIndex, 1);  
      updatedFriends.unshift(friend);  
  
      return updatedFriends;
    });
    });
 
 


    socket.on("connected", (status, username) => {
      setFriendList(prevFriends => {
        return [...prevFriends].map(friend => {
          if (friend.username === username) {
            friend.connected = status;
          }
          return friend;
        });
      });
    });
    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });
    return () => {
      socket.off("dm");

      socket.off("connect_error");
      socket.off("connected");
      socket.off("messages");
      socket.off("friends");
      socket.off("connected");

    };
  }, [setUser, setFriendList,setMessages]);
};

export default useSocketSetup;