import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="thank_you">
          <span>
            <i className="fa-regular fa-circle-check text-5xl text-secondary"></i>
          </span>
          <h1 className="mb-3 font-semibold text-6xl font-subtitle">Thank You</h1>
          <h3 className="mb-4 text-xl">Your Tour is booked.</h3>
          <h3 className="mb-4 text-xl">Check Your Email</h3>

          <button className="btn-primary text-white w-full h-10 mt-4 bg-blue-600  hover:bg-blue-500 rounded-full">
            <Link to="/home">Back to Home</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
