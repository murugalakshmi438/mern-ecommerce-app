import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSignup = async () => {

    try {

      const res = await axios.post(
        "https://mern-backend-o98s.onrender.com/api/auth/signup",
        {
          name,
          email,
          password
        }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(error.response.data.message);

    }

  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleSignup}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
        >
          Signup
        </button>



        <p className="text-center mt-5">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Signup;