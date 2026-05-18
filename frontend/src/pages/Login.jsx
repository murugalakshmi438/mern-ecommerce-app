import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // ✅ STORE TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ STORE USER (IMPORTANT FIX)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // optional flag
      localStorage.setItem("isAdmin", false);

      alert("User Login Successful");

      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/admin/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      // ✅ STORE USER ALSO (IMPORTANT FOR CONSISTENCY)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      localStorage.setItem("isAdmin", true);

      alert("Admin Login Successful");

      navigate("/admin");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded-lg mb-4"
        >
          User Login
        </button>

        <button
          onClick={handleAdminLogin}
          className="w-full bg-red-600 text-white p-3 rounded-lg"
        >
          Admin Login
        </button>

        <p className="text-center mt-5">
          Don’t have an account?
          <Link to="/signup" className="text-blue-600 ml-2">
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;