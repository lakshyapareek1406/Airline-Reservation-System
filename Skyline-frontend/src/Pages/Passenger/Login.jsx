import React, { useState,useContext } from 'react';
import axios from 'axios'; 
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";
import { MdLockOutline, MdFlight } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext} from"../../Components/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [remember, setRemember] = useState(false); 
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("Email and password are required.");
        return;
      }
      
      if (!remember) {
        toast.error("Remember me option is required.");
        return;
      }
      

      const response = await axios.post('http://localhost:5000/register/login', { email, password });

      const { data } = response;

      if (data.success) {
        toast.success(data.message);

        if (data.data.role === "passenger") {
          navigate("/home");
        } else if (data.data.role === "admin") {
          
          navigate("/home");
        }

        dispatch({ type: "LOGIN_SUCCESS", payload: data.data.passenger });
        setEmail("");
        setPassword("");
        setRemember("");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    }
  };
  /*
    // Email and password validation
    if (email === "") {
      toast.error(<div> Email is required </div>);
    } else if (!email.includes("@")) {
      toast.error(<div> Email is invalid </div>);
    } else if (password === "") {
      toast.error(<div> Password is required </div>);
    } else if (password.length < 6) {
      toast.error(<div> Password must be at least 6 characters</div>);
    } 

       else if (!remember) {
      toast.error(<div> Remember me checkbox is required</div>);
    } else {
      // If email and password are valid, proceed with login
      axios.post('http://localhost:5000/register/login', {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(<div> 😊  Login Successful </div>);
          navigate('/Passenger/phome'); // Redirect to dashboard if login is successful
          setEmail(""); // Clear email field
          setPassword(""); // Clear password field
          setRemember(false); // Reset checkbox
          
        } else {
          // If login fails due to incorrect password, show error message
          toast.error(<div> 😡 Incorrect password</div>);
        }
      })
      .catch((err) => {
        console.error(err); // Log any errors
      });
    }
  };
  
*/
  return (
    <div className="text-white h-screen flex justify-center items-center bg-cover" style={{ backgroundImage: `url(./src/assets/bg/go.jpg)` }}  >
      <div className="text-black bg-blue-100 rounded-2xl shadow-xl flex w-2/3 max-w-4xl "  data-aos="zoom-in"data-aos-duration='2000'>
        <div className="w-3/5 p-5 ">
          <div className="text-left font-bold ">
            <img src="./src/assets/logo/new logo.png" className="h-14 w-14 me-6" alt="Skyline Logo" />
          </div> 
          
          <div className="py-10 " >
            <h2 className="text-slate-900 text-center text-3xl font-bold">Sign in to Account</h2>
            <div className="border-2 w-10 border-black mb-2 mx-auto"></div>
            <div className="flex justify-center my-2">
              <div className="flex justify-center my-2">
                <a href="#" className="border-2 border-gray-800 rounded-full p-3 mx-1">
                  <FaFacebookF className="text-sm" />
                </a>
              </div>
              <div className="flex justify-center my-2">
                <a href="#" className="border-2 border-gray-800 rounded-full p-3 mx-1">
                  <FaGoogle className="text-sm" />
                </a>
              </div>
              <div className="flex justify-center my-2">
                <a href="#" className="border-2 border-gray-800 rounded-full p-3 mx-1">
                  <FaLinkedinIn className="text-sm" />
                </a>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm my-3">or use your email account</p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center mb-3">
                <div className="bg-gray-100 w-64 p-2 flex items-center ">
                  <FaRegEnvelope className="text-gray-400 mr-2" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center mb-3">
                <div className="bg-gray-100 w-64 p-2 flex items-center ">
                  <MdLockOutline className="text-gray-400 mr-2" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    placeholder="password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="flex justify-between w-64 mb-5 mt-2">
                  <label className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="mr-1"
                     
                    />Remember me
                  </label>
                  <a href="" className="text-xs">Forget Password?</a>
                </div>
                <button
                  type="submit"
                  className="border-2 border-blue-500 text-blue-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-black"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-2/5 bg-slate-800 rounded-tr-2xl rounded-br-2xl py-36 px-12 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-2 text-white">WellCome!</h2>
          <div className="border-2 w-10 border-white mb-2"></div>
          <p className="mb-2 text-white text-center">Fill up personal information and start journey with us,</p>
          <a href="registration" className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-black text-slate-200 ">
            Sign UP
          </a>
          <div className="text-white mt-7 ">
            <MdFlight className=" h-20 w-20"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;