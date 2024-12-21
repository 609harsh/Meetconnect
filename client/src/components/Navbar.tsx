import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { changeMenuTo } from "../redux/menuSlice";
import { Payload } from "../types";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import LogoutIcon from "../icons/LogoutIcon";
import MenuIcon from "../icons/MenuIcon";
import { FaUser } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsKanban } from "react-icons/bs";
import { SiGooglemeet } from "react-icons/si";

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
    <div>
      <nav className="block w-full px-4 py-2 mx-auto bg-white bg-opacity-90 top-3 shadow lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
          <Link
            to="/"
            className="mr-4 block cursor-pointer py-1.5 text-xl text-slate-800 font-semibold"
          >
            JOBSY
          </Link>
          <div className="hidden md:block">
            {login && (
              <ul className="flex flex-col gap-2 mt-2 mr-2 font-normal text-slate-700 mb-4 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6 ">
                <li className="hover:ring-blue-700/90 hover:ring-2 p-1 hover:bg-blue-300/40 rounded-md">
                  <Link
                    to="/dashboard"
                    onClick={() => dispatch(changeMenuTo(true))}
                  >
                    Schedule
                  </Link>
                </li>
                <li className="hover:ring-blue-700/90 hover:ring-2 p-1 hover:bg-blue-300/40 rounded-md">
                  <Link
                    to="/dashboard"
                    onClick={() => dispatch(changeMenuTo(false))}
                  >
                    Interviews
                  </Link>
                </li>
                <li className="hover:ring-blue-700/90 hover:ring-2 p-1 hover:bg-blue-300/40 rounded-md">
                  <Link to="/tracker">Tracker</Link>
                </li>
                <li className="hover:ring-blue-700/90 hover:ring-2 p-1 hover:bg-blue-300/40 rounded-md">
                  <Link to="/resources">Resources</Link>
                </li>
                <li className="hover:ring-blue-700/90 hover:ring-2 p-1 hover:bg-blue-300/40 rounded-md">
                  <Link to={`/profile/${username}`}>Profile</Link>
                </li>
                <li className="hover:ring-blue-700/90 hover:ring-2 p-1 hover:bg-blue-300/40 rounded-md">
                  <Link
                    to="/login"
                    onClick={() => {
                      localStorage.removeItem("token");
                    }}
                  >
                    <LogoutIcon />
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {!login && (
            <ul className="flex flex-row gap-1 mt-2 mb-4 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
              <li className="flex items-center p-1 text-md gap-x-2 text-slate-600">
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
              <li className="flex items-center p-1 text-md gap-x-2 text-slate-600">
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
                <MenuIcon />
              </span>
            </button>
          )}
        </div>
      </nav>
      {openMenu && (
        <div className="md:hidden absolute z-10 w-full bg-white ring-blue-700/90  ring-2 ">
          {login && (
            <ul
              role="list"
              className="flex flex-col gap-2 mt-1 text-md text-center text-slate-800 font-medium mb-2 shadow-lg rounded-lg p-2 "
            >
              <li className="p-1 bg-blue-300/40 ">
                <Link
                  to="/dashboard"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    dispatch(changeMenuTo(true));
                  }}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <IoCalendarNumberOutline />
                  Schedule
                </Link>
              </li>
              <li className="p-1">
                <Link
                  to="/dashboard"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    dispatch(changeMenuTo(false));
                  }}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <SiGooglemeet />
                  Interviews
                </Link>
              </li>
              <li className=" p-1 bg-blue-300/40">
                <Link
                  to="/dashboard"
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <BsKanban />
                  Tracker
                </Link>
              </li>
              <li className=" p-1">
                <Link
                  to="/resources"
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <GrResources />
                  Resources
                </Link>
              </li>
              <li className="p-1 bg-blue-300/40">
                <Link
                  className="flex flex-row items-center justify-center gap-2"
                  to={`/profile/${username}`}
                >
                  <FaUser />
                  Profile
                </Link>
              </li>
              <li className="p-1">
                <Link
                  to="/login"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                    localStorage.removeItem("token");
                  }}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <LogoutIcon />
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
