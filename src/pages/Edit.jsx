import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
//get specific user data 
 useEffect(() => {
  axios
    .get(`http://localhost:5000/admin/${id}`)
    .then((res) => {
      setRole(res.data.Role );
      setName(res.data.name );
      setEmail(res.data.email );
      setContact(res.data.contact );
      setPassword(res.data.Password );
        
    })
    .catch(() => {
      alert("User not found");
      navigate("/dashboard");
    });
}, [id, navigate]);

//store updated data in database
  const handleUpdate = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:5000/admin/edit/${id}`, {
      role,
      name,
      contact,
      email,
    });
   alert("user information updated successfully")
   navigate("/desktop");
  };

  return (
    <div className="pt-40">
    <div className="max-w-md mx-auto  mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>

      <form onSubmit={handleUpdate}>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
        >
          <option value="">Select Role</option>
          <option value="Desk">Desk</option>
          <option value="Agent">Agent</option>
        </select>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Name"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Email"
        />

        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Contact Number"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Update
        </button>
      </form>
    </div>
    </div>
  );
};

export default Edit;
