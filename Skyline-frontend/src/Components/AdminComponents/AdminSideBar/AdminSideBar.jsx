import React from 'react';
import { FaTachometerAlt,FaRegSun, FaChevronRight, FaWrench, FaStickyNote, FaRegChartBar, FaRegCalendarAlt } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { MdFlight,MdConnectingAirports } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMdBookmarks,IoIosPeople  } from "react-icons/io";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GiCommercialAirplane } from "react-icons/gi";
import { PiAirplaneInFlightFill } from "react-icons/pi";
import { TbTournament } from "react-icons/tb";
const AdminSideBar = () => {
  return (
    
        <div className='bg-blue-950  h-[950px] '>
         
         <div className='px-[15px] py-[30px] flex items-center   border-b-[2px] border-[#EDEDED]/[0.3] -mt-3'>
         <FaTachometerAlt  color='white ' className=' w-10 h-6 ml-3 mr-2'/>
          <a href='dashboard'>
          <p   className='text-[20px] leading-[20px]  font-bold text-white cursor-pointer'>Dashboard</p></a>
         </div>
         <div className='flex items-center  py-1   border-b-[2px] border-[#EDEDED]/[0.3]'>
         </div>

         
         
        
         
         
         <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3] ml-2 '>
          <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'>INTERFACE</p>
          <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-blue-800'>
            
            <div className='flex items-center gap-[10px] mb-1  '>
               <TbWorld color='white' className='h-6 w-8'/>
               <a href='countries'>
               <p  className='text-[14px] leading-[20px] font-normal text-white   '>Countries</p> </a>
            </div>
               <FaChevronRight color='white'/>
          </div>
          <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-blue-800'>
            <div className='flex items-center gap-[10px] mb-1'>
               <MdConnectingAirports color='white' className='h-9 w-9'/>
               <a href='manageairports'>
               <p className='text-[14px] leading-[20px] font-normal text-white'>Airports</p></a>
            </div>
            
               <FaChevronRight color='white'/>
          </div>
          <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-blue-800'>
            <div className='flex items-center gap-[10px] mb-1'>
               < GiCommercialAirplane color='white'className='h-6 w-8'/>
               <a href='manageairplane'>
               <p className='text-[14px] leading-[20px] font-normal text-white'>Manage AirPlane</p></a>
            </div>
            
               <FaChevronRight color='white'/>
          </div>
          <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-blue-800'>
            <div className='flex items-center gap-[10px] mb-1'>
               < PiAirplaneInFlightFill color='white'className='h-6 w-8'/>
               <a href='manageflight'>
               <p className='text-[14px] leading-[20px] font-normal text-white'>Manage Flights</p></a>
            </div>
            
               <FaChevronRight color='white'/>
          </div>

          <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-blue-800'>
            <div className='flex items-center gap-[10px] mb-1'>
               < TbTournament color='white'className='h-6 w-8'/>
               <a href='allTours'>
               <p className='text-[14px] leading-[20px] font-normal text-white'>Manage Tour</p></a>
            </div>
            
               <FaChevronRight color='white'/>
          </div>

          <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-blue-800'>
            <div className='flex items-center gap-[10px] mb-1'>
               <FaRegCalendarAlt color='white'className='h-6 w-8'/>
               <a href='managebooking'>
               <p className='text-[14px] leading-[20px] font-normal text-white'>Manage Booking</p></a>
            </div>
            
               <FaChevronRight color='white'/>
          </div>
          <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-blue-800'>
           <div className='flex items-center gap-[10px] mb-1'>
               <IoMdBookmarks color='white'className='h-6 w-8'/>
               <a href='userfeedback'>
               <p className='text-[14px] leading-[20px] font-normal text-white'>User Feedback</p></a>
            </div>
            
               <FaChevronRight color='white'/>
          </div>
         {/* <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-blue-800'>
            <div className='flex items-center gap-[10px] mb-1'>
               <IoIosPeople  color='white'className='h-6 w-8'/>
               <a href='managestaf'>
               <p className='text-[14px] leading-[20px] font-normal text-white'>Manage staff</p></a>
            </div>
            
               <FaChevronRight color='white' />
  </div>*/}
          <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-blue-800'>
            <div className='flex items-center gap-[10px] mb-5'>
               <BsFillPeopleFill  color='white'className='h-6 w-8'/>
               <a href='repassenger'>
               <p className='text-[14px] leading-[20px] font-normal text-white'>Registered Passengers</p></a>
            </div>
            
               <FaChevronRight color='white' className='-mt-5'/>
          </div>


         </div>


         <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3] ml-2'>
          <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'>Reports</p>
          <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-blue-800'>
            <div className='flex items-center gap-[10px]'>
               <HiOutlineDocumentReport  color='white'className='h-6 w-8'/>
               <p className='text-[14px] leading-[20px] font-normal text-white'>Report</p>
            </div>
               <FaChevronRight color='white'/>
          </div></div>


         
      </div>
 
  );
}

export default AdminSideBar;
