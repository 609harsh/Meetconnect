import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../redux/meetApi";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Payload } from "../types";

const Login = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigate();
  const [userLogin] = useUserLoginMutation();

  useEffect(() => {
    setError("");
  }, [email, password]);
  const submitForm = async () => {
    if (!email || !password) {
      setError("All fields required");
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
      setError("Please enter valid email");
      return;
    }
    if (password.length < 8) {
      setError("Password length should be at least 8 charcters");
      return;
    }
    if (!password.match(/(?=.*[a-z])/)) {
      setError("Password should have at least one lowercase letter");
      return;
    }
    if (!password.match(/(?=.*[A-Z])/)) {
      setError("Password should have at least one uppercase letter");
      return;
    }
    if (!password.match(/(?=.*\d)/)) {
      setError("Password should have at least one digit");
      return;
    }
    if (!password.match(/(?=.*[@$!%*?&])/)) {
      setError("Password should have at least one special character");
      return;
    }
    //Write api call
    const token = await userLogin({ email, password }).unwrap();
    localStorage.setItem("token", token);
    navigation("/dashboard");
  };

  const handleCredentialResponse = async (credentialResponse: string) => {
    console.log("Encoded JWT ID token:", credentialResponse);
    const { email } = jwtDecode(credentialResponse) as Payload;
    const token = await userLogin({ email, google: true }).unwrap();
    localStorage.setItem("token", token);
    navigation("/dashboard");
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
          }}
        ></div>
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>
          <p className="mt-3 text-xl text-center text-gray-600 ">
            Welcome back!
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
              ;
            </div>
          </GoogleOAuthProvider>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  lg:w-1/4"></span>

            <Link
              to="#"
              className="text-xs text-center text-gray-500 uppercase  hover:underline"
            >
              or login with email
            </Link>

            <span className="w-1/5 border-b  lg:w-1/4"></span>
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
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 "
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <Link
                to="/forgot"
                className="text-xs text-gray-500  hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            <input
              id="loggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error !== "" && <p className="text-sm text-red-600 mt-1">{error}</p>}
          <div className="mt-6">
            <button
              type="submit"
              onClick={() => submitForm()}
              className="w-full px-6 py-3 text-xs font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b  md:w-1/4"></span>

            <Link
              to="/signin"
              className="text-xs text-gray-500 uppercase hover:underline"
            >
              or sign up
            </Link>

            <span className="w-1/5 border-b  md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
