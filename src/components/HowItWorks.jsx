import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: '🏢',
    title: 'Bulk Sourcing Made Easy',
    description: 'Connect with verified wholesalers and manufacturers worldwide.'
  },
  {
    icon: '🔐',
    title: 'Secure Payments',
    description: 'Safe, secure payment gateways with buyer protection.'
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Integrated logistics ensuring on-time shipments.'
  },
  {
    icon: '📈',
    title: 'Grow Your Business',
    description: 'Track orders and manage bulk purchases seamlessly.'
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const HowItWorks = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {steps.map(({ icon, title, description }, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
    );
};

export default HowItWorks;