import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const inputStyle =
    "w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400";

 
  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  
  const validate = () => {
    const newErrors = {};

    if (!role) newErrors.role = "Role is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!contact.trim()) newErrors.contact = "Contact is required";
    if (!email.trim()) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const password = generatePassword(); 

      await axios.post(`${BACKEND_URL}/admin/add`, {
        role,
        name,
        contact,
        email,
        password,
      },{
        withCredentials:true,
      });
      
      
      setPass(password);
      alert("User added successfully");

      
      setRole("");
      setName("");
      setContact("");
      setEmail("");
    } catch (error) {
      setPass(""); 

      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        alert("Failed to add user");
      }

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 h-[90%]">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="font-bold text-2xl text-center mb-6">Add User</h2>

        
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
        >
          <option value="">Select Role</option>
          <option value="Desk">Desk</option>
          <option value="Agent">Agent</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm mb-2">{errors.role}</p>
        )}

        
        <input
          className={inputStyle}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}

       
        <input
          className={`${inputStyle} mt-4`}
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        {errors.contact && (
          <p className="text-red-500 text-sm">{errors.contact}</p>
        )}

        
        <input
          className={`${inputStyle} mt-4`}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}

        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mt-6 hover:bg-blue-600"
        >
          Add User
        </button>

        
        {pass && (
          <div className="mt-4 text-center bg-green-50 p-3 rounded">
            <p className="font-bold">Generated Password</p>
            <p className="text-green-600">{pass}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddUser;
