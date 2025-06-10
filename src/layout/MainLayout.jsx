import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            
            <main className="min-h-[80vh] px-4 md:px-8 py-6 bg-gray-50">
            <Outlet></Outlet>
            </main>
            
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;