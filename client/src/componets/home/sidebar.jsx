import React from "react";

import {Divider,Circle,Text,Tab,TabList,VStack,HStack,Heading,Button} from "@chakra-ui/react";
import {ChatIcon} from "@chakra-ui/icons"; 
const Sidebar=()=>{
     return(
           <VStack py="1.4rem">
            <HStack justify="space-evenly" w="100%">
              <Heading size="md">Add Friend</Heading>
        <Button>
            <ChatIcon/>
        </Button>
            </HStack>
            <Divider />
            <VStack as={TabList}>
                     <HStack as={Tab}>
                        <Circle bg="red.500" w="15px" h="20px"/>
                        <Text>John Doe</Text></HStack>
                     <HStack as={Tab}>
                     <Circle bg="green.500" w="15px" h="20px"/>
                        <Text>John Doe</Text></HStack>
                     </VStack>
            
           </VStack>
     )
}

export default Sidebar;