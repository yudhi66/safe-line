 import { ButtonGroup,FormControl,FormLabel,Button,FormErrorMessage, VStack, Input, Heading} from "@chakra-ui/react"
 import {Formik, useFormik,Form} from 'formik';
 import * as Yup from "yup";
 import TextField from "./TextField"
import { useNavigate } from "react-router-dom";
 const Login=()=>{
    const navigate=useNavigate();
  
     return (
     <Formik 
     initialValues={{username:"",password:""}}
      validationSchema= {Yup.object({
          username:Yup.string().required("Required Field").min(5,"Username  is too short").max(28,"Username too long"),
          password:Yup.string().required("Required Field").min(5,"Password is too short").max(28,"Password too long")
      })}
      onSubmit={(values,actions)=>{
         const vals={...values};
          
         actions.resetForm();
         fetch("http://localhost:4000/auth/login",{
            method:"POST",
            credentials:"include",
            headers:{
               "Content-Type":"application/json",
            },
            body:JSON.stringify(vals)
         }).catch(err=>{
            return;
         }).then(res=>{
            if(!res || !res.ok || res.status>=400){
               return ;
            }
            return res.json();
         }).then(data=>{
            if(!data)return;
            console.log(data);

         })
    
      }}
      >
     
         <VStack as={Form} w={{base:"90%",md:"500px"}} m="auto"
     justify="center" h="100vh" spacing="1rem"  
     > 
<Heading>Login</Heading>
     
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