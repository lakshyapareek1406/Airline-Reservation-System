import React, { useState, useMemo, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { TbTournament } from "react-icons/tb";
import TourNavigationBar from "./TournavigationBar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//const multer = require('multer');
const AddTour = () => {
  const [tripType, setTripType] = useState("Round-Tour");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  //const [fileName, setFileName] = useState('No file chosen');
  //const [dragActive, setDragActive] = useState(false);
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [flight, setflight] = useState("");
  const [passengers, setpassengers] = useState("");
  const [description, setdescription] = useState("");
  const [photo, setphoto] = useState("");
  const [economyPrice, seteconomyPrice] = useState("");
  const [businessPrice, setbusineessPrice] = useState("");
  const [fileName, setFileName] = useState('No file chosen');
  const [dragActive, setDragActive] = useState(false);
  
// Drag & Drop
const handleDrag = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.type === "dragenter" || e.type === "dragover") {
    setDragActive(true);
  } else if (e.type === "dragleave") {
    setDragActive(false);
  }
};

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    const file = e.dataTransfer.files[0];
    setFileName(file.name);
    encodeImageFileAsURL(file);
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFileName(file.name);
    encodeImageFileAsURL(file);
  }
};

const encodeImageFileAsURL = (file) => {
  const fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    const srcData = fileLoadedEvent.target.result;
    setphoto(srcData);
  };
  fileReader.readAsDataURL(file);
};

  //Add booking
  const handleSubmit = (e) => {
    e.preventDefault();
    if (from === "") {
      toast.error(" From is required", {
        // position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (to === "") {
      toast.error(" To is required", {
        // position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (flight === "") {
      toast.error(" Flight is required", {
        // position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (departureDate === "") {
      toast.error(" Departure Date is required", {
        // position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (tripType === "roundTrip" && returnDate === "") {
      toast.error("Return Date is required for Round Trip", {
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (tripType === "") {
      toast.error(" Trip Type   is required", {
        // position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (passengers === "") {
      toast.error(" Passengers   is required", {
        // position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (economyPrice === "") {
      toast.error(" Economy Price   is required", {
        // position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (businessPrice === "") {
      toast.error(" Business Price Date  is required", {
        // position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (description === "") {
      toast.error(" Description  is required", {
        // position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (photo === "") {
      toast.error(" Photo  is required", {
        // position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("  All fields are valid!", {
        // position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      sendData();
    }
  };

  const sendData = () => {
    const newtour = {
      from,
      to,
      flight,
      departureDate,
      returnDate,
      tripType,
      passengers,
      economyPrice,
      businessPrice,
      description,
      photo,
    };

    axios
      .post("http://localhost:5000/tour/add", newtour)
      .then(() => {
        toast.success(<div>  Tour Add Successful!</div>);
        setfrom("");
        setto("");
        setflight("");
        setDepartureDate("");
        setReturnDate("");
        setTripType("");
        setpassengers("");
        seteconomyPrice("");
        setbusineessPrice("");
        setdescription("");
        setphoto("");
        setFileName("No file chosen");
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div>  Tour Add Error</div>);
      });
  };

  //getfrom
  const [Countriesfrom, setCountryfrom] = useState([]);
  const [selectedCountryfrom, setSelectedCountryfrom] = useState("");
  const [Countriesto, setCountryto] = useState([]);
  const [selectedCountryto, setSelectedCountryto] = useState("");

  //getCountry
  useEffect(() => {
    axios
      .get("http://localhost:5000/airport/")
      .then((response) => {
        setCountryfrom(response.data);
        setCountryto(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Country:", error);
      });
  }, []);

  


  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState("");

  //get flightlist
  useEffect(() => {
    axios
      .get("http://localhost:5000/flightlist/")
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      });
  }, []);

  return (
    <>
      {" "}
      <div>
        {/*TourNav*/}
        <TourNavigationBar />

        {/*Form*/}
        <div className="max-w-screen-2xl shadow-2xl rounded-3xl mx-auto p-4">
          <div className="py-[7px] px-[7px] bg-[#1F3541] border rounded-3xl   flex items-center  justify-center mb-10">
            <h2 className="text-white text-[28px] leading-[40px] cursor-pointer font-semibold  text-center flex ">
              Add New Booking
              <TbTournament className="ml-4 w-10 h-10" />
            </h2>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm  font-semibold text-gray-700 ">
                  From{" "}
                </label>
                <select
                  type="text"
                  name="title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Enter Tour Title"
                  value={selectedCountryfrom}
                  onChange={(e) => {
                    setSelectedCountryfrom(e.target.value);
                    setfrom(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  {Countriesfrom.map((country) => (
                    <option key={country._id} value={country.airportName}>
                      {country.airportName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  To{" "}
                </label>
                <select
                  type="text"
                  name="title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Enter Tour Title"
                  value={selectedCountryto}
                  onChange={(e) => {
                    setSelectedCountryto(e.target.value);
                    setto(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  {Countriesto.map((country) => (
                    <option key={country._id} value={country.airportName}>
                      {country.airportName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Select a flight{" "}
                </label>
                <select
                  type="text"
                  name="title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Select a flight"
                  value={selectedFlight}
                  onChange={(e) => {
                    setSelectedFlight(e.target.value);
                    setflight(e.target.value);
                  }}
                >
                  <option value="">Choose a flight</option>
                  {flights.map((flight) => (
                    <option key={flight._id} value={flight.flightNumber}>
                      {flight.flightNumber}
                    </option>
                  ))}
                </select>
              </div>
              <div className="max-w-lg  p-4 flex  -m-4">
                <div className="flex justify-between items-center border border-gray-300 rounded-md p-2">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-500" />
                    <div className="ml-2">
                      <div className="text-xs text-gray-500">Departure</div>
                      <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => {
                          setDepartureDate(e.target.value);
                        }}
                        className="text-black text-lg font-medium"
                      />
                    </div>
                  </div>
                  <div className="mx-4">↔</div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-500" />
                    <div className="ml-2">
                      <div className="text-xs text-gray-500">Return</div>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => {
                          setReturnDate(e.target.value);
                        }}
                        className="text-black text-lg font-medium"
                        disabled={tripType === "One-Way"}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-4 ml-24">
                  <label className="flex items-center mr-4">
                    <input
                      type="radio"
                      name="tripType"
                      value="Round-Tour"
                      checked={tripType === "Round-Tour"}
                      onChange={() => setTripType("Round-Tour")}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 ">Round Trip</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="tripType"
                      value="One-Way"
                      checked={tripType === "One-Way"}
                      onChange={() => setTripType("One-Way")}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">One Way</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="  grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Passengers
                </label>
                <select
                  type="text"
                  name="Passengers"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Number of Passengers"
                  onChange={(e) => {
                    setpassengers(e.target.value);
                  }}
                >
                  <option>Choose Class</option>
                  <option>1 Passengers</option>
                  <option>2 Passengers</option>
                  <option>3 Passengers</option>
                  <option>4 Passengers</option>
                  <option>5 Passengers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  {" "}
                  Economy Class Price $
                </label>
                <input
                  type="number"
                  name="price"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Price"
                  onChange={(e) => {
                    seteconomyPrice(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Business Class Price $
                </label>
                <input
                  type="number"
                  name="price"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Price"
                  onChange={(e) => {
                    setbusineessPrice(e.target.value);
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-4"
                  placeholder="Description of the tour"
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                ></textarea>
              </div>

              {/*Upload image*/}
              <div className="w-full bg-white rounded-lg p-6 -mt-20">
                <h2 className="text-lg font-medium text-gray-900">
                  Upload Photo
                </h2>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center border-gray-300`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <p className="mb-4 text-gray-500">Drop files here</p>
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange} // Assuming handleFileChange is the function you want to use
                  />

                  <label
                    htmlFor="photo"
                    className="cursor-pointer bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Choose File
                  </label>

                  <p className="mt-2 text-gray-500">{fileName}</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add
            </button>
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default AddTour;
