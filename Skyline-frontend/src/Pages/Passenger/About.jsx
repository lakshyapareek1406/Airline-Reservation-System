import React from 'react'
import CoverVideo from '../../Components/Common/CoverVideo'

const About = () => {
  return (
    <>
    <div className='mt-[130px]'>
     <CoverVideo/>
   </div>

    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex">
          <img
            src="../src/assets/logo/new logo.png"
            alt="Airplane"
            className=" w-72 h-72"
          />
          <div className="p-8 sm:w-1/2">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700 mb-4">
            Welcome to Skyline , your number one source for all things travel. We're dedicated to giving you the very best flight booking experience, with a focus on reliability, customer service, and uniqueness.
            </p>
            <p className="text-gray-700">
            Founded in 2004 by a group of passionate travel enthusiasts, Skyline  has come a long way from its beginnings. When we first started out, our passion for making travel accessible to everyone drove us to start our own business.
            
            </p>
            <p className="text-gray-700">We hope you enjoy our services as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
          </div>
        </div>
        
        <div className="bg-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-4">
          We aspire to be the airline of choice for travelers seeking a unique, authentic Sri Lankan experience, delivered with warmth, care, and hospitality.
          </p>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
          To build a successful, sustainable airline that serves the national economy, tourists, and Sri Lankans living abroad while utilizing our strategic location in the Indian Ocean to become an air transportation hub.
          </p>
          <p className="text-gray-700 mb-4">
            To be an aviation centre of excellence, developing talent for the Airline and the wider industry.
          </p>
          <p className="text-gray-700">
            We are committed to doing business in an ethical manner, which yields long-term, sustainable benefits for the country and the communities we serve.
          </p>


         {/*<div className='w-1/2 pl-4'>
             <img src='src/assets/bg/about.gif' ></img>
         </div>}*/}


        </div>
      </div>
    </div>
 


  
  </>
  )
}

export default About