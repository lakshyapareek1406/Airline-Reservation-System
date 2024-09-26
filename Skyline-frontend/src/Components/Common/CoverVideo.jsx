import React from 'react'

const CoverVideo = () => {
  return (
    <div>
  <div class='w-full h-64 overflow-hidden mt-[100px]' >
    <video autoPlay muted loop class='w-full h-full object-cover'>
        <source src="./src/assets/bg/commonCover.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
</div>


    </div>
  )
}

export default CoverVideo