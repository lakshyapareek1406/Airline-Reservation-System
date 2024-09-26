import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";

const Airplanetable = () => {
  const [airplane, setAirplane] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);

  useEffect(() => {
    function getAirplane() {
      axios.get('http://localhost:5000/airplane/')
        .then((res) => {
          setAirplane(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.success(" Error loading airplanes", {
            // position: "top-center",
             autoClose: 1000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined
           });
        });
    }

    getAirplane();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  // Delete Airplane
  const deleteAirplane = (id, airplaneName) => {
    if (window.confirm(`Are you sure you want to delete ${airplaneName}`)) {
      axios
        .delete(`http://localhost:5000/airplane/delete/${id}`)
        .then(() => {
          toast.success(" Airplane deleted successfully!", {
            // position: "top-center",
             autoClose: 1000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined
           });
          
          setAirplane(airplane.filter((c) => c._id !== id));
        })
        .catch((err) => {
          console.log(err);
          toast.error(<div> Error deleting Airplane</div>);
        });
    }
  };

  // Edit Airplane
  const handleEdit = (airplane) => {
    setEditData(airplane);
  };

  const handleUpdate = () => {
    // Axios update request
    axios
      .put(`http://localhost:5000/airplane/update/${editData._id}`, editData)
      .then(() => {
        toast.success(" Airplane updated successfully", {
          // position: "top-center",
           autoClose: 1000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined
         });
        setEditData(null); 
        
        axios.get("http://localhost:5000/airplane/").then((res) => {
          setAirplane(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div> Error updating Airplane</div>);
      });
  };

  // Handle view action
  const handleView = (airplane) => {
    setViewData(airplane);
  };

  // Filter airplanes based on search query
  const filteredAirplane = airplane.filter((airplane) =>
    airplane.airplaneName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAirplane.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAirplane.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>

      {/* Modal form for editing */}
      {editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 ">
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4 bg-[#1F3541] text-white text-center rounded-lg flex items-center justify-center">  <FaEdit className="w-6 h-6  mr-2  "/ >Edit Airplane</h2>
            
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Total Economy Seat
            </label>
            <input
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.airplaneName}
              onChange={(e) =>
                setEditData({ ...editData, airplaneName: e.target.value })
              }
            />

            <label className="block text-gray-700 font-semibold mb-2 text-sm" >Airplane Registration No.</label>
            <input
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.regNumber}
              onChange={(e) =>
                setEditData({ ...editData, regNumber: e.target.value })
              }
            />
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Description</label>
            <textarea
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              rows="4"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />

            <label className="block text-gray-700 font-semibold mb-2 text-sm" >TOTAL ECONOMY SEAT</label>
            <input
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.economySeat}
              onChange={(e) =>
                setEditData({ ...editData, economySeat: e.target.value })
              }
            />

            <label className="block text-gray-700 font-semibold mb-2 text-sm">TOTAL BUSINESS SEAT</label>
            <input
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.busineessSeat}
              onChange={(e) =>
                setEditData({ ...editData, busineessSeat: e.target.value })
              }
            />
            <label className="block text-gray-700 font-semibold mb-2 text-sm" >TOTAL SEATS</label>
            <input
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.totleSeat}
              onChange={(e) =>
                setEditData({ ...editData, totleSeat: e.target.value })
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

      {/* Modal for viewing description */}
      {viewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-md shadow-md max-w-md">
            <h2 className="text-lg font-semibold mb-4 bg-[#1F3541] text-white text-center rounded-lg flex items-center justify-center">
              <GrView className="w-6 h-6 mr-2" /> View Airplane Description
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

      <div className="pb-4 bg-[#1F3541] border rounded-xl">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative mt-1">
          <input
            type="text"
            id="table-search"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80  focus:ring-blue-500 focus:border-blue-500 bg-[#1F3541] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">No.</th>
              <th scope="col" className="px-6 py-3">Airplane Name</th>
              <th scope="col" className="px-6 py-3">Airplane Registration No.</th>
              <th scope="col" className="px-6 py-3">Total Economy Seat</th>
              <th scope="col" className="px-6 py-3">Total Business Seat</th>
              <th scope="col" className="px-6 py-3">Total Seats</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((airplane, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4">{airplane.airplaneName}</td>
                <td className="px-6 py-4">{airplane.regNumber}</td>
                <td className="px-6 py-4">{airplane.economySeat}</td>
                <td className="px-6 py-4">{airplane.busineessSeat}</td>
                <td className="px-6 py-4">{airplane.totleSeat}</td>
                <td className="flex gap-6 mr-5">
                  <GrView   className="text-3xl px-1 py-1 cursor-pointer text-white bg-blue-600 hover:bg-blue-700 rounded-full mt-3 -mr-1"
                    onClick={() => handleView(airplane)}
                  />
                  <FaEdit className="text-3xl px-1 py-1 cursor-pointer text-white mt-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg" 
                    onClick={() => handleEdit(airplane)}
                  />
                  <MdDelete  className="text-3xl px-1 py-1 cursor-pointer text-white bg-red-600 rounded-lg hover:bg-red-700 mt-3 mr-3"
                    onClick={() =>
                      deleteAirplane(airplane._id, airplane.airplaneName)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${currentPage === 1 ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold rounded`}
        >
          Previous
        </button>
        <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Airplanetable;
