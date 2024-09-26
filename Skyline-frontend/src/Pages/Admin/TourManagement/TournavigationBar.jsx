import React from 'react';
import { Link } from 'react-router-dom';
const TourNavigationBar = (tours) => {

   const{length}=tours
  return (
    <nav className="flex justify-between items-center ">
      <div className="flex items-center">
        <span className="text-xl font-semibold">Total Tours</span>
        <div className="ml-2 text-center font-bold bg-blue-400 w-10 h-10 py-1 text-2xl rounded-full"> {tours.length}</div>
      </div>
      <div className="flex space-x-2">
      <Link to="/admin/allTours">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full  hover:bg-blue-700  font-bold  focus:outline-none focus:shadow-outline"> All Tours</button>
        </Link>
        <Link to="/admin/onewaytours">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full  hover:bg-blue-700  font-bold  focus:outline-none focus:shadow-outline">One-Way Tours</button>
        </Link>
        <Link to="/admin/roundtours">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full  hover:bg-blue-700  font-bold  focus:outline-none focus:shadow-outline">Round Tours</button>
        </Link>
      </div>
      <Link to="/admin/addTour">
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full  hover:bg-blue-700  font-bold  focus:outline-none focus:shadow-outline">+ Add Tour</button>
      </Link>
    </nav>
  );
};

export default TourNavigationBar;
