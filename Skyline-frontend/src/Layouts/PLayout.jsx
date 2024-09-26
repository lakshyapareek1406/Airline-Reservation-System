import React from 'react'
import {Outlet} from 'react-router';

import Header from '../Components/PassengerComponennts/Header/Header';
import Footer from '../Components/PassengerComponennts/Footer/Footer';
import Dialogflow from '../Pages/Passenger/Chatbot/Dialogflow';




const VLayout = () => {
  return (
    <div>
       <Header/>
      <Outlet/>
      <Dialogflow />
      <Footer/>
     

  
     
   

    </div>
  )
}

export default VLayout