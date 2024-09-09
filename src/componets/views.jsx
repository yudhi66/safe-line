import { Routes ,Route} from "react-router-dom";
import Login from "./Login";
import signup from "./signup";
const Views=()=>{
   return <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<signup/>}/>
      <Route path="*" element={<Login/>}/>
   </Routes>

};


export default Views;