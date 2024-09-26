import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md"; // Import MdDelete icon
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

const ManageCountries = () => {
  const [Country, setCountry] = useState("");
  const [countrys, setcountrys] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // For editing
  const [editData, setEditData] = useState(null);

  //get countrys
  useEffect(() => {
    function getcountrys() {
      axios
        .get("http://localhost:5000/countries/")
        .then((res) => {
          setcountrys(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(<div> Error fetching countries</div>);
        });
    }

    getcountrys();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (Country === "") {
      toast.error(" Country is required", {
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

  //add country
  const sendData = () => {
    const newCountry = {
      Country,
    };
    // Axios
    axios
      .post("http://localhost:5000/countries/add", newCountry)
      .then(() => {
        toast.success(<div> Country Add Successful!</div>);
        
        setCountry(""); 
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div> Error Country add </div>);
      });
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  // Filter countries based on search query
  const filteredcountrys = countrys.filter((country) =>
    country.Country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete country
  const deleteCountry = (id, countryName) => {
    if (window.confirm(`Are you sure you want to delete ${countryName}`)) {
      axios
        .delete(`http://localhost:5000/countries/delete/${id}`)
        .then(() => {
          toast.success("  Country deleted successfully!", {
            // position: "top-center",
             autoClose: 1000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined
           });
          setcountrys(countrys.filter((c) => c._id !== id));
        })
        .catch((err) => {
          console.log(err);
          toast.error(<div> Error deleting country</div>);
        });
    }
  };

  // Edit country
  const handleEdit = (country) => {
    setEditData(country);
  };

  const handleUpdate = () => {
    // Axios update request
    axios
      .put(`http://localhost:5000/countries/update/${editData._id}`, editData)
      .then(() => {
        
        toast.success("  Country updated successfully!", {
          // position: "top-center",
           autoClose: 1000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined
         });
        setEditData(null); 
      
        axios.get("http://localhost:5000/countries/").then((res) => {
          setcountrys(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div> Error updating country</div>);
      });
  };

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredcountrys.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredcountrys.length / itemsPerPage);

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
              <FaEdit className="w-6 h-6  mr-2  " />Edit Country</h2>

              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
            <input
              type="text"
              className="p-2 mb-2 w-full  shadow appearance-none border rounded-md leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
              value={editData.Country}
              onChange={(e) =>
                setEditData({ ...editData, Country: e.target.value })
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

      {/* Your existing code */}
      <div >
        <div className="mx-auto shadow-md rounded-md p-6 mt-6 bg-slate-100">
        <div className="py-[25px] px-[25px] bg-[#1F3541] border rounded-3xl   flex items-center  justify-center">
          <h1 className="text-white text-[28px] leading-[40px] cursor-pointer font-semibold  text-center flex ">
          <TbWorld className="mr-2 w-9 h-9"/>ManageCountries
          </h1>
        </div>
        <div className="mx-auto mt-10 px-4">
          <form
            
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-600"
                type="text"
                placeholder="Enter Country Name"
                id="country"
                value={Country}
                onChange={handleCountryChange} // Update the state on change
              />
              
            </div>
            <div className="flex items-center justify-between">
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
        {/*table*/}
        <div className="-mt-28">
          <section className=" ">
            <div className="mt-[130px] mx-4 relative ">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="pb-4 bg-white dark:bg-blue-950">
                  <label htmlFor="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="table-search"
                      className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                          Country Name
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((country, index) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={index}
                        >
                          <td className="w-4 p-4">
                            {index + indexOfFirstItem + 1}
                          </td>
                          <td>{country.Country}</td>
                          <td className="flex gap-6">
                            <FaEdit
                             className="text-3xl px-1 py-1  mt-3 cursor-pointer  text-white bg-green-600 hover:bg-green-700 rounded-lg "
                              onClick={() => handleEdit(country)}
                            />
                            <MdDelete
                               className="text-3xl px-1 py-1 cursor-pointer text-white bg-red-600 rounded-lg hover:bg-red-700 mt-3 mr-3"
                              onClick={() =>
                                deleteCountry(country._id, country.Country)
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
    </div>
  );
};

export default ManageCountries;
