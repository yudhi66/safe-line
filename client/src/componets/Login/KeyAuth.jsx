import { ButtonGroup, Button, VStack, Heading, Text } from "@chakra-ui/react";
import { Formik, Form } from 'formik';
import TextField from "../TextField";
import { useContext, useState } from "react";
import { AccountContext } from "../AccountContext";
import { useNavigate } from "react-router-dom";
import forge from 'node-forge';
import { useLocation } from 'react-router-dom';
// Helper function to import PEM formatted RSA private key
const importPrivateKey = async (pem) => {
  return forge.pki.privateKeyFromPem(pem);
};
 
// Helper function to sign the challenge
const signChallenge = async (privateKey, challenge) => {
  const md = forge.md.sha256.create();
  md.update(challenge, 'utf8');
  const signature = privateKey.sign(md);
  return forge.util.encode64(signature);
};

const KeyAuth = () => {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { username } = routerLocation.state || {};
  console.log(username);

  return (
    <Formik
      initialValues={{ privateKey: "" }}  
      onSubmit={(values, actions) => {
        const { privateKey } = values;
        actions.resetForm();

        // Check if privateKey is empty or undefined
        if (!privateKey) {
          setError("Private key cannot be empty.");
          return;
        }

        // Fetch challenge from server first
        fetch("http://localhost:4000/auth/getChallenge", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then(res => res.json())
        .then(async data => {
          if (!data || !data.challenge) return;

          const challenge = data.challenge;
          console.log("Challenge:", challenge);

          try {
            // Import the private key
            const importedPrivateKey = await importPrivateKey(privateKey);
            // Sign the challenge
            const signature = await signChallenge(importedPrivateKey, challenge);

            // Send the signature and challenge back to the server
            fetch("http://localhost:4000/auth/keyvalidation", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ signature, challenge,username }),
            })
            .then(res => res.json())
            .then(data => {
              if (data.status) {
                setError(data.status);
              } else {
              
                setUser({ ...data,privateKey });
                navigate("/home");
              }
            })
            .catch(err => {
              console.log(err);
              setError("Validation failed.");
            });
          } catch (err) {
            console.error("Error importing private key or signing challenge:", err);
            setError("Invalid private key.");
          }
        });

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
          <Text as="p" color="red.500">{error}</Text>
          <TextField
            name="privateKey"
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
