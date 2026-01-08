import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Home = () => {
  const  user  = useSelector((state)=>state.user.user)
  
  return (
    
    <div className="p-6">
      
      <h2 className="text-xl font-bold">
        Welcome {user.email}
      </h2>
    </div>
  );
};

export default Home;
