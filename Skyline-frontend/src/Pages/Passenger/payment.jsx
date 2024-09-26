import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../Components/Utils/config';
import useFetch from '../../Components/hooks/useFetch';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: booking, loading, error } = useFetch(`${BASE_URL}tourbooks/${id}`);



  const updateBookingStatus = async (_id, status, payment_status, email ,firstName,departureDate,from,to,returnDate,flight,totalPrice) => {
    try {
      await axios.put(`${BASE_URL}tourbooks/update/payment/${id}`, {
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
      toast.success("Your Payment successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Your Payment unsuccessful!");
    }
  };

  const handlePaymentSubmit = async (event, _id,status, email, firstName, departureDate, from, to, returnDate, flight, totalPrice) => {
    event.preventDefault();
    try {
      // Implement payment processing logic here
  
      // After successful payment
      await updateBookingStatus(_id, status,"Paid", email, firstName, departureDate, from, to, returnDate, flight, totalPrice);
      navigate('/paymentsucess'); // Assuming you have a route for the confirmation page
    } catch (error) {
      console.error(error);
      toast.error("Error processing payment");
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='flex justify-center items-center h-screen'>
    <div className="bg-white p-8 rounded-xl shadow-2xl hover:shadow-lg max-w-md w-full">
    <div className="text-center">
          <h2 className="text-back font-bold mb-8 text-3xl">Payment Details</h2>
        </div>
      <form className="flex flex-col space-y-6" onSubmit={handlePaymentSubmit}>
      <div className="flex flex-col space-y-2">
          <label htmlFor="Name" className="text-gray-700 font-semibold">Name</label>
          <input placeholder="e.g. Mayuru Madhuranga" required id="cardholdername" type="text" className="w-full px-4 py-2 bg-gray-100 rounded-lg outline-none" />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="cardnumber" className="text-gray-700 font-semibold">Card number</label>
          <input id="cardnumber" type="text" required placeholder="1234 1234 1234 1234" className="w-full px-4 py-2 bg-gray-100 rounded-lg outline-none" />
        </div>
        <div className="flex space-x-4">
          <input id="expiry" type="number" pattern="\d{2}/\d{2}" maxLength="5" placeholder="MM / YY" required className="w-1/2 px-4 py-2 bg-gray-100 rounded-lg outline-none" />
          <input id="cvc" type="text" pattern="\d{3}" maxLength="3" placeholder="CVC" required className="w-1/2 px-4 py-2 bg-gray-100 rounded-lg outline-none" />
        </div>
        
        <div className="flex flex-col space-y-2">
          <label htmlFor="zip" className="text-gray-700 font-semibold">ZIP</label>
          <input id="zip" type="text" required placeholder="90210" className="w-full px-4 py-2 bg-gray-100 rounded-lg outline-none" />
        </div>
        {booking && (
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full transition duration-300 ease-in-out">
              Pay $ {booking.totalPrice}
            </button>
          )}
      </form>
    </div>
  </div>
  
  );
};

export default Payment;
