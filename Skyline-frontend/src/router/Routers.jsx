import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


//Passenger routes
import PLayout from "../Layouts/PLayout";
import Home from "../Pages/Passenger/Home";

import Expreience from "../Pages/Passenger/Expreience/Expreience";
import Help from "../Pages/Passenger/Help";
import About from "../Pages/Passenger/About";
import Login from "../Pages/Passenger/Login";
import Registration from "../Pages/Passenger/Registration";
import FlightList from "../Pages/Passenger/FlightList";
import Booking from "../Pages/Passenger/Booking/booking";
import BookingForm from "../Pages/Passenger/Booking/BookingForm";
import UserProfile from "../Pages/Passenger/UserProfile";
import TourDetails from "../Pages/Passenger/Booking/TourDetails";
import ThankYou from "../Pages/Passenger/Booking/ThankYou";
import MyBooking from "../Pages/Passenger/Booking/MyBooking";





//admin routes
import DashBoard from "../Pages/Admin/DashBoard";
import ManageAirports from "../Pages/Admin/ManageAirports";
import ManageFlight from "../Pages/Admin/ManageFlight";
import ManageBooking from "../Pages/Admin/ManageBooking/ManageBooking";
import UserFeedback from "../Pages/Admin/UserFeedback";
import ManageStaff from "../Pages/Admin/ManageStaff";
import Adminprofile from "../Pages/Admin/Adminprofile";

import ALayout from"../Layouts/ALayout";
import ManageCountries from "../Pages/Admin/ManageCountries";
import RePassengers from "../Pages/Admin/RePassengers";
import AdminRegistration from "../Pages/Admin/AdminRegistration";
import ManageAirplane from "../Pages/Admin/ManageAriplanes/ManageAirplane";
import AddTour from "../Pages/Admin/TourManagement/addTour";
import AllTours from "../Pages/Admin/TourManagement/allTours";
import ViewBooking from "../Pages/Admin/ManageBooking/ViewBooking";
import WaitingBookings from "../Pages/Admin/ManageBooking/WaitingBookings";
import ConfirmedBookings from "../Pages/Admin/ManageBooking/ConfirmedBookings";
import FinishedBookings from "../Pages/Admin/ManageBooking/FinishedBookings";
import CanceledBooking from "../Pages/Admin/ManageBooking/CanceledBooking";
import OneWayTours from "../Pages/Admin/TourManagement/OneWayTours";
import RoundTours from "../Pages/Admin/TourManagement/RoundTours";
import Payment from "../Pages/Passenger/payment";
import PaymentSucess from "../Pages/Passenger/Booking/Paymentsucess";
















const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PLayout/>}>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book" element={<Booking/>} />
          <Route path="/flightlist" element={<FlightList />} />
          <Route path="/expreience" element={<Expreience />} />
          <Route path="/help" element={<Help/>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/bookingform" element={<BookingForm />} />
          <Route path="/tour/get/:id" element={<TourDetails />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/mybooking/:id" element={<MyBooking />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/paymentsucess" element={<PaymentSucess />} />
        </Route>

        
        <Route path="/admin" element={<ALayout/>} >  
          <Route path="/admin" element={<Navigate to ='admin/dashboard' />} />
         <Route path="/admin/dashboard" element={<DashBoard />} />
         <Route path="/admin/countries" element={<ManageCountries />} />
        <Route path="/admin/manageairports" element={<ManageAirports />} />
        <Route path="/admin/manageflight" element={<ManageFlight />} />
        <Route path="/admin/managebooking" element={<ManageBooking />} />
        <Route path="/admin/userfeedback" element={<UserFeedback/>} />
        <Route path="/admin/managestaf" element={<ManageStaff />} />
        <Route path="/admin/profile" element={<Adminprofile />} />
        <Route path="/admin/repassenger" element={<RePassengers/>} />
        <Route path="/admin/registration" element={<AdminRegistration/>} />
        <Route path="/admin/manageairplane" element={<ManageAirplane/>} />
        <Route path="/admin/addTour" element={<AddTour/>} />
        <Route path="/admin/allTours" element={<AllTours/>} />
        <Route path="/admin/onewaytours" element={<OneWayTours/>} />
        <Route path="/admin/roundtours" element={<RoundTours/>} />
        <Route path="/admin/viewbooking" element={<ViewBooking/>} />
        <Route path="/admin/waitingbooking" element={<WaitingBookings/>} />
        <Route path="/admin/confirmedbooking" element={<ConfirmedBookings/>} />
        <Route path="/admin/finishedbooking" element={<FinishedBookings/>} />
        <Route path="/admin/canceledbooking" element={<CanceledBooking/>} />
   
        

                    
          
        </Route>
  
      </Routes>
    </div>
  );
};

export default Routers;
