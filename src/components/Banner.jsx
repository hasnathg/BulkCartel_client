import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { Link } from 'react-router';


const slides = [
  {
    
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Summer sale- 30% off ',
    button: 'Join Now'
  },
  {
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=1505&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Best wholesale product of this year',
    button: 'Get Started'
  },
  {
    image: 'https://images.unsplash.com/photo-1593344484962-796055d4a3a4?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Best gadgets with lowest price',
    button: 'Explore more'
  },
];

const Banner = () => {
    return (
       <div className="relative max-w-screen-xl mx-auto mt-5">
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        className="rounded-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-[400px] md:h-[500px] bg-center bg-cover rounded-xl flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className=" bg-opacity-50 p-8 rounded-lg text-center text-white max-w-lg mx-auto">
               
                 <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
             
               <Link to="/login"><button className="bg-green-500 px-6 py-2 rounded shadow">{slide.button}</button></Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

   
    </div>
    );
};

export default Banner;