import {Grid,GridItem,Tabs} from "@chakra-ui/react"
import Sidebar from "./sidebar";
import Chat from "./Chat";
import { createContext, useState } from "react";
import useSocketSetup from "./useSocketSetup";
export const FriendContext=createContext();
export const MessagesContext =createContext();
/*const HomePage = () => {
  const [friendList,setFriendList]=useState([
     
  ]);
  console.log(friendList);
const [messages,setMessages]=useState([]);
const [friendIndex,setFriendIndex]=useState(0);
  useSocketSetup(setFriendList,setMessages);
    return   (
       <FriendContext.Provider value={{friendList,setFriendList}}> 
      <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs} onChange={
        (index)=> 
          setFriendIndex[index]
       
      } >
    <GridItem colSpan="3" borderRight="1px solid gray">
      <Sidebar />
    </GridItem>
    <GridItem colSpan="7" maxH="100vh">
      <MessagesContext.Provider value={{messages,setMessages}}>
      <Chat userid={friendList[friendIndex]?.userid} username={friendList[friendIndex]?.username}/>
      </MessagesContext.Provider>
    
    </GridItem>
  </Grid>
  </FriendContext.Provider>
    )  
  };
  
  export default HomePage;*/

 
const HomePage = () => {
  const [friendList, setFriendList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [friendIndex, setFriendIndex] = useState(0);

  useSocketSetup(setFriendList, setMessages);

  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <MessagesContext.Provider value={{ messages, setMessages }}>
        <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs} onChange={index => setFriendIndex(index)}>
          <GridItem colSpan="3" borderRight="1px solid gray">
            <Sidebar />
          </GridItem>
          <GridItem colSpan="7" maxH="100vh">
            {friendList[friendIndex] && (
              <Chat userid={friendList[friendIndex].userid} username={friendList[friendIndex].username} />
            )}
          </GridItem>
        </Grid>
      </MessagesContext.Provider>
    </FriendContext.Provider>
  );
};

export default HomePage;
