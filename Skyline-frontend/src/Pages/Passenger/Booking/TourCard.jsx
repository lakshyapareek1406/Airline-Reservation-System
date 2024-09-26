import React, { useState, useContext, useEffect } from "react";

import { AuthContext} from"../../../Components/context/AuthContext";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; 
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
const TourCard = (tour ) => {


  const { _id,photo, from, to,flight,departureDate,returnDate,tripType,passengers,economyPrice,businessPrice,description }=tour

  const { passenger } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    
    const toastDisplayed = localStorage.getItem("toastDisplayed");
  
    if (passenger && !toastDisplayed) {
      
     

      localStorage.setItem("toastDisplayed", true);
    }
  }, [passenger]);



const handleBooking = () => {
    if (passenger) {
      navigate(`/tour/get/${_id}`);
    } else {
      confirmAlert({
        title: 'Log In Required',
        message: 'You need to log in to book this tour. Do you want to log in now?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => navigate("/login")
          },
          {
            label: 'No'
          }
        ]
      });
    }
  };

  

  const handleViewDetails = () => {
    navigate(`/tour/get/${_id}`);
  };


  


  return (
    <>




      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white transform hover:scale-[108%] transition duration-300 ease-out">
      <div className="relative">
        <img
          className="w-full"
          
          alt="Colombo to Male"
          src={photo}
        />
       
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-base mb-2">{from} to {to} </div>
       
        <p className="text-gray-700 text-base">{departureDate} - {returnDate}</p>
        <div className="mt-4"><div>
          <span className="text-[15px] font-bold text-blue-500 flex justify-end">Economy Class ${economyPrice}</span> 
          </div>
          <div>
          <span className="text-[15px] font-bold text-blue-500 flex justify-end">Business Class ${businessPrice}</span>
          </div>
          <p className="text-gray-500 text-sm mt-1 flex justify-end">{tripType}</p>
          <p className="text-gray-500 text-sm flex justify-end">Flight - {flight}</p>
        </div>
        <div className="mt-4 ">
          <button   onClick={handleBooking}   className=  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 w-full rounded "  >
            Book now
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default TourCard;
