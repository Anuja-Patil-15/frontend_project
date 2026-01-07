import React, { useContext } from "react";
import { UserContext } from "./context/Context";
import Navbar from "./pages/Navbar";
import Routess from "./Routes/Routes";


const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
     <header>
        <Navbar/>
      </header>

      <Routess />
    </>
  );
};

export default App;
