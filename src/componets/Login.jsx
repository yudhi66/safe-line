 import {Vstack,ButtonGroup,FormControl,FormLabel,Button,FormErrorMessage, VStack, Input, Heading} from "@chakra-ui/react"
 
 
 const Login=()=>{
     return <VStack as="form" w={{base:"90%",md:"500px"}} m="auto"
     justify="center" h="100vh" spacing="1rem"
     > 
<Heading>Login</Heading>

      <FormControl>
        <FormLabel fontSize="lg">Username</FormLabel>
        <Input size="lg" name="username" placeholder="Enter your username" autoComplete="off"/>
        <FormErrorMessage>Invalid username</FormErrorMessage>
     
      </FormControl>
    
     <FormControl>
       
     <FormLabel fontSize="lg">Password</FormLabel>
        <Input size="lg" name="password" placeholder="Enter your password" autoComplete="off"/>
        <FormErrorMessage>Invalid password</FormErrorMessage>
     
     </FormControl>


     <ButtonGroup pt="1rem">
        <Button colorScheme="green" type="submit"> Login</Button>
        <Button>Create Account</Button>
     </ButtonGroup>
     </VStack>
 };


 export default Login;