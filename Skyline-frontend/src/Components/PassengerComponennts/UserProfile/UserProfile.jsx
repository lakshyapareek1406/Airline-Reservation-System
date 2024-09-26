import React, { useState, useContext, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext} from"../../context/AuthContext";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { FaRegUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosSwitch } from "react-icons/io";
import {Link} from 'react-router-dom'
const UserProfile = ( ) => {
  // State to manage the visibility of the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { passenger, dispatch } = useContext(AuthContext);
  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/home";
  };
  
  
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


  return (
   
     <div  >
    
     <div className='flex items-center justify-end -mr-5 '> 
         
         <button
           type="button"
           className="flex text-sm bg-blue-100 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
           id="user-menu-button"
           aria-expanded={isDropdownOpen ? "true" : "false"}
           aria-controls="user-dropdown"
           onClick={toggleDropdown}
         >
           <span className="sr-only">Open user menu</span>
 
           
           <img
             //className="w-14 h-14 rounded-full"
            // src="../src/assets/logo/userpro.webp"
           //  alt="user photo"
           />
           <div  ><FaUser className="w-14 h-14 rounded-full text-blue-950" /></div>
           
         </button>
 
         {isDropdownOpen && (
           <div
             className="absolute right-0 z-50 mt-[273px] mr-[270px] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-blue-950 dark:divide-gray-60 w-[200px] "
             id="user-dropdown"
           >
             <div className="px-4 py-3">
               <span className="block text-lg text-gray-900 dark:text-white ">
               {passenger.firstName}
               </span>
               <span className="block text-sm text-gray-500 truncate dark:text-gray-400 mb-2">
               {passenger.email}
               </span>
                {/* swich Admin Panel */}
                {passenger.role === "admin" && (
              <div className="mb-2 flex items-center">
                <IoIosSwitch className=" text-white w-5 h-5" />
                <a href="/admin/dashboard" className="flex items-center justify-center text-[15px] truncate text-white bg-blue-700 rounded-xl w-[110px] h-[25px] hover:bg-blue-500">
                    Admin Panel
                  </a>
            </div>
                )}
             </div>
             <ul className="py-2" aria-labelledby="user-menu-button">
               <li>
                 <a
                   href="userProfile"
                   className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex  items-center"
                 >
                  <FaRegUser className="mr-2 "/> 
                   Profile
                 </a>
               </li>
               <li>
                <Link to={`/mybooking/${passenger._id}`}>
                  <button
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex items-center"
                  >
                    <FaRegCalendarAlt className="mr-2" />
                    My Booking
                  </button>
                </Link>
              </li>
           
               <li>
                 <a
                  onClick={handleLogout}
                   className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer flex  items-center"
                 >
                  <FaSignOutAlt className="mr-2"/>
                   Sign out
                 </a>
               </li>
             </ul>
           </div>
         )}
       </div>
     
    </div>
  );
};

export default UserProfile;
