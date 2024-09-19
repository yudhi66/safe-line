import ToggleColorMode from "./componets/ToggleColorMode";
import Views from "./componets/views";
import UserContext from "./componets/AccountContext";
 
function App() {
  return (
    <UserContext>
     <ToggleColorMode/>
     <Views/>
    
    </UserContext>
   
  
  );
}

export default App;
