import React from 'react';
import { motion } from 'framer-motion';
const partners = [
  { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { name: 'Bosch', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Bosch_logo.svg' },
  { name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/LG_logo_(2015).svg' },
  { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Sony_logo.svg' },
  { name: 'Philips', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Philips_logo.svg' },
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
            className="w-28 h-16 flex items-center justify-center"
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