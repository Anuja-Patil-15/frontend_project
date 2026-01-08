import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./pages/Navbar";
import Routess from "./Routes/Routes";

const App = () => {
  const user = useSelector((state) => state.user.user); // get user from Redux

  return (
    <>
      <header>
        <Navbar />
      </header>

      <Routess />
    </>
  );
};

export default App;
