import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import { MdFlight, MdConnectingAirports } from "react-icons/md";
const ManageAirports = () => {
  const [airportName, setAirportName] = useState("");
  const [airportLocation, setairportLocation] = useState("");
  const [airportCode, setAairportCode] = useState("");
  const [airportAddress, setairportAddress] = useState("");
  const [Airports, setAirports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  //for editing

  const [editData, setEditData] = useState(null);

  //get
  useEffect(() => {
    function getAirports() {
      axios
        .get("http://localhost:5000/airport/")
        .then((res) => {
          setAirports(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(<div> Error fetching Airports</div>);
        });
    }

    getAirports();
  }, []);

  //add
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (airportName === "") {
    toast.error("Airport Name is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });
    } else if (airportLocation === "") {
      toast.error("Airport Location is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (airportCode === "") {
 
      toast.error("Airport Code is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });
    } else if (airportAddress === "") {
      toast.error("Airport Address is required", {
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
    const newAirport = {
      airportName,
      airportLocation,
      airportCode,
      airportAddress,
    };
    // Axios
    axios
      .post("http://localhost:5000/airport/add", newAirport)
      .then(() => {
        toast.success(<div> Airport Add Successful!</div>);
        setAirportName("");
        setairportLocation("");
        setAairportCode("");
        setairportAddress("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div> Error registering Airport</div>);
      });
  };
  /*
  const handleAirportChange = (e) => {
    setAirportName(e.target.value);
    setairportLocation(e.target.value);
    setAairportCode(e.target.value);
    setairportAddress(e.target.value);

  }; */

  // Filter airports based on search query
  const filteredAirports = Airports.filter(
    (airport) =>
      airport.airportName &&
      airport.airportName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //Delete Airports
  const deleteAirport = (id, airportName) => {
    if (window.confirm(`Are you sure you want to delete ${airportName}`)) {
      axios
        .delete(`http://localhost:5000/airport/delete/${id}`)
        .then(() => {
          toast.success(<div> Airport deleted successfully!</div>);
          setAirports(Airports.filter((c) => c._id !== id)); // Changed to setAirports
        })
        .catch((err) => {
          console.log(err);
          toast.error(<div> Error deleting Airport</div>);
        });
    }
  };

  // Edit Airports
  const handleEdit = (airport) => {
    setEditData(airport);
  };

  const handleUpdate = () => {
    // Axios update request
    axios
      .put(`http://localhost:5000/airport/update/${editData._id}`, editData)
      .then(() => {
        toast.success(<div> Airport updated successfully!</div>);
        setEditData(null); 
        
        axios.get("http://localhost:5000/airport/").then((res) => {
          setAirports(res.data);

        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div> Error updating Airport</div>);
      });
  };

  //get selection Countries  From
  const [Countriesfrom, setCountryfrom] = useState([]);
  const [selectedCountryfrom, setSelectedCountryfrom] = useState("");

  useEffect(() => {
    // Fetch Countries when component mounts
    axios
      .get("http://localhost:5000/countries/")
      .then((response) => {
        setCountryfrom(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Country:", error);
      });
  }, []);

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAirports.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredAirports.length / itemsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      {/* Modal form for editing */}
      {editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4 bg-[#1F3541] text-white text-center rounded-lg flex items-center justify-center">
              {" "}
              <FaEdit className="w-6 h-6  mr-2  " />
              Edit Airport
            </h2>

            <label className=" text-gray-700 font-semibold mb-2 text-sm   ">Airport Name</label>
            <input
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.airportName}
              onChange={(e) =>
                setEditData({ ...editData, airportName: e.target.value })
              }
            />
            <label className=" text-gray-700 font-semibold mb-2 text-sm   ">Airport Location</label>
            <select
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={selectedCountryfrom}
              onChange={(e) => {
                setSelectedCountryfrom(e.target.value);
                setEditData({ ...editData, airportLocation: e.target.value });
              }}
            >
              <option value="">Select</option>
              {Countriesfrom.map((country) => (
                <option key={country._id} value={country.Country}>
                  {country.Country}
                </option>
              ))}
            </select>
            <label className=" text-gray-700 font-semibold mb-2 text-sm   ">Airport Code</label>
            <input
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.airportCode}
              onChange={(e) =>
                setEditData({ ...editData, airportCode: e.target.value })
              }
            />
            <label className=" text-gray-700 font-semibold mb-2 text-sm   " >Airport Address</label>
            <textarea
              tow="6"
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.airportAddress}
              onChange={(e) =>
                setEditData({ ...editData, airportAddress: e.target.value })
              }
            />
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


       {/*--------------------------------------------------------form---------------------------------------------------------------------------------------------------------*/}
       <div className="mx-auto shadow-md rounded-md p-6 mt-6 bg-slate-100 ">
      <div className="py-[25px] px-[25px]  border rounded-3xl flex items-center justify-center bg-[#1F3541]">
        <h1 className="text-white text-[28px] leading-[40px] cursor-pointer font-semibold flex text-center justify-center">
          <MdConnectingAirports className="mr-2 h-9 w-9" /> Manage Airports
        </h1>
      </div>

      <div className="mx-auto mt-10 px-4">
        <form
          className="bg-slate-100  rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 grid grid-cols-2 gap-4 ">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Airport Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter Airport Name"
                id="airport"
                onChange={(e) => {
                  setAirportName(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="airport"
              >
                Airport Location
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter Airport Location "
                id="airport"
                value={selectedCountryfrom}
                onChange={(e) => {
                  setSelectedCountryfrom(e.target.value);
                  setairportLocation(e.target.value);
                }}
              >
                {" "}
                <option value="">Select</option>
                {Countriesfrom.map((country) => (
                  <option key={country._id} value={country.Country}>
                    {country.Country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4 ">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="airport"
              >
                Airport Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter  Airport Code"
                id="airport"
                onChange={(e) => {
                  setAairportCode(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="airport"
              >
                Airport Address
              </label>
              <textarea

              rows={1}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter Airport Address"
                id="airport"
                onChange={(e) => {
                  setairportAddress(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-9">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>

      {/*---------------------------------------------------------------------------------------table-----------------------------------------------------*/}
      <div className="-mt-28">
        <section className=" ">
          <div className="mt-[130px] mx-4 relative ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div className="pb-4 bg-[#1F3541]">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    id="table-search"
                    className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80  focus:ring-blue-500 focus:border-blue-500 bg-[#1F3541] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for items"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4"></th>
                      <th scope="col" className="px-6 py-3">
                        Airport Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Airport Location
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Airport Code
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Airport Address
                      </th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((airport, index) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={index}
                      >
                        <td className="w-4 p-4">
                          {index + indexOfFirstItem + 1}
                        </td>
                        <td>{airport.airportName}</td>
                        <td>{airport.airportLocation}</td>
                        <td >{airport.airportCode}</td>
                        <td>{airport.airportAddress}</td>

                        <td className="flex gap-6 ">
                          <FaEdit
                            className="text-3xl px-1 py-1  mt-3 cursor-pointer  text-white bg-green-600 hover:bg-green-700 rounded-lg "
                            onClick={() => handleEdit(airport)}
                          />
                          <MdDelete
                             className="text-3xl px-1 py-1 cursor-pointer text-white bg-red-600 rounded-lg hover:bg-red-700 mt-3 mr-3"
                            onClick={() =>
                              deleteAirport(airport._id, airport.airportName)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {totalPages > 1 && (
                  <div className="mt-4 flex justify-center">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        className={`mx-2 px-3 py-1 rounded-full mb-3 bg ${
                          currentPage === i + 1
                            ? "bg-blue-500 text-white hover:bg-blue-700 "
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => handlePaginationClick(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManageAirports;
