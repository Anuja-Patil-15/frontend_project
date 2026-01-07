import React, { useContext } from "react";
import { UserContext } from "../context/Context";
import Navbar from "./Navbar";

const Home = () => {
  const { user } = useContext(UserContext);
  
  return (
    
    <div className="p-6">
      
      <h2 className="text-xl font-bold">
        Welcome {user.email}
      </h2>
    </div>
  );
};

export default Home;
