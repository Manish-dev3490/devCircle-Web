import { useState } from "react";
import axios from "axios";
import dataValidation from "../utils/validation";
import { useDispatch } from "react-redux";
import { addUser } from '../utils/userSlice'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("manish123@gmail.com");
  const [password, setPassword] = useState("manishKumar123@");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setEmailError("");
      setPasswordError("");

      dataValidation(email, password);

      const response = await axios.post("http://localhost:3000/login", {
        email,
        password
      }, {
        withCredentials: true
      });


      if (response) dispatch(addUser(response.data));
      navigate('/');
      
    } catch (error) {
      if (error.field === "email") {
        setEmailError(error.message);
      } else if (error.field === "password") {
        setPasswordError(error.message);
      }
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100  rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-medium text-white cursor-pointer"
            >
              Enter your Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className="input input-bordered w-full px-4"
            />
            {emailError ? (
              <span className=" text-red-500 ">{emailError}</span>
            ) : (
              ""
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-medium text-white cursor-pointer"
            >
              Enter your Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className="input input-bordered w-full px-4"
            />
          </div>
          {passwordError ? (
            <span className=" text-red-500 ">{passwordError}</span>
          ) : (
            ""
          )}

          {/* Button */}
          <button className="btn btn-primary mt-3">Submit</button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-6 text-gray-600">
          If you don't have an account?{" "}
          <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
            Signup here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
