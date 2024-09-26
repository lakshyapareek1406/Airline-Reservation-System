import React from 'react';
import Search from './Search';
import Info from './info';

import {motion,spring} from 'framer-motion'



const Home = () => {

  
  return (
    <div className="mt-48  ">
  
        
      {/*
      <div className="text-center gap-8 flex-col relative ">
        <div className="text-black font-semibold text-6xl leading-10">
        <motion.h1
         initial={{ y: "2rem", opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{
         duration: 2,
          type: "spring"
          }}
>
  FLY BETTER with
</motion.h1>
      <motion.h1 className='mt-9'
       initial={{ y: "2rem", opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{
       duration: 2,
        type: "spring"
        }}
      
      >SKYLINE AIRLINE</motion.h1> 
          
        </div>
        </div>  */}
        <motion.div 
         initial={{ x: "2rem", opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{
         duration: 2,
          type: "spring"
          }}>
        <div class=" w-3/4 mx-auto justify-center relative rounded-full mt-14 ">
          <div class=" w-11/12 mx-auto flex justify-center" >  
            <video src="./src/assets/plane/HOME1~2.mp4" autoPlay muted loop class="rounded-full" > <div class="relative "><h1>fposdjfosdgjs</h1></div>   </video>
          </div>
          
          <img src="./src/assets/plane/airplane-png-27957.png" class="absolute w-full -top-5" alt="Airplane" data-aos="zoom-in" data-aos-duration='1600' ></img> 
        </div>

        </motion.div>
     
       <Search  />


         <Info/> 
      

      </div>
    
  );
};

export default Home;
