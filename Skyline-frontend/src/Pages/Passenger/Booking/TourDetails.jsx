import React, { useState, useContext } from 'react';
//import { AuthContext } from "../../context/AuthContext";
import useFetch from '../../../Components/hooks/useFetch';
import { BASE_URL } from '../../../Components/Utils/config';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';
import CoverVideo from '../../../Components/Common/CoverVideo';
const TourDetails = () => {
  //const { passenger } = useContext(AuthContext);
  const { id } = useParams();
  const { data: tour, loading, error } = useFetch(`${BASE_URL}tour/get/${id}`);
 console.log(tour);

  // Handle cases where tour data might not be loaded yet
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tour) return <div>No tour data found</div>;

  // Destructure tour data
  const { _id, photo, from, to, flight, departureDate, returnDate, tripType, passengers, economyPrice, businessPrice, description } = tour;

  return (

    <> 
    <div className="flex flex-col lg:flex-row lg:justify-between p-4 lg:p-8 mt-[100px]">
      <div className="lg:w-[400px] mt-[100px]">
        <img
          src={photo}
          alt="Tour Image"
          className="rounded-lg mb-4"
        />
        <div className="mb-4">
          <h2 className="text-3xl font-bold -mb-6">{from} to {to} Tour</h2>
          <h2 className="text-lg font-bold mb-4">{departureDate} - {returnDate} </h2>
          <p className="text-gray-500 ">{tripType}</p>
          <p className="text-gray-500 ">{passengers}</p>
          <p className="text-gray-500 "> Flight - {flight}</p>
          <p className="text-lg mt-2"> Economy Class ${economyPrice} /per Person</p>
          <p className="text-lg "> Business Class${businessPrice} /per Person</p>
       

          <p className="mt-4">{description}</p>
        </div>
      </div>


    {/*booking Form*/}
    <BookingForm 
     id={tour.id}
    economyPrice={tour.economyPrice}
    businessPrice={tour.businessPrice}
    from={tour.from}
    to={tour.to}
    flight={tour.flight}
    departureDate={tour.departureDate}
    returnDate={tour.returnDate}
    tripType={tour.tripType}
    
    />
    </div>
    </>
  );
}

export default TourDetails;
