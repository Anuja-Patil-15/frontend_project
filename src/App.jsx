import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./pages/Navbar";
import Routess from "./Routes/Routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  const user = useSelector((state) => state.user.user); 

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <header>
        <Navbar />
      </header>

      <Routess />
    </>
  );
};

export default App;
