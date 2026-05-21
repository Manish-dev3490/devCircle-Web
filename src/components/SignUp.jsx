import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { validateSignUpData } from "../utils/validation";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // previous error remove
    setError("");

    try {
      validateSignUpData({
        email,
        password,
        firstName,
        lastName,
      });

      const response = await axios.post(
        BASE_URL + "/signup",
        {
          email,
          password,
          firstName,
          lastName,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(response.data.data));

      navigate("/profile");

    } catch (error) {
      console.log(error);

      const message =
        error?.response?.data ||
        error?.message ||
        "Something went wrong";

      setError(message);
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Create your account here
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="firstName"
              className="font-medium text-white"
            >
              Enter your First Name
            </label>

            <input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError("");
                setError("");
              }}
              className="input input-bordered w-full"
            />

            {firstNameError && (
              <span className="text-red-500">
                {firstNameError}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="lastName"
              className="font-medium text-white"
            >
              Enter your Last Name
            </label>

            <input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError("");
                setError("");
              }}
              className="input input-bordered w-full"
            />

            {lastNameError && (
              <span className="text-red-500">
                {lastNameError}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-medium text-white"
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
                setError("");
              }}
              className="input input-bordered w-full"
            />

            {emailError && (
              <span className="text-red-500">
                {emailError}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-medium text-white"
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
                setError("");
              }}
              className="input input-bordered w-full"
            />
          </div>

          {passwordError && (
            <span className="text-red-500">
              {passwordError}
            </span>
          )}

          {/* Backend Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 text-red-500">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary mt-3"
          >
            Submit
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          If you have an account?{" "}
          <Link to="/login">
            <span className="text-blue-600 font-semibold hover:underline">
              login here
            </span>
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUp;