import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <div >

        


<footer class="bg-white dark:bg-gray-800 ">
    <div class="mx-auto w-full max-w-screen-xl p-3 py-6 lg:py-3">
        <div class="md:flex md:justify-between">
          <div class="mb-4 md:mb-0 ">
              <a  class="flex items-center">
                  <img src="./src/assets/logo/new logo.png" class="h-20 w-20 me-6  " alt="Skyline Logo" />
                  <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Skyline</span>
            
              </a>
              
          </div>
          <div class="grid grid-cols-2 gap-7 sm:gap-8 sm:grid-cols-5 ml-6">
          <div>
                  <h2 class="mb-6 text-s,m  font-semibold text-gray-900 uppercase dark:text-white">PLAN & BOOK</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <a href="book" class="hover:underline">Booking</a>
                      </li>
                      <li>
                          <a href="flightlist" class="hover:underline">FlightList</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Experience</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <a href="expreience" class="hover:underline">Economy class</a>
                      </li>
                      <li>
                          <a href="expreience" class="hover:underline">business class</a>
                      </li>
                  </ul>
              </div>
             
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <a href="help" class="hover:underline">Contact</a>
                      </li>
                      <li>
                          <a href="help" class="hover:underline">FAQ</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">About Us</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-9">
                      <a href="about" class="hover:underline ">About Us</a>
                         
                      </li>
                      <li class="mb-4">
                          
                      </li>
                     
                  </ul>
              </div>
          </div>
      </div>



      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="home" class="hover:underline">Skyline™</a>. All Rights Reserved.
          </span>

          
          <div class="flex mt-4 sm:justify-center sm:mt-0">
            <h3 className='text-white mr-4 '>FOLLOW US</h3>
              <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <svg class="w-6 h-6 mr-" aria-hidden="true"  fill="currentColor" >
                  <FaFacebook />
                    </svg>
                  <span class="sr-only">Facebook page</span>
              </a>


              <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <svg class="w-6 h-6 mr-" aria-hidden="true"  fill="currentColor" >
                  <FaInstagram />
                    </svg>
                  <span class="sr-only">Facebook page</span>
              </a>


              <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <svg class="w-6 h-6 mr-" aria-hidden="true"  fill="currentColor" >
                  <FaXTwitter />
                    </svg>
                  <span class="sr-only">Twitter</span>
              </a>


              <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <svg class="w-6 h-6 mr-" aria-hidden="true"  fill="currentColor" >
                  <FaYoutube />
                    </svg>
                  <span class="sr-only">Youtube</span>
              </a>

             
          </div>
      </div>
    </div>
</footer>

















    </div>
  )
}

export default Footer