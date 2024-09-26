import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HiOutlineLocationMarker } from "react-icons/hi";
import TourCard from "./Booking/TourCard";

const Search = () => {
  const [departureDate, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("One-Way");

  const [Countriesfrom, setCountryfrom] = useState([]);
  const [selectedCountryfrom, setSelectedCountryfrom] = useState("");
  const [Countriesto, setCountryto] = useState([]);
  const [selectedCountryto, setSelectedCountryto] = useState("");

  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // New state variable

  // Get airports
  useEffect(() => {
    axios
      .get("http://localhost:5000/airport/")
      .then((response) => {
        setCountryfrom(response.data);
        setCountryto(response.data);
      })
      .catch((error) => {
        console.error("Error fetching airports:", error);
      });
  }, []);

  // Get Tours
  useEffect(() => {
    axios
      .get("http://localhost:5000/tour/")
      .then((res) => {
        setTours(res.data);
        setFilteredTours(res.data); // Set filteredTours initially
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div> Error loading User Tours</div>);
      });
  }, []);



  const handleSearch = (e) => {
    e.preventDefault();

    if (!selectedCountryfrom) {
    
      toast.error(" Please select a departure location.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }

    if (!selectedCountryto) {
      
      toast.error(" Please select a destination.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }

    if (!departureDate) {
      toast.error(" Please select a departure date.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }

    if (tripType === "Round-Tour" && !returnDate) {
      toast.error(" Please select a return date for a round trip.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }
    

    const filtered = tours.filter((tour) => {
      return (
        (selectedCountryfrom === "" || tour.from === selectedCountryfrom) &&
        (selectedCountryto === "" || tour.to === selectedCountryto) &&
        (tripType === "" || tour.tripType === tripType) &&
        (departureDate === "" || tour.departureDate === departureDate) &&
        (returnDate === "" || tour.returnDate === returnDate)
      );
    });

    setFilteredTours(filtered);
    setHasSearched(true);
  };

  return (
    <div className="max-w-[1000px] mx-auto p-4">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 ${
            tripType === "One-Way"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 border"
          }`}
          onClick={() => setTripType("One-Way")}
        >
          One Way
        </button>
        <button
          className={`px-4 py-2 ml-2 ${
            tripType === "Round-Tour"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 border"
          }`}
          onClick={() => setTripType("Round-Tour")}
        >
          Round Trip
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4">
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="from" className="mb-1 text-sm font-medium ">
              From
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <HiOutlineLocationMarker className="mr-2" />
              <select
                id="from"
                className="border-none outline-none flex-1 w-[100px]"
                value={selectedCountryfrom}
                onChange={(e) => setSelectedCountryfrom(e.target.value)}
                required
              >
                <option value="">Select</option>
                {Countriesfrom.map((country) => (
                  <option key={country._id} value={country.airportName}>
                    {country.airportName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="to" className="mb-1 text-sm font-medium">
              To
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <HiOutlineLocationMarker className="mr-2" />
              <select
                id="to"
                className="border-none outline-none flex-1 w-[100px]"
                value={selectedCountryto}
                onChange={(e) => setSelectedCountryto(e.target.value)}
                required
              >
                <option value="">Select</option>
                {Countriesto.map((country) => (
                  <option key={country._id} value={country.airportName}>
                    {country.airportName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        

        
          <div className="flex flex-col w-1/2">
            <label htmlFor="departure" className="mb-1 text-sm font-medium">
              Departure
            </label>
            <input
              type="date"
              id="departure"
              value={departureDate}
              onChange={(e) => setDeparture(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="return" className="mb-1 text-sm font-medium">
              Return
            </label>
            <input
              type="date"
              id="return"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="border rounded-lg px-3 py-2"
              disabled={tripType === "One-Way"}
            />
          </div>
          <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 self-center"
          onClick={handleSearch}
        >
          Search
        </button>
        </div>

       
      </div>

      {/* Card */}
      {hasSearched && (
  <div className="container mx-auto px-4 relative z-10" data-aos="fade-right" data-aos-duration="1600">
    <h1 className="text-4xl font-bold my-8"> Destinations</h1>
    {filteredTours.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <div key={tour.id} className="p-4" data-aos="zoom-in" data-aos-duration="1600">
            <TourCard
            _id={tour._id}
              from={tour.from}
              to={tour.to}
              flight={tour.flight}
              departureDate={tour.departureDate}
              returnDate={tour.returnDate}
              tripType={tour.tripType}
              passengers={tour.passengers}
              economyPrice={tour.economyPrice}
              businessPrice={tour.businessPrice}
              photo={tour.photo}
            />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center text-gray-500 mt-8 text-2xl">
        No tours available
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default Search;
