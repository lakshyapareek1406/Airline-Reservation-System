import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdAlarm, MdDelete } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { PiAirplaneInFlightFill } from "react-icons/pi";


const ManageFlight = () => {
  const [flightNumber, setflightNumber] = useState("");
  const [departure, setdeparture] = useState("");
  const [arrival, setarrival] = useState("");
  const [timeOfDeparture, settimeOfDeparture] = useState("");
  const [timeOfArrival, settimeOfArrival] = useState("");
  const [status, setstatus] = useState("");
  const [airports, setAirports] = useState([]);
  const [airplane, setAirplane] = useState([]);

  const [selectedDeparture, setSelectedDeparture] = useState("");
  const [selectedArrival, setSelectedArrival] = useState("");
  const [selectedAirplane, setSelectedAirplane] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editData, setEditData] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (flightNumber === "") {
      toast.error("  Flight Number is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });
    } else if (departure === "") {
      toast.error("  Departure is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });
    } else if (arrival === "") {
      toast.error(" Arrival is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });
    } else if (timeOfDeparture === "") {
      toast.error("  Time Of Departure is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });
    } else if (timeOfArrival === "") {
      toast.error("  Time Of Arrival is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });
    } else if (status === "") {
      toast.error(" status is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });
    } else {
     
      toast.success("  All fields are valid!", {
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
    const newflight = {
      flightNumber,
      departure,
      arrival,
      timeOfDeparture,
      timeOfArrival,
      status,
    };

    //Axios
    axios
      .post("http://localhost:5000/flightlist/add", newflight)
      .then(() => {
        toast.success(<div>  Flight Add Successful!</div>);
        

        // Optionally reset form fields after successful registration
        setflightNumber("");
        setdeparture("");
        setarrival("");
        settimeOfDeparture("");
        settimeOfArrival("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div>  Flight Add Error</div>);
      });
  };

  //get flight table
  const [flight, setflight] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function getflights() {
      axios
        .get("http://localhost:5000/flightlist/")
        .then((res) => {
          setflight(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(<div>  Error loading Flights List</div>);
        });
    }

    getflights();
  }, []);

  // Filter flights based on search query
  const filteredFlights = flight.filter((flight) =>
    flight.departure.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFlights = filteredFlights.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //get selection Airports  for departure
  useEffect(() => {
    axios
      .get("http://localhost:5000/airport/")
      .then((response) => {
        setAirports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching airports:", error);
      });
  }, []);

  //get selection Airports  for Arrival
  useEffect(() => {
    axios
      .get("http://localhost:5000/airport/")
      .then((response) => {
        setarrival(response.data);
      })
      .catch((error) => {
        console.error("Error fetching airports:", error);
      });
  }, []);

  //get selection Airplane
  useEffect(() => {
    axios
      .get("http://localhost:5000/airplane/")
      .then((response) => {
        setAirplane(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Airplane:", error);
      });
  }, []);

  //delete flight
  const DeleteFlight = (id, flightNumber) => {
    if (window.confirm(`Are you sure you want to delete ${flightNumber}`)) {
      axios
        .delete(`http://localhost:5000/flightlist/delete/${id}`)
        .then(() => {
          toast.success("   Flight deleted successfully!", {
            // position: "top-center",
             autoClose: 1000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined
           });
          setflight(flight.filter((f) => f._id !== id));
        })
        .catch((err) => {
          console.log(err);
          toast.error(<div>  Error deleting flight</div>);
        });
    }
  };

  // Edit Airplane
  const handleEdit = (flight) => {
    setEditData(flight);
  };

  const handleUpdate = () => {
    // Axios update request
    axios
      .put(`http://localhost:5000/flightlist/update/${editData._id}`, editData)
      .then(() => {
        
        toast.success("   Flight updated successfully!", {
          // position: "top-center",
           autoClose: 1000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined
         });
        setEditData(null);

        axios.get("http://localhost:5000/flightlist/").then((res) => {
          setflightNumber(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div> Error updating Flight</div>);
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
    <div>
      {/* Modal form for editing */}
      {editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4 bg-[#1F3541] text-white text-center rounded-lg flex items-center justify-center">
              {" "}
              <FaEdit className="w-6 h-6  mr-2  " />
              Edit Flight List
            </h2>
           
            <label
             className="block text-gray-700 font-semibold mb-2 text-sm"
              
            >
              Flight
            </label>
            <select
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.flightNumber}
              onChange={(e) => {
                setEditData({ ...editData, flightNumber: e.target.value });
                setSelectedAirplane(e.target.value);
              }}
            >
              <option value="">Choose a Flight</option>
              {airplane.map((Airplane) => (
                <option key={Airplane._id} value={Airplane.regNumber}>
                  {Airplane.regNumber}
                </option>
              ))}
            </select>
          
            <label
             className="block text-gray-700 font-semibold mb-2 text-sm"
              
            >
              Departure
            </label>
            <select
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.departure}
              onChange={(e) => {
                setEditData({ ...editData, departure: e.target.value });
                setSelectedDeparture(e.target.value);
              }}
            >
              <option value="">Choose a Departure</option>
              {airports.map((airplane) => (
                <option key={airplane._id} value={airplane.airportName}>
                  {airplane.airportName}
                </option>
              ))}
            </select>

            <label
              className="block text-gray-700 font-semibold mb-2 text-sm"
            
            >
              Arrival
            </label>
            <select
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.arrival}
              onChange={(e) => {
                setEditData({ ...editData, arrival: e.target.value });
                setSelectedArrival(e.target.value);
              }}
            >
              <option value="">Choose a Arrival</option>
              {airports.map((Airport) => (
                <option key={Airport._id} value={Airport.airportName}>
                  {Airport.airportName}
                </option>
              ))}
            </select>

            <label
              className="block text-gray-700 font-semibold mb-2 text-sm"
            
            >
              Time Of Departure
            </label>
            <input
              type="time"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.timeOfDeparture}
              onChange={(e) =>
                setEditData({ ...editData, timeOfDeparture: e.target.value })
              }
            />

            <label
             className="block text-gray-700 font-semibold mb-2 text-sm"
              
            >
              Time Of Arrival
            </label>
            <input
              type="time"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.timeOfArrival}
              onChange={(e) =>
                setEditData({ ...editData, timeOfArrival: e.target.value })
              }
            />

            <label
              className="block text-gray-700 font-semibold mb-2 text-sm"
              
            >
              Status
            </label>
            <select
              type="time"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.status}
              onChange={(e) =>
                setEditData({ ...editData, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option value="On Time">On Time</option>
              <option value="Delayed">Delayed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Boarding">Boarding</option>
              <option value="Landed">Landed</option>
            </select>

            <button
              className="mr-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
              onClick={() => setEditData(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/*from */}
      <div className="mx-auto shadow-md rounded-md p-6 mt-6 bg-slate-100">
      <div className="py-[25px] px-[25px] bg-[#1F3541] border rounded-3xl   flex items-center  justify-center ">
        <h1 className="text-white text-[28px] leading-[40px] cursor-pointer font-semibold  text-center flex">
      <  PiAirplaneInFlightFill className=" mr-2 w-9 h-9"/>    Manage Flights
        </h1>
      </div>
      <div class=" mx-auto mt-10 px-4">
        <form
          onSubmit={handleSubmit}
          class="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="flight"
            >
              Flight
            </label>

            <select
              className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="flight"
              type="text"
              placeholder="Flight Number"
              value={selectedAirplane}
              onChange={(e) => {
                setSelectedAirplane(e.target.value);
                setflightNumber(e.target.value);
              }}
            >
              <option value="">Choose a Flight</option>
              {airplane.map((Airplane) => (
                <option key={Airplane._id} value={Airplane.regNumber}>
                  {Airplane.regNumber}
                </option>
              ))}
            </select>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="departure"
            >
              Departure
            </label>

            <select
              id="flights"
              className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={selectedDeparture}
              onChange={(e) => {
                setSelectedDeparture(e.target.value);
                setdeparture(e.target.value);
              }}
            >
              <option value="">Choose a Departure</option>
              {airports.map((airplane) => (
                <option key={airplane._id} value={airplane.airportName}>
                  {airplane.airportName}
                </option>
              ))}
            </select>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="arrival"
            >
              Arrival
            </label>
            <select
              id="flights"
              className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={selectedArrival}
              onChange={(e) => {
                setSelectedArrival(e.target.value);
                setarrival(e.target.value);
              }}
            >
              <option value="">Choose a Arrival</option>
              {airports.map((Airport) => (
                <option key={Airport._id} value={Airport.airportName}>
                  {Airport.airportName}
                </option>
              ))}
            </select>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="departure-time"
            >
              Scheduled Time of Departure
            </label>
            <input
              class="  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="departure-time"
              type="time"
              onChange={(e) => {
                settimeOfDeparture(e.target.value);
              }}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              type="time"
            >
              Scheduled Time of Arrival
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="arrival-time"
              type="time"
              onChange={(e) => {
                settimeOfArrival(e.target.value);
              }}
            />
          </div>

          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              type="time"
            >
              Status
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => {
                setstatus(e.target.value);
              }}
            >
              <option value="">Select Status</option>
              <option value="On Time">On Time</option>
              <option value="Delayed">Delayed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Boarding">Boarding</option>
              <option value="Landed">Landed</option>
              <option value="Landed">Deparated</option>
            </select>
          </div>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="text-end  ">
          <button
            onClick={handleViewAirplanesClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            View Flight List
          </button>
        </div>
      </div>
      </div>
      {/* table */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-300 p-12 shadow-md relative w-auto border rounded-3xl">
            <AiFillCloseCircle
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 w-10 h-10"
            />
            <h2 className="text-2xl font-bold mb-4 bg-[#1F3541] text-white border rounded-full text-center flex items-center justify-center">
              Flight List
              <PiAirplaneInFlightFill className="ml-2" />
            </h2>

            <section className="">
              <div className="mt-[13px] mx-4 relative">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <div class="pb-4 bg-[#1F3541]">
                    <label for="table-search" class="sr-only">
                      Search
                    </label>
                    <div class="relative mt-1">
                      <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          class="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="table-search"
                        class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80  focus:ring-blue-500 focus:border-blue-500 bg-[#1F3541] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="p-4"></th>
                        <th scope="col" class="px-6 py-3">
                          Flight
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Departure
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Arrival
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Scheduled time of departure
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Scheduled Time of Arrival
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" class="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentFlights.map((flight, index) => (
                        <tr
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={index}
                        >
                          <td class="w-4 p-4">
                            {indexOfFirstItem + index + 1}
                          </td>
                          <td>{flight.flightNumber}</td>
                          <td>{flight.departure}</td>
                          <td className="text-center">{flight.arrival}</td>
                          <td className="text-center">{flight.timeOfDeparture}</td>
                          <td className="text-center">{flight.timeOfArrival}</td>
                          <td>{flight.status}</td>
                          <td className="flex gap-6 mt-2">
                            <FaEdit
                              className="text-3xl px-1 py-1 cursor-pointer text-white bg-green-600 hover:bg-green-700 rounded-lg ml-7"
                              onClick={() => handleEdit(flight)}
                            />
                            <MdDelete
                               className="text-3xl px-1 py-1 cursor-pointer text-white bg-red-600 rounded-lg hover:bg-red-700  mr-3"
                              onClick={() =>
                                DeleteFlight(flight._id, flight.flightNumber)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination Controls */}
                  <div className="flex justify-between mt-4 ">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 ${
                        currentPage === 1
                          ? "cursor-not-allowed bg-gray-300"
                          : "bg-blue-500 hover:bg-blue-700"
                      } text-white font-bold rounded`}
                    >
                      Previous
                    </button>
                    <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 ${
                        currentPage === totalPages
                          ? "cursor-not-allowed bg-gray-300"
                          : "bg-blue-500 hover:bg-blue-700"
                      } text-white font-bold rounded`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFlight;
