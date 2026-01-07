import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Deskstop = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [users, setUsers] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/display`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); 
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Role</th>
            <th className="border px-3 py-2">Password</th>
            <th className="border px-3 py-2">Created At</th>
             <th className="border px-3 py-2">Edit Profile</th>
          </tr>

        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-3 py-2">{user.id}</td>
              <td className="border px-3 py-2">{user.name}</td>
              <td className="border px-3 py-2">{user.email}</td>
              <td className="border px-3 py-2">{user.Role}</td>
              <td className="border px-3 py-2">{user.Password}</td>
              <td className="border px-3 py-2">
                {new Date(user.created_at).toLocaleString()}
              </td>
               <td className="border px-3 py-2"><button onClick={()=>navigate(`/edit/${user.id}`)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Deskstop;
