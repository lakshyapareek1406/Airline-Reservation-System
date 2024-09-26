import React from 'react'
import {Outlet} from'react-router';
import AdminHeader from '../Components/AdminComponents/AdminHeader/AdminHeader';
import AdminSideBar from '../Components/AdminComponents/AdminSideBar/AdminSideBar';
const ALayout = () => {
  return (
    <div className='flex'>
      {/*
     */}

      <div className='basis-[12%] h-screen '>
      <AdminSideBar/>
      </div>
      <div className='basis-[88%] border '>
      <AdminHeader/>
      <Outlet />
      </div>
     </div>
  )
}

export default ALayout