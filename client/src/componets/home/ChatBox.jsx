import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
 
import * as Yup from "yup";
import socket from "../../Socket";
import { useContext } from "react";
import { MessagesContext } from "./Home";
 

const ChatBox = ({userid}) => {
  const {setMessages} =useContext(MessagesContext)
   
  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={Yup.object({
        message: Yup.string().min(1).max(255),
      })}
      onSubmit={(values, actions) => {
        const message = {to:userid,from:null,content:values.message }
        console.log(JSON.stringify(message));
        socket.emit("dm",message);
         setMessages(preMsgs =>[message, ...preMsgs]); 
        actions.resetForm();
      }}
    >
      <HStack as={Form} w="100%" pb="1.4rem" px="1.4rem">
        <Input
          as={Field}
          name="message"
          placeholder="Type message here.."
          size="lg"
          autoComplete="off"
        />
        <Button type="submit" size="lg" colorScheme="teal">
          Send
        </Button>
      </HStack>
    </Formik>
  );
};

export default ChatBox;