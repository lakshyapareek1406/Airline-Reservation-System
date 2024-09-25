import React from 'react'

import Routers from './router/Routers';



import { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';





export const App = () => {

  useEffect(()=>{
    Aos.init();
  },[]);
  return (

    
    <div >
      
      <Routers/>
      
      
    

    </div>
  )
}

export default App;