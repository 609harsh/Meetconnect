import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserSignupMutation } from "../redux/ApiSlice/meetApi";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Payload } from "../types";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const navigation = useNavigate();
  const [userSignup] = useUserSignupMutation();

  const submitForm = async () => {
    if (!email || !password || !name || !phoneNumber) {
      toast.error("All fields required");
      return;
    }
    if (name.length <= 2) {
      toast.error("Name too short");

      return;
    }
    if (name.length >= 30) {
      toast.error("Name too long");
      return;
    }
    if (name.match(/(?=.*\d)/)) {
      toast.error("Name cannot have digits");
      return;
    }
    if (
      !email
        .trim()
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      toast.error("Please enter valid email");
      return;
    }
    if (password.length < 8) {
      toast.error("Password length should be at least 8 charcters");
      return;
    }
    if (!password.match(/(?=.*[a-z])/)) {
      toast.error("Password should have at least one lowercase letter");
      return;
    }
    if (!password.match(/(?=.*[A-Z])/)) {
      toast.error("Password should have at least one uppercase letter");
      return;
    }
    if (!password.match(/(?=.*\d)/)) {
      toast.error("Password should have at least one digit");
      return;
    }
    if (!password.match(/(?=.*[@$!%*?&])/)) {
      toast.error("Password should have at least one special character");
      return;
    }
    if (phoneNumber.length != 10) {
      toast.error("Provide valid PhoneNumber");
      return;
    }
    if (!Number(phoneNumber)) {
      toast.error("Provide valid PhoneNumber");
      return;
    }
    try {
      const token = await toast.promise(
        userSignup({
          name,
          email,
          password,
          phoneNumber,
        }).unwrap(),
        {
          pending: "Creating Account",
          success: "Account Created",
        }
      );
      localStorage.setItem("token", token);
      navigation("/dashboard");
    } catch (err: any) {
      toast.error(err.error);
    }
  };

  const handleCredentialResponse = async (credentialResponse: string) => {
    try {
      const { email, name } = jwtDecode(credentialResponse) as Payload;
      const token = await toast.promise(
        userSignup({ name, email, google: true }).unwrap(),
        {
          pending: "Creating Account",
          success: "Account Created",
        }
      );
      localStorage.setItem("token", token);
      navigation("/dashboard");
    } catch (err: any) {
      console.log(err);
      toast.error(err.error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="hidden bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage: "url('Signin1.webp')",
            }}
          ></div>
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <p className="mt-3 text-xl text-center font-bold text-gray-600 ">
              Welcome!
            </p>
            <GoogleOAuthProvider clientId="497631762778-bshl03f2nhuiblkqfklithtq502mkf6t.apps.googleusercontent.com">
              <div
                className="flex justify-center mt-4 rounded-lg  hover:bg-gray-50 px-4 py-2"
                id="buttonDiv"
              >
                <GoogleLogin
                  onSuccess={(credentialResponse) =>
                    handleCredentialResponse(credentialResponse.credential + "")
                  }
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </GoogleOAuthProvider>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  lg:w-1/4"></span>

              <Link
                to="#"
                className="text-xs text-center text-gray-500 uppercase  hover:underline"
              >
                or Sigin up with email
              </Link>

              <span className="w-1/5 border-b  lg:w-1/4"></span>
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="FullName"
              >
                Full Name
              </label>
              <input
                id="FullName"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="PhoneNumber"
              >
                Phone Number
              </label>
              <input
                id="PhoneNumber"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg   focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
              </div>

              <input
                id="loggingPassword"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <button
                onClick={() => submitForm()}
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b  md:w-1/4"></span>

              <Link
                to="/login"
                className="text-xs text-gray-500 uppercase hover:underline"
              >
                or Login
              </Link>

              <span className="w-1/5 border-b  md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
