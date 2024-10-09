import React, { useContext } from "react";

import {Divider,Circle,Text,Tab,TabList,VStack,HStack,Heading,Button, useDisclosure} from "@chakra-ui/react";
import {ChatIcon} from "@chakra-ui/icons"; 
import { FriendContext } from "./Home";
import AddFriendModal from "./AddFriendModal";
const Sidebar=()=>{

   const {friendList}=useContext(FriendContext);
   const {isOpen,onOpen,onClose}=useDisclosure();
   console.log(friendList);
   return(
      <>
     
     <VStack py="1.4rem">
        <HStack justify="space-evenly" w="100%">
          <Heading size="md">Add Friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        <VStack as={TabList}>
          {friendList.map(friend => (
            <HStack as={Tab} key={`friend:${friend}`}>
              <Circle
                bg={friend.connected === "true" ? "green.700" : "red.500"}
                
                w="20px"
                h="20px"
              />
              <Text>{friend.username}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
           {isOpen && <AddFriendModal isOpen={isOpen} onClose={onClose} />}
           </>
     )
}

export default Sidebar;