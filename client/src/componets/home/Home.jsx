import {Grid,GridItem,Tabs} from "@chakra-ui/react"
import Sidebar from "./sidebar";
import Chat from "./Chat";
import { createContext, useState } from "react";
import useSocketSetup from "./useSocketSetup";
export const FriendContext=createContext();

const HomePage = () => {
  const [friendList,setFriendList]=useState([
     
  ]);

  useSocketSetup();
    return   (
       <FriendContext.Provider value={{friendList,setFriendList}}> 
      <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}  >
    <GridItem colSpan="3" borderRight="1px solid gray">
      <Sidebar />
    </GridItem>
    <GridItem colSpan="7">
     <Chat/>
    </GridItem>
  </Grid>
  </FriendContext.Provider>
    )  
  };
  
  export default HomePage;