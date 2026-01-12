import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Deskstop = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
//get all users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/admin/display`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

 const handleResetPassword = async (id) => {
  try {
    const password = Math.random().toString(36).slice(-8);

    await axios.put(
      `${BACKEND_URL}/admin/resetpassword/${id}`,
      { password }
    );
    console.log("Reset clicked", id);

    toast.success(`New generated password: ${password}`);
  } catch (error) {
    console.error(error);
    toast("Password reset failed");
  }
};


  return (
    <div className="pt-24 h-[90%]">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">User Dashboard</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              {["ID", "Name", "Email", "Role", "Contact", "Created At", "Edit","Reset"].map(
                (header) => (
                  <th
                    key={header}
                    className="text-left px-6 py-3 text-gray-700 font-medium uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 transition duration-200 cursor-pointer"
              >
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.Role}</td>
                <td className="px-6 py-4 break-all">{user.contact}</td>
                <td className="px-6 py-4">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => navigate(`/edit/${user.id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
                 <td className="px-6 py-4">
                  <button
                    onClick={()=>{handleResetPassword(user.id)}}
                    className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deskstop;
