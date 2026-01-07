import { useContext, useState } from "react";
import { UserContext } from "../context/Context";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false); 

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${BACKEND_URL}/user/login`,
      {
        email: email,   
        password: password
      }
    );

    const user = response.data;
    console.log(user);

    
   localStorage.setItem("user", JSON.stringify(user));
   setUser(user);
   console.log(user)

    setRedirect(true); 

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};
 if (redirect) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
