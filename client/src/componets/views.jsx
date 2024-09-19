import { Text } from "@chakra-ui/react";
import { Routes ,Route} from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./Login/signup";
import PrivateRoutes from "./PrivateRoutes";
import UserContext, { AccountContext } from "./AccountContext";
import { useContext } from "react";
const Views=()=>{
   const {user}=useContext(AccountContext);
   return user.loggedIn === null ? (
      <Text>Loading...</Text>
    ) : (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Text>Hi welcome home</Text>} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    );

};


export default Views;