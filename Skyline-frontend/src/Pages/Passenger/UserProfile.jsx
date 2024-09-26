import React, { useState, useContext, useMemo } from 'react';
import { AuthContext } from "../../Components/context/AuthContext";
import countryList from "react-select-country-list";
import { FaUser } from "react-icons/fa";
import Select from "react-select";
import axios from 'axios'; 
import { toast } from 'react-toastify'; 

const UserProfile = () => {
  const { passenger, dispatch } = useContext(AuthContext);
  const {
    _id, firstName, lastName, email, country, gender, dateOfBirth, address, passportNo, phone
  } = passenger;

  const [selectedOption, setSelectedOption] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null); // State to hold edited data

  const [user, setUser] = useState({
    username: _id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    country: country,
    gender: gender,
    dateOfBirth: dateOfBirth,
    address: address,
    passportNo: passportNo,
    phone: phone,
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
    setEditData(prevEditData => ({
      ...prevEditData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    dispatch({ type: 'UPDATE_PASSENGER', payload: user });
    setIsEditing(false);
    // Call handleUpdate function to update passenger data
    handleUpdate();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoPreview(URL.createObjectURL(file));
    setUser(prevUser => ({
      ...prevUser,
      photo: null, // Only keep the file name or URL, not the entire file object
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5000/register/update/${_id}`, editData)
      .then(() => {
        toast.success("Passenger updated successfully!", {
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setEditData(null);
        axios.get("http://localhost:5000/register/").then((res) => {
          setUser(res.data);
        });
      })
      .catch((err) => {
        console.error("Error updating Passenger:", err);
        toast.error("Error updating Passenger");
      });
  };
  

  const options = useMemo(() => countryList().getData(), []);

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <video autoPlay muted loop className='absolute top-0 left-0 w-full h-full object-cover'>
        <source src="./src/assets/bg/profile.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex justify-center items-center h-full bg-gray-900">
        <div className="bg-gray-50 shadow-2xl rounded-lg p-8 max-w-[1000px] w-full relative">
          <h2 className="text-3xl flex items-center justify-center font-semibold mb-6 bg-black text-white rounded-xl"> <FaUser className=' mr-4'/>Your Profile </h2>
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col items-center ">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" className="w-50 h-32 object-cover rounded-full mb-4" />
              ) : (
                <svg
                  className="w-32 h-32 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4zM12 13c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"
                  ></path>
                </svg>
              )}
              {isEditing && (
                <label className="bg-gray-300 px-3 py-1 rounded mb-4 cursor-pointer">
                  Upload new photo
                  <input
                    type="file"
                    className="hidden"
                    onChange={handlePhotoChange}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
            {isEditing ? (
              <div className="flex-1 ml-10 mt-1 bg-gray-100 shadow-xl py-2   px-4 ">
                <div className="mb-4">
                  <div className="text-gray-600 mb-2">
                    <span className="font-bold">First Name: </span>
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      className="border rounded p-1"
                    />
                  </div>
                  <div className="text-gray-600 mb-2">
                    <span className="font-bold">Last Name: </span>
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      className="border rounded p-1"
                    />
                  </div>
                  <div className="text-gray-600 mb-2">
                    <span className="font-bold">Date Of Birth: </span>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={user.dateOfBirth}
                      onChange={handleChange}
                      className="border rounded p-1"
                    />
                  </div>
                  <div className="text-gray-600 mb-2">
                    <span className="font-bold">Gender: </span>
                    <input
                      type="text"
                      name="gender"
                      value={user.gender}
                      onChange={handleChange}
                      className="border rounded p-1"
                    />
                  </div>
                  <div className="text-gray-600 mb-2">
                    <span className="font-bold">Country: </span>
                    <Select
                      options={options}
                      value={selectedOption}
                      onChange={(option) => {
                        setSelectedOption(option);
                        setUser(prevUser => ({
                          ...prevUser,
                          country: option.label, // Assuming country is stored as a label
                        }));
                      }}
                    />
                  </div>
                  <div className="text-gray-600 mb-2">
                    <span className="font-bold">Address: </span>
                    <input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      className="border rounded p-1"
                    />
                  </div>
                  <div className="text-gray-600 mb-2">
                    <span className="font-bold">Passport Number: </span>
                    <input
                      type="text"
                      name="passportNo"
                      value={user.passportNo}
                      onChange={handleChange}
                      className="border rounded p-1"
                    />
                  </div>
                  <div className="text-gray-600 mb-2">
                    <span className="font-bold">Phone Number: </span>
                    <input
                      type="text"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      className="border rounded p-1"
                    />
                  </div>
                  <div className="text-gray-600 mb-2">
                    <span className="font-bold">Email: </span>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="border rounded p-1"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button onClick={handleSaveClick} className="bg-orange-500 text-white px-4 py-2 rounded">
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 ml-10 mt-1 bg-gray-100 shadow-xl py-2   px-4">
                <div className="mb-4 ">
                  <div className="text-black text-lg mb-2">
                    <span className="font-bold"> ⚫ First Name: </span>
                    {user.firstName}
                  </div>
                  <div className="text-black text-lg mb-2">
                    <span className="font-bold"> ⚫ Last Name: </span>
                    {user.lastName}
                  </div>
                  <div className="text-black text-lg mb-2">
                    <span className="font-bold"> ⚫ Date Of Birth: </span>
                    {user.dateOfBirth}
                  </div>
                  <div className="text-black text-lg mb-2">
                    <span className="font-bold"> ⚫ Gender: </span>
                    {user.gender}
                  </div>
                  <div className="text-black text-lg mb-2 ">
                    <span className="font-bold"> ⚫ Country: </span>
                    {user.country}
                  </div>
                  <div className="text-black text-lg mb-2">
                    <span className="font-bold"> ⚫ Address: </span>
                    {user.address}
                  </div>
                  <div className="text-black text-lg mb-2">
                    <span className="font-bold"> ⚫ Passport Number: </span>
                    {user.passportNo}
                  </div>
                  <div className="text-black text-lg mb-2">
                    <span className="font-bold"> ⚫ Phone Number: </span>
                    {user.phone}
                  </div>
                  <div className="text-black text-lg mb-2">
                    <span className="font-bold"> ⚫ Email Address: </span>
                    {user.email}
                  </div>
                </div>
                <div className="text-right">
                  <button onClick={handleEditClick}
                className="bg-orange-500 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
