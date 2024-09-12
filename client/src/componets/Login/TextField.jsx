import {
    FormControl,
    FormErrorMessage,
    FormLabel,
  } from "@chakra-ui/form-control";
  import { Input } from "@chakra-ui/input";
  import { Field, useField } from "formik";
  
  const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <FormControl isInvalid={meta.touched && meta.error}>
        <FormLabel style={{fontSize:25}}>{label}</FormLabel>
        <Input   {...field} {...props} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    );
  };
  
  export default TextField;