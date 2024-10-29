import { VStack } from "@chakra-ui/react";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useContext, useEffect, useRef } from "react";
import { FriendContext, MessagesContext } from "./Home";
import { Text } from "@chakra-ui/react";
import ChatBox from "./ChatBox";
const Chat = ({userid,username}) => {
  const {friendList}=useContext(FriendContext)
   const {messages}=useContext(MessagesContext);
   const bottomDiv =useRef(null);
   useEffect(()=>{
      bottomDiv.current?.scrollIntoView();
   })
  return friendList.length>0 ? (
    <VStack h="100%" justify="end">
      <TabPanels overflow="scroll">
         {
          friendList.map(friend=>(
            <VStack 
            flexDir="column-reverse" 
            as={TabPanel}
            key={`chat:${friend.username}`}
            w="100%"
            >
              <div ref={bottomDiv}/>
              {messages.filter(msg=> 
                msg.to ===friend.userid || msg.from ===friend.userid
               ).map((message,idx)=>(
               <Text
               m={
                message.to===friend.userid ? "1rem 0 0 auto !important":"1rem auto 0 0 !important"

               }
               maxW="50%"
                key={`msg:${friend.username}.${idx}`}
                fontSize="large"
                  bg={message.to ===friend.userid?"blue.100":"gray.100"}
                  color="gray.800"
                  borderRadius="10px"
                  p="0.5 rem 1rem"
               >
                   {typeof message.content === "string" ? message.content : JSON.stringify(message.content)}
               </Text>
               ))}
            </VStack>
          ))
         }
      </TabPanels>
      <ChatBox userid={userid} username={username} />
    </VStack>
  ):(
    <VStack justify="center" pt="5rem" textAlign="center" fontSize="large">
    <TabPanels>
      <TabPanel>No friends click add friend to start chat</TabPanel>
 
    </TabPanels>
  </VStack>

  );
}

export default Chat;