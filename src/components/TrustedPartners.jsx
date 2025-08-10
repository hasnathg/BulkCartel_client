import React from 'react';
import { motion } from 'framer-motion';
const partners = [
  { name: 'Samsung', logo: 'https://i.ibb.co/0V2jrFrD/samsung-JPG.jpg' },
  { name: 'Bosch', logo: 'https://i.ibb.co/nqVgSyPg/bosch.jpg' },
  { name: 'LG', logo: 'https://i.ibb.co/Ng8gj69C/LG.jpg' },
  { name: 'Sony', logo: 'https://i.ibb.co/B5YkJVTJ/sony.jpg' },
  { name: 'Philips', logo: 'https://i.ibb.co/N6R4yMsY/phillips.jpg' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const TrustedPartners = () => {
    return (


    <section className="relative w-full max-w-screen-xl mx-auto px-4 md:px-6 bg-gradient-to-br from-slate-100 via-blue-50 to-white
 py-12 -mt-10 z-10 overflow-hidden">
 
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-[-1]">
    <svg className="relative block w-[calc(100%+1.3px)] h-20" viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="#f0fdf4" />
    </svg>
  </div>

  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center text-green-900 mb-12">Trusted Partners</h2>

    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {partners.map(({ name, logo }, index) => (
        <motion.div
          key={index}
          className="bg-white shadow-md rounded-xl p-4 w-32 h-32 flex items-center justify-center transition-transform duration-300 hover:shadow-xl"
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
        >
          <img
            src={logo}
            alt={name}
            className="max-h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
          />
        </motion.div>
      ))}
    </motion.div>
  </div>

  {/* Bottom Wave */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-[-1] rotate-180">
    <svg className="relative block w-[calc(100%+1.3px)] h-20" viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="#f0fdf4" />
    </svg>
  </div>
</section>

    
    );
};

export default TrustedPartners;