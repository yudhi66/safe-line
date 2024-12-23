import { ButtonGroup,FormControl,FormLabel,Button,FormErrorMessage, VStack, Input, Heading, Text} from "@chakra-ui/react"
import {Formik, useFormik,Form} from 'formik';
import * as Yup from "yup";
import TextField from "../TextField";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import formSchema from "@safe-line/common/index.js"
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";

const SignUp=()=>{
   const {setUser} =useContext(AccountContext)
   const [error,setError]=useState(null);
  const navigate=useNavigate();
    return (
    <Formik 
    initialValues={{username:"",password:"",publicKey:""}}
     validationSchema= {formSchema}
     onSubmit={(values,actions)=>{
        const vals={...values};
          
          actions.resetForm();
          fetch("http://localhost:4000/auth/signup",{
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
            if (!data) return;
            setUser({ ...data });
          if(data.status){
            setError(data.status);
          }else{
            navigate("/home");
          }

          })
     }}
     >
    
        <VStack as={Form} w={{base:"90%",md:"500px"}} m="auto"
    justify="center" h="100vh" spacing="1rem"  
    > 
<Heading>SignUp</Heading>
    <Text as="p" color="red.500">{error}</Text>
     <TextField name="username" placeholder="Enter username" autoComplete="off" label="Username"/>
     <TextField name="password" placeholder="Enter password" type="password" autoComplete="off" label="Password" />
     <TextField name="publicKey" placeholder="Enter public key"   autoComplete="off" label="PublicKey" />


    <ButtonGroup pt="1rem">
       <Button colorScheme="green" type="submit"> Create Account</Button>
       <Button onClick={()=>{
        navigate("/");
       }} leftIcon={<ArrowBackIcon/>}>Back</Button>
    </ButtonGroup>
    </VStack>
     
    
   
    </Formik>
    )
};


export default SignUp;