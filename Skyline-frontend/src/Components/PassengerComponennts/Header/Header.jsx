import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import { FaXmark } from "react-icons/fa6";
import UserProfile from "../UserProfile/UserProfile";
//import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const VHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { passenger, dispatch } = useContext(AuthContext);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [noBg, addBg] = useState("nvh");
  const addBgcolor = () => {
    if (window.scrollY >= 10) {
      addBg("nvh navbar_with_Bg");
    } else {
      addBg("nvh");
    }
  };

  /*const handleLogout = () => {
  dispatch({ type: "LOGOUT" });
  window.location.href = "/home";
};*/

  useEffect(() => {
    // Check if the toast message has been displayed
    const toastDisplayed = localStorage.getItem("toastDisplayed");

    if (passenger && !toastDisplayed) {
      // Display welcome message when user logs in
      toast.success(`Welcome ${passenger.firstName}`);
      // Set flag to indicate that the toast message has been displayed
      localStorage.setItem("toastDisplayed", true);
    }
  }, [passenger]);

  window.addEventListener("scroll", addBgcolor);

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/book", title: "Plan & Book" },
    { path: "/flightlist", title: "FlightList" },
    { path: "/expreience", title: "Experience" },
    { path: "/help", title: "Help" },
    { path: "/about", title: "About" },
  ];

  return (
    <div>
      <div class="bg-white dark:bg-blue-200 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border">
        <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4   ">
          <nav className="flex justify-between items-center py-6  ">
            <a href="/" className="skyline">
              <img
                src="./src/assets/logo/new logo.png"
                alt="logo"
                class="w-20 h-20 mx-auto"
              />
            </a>

            {/* Nav items for large devices */}
            <ul className="hidden md:flex gap-12">
              {navItems.map(({ path, title }) => (
                <li
                  key={path}
                  className="md:dark:hover:text-blue-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold "
                >
                  <NavLink to={path} activeClassName="active">
                    {title}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Signup and login */}
            {passenger ? (
              <div className="flex items-center space-x-4">
                <span className="text-blue-700 hover:to-blue-600 cursor-pointer font-semibold  -ml-16 ">
                  Welcome, {passenger.firstName}
                </span>

                {/* User Profile */}
                <UserProfile />


               
              </div>
            ) : (
              <div className="text base text-primary font-medium space-x-5 hidden lg:block -ml-16">
                <NavLink
                  to="/login"
                  className="py-2 px-5 bg-gray-300 border rounded  font-bold  dark:hover:text-white"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/registration"
                  className="py-2 px-5 border rounded bg-blue-500 text-white  hover:bg-blue-700 dark:hover:text-white"
                >
                  Sign in
                </NavLink>
              </div>
            )}


            {/*   mobile menu        */}
            <div className="md:hidden block">
              <button onClick={handleMenuToggler}>
                {isMenuOpen ? (
                  <FaXmark CgMenuGridO className="w-6 h-6 text-black" />
                ) : (
                  <CgMenuGridO className="w-6 h-6 text-black" />
                )}
              </button>
            </div>
          </nav>

          {/*  naviitem for mobile*/}

          <div
            className={`px-4 bg-black py-5 rounded-sm ${
              isMenuOpen ? "" : "hidden"
            }`}
          >
            <ul>
              {navItems.map(({ path, title }) => (
                <li
                  key={path}
                  className="text-base text-white first:text-blue-600 md:dark:hover:text-blue-50  dark:hover:text-blue-700 md:dark:hover:bg-transparent dark:border-gray-700 font-bold py-1"
                >
                  <NavLink to={path} activeClassName="active">
                    {title}
                  </NavLink>
                </li>
              ))}

              <li className="text-base text-white first:text-blue-600 md:dark:hover:text-blue-50  dark:hover:text-blue-700 md:dark:hover:bg-transparent dark:border-gray-700 font-bold py-1">
                <NavLink to="/login">Log in</NavLink>
              </li>
            </ul>
          </div>
        </header>
      </div>
    </div>
  );
};

export default VHeader;
