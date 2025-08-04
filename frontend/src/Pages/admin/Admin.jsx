
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '@/components/SideBar';

const Admin = () => {
  return (
    <div className='flex min-h-screen pt-16'>
      <SideBar />
      <main className='flex-1 bg-gray-100 p-4'>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
