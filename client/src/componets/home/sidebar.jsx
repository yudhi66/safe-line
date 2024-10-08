import React, { useContext } from "react";

import {Divider,Circle,Text,Tab,TabList,VStack,HStack,Heading,Button, useDisclosure} from "@chakra-ui/react";
import {ChatIcon} from "@chakra-ui/icons"; 
import { FriendContext } from "./Home";
import AddFriendModal from "./AddFriendModal";
const Sidebar=()=>{

   const {friendList}=useContext(FriendContext);
   const {isOpen,onOpen,onClose}=useDisclosure();
   return(
      <>
     
           <VStack py="1.4rem">
            <HStack justify="space-evenly" w="100%">
              <Heading size="md">Add Friend</Heading>
        <Button onClick={onOpen}>
            <ChatIcon/>
        </Button>
            </HStack>
            <Divider />
            <VStack as={TabList}>
                     {/*<HStack as={Tab}>
                        <Circle bg="red.500" w="15px" h="20px"/>
                        <Text>John Doe</Text></HStack>
                     <HStack as={Tab}>
                     <Circle bg="green.500" w="15px" h="20px"/>
                        <Text>John Doe</Text></HStack>
                    */}
                    {
                     friendList.map(friend=>(
                        <HStack as={Tab} key={`friend:${friend}`}>
                           <Circle  bg={friend.connected?"green.700":"red.500"} w="15px" h="15px"/>
                          <Text>{friend}</Text>
                        </HStack>

                     ))
                    }
                     </VStack>
            
           </VStack>
           {isOpen && <AddFriendModal isOpen={isOpen} onClose={onClose} />}
           </>
     )
}

export default Sidebar;