import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdBlockFlipped } from "react-icons/md";
import { useParams } from 'react-router-dom'
import useFetch from '../../../Components/hooks/useFetch'
import { BASE_URL } from '../../../Components/Utils/config'
import { Link } from "react-router-dom";
const MyBooking = () => {
  const { id } = useParams();
  const { data: booking, loading, error } = useFetch(`${BASE_URL}tourbooks/users/${id}`);
  
  const [currentPage, setCurrentPage] = useState(1);
  const bookingPerPage = 5;

  // Update booking status
  const updateBookingStatus = async (id, status, payment_status, email, firstName, departureDate, from, to, returnDate, flight, totalPrice) => {
    try {
      await axios.put(`http://localhost:5000/tourbooks/update/${id}`, {
        firstName,
        departureDate,
        returnDate,
        from,
        to,
        flight,
        email,
        totalPrice,
        status,
        payment_status,
      });

      toast.success("Booking status updated and email sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error(<div>Error updating booking status</div>);
    }
  };

  const handleConfirmBooking = (id, email, firstName, departureDate, from, to, returnDate, flight, totalPrice) => {
    updateBookingStatus(id, "Confirmed", "Not Paid", email, firstName, departureDate, from, to, returnDate, flight, totalPrice);
  };

  const handleCancelBooking = (id, email, firstName, departureDate, from, to, returnDate, flight, totalPrice) => {
    updateBookingStatus(id, "Cancelled", "Not Paid", email, firstName, departureDate, from, to, returnDate, flight, totalPrice);
  };

  // Pagination
  const indexOfLastBooking = currentPage * bookingPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingPerPage;
  const currentBookings = booking?.slice(indexOfFirstBooking, indexOfLastBooking) || [];
  const totalPages = Math.ceil(booking?.length / bookingPerPage);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookings</div>;

  if (!booking || booking.length === 0) {
    return (
      <div className='mt-[200px] mb-[1000px]'>
        <h2 className="text-3xl font-bold text-gray-600 text-center">No bookings found.</h2>
      </div>
    );
  }

  return (
    <div className='mt-[200px] mb-[320px]'>

      <div>
        <h2 className="text-3xl font-bold text-gray-600 text-center">My Bookings</h2>
      </div>
      {/* Table 
      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">#</th>
              <th scope="col" className="px-6 py-3 text-center">From</th>
              <th scope="col" className="px-6 py-3 text-center">To</th>
              <th scope="col" className="px-6 py-3 text-center">Flight</th>
              <th scope="col" className="px-6 py-3 text-center">Departure Date</th>
              <th scope="col" className="px-6 py-3 text-center">Return Date</th>
              <th scope="col" className="px-6 py-3 text-center">Type</th>
              <th scope="col" className="px-6 py-3 text-center">Passengers</th>
              <th scope="col" className="px-6 py-3 text-center">Class Type</th>
              <th scope="col" className="px-6 py-3 text-center">Total Price</th>
              <th scope="col" className="px-6 py-3 text-center">Status</th>
              <th scope="col" className="px-6 py-3 text-center">Payment Status</th>
              <th scope="col" className="px-6 py-3 text-center">Option</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, index) => (
              <tr key={booking._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <td className="px-6 py-4 text-center">{booking.from}</td>
                <td className="px-6 py-4 text-center">{booking.to}</td>
                <td className="px-6 py-4 text-center">{booking.flight}</td>
                <td className="px-6 py-4 text-center">{booking.departureDate}</td>
                <td className="px-6 py-4 text-center">{booking.returnDate}</td>
                <td className="px-6 py-4 text-center">{booking.tripType}</td>
                <td className="px-6 py-4 text-center">{booking.passengers}</td>
                <td className="px-6 py-4 text-center">{booking.classtype}</td>
                <td className="px-6 py-4 text-center">{booking.totalPrice}</td>
                <td className="px-6 py-4 text-center text-red-600">{booking.status}</td>
                <td className="px-6 py-4 text-center text-red-600">{booking.payment_status}</td>
                <td className="flex gap-2 ml-4 mt-3 ">
                  <MdBlockFlipped
                    className="text-3xl px-1 py-1 cursor-pointer text-white bg-gray-600 rounded-lg mt-3 hover:bg-gray-700 mr-3"
                    title="Cancel Booking"
                    onClick={() => handleCancelBooking(booking._id, booking.email, booking.firstName, booking.departureDate, booking.from, booking.to, booking.returnDate, booking.flight, booking.totalPrice)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>*/}
      {/* Booking Details */}
      {currentBookings.map((booking) => (
        <div key={booking._id} className="w-[1600px] mx-auto p-4 " data-aos="fade-up" data-aos-duration="3000">
          <div className="bg-white shadow-2xl rounded-3xl p-4 flex justify-between items-center ">
            <div className="flex flex-col">
              <span className="font-semibold text-lg">From</span>
              <span className="text-gray-500">{booking.from}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">To</span>
              <span className="text-gray-500">{booking.to}</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">Flight</span>
              <span className="block text-gray-700">{booking.flight}</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">Departure Date</span>
              <span className="block text-gray-700">{booking.departureDate}</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">Return Date</span>
              <span className="block text-gray-700">{booking.returnDate}</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">Tour Type</span>
              <span className="block text-gray-700">{booking.tripType}</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">Passenger</span>
              <span className="block text-gray-700">{booking.passengers}</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">Class Type</span>
              <span className="block text-gray-700">{booking.classtype}</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">Total Price</span>
              <span className="block text-gray-700">${booking.totalPrice}</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">Status</span>
              <span className="block text-red-500">{booking.status}</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">Payment</span>
              <span className="block text-red-500">{booking.payment_status}</span>
            </div>
            <div className="flex space-x-2">
            <Link to={`/payment/${booking._id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full">Pay ${booking.totalPrice}</button>
              </Link>
              <button
                className="bg-gray-600 text-white hover:bg-red-700 px-4 py-2 rounded-full"
                onClick={() => handleCancelBooking(booking._id, booking.email, booking.firstName, booking.departureDate, booking.from, booking.to, booking.returnDate, booking.flight, booking.totalPrice)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

       
    </div>
      
    
  );
}

export default MyBooking;
