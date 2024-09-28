import {Grid,GridItem,Tabs} from "@chakra-ui/react"
import Sidebar from "./sidebar";

const HomePage = () => {
    return     <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}  >
    <GridItem colSpan="3" borderRight="1px solid gray">
      <Sidebar />
    </GridItem>
    <GridItem colSpan="7">
     
    </GridItem>
  </Grid>
  };
  
  export default HomePage;