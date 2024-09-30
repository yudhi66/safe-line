import { Modal, ModalBody,Button, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton } from "@chakra-ui/react";
import TextField from "../TextField";
import { Formik ,Form} from "formik";

const AddFriendModal=({isOpen,onClose})=>{
    return <Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay/>
  <ModalContent>
       
       <ModalHeader>Add a friend</ModalHeader>
       <ModalCloseButton/>

       <Formik initialValues={{friendName:""}} onSubmit={(values,actions)=>{
        alert(JSON.stringify(values,null,2));
        actions.resetForm();
       }}>
        <Form>
       <ModalBody> 
        <TextField label="Friends name" placeholder="Enter friends username..." autoComplete="off" name="friendName"/>
       </ModalBody>
       <ModalFooter>
       <Button colorScheme='blue'   onClick={onClose} type="submit">
              Submit
            </Button>

       </ModalFooter>
       </Form>
       </Formik>
  </ModalContent>
    </Modal>
}

export default AddFriendModal;