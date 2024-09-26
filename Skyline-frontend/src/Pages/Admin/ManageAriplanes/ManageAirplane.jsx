import React, { useState,useEffect } from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Airplanetable from "./airplanetable";
const AddAirplaneForm = () => {
  const [airplaneName, setairplaneName] = useState("");
  const [regNumber, setregNumber] = useState("");

  const [description, setdescription] = useState("");
  const [economySeat, seteconomySeat] = useState("");
  const [busineessSeat, setbusineessSeat] = useState("");
  const [totleSeat, settotleSeat] = useState("");
  
//add airplane

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (airplaneName === "") {
      toast.error("airplaneName is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });


    } else if (regNumber === "") {
      toast.error("regNumber is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (description === "") {
      toast.error("description is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (economySeat === "") {
      toast.error(<div> </div>);
      toast.error("Economy Seat  is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (busineessSeat === "") { 
      toast.error("Busineess Seat  is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });
    } else if (totleSeat === "") { 
      toast.error("Totle Seat  is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else { 
      toast.success(" All fields are valid!", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });
      sendData();
    }
};

  const sendData = () => {
    const newairplane = {
      airplaneName,
      regNumber,
      description,
      economySeat,
      busineessSeat,
      totleSeat,
   
    };   console.log(sendData);

    //Axios
    axios
      .post("http://localhost:5000/airplane/add", newairplane)
      .then(() => {
        toast.success(<div> Airplane Add Successful!</div>);
        
       
        setairplaneName("");
        setregNumber("");
        setdescription("");
        seteconomySeat("");
        setbusineessSeat("");
        settotleSeat("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div>  Error Airplane Add </div>);
      });
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewAirplanesClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto shadow-md rounded-md p-6 mt-8 bg-slate-100 ">
        <div className={`${isModalOpen ? "blur-sm" : ""}`}>
          <div  className="py-[10px] px-[10px] bg-[#1F3541] border rounded-3xl   flex items-center  justify-center mb-10" >
      <h2 className="text-white text-[28px] leading-[40px] cursor-pointer font-semibold  text-center flex ">
        Add Airplane
        <GiCommercialAirplane className="ml-2" />
      </h2></div>
      <form onSubmit={handleSubmit}  class="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        
          <div className="mb-4 ">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Airplane Name
            </label>
            <input
              placeholder="Enter Airplane Name"
              type="text"
              className="w-full px-3 py-2 shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              onChange={(e) => {
                setairplaneName(e.target.value);
                }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Airplane Registration No.
            </label>
            <input
              placeholder="Enter Airplane Registration No."
              type="text"
              className="w-full px-3 py-2 shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              onChange={(e) => {
                setregNumber(e.target.value);
                }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Airplane Description
            </label>
            <textarea
              placeholder="Enter Airplane Description"
              className="w-full px-3 py-2 shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              rows="4"
              onChange={(e) => {
                setdescription(e.target.value);
                }}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Total Economy Seat
            </label>
            <input
              placeholder="Enter Economy Seat"
              type="number"
              className="w-full px-3 py-2 shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              onChange={(e) => {
                seteconomySeat(e.target.value);
                }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Total Business Seat
              </label>
              <input
                placeholder="Enter Business Seat"
                type="number"
                className="w-full px-3 py-2 shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                onChange={(e) => {
                  setbusineessSeat(e.target.value);
                  }}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Total Seat
              </label>
              <input
                placeholder="Enter Total Seat"
                type="number"
                className="w-full px-3 py-2 shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                onChange={(e) => {
                  settotleSeat(e.target.value);
                  }}
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-6"
            >
              Add Airplane
            </button>
          </div>
        
      </form>

      <div className="text-end mt-4">
        <button
          onClick={handleViewAirplanesClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          View Airplanes
        </button>
      </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-300 p-12  shadow-md relative w-auto border rounded-3xl">
          
              <AiFillCloseCircle  onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 w-10 h-10 " />
             
         
            <h2 className="text-2xl font-bold mb-4 bg-[#1F3541] text-white border rounded-full text-center  flex items-center justify-center">Airplanes List   <GiCommercialAirplane className="ml-2" /></h2>

           







            {/*--------------------------------------------------- Table--------------------------------------------------------------------------------*/}
            <Airplanetable/>
          </div>
        </div>
      )}

   

      
    </div>
  );
};

export default AddAirplaneForm;
