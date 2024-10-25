import { useState } from "react";

const Forgot = () => {
  const [slide, setSlide] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const checkEmail = () => {
    //send api call
    //if user does not exist
    if (!email) return;
    if (!true) {
      setError("Email Id does not exist");
      return;
    }
    setSlide(true);
  };

  const savePassword = () => {
    //make api call to save password
    console.log(password);
  };

  return (
    <div className="flex flex-col items-center mt-32 h-screen w-screen">
      <div className="mx-2 md:mx-auto md:w-1/2 md:min-w-max  ">
        <h1 className="text-4xl font-bold mb-10">Reset Your Password</h1>
        {slide ? (
          <>
            <label
              className="block text-xl font-semibold mb-4"
              htmlFor="passwordinput"
            >
              Password
            </label>
            <input
              id="passwordinput"
              className="border-b-2 border-solid border-black active:border-slate-50 outline-none w-full"
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        ) : (
          <>
            <label
              className="block text-xl font-semibold mb-4"
              htmlFor="emailinput"
            >
              {error !== "" ? "Re-Enter Email" : "Email"}
            </label>
            <input
              id="emailinput"
              className="border-b-2 border-solid border-black active:border-slate-50 outline-none w-full"
              type="email "
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-red-600 mt-2">{error}</p>
          </>
        )}
      </div>
      {slide ? (
        <div className="mt-3 space-x-3">
          <button
            type="button"
            className=" hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-semibold transition duration-200 ease-linear "
            onClick={() => savePassword()}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="mt-3 space-x-3">
          <button
            type="button"
            className=" hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-semibold transition duration-200 ease-linear "
            onClick={() => checkEmail()}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Forgot;
