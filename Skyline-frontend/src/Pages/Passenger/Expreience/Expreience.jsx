import React, { useState } from 'react';
import CoverVideo from '../../../Components/Common/CoverVideo';
import Economy from './Economy';
import Business from './Business';

const Experience = () => {
  const [activeSection, setActiveSection] = useState('economy');

  const renderSection = () => {
    switch (activeSection) {
      case 'economy':
        return <Economy />;
      case 'business':
        return <Business />;
      default:
        return <Economy />;
    }
  };

  return (
    <>
      <div className='mt-[130px]'>
        <CoverVideo />
      </div>

      <div className='flex justify-center mt-4'>
        <button
          className={`mx-2 px-4 py-2 ${activeSection === 'economy' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveSection('economy')}
        >
          Economy Class
        </button>
        <button
          className={`mx-2 px-4 py-2 ${activeSection === 'business' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setActiveSection('business')}
        >
          Business Class
        </button>
      </div>

      <div className='mt-4'>
        {renderSection()}
      </div>
    </>
  );
};

export default Experience;
