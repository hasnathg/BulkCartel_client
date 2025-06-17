import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

const NotFound = () => {
    return (
          <>
      <Helmet>
        <title>404 | BulkCartel</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
        <img 
          src="https://i.ibb.co/0jsqVNcp/404.jpg" 
          alt="Not Found" 
          className="w-80 h-auto mb-6"
        />
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Looks like the bulk deal you're searching for doesn’t exist.
        </p>
        
        <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition duration-300">
          Back to Home
        </Link>
      </div>
        </>
    );
};

export default NotFound;