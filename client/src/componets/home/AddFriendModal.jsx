import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import { Button, Heading, ModalOverlay } from "@chakra-ui/react";
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import TextField from "../TextField";
import socket from "../../Socket";
import { useCallback, useContext, useState } from "react";
import { FriendContext } from "./Home";
const localFriendSchema = Yup.object({
  friendName: Yup.string()
    .required("Username required")
    .min(6, "Invalid username!")
    .max(28, "Invalid username!"),
});
const AddFriendModal = ({ isOpen, onClose }) => {
  const [error,setError]=useState("");
  const closeModal=useCallback(
    ()=>{
           setError("");
           onClose();
    },[onClose],
  );
  const {setFriendList}=useContext(FriendContext);
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ friendName: "" }}
          onSubmit={(values,{ resetForm }) => {
            socket.emit("add_friend",values.friendName,({errorMsg,done})=>{
                  if(done){

                    setFriendList(c=> (
                      [values.friendName, ...c]
                    )
                      
                    )
                    closeModal();
                    
                    return;
                  }
                  setError(errorMsg);
            });
       
          }}
          validationSchema={localFriendSchema}
        >
          <Form >
            <ModalBody>
              <Heading as="p" textAlign="center" color="red.500" fontSize="large"> {error} </Heading>
              <TextField
                label="Friend's name"
                placeholder="Enter friend's username.."
                autoComplete="new-password" 
                name="friendName"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;