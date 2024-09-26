import React from 'react'
import { BsFillPeopleFill } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineFlight } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import Charts from "./Charts/lineCharts";
import useFetch from '../../Components/hooks/useFetch'
import { BASE_URL } from '../../Components/Utils/config'
import { FaRegCalendarAlt } from "react-icons/fa";

const DashBoard = () => {

  const {data:registerCount}=useFetch(`${BASE_URL}register/search/getTourCount`);
  const {data:totalPrice}=useFetch(`${BASE_URL}tourbooks/search/getbookingprice`);
  const {data:FlightCount}=useFetch(`${BASE_URL}flightlist/search/getFlightCount`);
  const {data:FeedbackCount}=useFetch(`${BASE_URL}feedback/search/getFeedbackCount`);


  return (
    <div className='pt-[25px] px-[25px] bg-[#F8F9FC] mt-2 '>
      <div className='flex items-center justify-between'>
        <h1 className='text-[#101011] text-[28px] font-semibold leading-[34px]  cursor-pointer mb-5'>Dashboard</h1>
       {/* <button className='bg-blue-500 h-[32px] rounded-full mb-5 text-white flex items-center justify-center px-[30px] hover:bg-blue-700 cursor-pointer '>Generate Report</button>*/}

       </div>
   

       <div className='grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>
        <div className='h-[150px] rounded-[8px] bg-cyan-300 border-l-[4px] border-blue-700 flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out bg-gradient-to-r to-blue-400 from-blue-600'>
          <div>
            <h1 className='text-white text-[40px] leading-[17px] font-bold mt-5'>{registerCount}</h1>
            <h2 className='text-[20px] leading-[24px] font-bold text-black mt-[5px]'>Total Registered passengers</h2>
          </div>
          <BsFillPeopleFill className='w-10 h-10'/>
        </div>

        <div className='h-[150px] rounded-[8px] bg-green-500 border-l-[4px] border-green-700 flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out bg-gradient-to-r to-green-400 from-green-500'>
          <div>
            <h1 className='text-white  text-[40px] leading-[17px] font-bold mt-5'>{totalPrice}</h1>
            <h2 className='text-[20px] leading-[24px] font-bold text-black mt-[5px]'>Total Booking</h2>
          </div>
          <FaRegCalendarAlt className='w-10 h-10'/>
        </div>

        <div className='h-[150px] rounded-[8px] bg-red-400 border-l-[4px] border-red-600 flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out bg-gradient-to-r to-red-400 from-red-500'>
          <div>
            <h1 className='text-white text-[40px] leading-[17px] font-bold mt-5'>{FlightCount}</h1>
            <h2 className='text-[20px] leading-[24px] font-bold text-black mt-[5px]'>Flights</h2>
          </div>
          <MdOutlineFlight className='w-10 h-10'/>
        </div>

        <div className='h-[150px] rounded-[8px] bg-yellow-400 border-l-[4px] border-yellow-600 flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out bg-gradient-to-r to-yellow-400 from-yellow-500 '>
          <div>
            <h1 className='text-white text-[40px] leading-[17px] font-bold mt-5'>{FeedbackCount}</h1>
            <h2 className='text-[20px] leading-[24px] font-bold text-black mt-[5px]'>Total Massages</h2>
          </div>
          <TfiEmail className='w-10 h-10'/>
        </div>
        
       </div>

       <Charts/>
        




    
    </div>
  )
}

export default DashBoard