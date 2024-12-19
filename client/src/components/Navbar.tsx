import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { changeMenuTo } from "../redux/menuSlice";
import { Payload } from "../types";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>("");
  const [login, setLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token") as string;
    if (token) {
      const user = jwtDecode(token) as Payload;
      console.log(user);
      setUsername(user.username);
      setLogin(true);
    }
  }, []);
  return (
    <nav className="block w-full px-4 py-2 mx-auto bg-white bg-opacity-90 top-3 shadow lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150">
      <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
        <Link
          to="/"
          className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
        >
          MeetConnect
        </Link>
        <div className="hidden md:block">
          {login && (
            <ul className="flex flex-col gap-2 mt-2 mb-4 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link
                  to="/dashboard"
                  className="flex items-center"
                  onClick={() => dispatch(changeMenuTo(true))}
                >
                  Schedule
                </Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link
                  to="/dashboard"
                  className="flex items-center"
                  onClick={() => dispatch(changeMenuTo(false))}
                >
                  Interviews
                </Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link to="/tracker" className="flex items-center">
                  Tracker
                </Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link to="/resources" className="flex items-center">
                  Resources
                </Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link to={`/profile/${username}`} className="flex items-center">
                  Profile
                </Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link
                  to="/login"
                  className="flex items-center"
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          )}
        </div>

        {!login && (
          <ul className="flex flex-row gap-1 mt-2 mb-4 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <Link
                to="/login"
                className="px-3 py-1 bg-white text-gray-800 shadow hover:bg-gray-50 rounded-lg"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Login
              </Link>
            </li>
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <Link
                to="/signin"
                className="px-3 py-1 bg-gray-800 text-gray-200 shadow hover:bg-gray-900 rounded-lg"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Register
              </Link>
            </li>
          </ul>
        )}
        {login && (
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:hidden"
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </span>
          </button>
        )}
      </div>
      {openMenu && (
        <div className="md:hidden">
          {login && (
            <ul
              role="list"
              className="flex flex-col gap-2 mt-1 mb-2 items-end shadow-lg rounded-lg p-2"
            >
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link
                  to="/dashboard"
                  className="flex items-center"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    dispatch(changeMenuTo(true));
                  }}
                >
                  Schedule
                </Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link
                  to="/dashboard"
                  className="flex items-center"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    dispatch(changeMenuTo(false));
                  }}
                >
                  Interviews
                </Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link to="/dashboard" className="flex items-center">
                  Tracker
                </Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link to="/resources" className="flex items-center">
                  Resources
                </Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link to={`/profile/${username}`} className="flex items-center">
                  Profile
                </Link>
              </li>
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link
                  to="/login"
                  className="flex items-center"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    localStorage.removeItem("token");
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
