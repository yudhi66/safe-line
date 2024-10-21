 import { ButtonGroup,FormControl,FormLabel,Button,FormErrorMessage, VStack, Input, Heading, Text} from "@chakra-ui/react"
 import {Formik, useFormik,Form} from 'formik';
   
import TextField from "../TextField";
import { useNavigate } from "react-router-dom";
import formSchema from "@safe-line/common/index.js"

import { AccountContext } from "../AccountContext";
import { useContext,useState } from "react";

 const Login=()=>{
   const {setUser}=useContext(AccountContext);
   const [error,setError]=useState(null);
    const navigate=useNavigate();
  
     return (
     <Formik 
     initialValues={{username:"",password:""}}
      validationSchema=  {formSchema}
      onSubmit={(values,actions)=>{
         const vals={...values};
          
         actions.resetForm();
         fetch("http://localhost:4000/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch(err => {
            return;
          })
          .then(res => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then(data => {
            if (!data) return;
           
          if(data.status){
            setError(data.status);
          }else{
            const userName=data.username;  
            console.log(userName); 
            navigate("/keyvalidation",{state:{username:userName}}) ;
          }

            
             
            
        
          });
      }}
      >
     
         <VStack as={Form} w={{base:"90%",md:"500px"}} m="auto"
     justify="center" h="100vh" spacing="1rem"  
     > 
<Heading>Login</Heading>
<Text as="p" color="red.500">{error}</Text>    
      <TextField name="username" placeholder="Enter username" autoComplete="off" label="Username"/>
      <TextField name="password" placeholder="Enter password" type="password" autoComplete="off" label="Password" />
     


     <ButtonGroup pt="1rem">
        <Button colorScheme="green" type="submit"> Login</Button>
        <Button onClick={()=>{
         navigate("/register")
        }}>Create Account</Button>
     </ButtonGroup>
     </VStack>
      
     
    
     </Formik>
     )
 };


 export default Login;