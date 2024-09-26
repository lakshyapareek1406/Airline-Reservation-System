import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CoverVideo from "../../Components/Common/CoverVideo";
const Help = () => {

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [subject, setesubject] = useState("");
  const [message, setmessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (email === "") {
      toast.error(<div> Email is required</div>);
    } else if (name === "") {
      toast.error(<div>  Name is required</div>);
    
    }else if (subject === "") {
      toast.error(<div>  subject is required</div>);
    
    }else if (message === "") {
      toast.error(<div>  message is required</div>);
    
    } else {
      toast.success(<div>  All fields are valid!</div>);
      // Proceed with form submission if all fields are valid
      sendData();
    }
};


  const sendData = () => {
    const newfeedback = {
      email,
      name,
      subject,
      message,
      
    };

    //Axios
    axios
      .post("http://localhost:5000/feedback/add", newfeedback)
      .then(() => {
        toast.success(<div>  Feedback Successful!</div>);
        setemail("");
        setname("");
        setesubject("");
        setmessage("");
        
        
      
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div>  Error Feedback Send</div>);
      });









    }




  
  return (
  <> 
   <div className='mt-[130px]'>
     <CoverVideo/>
   </div>


<div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2"> ⭕ How do I make a flight reservation?</h3>
          <p className="text-gray-700">  You can make a flight reservation through the airline's website, mobile app, or by calling their customer service. Many third-party travel websites also offer flight booking services.</p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2"> ⭕ Can I reserve a seat in advance?</h3>
          <p className="text-gray-700">  Yes, many airlines allow you to select seats in advance, either during the booking process or at a later time through their website or app. Some may charge an additional fee for this service.
</p>
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2"> ⭕ What Is Online Check-In? When And Whaere Can I Use It?</h3>
          <p className="text-gray-700">Online check-in means you can save time and fuss at the airport by checking in for your Emirates flight via the website prior to your arrival at the airport.</p>
          <p className="text-gray-700">Online check-in is available 48 hours before your flight's scheduled departure time. It closes 90 minutes before scheduled departure for all passengers who have an eticket.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2"> ⭕ How Do I Use Online Check-In?</h3>
          <p className="text-gray-700">In order to use online check-in, you must know the surnames of all passengers you will be checking in and have the Booking Reference/PNR from your eticket.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2"> ⭕ Can I Use Online Check-In For Other Passengers In My Travelling Party?</h3>
          <p className="text-gray-700">Yes. Online check-in is available for up to nine (5) passengers (adults and children) who are travelling together on the same booking.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2"> ⭕ If I Check In Online, When Do I Need To Arrive At The Airport?</h3>
          <p className="text-gray-700">Even when you check in online, we need to see you at the check-in desks to complete the current travel requirements.</p>
          <p className="text-gray-700">At most airports you need to arrive 3 hours before departure. However, currently it can be up to 6 hours at some airports, so please check your ticket for the best time to arrive for your journey</p>
        </div>
      </div>
    </div>

    <div className="text-3xl font-bold "  onSubmit={handleSubmit}>
      
    

    <section class="bg-white dark:bg-gray-300 transform ">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-5xl tracking-tight font-extrabold text-center text-gray-900 dark:text-black">Feedback</h2>
        <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-700 sm:text-xl">Use this form to make a complaint or to give us feedback on any of our products and services.</p>
        <form action="#" class="space-y-8"  >
          <div>
            <label for="email" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-800">Your email</label>
            <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@gmail.com" required  onChange={(e) => {
                    setemail(e.target.value);
                  }}/>
          </div>
          <div>
            <label for="name" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-800">Your Name</label>
            <input type="text" id="name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your Name" required  onChange={(e) => {
                    setname(e.target.value);
                  }}/>
          </div>
          <div>
            <label for="subject" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-800">Subject</label>
            <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required 
            onChange={(e) => {
              setesubject(e.target.value);
            }}/>
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-800">Your message</label>
            <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." onChange={(e) => {
                    setmessage(e.target.value);
                  }}></textarea>
          </div>
          <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 block mx-auto">Send message</button>

        </form>
      </div>
    </section>

    <div class="lg:flex  grid grid-cols-1 ">

   
    <section class="bg-white dark:bg-gray-100 transform flex flex-col   lg:w-1/2 basis-[170%]">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md text-center">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-black">24 Hour Contact Center</h2>
            <ul class="space-y-4">
                <li class='font-semibold text-gray-900  text-justify  '>
                    <p class='text-[15px]'>Telephone : +94117 11 1111</p>
                    <p class='text-[15px]'>WhatsApp : +94117 11 1111 (Chat only)</p>
                    <p class='text-[15px]'>Fax : +94197 33 0000</p>
                    <p class='text-[15px]'>Email : skylinecompany42@gmail.com</p>
                </li>
            </ul>
        </div>
    </section>

  
    <section class="bg-white dark:bg-gray-100 transform flex flex-col items-center lg:w-1/2">
        <div class='w-full h-64 overflow-hidden '>
            <video autoPlay muted loop class='w-80 h-80 object-cover'>
                <source src="./src/assets/bg/Contact2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    </section>

</div>







    </div></>
  );
};

export default Help;
