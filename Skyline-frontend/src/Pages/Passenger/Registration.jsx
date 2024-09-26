import React, { useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
//import CountrySelector from "./CountrySelector";
import countryList from "react-select-country-list";

import Select from "react-select";
const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [address, setAddress] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setcheckbox] = useState(false);

  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = selectedOption => {
    setSelectedOption(selectedOption);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (firstName === "") {
      
      toast.error("First Name is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });


    } else if (lastName === "") {
      
      toast.error("Last Name is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (dateOfBirth === "") {
      toast.error("Date of Birth is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (gender === "") {
      toast.error(" Gender is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (selectedOption === null) {
      toast.error(" Country is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (address === "") {
      toast.error(" Address is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (passportNo === "") {
    
      toast.error(" Passport Number is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (!/^[A-Z0-9]{10}$/i.test(passportNo)) {
     
     
      toast.error("  Passport Number is invalid. Please enter a 10-digit number", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });


    } else if (phone === "") {
      
      toast.error(" Phone is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (!/^\d{10}$/.test(phone)) {
    
      toast.error(" Phone Number is invalid. Please enter a 10-digit number.", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (email === "") {
      
      toast.error(" Email is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });
    } else if (!email.includes("@")) {
     
      toast.error("  Email is invalid", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (password === "") {
      
      toast.error(" Password is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (password.length < 6) {
      toast.error(<div> </div>);
      toast.error("  Password must be at least 6 characters", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (confirmPassword === "") {
  
      toast.error(" Confirm Password is required", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (confirmPassword !== password) {
     
      toast.error("  Passwords do not match", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else if (!checkbox) {
      
      toast.error("   You must accept the terms and conditions", {
        // position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined
       });

    } else {

   
      toast.success("   All fields are valid!", {
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
    const newPassenger = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      country: selectedOption ? selectedOption.label : "",
      address,
      passportNo,
      phone,
      email,
      password,
      confirmPassword,
      
    };

    //Axios
    axios
      .post("http://localhost:5000/register/add", newPassenger)
      .then(() => {
        toast.success(<div>  Registration Successful!</div>);
        navigate("/login");
        // Optionally reset form fields after successful registration
        setFirstName("");
        setLastName("");
        setDateOfBirth("");
        setGender("");
        setSelectedOption(null);
        setAddress("");
        setPassportNo("");
        setPhone("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setcheckbox(false);
        
      
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div>  Error registering user</div>);
      });

     

  };

  return (
    <div
      className="text-black  flex justify-center items-center  bg-cover  "
      style={{ backgroundImage: `url(./src/assets/bg/go.jpg)` }}
    >
      <div className="container mx-auto mt-40" data-aos="zoom-in"data-aos-duration='2000'>
        <div className=" flex flex-col lg:flex-row w-10/12  lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden   ">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ position: "relative" }}
          >
            <video
              autoPlay
              muted
              loop
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src="./src/assets/bg/re.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="text-white text-3xl mb-3  text-center font-extrabold">
                Welcome!
              </h2>
              <div>
                <p className="text-black font-semibold text-justify  text-lg w-full">
                  Welcome to Skyline, the Frequent Flyer programme of Skyline
                  offering a range of benefits and exciting ways to spend your
                  earned miles. Just sign up and be rewarded with up to 3000
                  welcome bonus miles on your first flight with Skyline.
                  <a href="about" className="font-bold hover:text-blue-600">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 py-16 px-12 -mt-6 bg-blue-100">
            <div className="text-right font-bold flex items-center justify-end -mt-7  -mr-16">
              <img
                src="./src/assets/logo/new logo.png"
                className="h-14 w-14 mr-6"
                alt="Skyline Logo"
              />
            </div>

            <h2 className="text-3xl mb-4 font-bold">Register</h2>
            <p className="mb-4">
              Create your account. It's free and only takes a minute.{" "}
            </p>
            <form onSubmit={handleSubmit}>
              <div className=" grid grid-cols-2 gap-5  ">
                {" "}
                {/* Apply flex to this div */}
                <input
                  type="text"
                  placeholder="First Name"
                  className="flex border border-gray-400 py-1 px-2 mr-2 rounded-lg"
                  //first name
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="flex border border-gray-400 py-1 px-2 rounded-lg"
                  //last name
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-9">
                <input
                  type="date"
                  placeholder="date"
                  className="flex border border-gray-400 py-1 px-2 text-gray-400 rounded-lg"
                  //birthday
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                  }}
                />

                {/*gender*/}
                <div class="flex items-center space-x-2">
                  <input
                    id="male"
                    type="radio"
                    value="Male"
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <label
                    for="male"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                  >
                    Male
                  </label>

                  <input
                    id="female"
                    type="radio"
                    value="Female"
                    name="default-radio"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <label
                    for="female"
                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-700"
                  >
                    Female
                  </label>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-6">
                {/* <input
    type="text"
    placeholder="Country"
    className="flex border border-gray-400 py-1 px-2 mr-2 rounded-lg"
    onChange={(e) => {
      setcountry(e.target.value);
    }}
  /> */}

              <Select
  options={options}
  value={selectedOption}
  onChange={changeHandler}
/>

                <input
                  type="text"
                  placeholder="Address"
                  className="border border-gray-400 py-1 px-2  rounded-lg"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-6   ">
                <input
                  type="text"
                  placeholder="Passport No"
                  className="flex border border-gray-400 py-1 px-2 rounded-lg"
                  //passport-NO
                  onChange={(e) => {
                    setPassportNo(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="flex border border-gray-400 py-1 px-2 rounded-lg"
                  //phone-number
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>

              <div className="mt-5    ">
                <input
                  type="Email"
                  placeholder="Email"
                  className="flex border border-gray-400 py-1  px-2 w-full  rounded-lg"
                  //email
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="mt-5    ">
                <input
                  type="Password"
                  placeholder="Password"
                  className="flex border border-gray-400 py-1  px-2 w-full  rounded-lg"
                  //password
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="mt-5    ">
                <input
                  type="Password"
                  placeholder="Confirm Password"
                  className="flex border border-gray-400 py-1  px-2 w-full  rounded-lg"
                  //confirm-password
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>

              <div className="mt-5 ">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="border border-gray-400"
                  checked={checkbox}
                  onChange={(e) => {
                    setcheckbox(e.target.checked);
                  }}
                />

                <span className="ml-2">
                  I accept the{" "}
                  <a
                    href="#"
                    className="text-blue-500 font-semibold hover:text-blue-600"
                  >
                    {" "}
                    Terms of Use
                  </a>{" "}
                  &{" "}
                  <a
                    href="#"
                    className="text-blue-500 font-semibold hover:text-blue-600"
                  >
                    Privacy Policy
                  </a>
                </span>
              </div>
              <div className="mt-5">
                <button className=" w-full bg-blue-500 py-3 text-center text-white hover:bg-blue-700 hover:text-white">
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
