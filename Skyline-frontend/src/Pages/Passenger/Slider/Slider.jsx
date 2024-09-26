import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import best from './SliderImg/w7.jpg';
import bagg from './SliderImg/bag.jpg';
import duty from './SliderImg/duty_free.jpg';
import seat from './SliderImg/advance_seat_reservation.jpg';
import meal from './SliderImg/meal.jpg';
import business from './SliderImg/13.jpeg';
import Legroom from './SliderImg/20.jpeg';

const services = [
  {
    title: "Bid For Business Class",
    description: "Bid for your Business Class upgrade online",
    image: business,
  },
  {
    title: "Advance Seat Reservation",
    description: "Window or Aisle seat? Reserve your seat in advance",
    image: seat,
  },
  {
    title: "window seat on a flight ",
    description: "enhances a  travel experience",
    image: best,
  },
  {
    title: "Prepaid Excess Baggage",
    description: "Pre-purchase extra baggage at a discounted rate",
    image: bagg,
  },
  {
    title: "Pre-Order Your Meal",
    description: "Enjoy Your preferred meal above the clouds",
    image: meal,
  },
  {
    title: "Pre-Order Your Duty-Free",
    description: "You can easily pre-order your favorite duty-free item",
    image: duty,
  },
  {
    title: "Extra Legroom Seat ",
    description: "Pre-book an extra legroom seat in Economy Class",
    image: Legroom,
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? services.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === services.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-full mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 70}%)`, width: `${services.length * 5}%` }}
        >
          {services.map((service, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <div className="p-4 flex flex-col items-center">
                <img src={service.image} alt={service.title} className="w-full h-72 object-cover rounded" />
                <h3 className="mt-4 text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-gray-600 text-center">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button onClick={prevSlide} className="bg-white p-2 rounded-full shadow-lg">
          <FaArrowLeft />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button onClick={nextSlide} className="bg-white p-2 rounded-full shadow-lg">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Slider;
