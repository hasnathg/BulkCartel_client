import React from 'react';
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const Spinner = ({ message = "Loading..." }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <div className="w-40 h-40">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
    );
};

export default Spinner;