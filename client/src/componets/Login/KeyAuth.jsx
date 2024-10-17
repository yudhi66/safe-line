import { ButtonGroup, Button, VStack, Heading, Text } from "@chakra-ui/react";
import { Formik, Form } from 'formik';
import TextField from "../TextField";
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";
import { useNavigate } from "react-router-dom";

const KeyAuth = () => {
  const { setUser } = useContext(AccountContext);
  const [error,setError]=useState(null);
  const navigate=useNavigate();
  return (
    <Formik
      initialValues={{ key: "" }}  
      onSubmit={(values, actions) => {
        const vals={...values};
         console.log(vals);

         actions.resetForm();

         fetch("http://localhost:4000/auth/keyvalidation",{

           method:"POST",
           credentials:"include",
           headers:{
               "Content-Type":"application/json",
           },
           body: JSON.stringify(vals),
         }).catch(err=>{
          return;
         }).then(res=>{
          if (!res || !res.ok || res.status >= 400) {
               return;
             }
             return res.json();

         }).then(data=>{
              if(!data) return;
              setUser({...data});
             if(data.status){
               setError(data.status);
             }else{
               navigate("/home");
             }


         })
          
   


      }}
    >
      {() => (
        <VStack
          as={Form}
          w={{ base: "90%", md: "500px" }}
          m="auto"
          justify="center"
          h="100vh"
          spacing="1rem"
        >
          <Heading>Key Validation</Heading>
          <Text as="p" color="red.500">{error} </Text>
          <TextField
            name="key"
            placeholder="Enter Private Key"
            type="password"
            autoComplete="off"
            label="Key"
          />

          <ButtonGroup pt="1rem">
            <Button colorScheme="green" type="submit">
              Validate
            </Button>
          </ButtonGroup>
        </VStack>
      )}
    </Formik>
  );
};

export default KeyAuth;
