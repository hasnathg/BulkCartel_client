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
        <section className="bg-gray-50 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Trusted Partners</h2>
      <motion.div
        className="flex justify-center items-center flex-wrap gap-12 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {partners.map(({ name, logo }, index) => (
          <motion.div
            key={index}
            className="w-36 h-36 flex items-center justify-center"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <img src={logo} alt={name} className="max-h-12 object-contain" />
          </motion.div>
        ))}
      </motion.div>
    </section>
    );
};

export default TrustedPartners;