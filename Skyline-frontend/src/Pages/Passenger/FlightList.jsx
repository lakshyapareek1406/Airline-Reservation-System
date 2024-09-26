import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IoMdRefreshCircle } from "react-icons/io";

const FlightList = () => {
  const [flight, setFlight] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeparture, setSelectedDeparture] = useState("");
  const [selectedArrival, setSelectedArrival] = useState("");
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    // Fetch flights
    axios.get('http://localhost:5000/flightlist/')
      .then((res) => {
        setFlight(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div>  Error loading Flights List</div>);
      });

    // Fetch airports
    axios.get("http://localhost:5000/airport/")
      .then((response) => {
        setAirports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching airports:", error);
      });
  }, []);

  const filteredFlights = flight.filter((flight) =>
    flight.departure.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter flights based on selected departure and arrival
  const filteredFlightsWithDepartureAndArrival = filteredFlights.filter((flight) =>
    (!selectedDeparture || flight.departure === selectedDeparture) &&
    (!selectedArrival || flight.arrival === selectedArrival)
  );

  const handleSearch = () => {
    // Fetch flights with the selected departure and arrival
    axios.get(`http://localhost:5000/flightlist/?departure=${selectedDeparture}&arrival=${selectedArrival}`)
      .then((res) => {
        setFlight(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div>  Error loading Flights List</div>);
      });
  };

  const handleReset = () => {
    // Reset selected departure and arrival
    setSelectedDeparture("");
    setSelectedArrival("");
  };

  return (
    <>
      <div class='relative mt-[100px]'>
        <div class='absolute top-0 left-0 w-full h-full flex items-center justify-center z-10'>
          <h1 className="text-2xl mb-4 text-gray-300 text-[80px] leading-[40px] cursor-pointer font-semibold  text-center flex mt-6 ">Scheduled Flights</h1>
        </div>
        
        <div class='w-full h-56 overflow-hidden'>
          <video autoPlay muted loop class='w-full h-full object-cover'>
              <source src="./src/assets/bg/se.mp4" type="video/mp4" />
              Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className='w-full h-screen overflow-hidden  relative'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4 z-10 ">
          <div className="bg-gray-800 text-white p-4 tex bg-opacity-5">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block mb-1">Departure</label>
                <select
                  type="text"
                  placeholder="Select Source Airport"
                  className="p-2 border rounded text-black"
                  value={selectedDeparture}
                  onChange={(e) => setSelectedDeparture(e.target.value)}
                >
                  <option value="">Choose a Departure</option>
                  {airports.map((airport) => (
                    <option key={airport._id} value={airport.airportName}>
                      {airport.airportName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Arrival</label>
                <select
                  type="text"
                  placeholder="Select Destination Airport"
                  className="p-2 border rounded text-black"
                  value={selectedArrival}
                  onChange={(e) => setSelectedArrival(e.target.value)}
                >
                  <option value="">Choose an Arrival</option>
                  {airports.map((airport) => (
                    <option key={airport._id} value={airport.airportName}>
                      {airport.airportName}
                    </option>
                  ))}
                </select>
              </div>
              {/*<button
                className="bg-gray-800 text-white p-2 rounded hover:bg-gray-700 mt-7 w-28 h-10 font-semibold ml-3"
                onClick={handleSearch}
              >
                Search
                </button>*/}
              <button
                className="text-black     hover:bg-gray-700 mt-7 rounded-full font-semibold ml-3"
                onClick={handleReset}
              ><IoMdRefreshCircle className="w-12 h-12 rounded-full" />
                
              </button>
            </div>
          </div>

          {/* Table rendering code */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white mt-4 "  data-aos="fade-up" data-aos-duration="2000">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3 text-center">Flight</th>
                <th scope="col" className="px-6 py-3 text-center">Departure</th>
                <th scope="col" className="px-6 py-3 text-center">Arrival</th>
                <th scope="col" className="px-6 py-3 text-center">Scheduled time of departure</th>
                <th scope="col" className="px-6 py-3 text-center">Scheduled Time of Arrival</th>
                <th scope="col" className="px-6 py-3 text-center">Status</th>
                <th scope="col" className="px-6 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {filteredFlightsWithDepartureAndArrival.map((flight, index) => (
                <tr
                  className="bg-black bg-opacity-50 hover:bg-gray-800"
                  key={index}
                >
                  <td className="w-4 p-4">{index + 1}</td>
                  <td className="text-center">{flight.flightNumber}</td>
                  <td className="text-center">{flight.departure}</td>
                  <td className="text-center">{flight.arrival}</td>
                  <td className="text-center">{flight.timeOfDeparture}</td>
                  <td className="text-center">{flight.timeOfArrival}</td>
                  <td className="text-center">{flight.status}</td>
                  <td className="flex gap-6"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <video autoPlay muted loop className='absolute top-0 left-0 w-full h-full object-cover '>
          <source src="./src/assets/bg/plane1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default FlightList;
