import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete, MdEventAvailable, MdBlockFlipped, MdOutlineTaskAlt } from "react-icons/md";
import { GrView } from "react-icons/gr";
import BookingNavigationBar from "./BookingNavigationBar";
import ViewBooking from "./ViewBooking";

const CanceledBooking = () => {
  const [viewData, setViewData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingPerPage = 7;

  const [booking, setBooking] = useState([]);

  // Get Bookings
  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/tourbooks/");
        setBooking(res.data.filter(b => b.status === "Cancelled"));
      } catch (err) {
        console.log(err);
        toast.error(<div> Error fetching bookings</div>);
      }
    };
    getBookings();
  }, []);

  // Delete Booking
  const deleteBooking = (_id, from, to) => {
    if (window.confirm(`Are you sure you want to delete booking from ${from} to ${to}?`)) {
      axios
        .delete(`http://localhost:5000/tourbooks/delete/${_id}`)
        .then(() => {
          setBooking(booking.filter(b => b._id !== _id));
          toast.success(" Booking deleted successfully!", {
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error(<div> Error deleting booking</div>);
        });
    }
  };

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
      setBooking(booking.map(b => (b._id === id ? { ...b, status, payment_status } : b)));
      toast.success(" Booking status updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(<div> Error updating booking status</div>);
    }
  };

  const handleConfirmBooking = (id,payment_status, email, firstName, departureDate, from, to, returnDate, flight, totalPrice) => {
    updateBookingStatus(id, "Confirmed", payment_status, email, firstName, departureDate, from, to, returnDate, flight, totalPrice);
  };

  const handleCancelBooking = (id,payment_status, email, firstName, departureDate, from, to, returnDate, flight, totalPrice) => {
    updateBookingStatus(id, "Cancelled", payment_status, email, firstName, departureDate, from, to, returnDate, flight, totalPrice);
  };

  const handleFinishBooking = (id,payment_status, email, firstName, departureDate, from, to, returnDate, flight, totalPrice) => {
    updateBookingStatus(id, "Finished", payment_status, email, firstName, departureDate, from, to, returnDate, flight, totalPrice);
  };

  // Pagination
  const indexOfLastBooking = currentPage * bookingPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingPerPage;
  const currentBookings = booking.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(booking.length / bookingPerPage);

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

  // Handle view action
  const handleView = (booking) => {
    setViewData(booking);
  };

  return (
    <div>
      {/* TourNav */}
      <BookingNavigationBar 
      length={booking.length}/>

      {/* Modal for viewing description */}
      {viewData && (
        <div className="fixed w-full z-50 justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-md shadow-md w-[1680px] h-[720px]">
            <h2 className="text-lg font-semibold mb-4 bg-[#1F3541] text-white text-center rounded-lg flex items-center justify-center">
              <GrView className="w-6 h-6 mr-2" /> View booking Details
            </h2>
            <div className="mb-4">
              <ViewBooking
                _id={viewData._id}
                from={viewData.from}
                to={viewData.to}
                tripType={viewData.tripType}
                flight={viewData.flight}
                title={viewData.title}
                firstName={viewData.firstName}
                lastName={viewData.lastName}
                dateOfBirth={viewData.dateOfBirth}
                country={viewData.country}
                address={viewData.address}
                passportNo={viewData.passportNo}
                email={viewData.email}
                phone={viewData.phone}
                Additionalpassengers={viewData.Additionalpassengers}
                passengers={viewData.passengers}
                departureDate={viewData.departureDate}
                returnDate={viewData.returnDate}
                classtype={viewData.classtype}
                totalPrice={viewData.totalPrice}
                status={viewData.status}
                payment_status={viewData.payment_status}
              />
            </div>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
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
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                <td className="flex gap-2 ml-4 mt-3">
                  <MdEventAvailable
                    className="text-3xl px-1 py-1 rounded-lg cursor-pointer mt-3 mr-3 bg-green-700 text-white hover:bg-green-800"
                    title="Confirm Booking"
                    onClick={() => handleConfirmBooking(booking._id,booking.payment_status, booking.email, booking.firstName, booking.departureDate, booking.from, booking.to, booking.returnDate, booking.flight, booking.totalPrice)}
                  />
                  <MdBlockFlipped
                    className="text-3xl px-1 py-1 cusor-pointer text-white bg-gray-600 rounded-lg mt-3 hover:bg-gray-700 mr-3"
                    title="Cancel Booking"
                    onClick={() => handleCancelBooking(booking._id,booking.payment_status, booking.email, booking.firstName, booking.departureDate, booking.from, booking.to, booking.returnDate, booking.flight, booking.totalPrice)}
                  />
                  <MdOutlineTaskAlt
                    className="text-3xl px-1 py-1cursor-pointer text-white mt-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg mr-3"
                    title="Mark as Finished Booking"
                    onClick={() => handleFinishBooking(booking._id,booking.payment_status, booking.email, booking.firstName, booking.departureDate, booking.from, booking.to, booking.returnDate, booking.flight, booking.totalPrice)}
                  />
                  <MdDelete
                    className="text-3xl px-1 py-1 cursor-pointer text-white bg-red-600 rounded-lg hover:bg-red-700 mt-3 mr-3"
                    onClick={() => deleteBooking(booking._id, booking.from, booking.to)}
                    title="Delete Booking"
                  />
                  <GrView
                    className="text-3xl px-1 py-1 cursor-pointer text-white bg-blue-600 hover:bg-blue-700 rounded-full mt-3 mr-6"
                    onClick={() => handleView(booking)}
                    title="View Details"
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
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === Math.ceil(booking.length / bookingPerPage) ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={nextPage}
          disabled={currentPage === Math.ceil(booking.length / bookingPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CanceledBooking;
