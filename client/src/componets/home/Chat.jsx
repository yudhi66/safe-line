import { VStack } from "@chakra-ui/react";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useContext } from "react";
import { FriendContext } from "./Home";

const Chat = () => {
  const {friendList}=useContext(FriendContext)
  return friendList.length>0 ? (
    <VStack>
      <TabPanels>
        <TabPanel>friend one</TabPanel>
        <TabPanel>friend two</TabPanel>
      </TabPanels>
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