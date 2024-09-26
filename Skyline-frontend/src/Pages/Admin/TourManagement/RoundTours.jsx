import React, { useState, useEffect } from "react";
import TourNavigationBar from "./TournavigationBar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { TbTournament } from "react-icons/tb";
const RoundTours = () => {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 8;
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [dragActive, setDragActive] = useState(false);
  const [photo, setPhoto] = useState('');

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
    setPhoto(srcData);
    if (editData) {
      setEditData({ ...editData, photo: srcData });
    }
  };
  fileReader.readAsDataURL(file);
};

  //get Tours
  useEffect(() => {
    const getTours = async () => {
        try {
          const res = await axios.get("http://localhost:5000/tour/");
          setTours(res.data.filter(b => b.tripType === "Round-Tour"));
        } catch (err) {
          console.log(err);
          toast.error(<div> Error fetching Tour</div>);
        }
      };

    getTours();
  }, []);

  //delete
  const deleteTour = (id, from) => {
    if (window.confirm(`Are you sure you want to delete Tour ${from}`)) {
      axios
        .delete(`http://localhost:5000/tour/delete/${id}`)
        .then(() => {
          toast.success(<div>  Tour deleted successfully!</div>);
          setTours(tours.filter((p) => p._id !== id));
        })
        .catch((err) => {
          console.log(err);
          toast.error(<div>  Error deleting Tour</div>);
        });
    }
  };

  // Edit Airplane
  const handleEdit = (Tour) => {
    setEditData(Tour);
  };

  const handleUpdate = () => {
    // Axios update request
    axios
      .put(`http://localhost:5000/tour/update/${editData._id}`, editData)
      .then(() => {
        toast.success("😊 Tour updated successfully", {
          // position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setEditData(null);

        axios.get("http://localhost:5000/tour/").then((res) => {
          setTours(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div>😡 Error updating Tour</div>);
      });
  };

  const [Countriesfrom, setCountryfrom] = useState([]);
  const [selectedCountryfrom, setSelectedCountryfrom] = useState("");

  //getCountry
  useEffect(() => {
    axios
      .get("http://localhost:5000/countries/")
      .then((response) => {
        setCountryfrom(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Country:", error);
      });
  }, []);

  const [Countriesto, setCountryto] = useState([]);
  const [selectedCountryto, setSelectedCountryto] = useState("");

  //getCountry
  useEffect(() => {
    axios
      .get("http://localhost:5000/countries/")
      .then((response) => {
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

  //Handle view action
  const handleView = (tour) => {
    setViewData(tour);
  };
  //pagination
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(tours.length / toursPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* TourNav */}
      <TourNavigationBar
       length={tours.length}
      
      />

      {/* Modal form for editing */}
      {editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 ">
          <div className="bg-gray-50 p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4 bg-[#1F3541] text-white text-center rounded-lg flex items-center justify-center">
              {" "}
              <TbTournament className="w-6 h-6  mr-2  " />
              Edit Tour
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              From
            </label>
            <select
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              vavalue={editData.from}
              onChange={(e) => {
                setEditData({ ...editData, from: e.target.value });
                setSelectedCountryfrom(e.target.value);
              }}
            >
              <option value="">Select</option>
              {Countriesfrom.map((country) => (
                <option key={country._id} value={country.Country}>
                  {country.Country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              To
            </label>
            <select
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.to}
              onChange={(e) => {
                setEditData({ ...editData, to: e.target.value });
                setSelectedCountryto(e.target.value);
              }}
            >
              <option value="">Select</option>
              {Countriesto.map((country) => (
                <option key={country._id} value={country.Country}>
                  {country.Country}
                </option>
              ))}
            </select>
            </div>
            <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="country"
            >
              Flight
            </label>
            <select
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.flight}
              onChange={(e) => {
                setEditData({ ...editData, flight: e.target.value });
                setSelectedFlight(e.target.value);
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
              <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Departure Date
            </label>
            <input
              type="date"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.departureDate}
              onChange={(e) =>
                setEditData({ ...editData, departureDate: e.target.value })
              }
            />
         </div>
         <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Return Date
            </label>
            <input
              type="date"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.returnDate}
              onChange={(e) =>
                setEditData({ ...editData, returnDate: e.target.value })
              }
            />
            </div>
            <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Trip Type
            </label>
            <select
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.tripType}
              onChange={(e) =>
                setEditData({ ...editData, tripType: e.target.value })
              }
            >
                  <option>Round Trip</option>
                  <option>One Way</option>
               </select>

               </div>
               <div>

            <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Passengers
            </label>
            <input
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.passengers}
              onChange={(e) =>
                setEditData({ ...editData, passengers: e.target.value })
              }
            />
            </div>
            <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Economy class Price
            </label>
            <input
              type="number"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.economyPrice}
              onChange={(e) =>
                setEditData({ ...editData, economyPrice: e.target.value })
              }
            />
            </div>
            <div>

            <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Business class Price
            </label>
            <input
              type="number"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.businessPrice}
              onChange={(e) =>
                setEditData({ ...editData, businessPrice: e.target.value })
              }
            />

            </div>
            <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Description
            </label>
            <textarea
              type="text"
              rows={2}
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
            </div>
           
            {/*Upload image*/}
            <div className="mb-2 col-span-2 -mt-5">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Photos
              </label>
              <div
                className="border-2 border-gray-300 border-dashed rounded-md p-4 flex justify-center items-center"
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <label className="cursor-pointer">
                  <span className="px-2 py-1 bg-blue-500 text-white rounded-md">
                    Upload a file
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <span className="ml-2">{fileName}</span>
              </div>
            </div>
          

            
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4" >
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
        </div>
      )}

      {/* Modal for viewing description */}
      {viewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 ">
          <div className="bg-gray-200 p-6 rounded-md shadow-md max-w-md">
            <h2 className="text-lg font-semibold mb-4 bg-[#1F3541] text-white text-center rounded-lg flex items-center justify-center w-[400px] h-[90px]">
              <GrView className="w-6 h-6 mr-2 " /> View Tour Description
            </h2>
           
            <div className="mb-4">
              <strong>Description:</strong> {viewData.description}
            </div>
            
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
              onClick={() => setViewData(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center"></th>
              <th scope="col" className="px-6 py-3 text-center">
                From
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                To
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Flight
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Departure Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Return Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Passengers
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Economy Class Price $
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Business Class Price $
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Option
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTours.map((tour, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <td className="px-6 py-4 text-center">{tour.from}</td>
                <td className="px-6 py-4 text-center">{tour.to}</td>
                <td className="px-6 py-4 text-center">{tour.flight}</td>
                <td className="px-6 py-4 text-center">{tour.departureDate}</td>
                <td className="px-6 py-4 text-center">{tour.returnDate}</td>
                <td className="px-6 py-4 text-center">{tour.tripType}</td>
                <td className="px-6 py-4 text-center">{tour.passengers}</td>
                <td className="px-6 py-4 text-center text-red-600">{tour.economyPrice}</td>
                <td className="px-6 py-4 text-center text-red-600">{tour.businessPrice}</td>
                <td className="flex gap-6">
                <GrView className="text-3xl px-1 py-1 cursor-pointer text-white bg-blue-600 hover:bg-blue-700 rounded-full mt-3 -mr-1"
                  onClick={() => handleView(tour)}
                  />
                  <FaEdit
                    className="text-3xl px-1 py-1  cursor-pointer text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg mt-3  -mr-2"
                    onClick={() => handleEdit(tour)}
                  />

                  <MdDelete
                    className="text-3xl px-1 py-1 cursor-pointer text-white bg-red-600 rounded-lg hover:bg-red-700 mt-3 mr-3"
                    onClick={() => deleteTour(tour._id, tour.from)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === Math.ceil(tours.length / toursPerPage)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={nextPage}
          disabled={currentPage === Math.ceil(tours.length / toursPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoundTours;
