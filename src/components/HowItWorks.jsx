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
    <section className="bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-green-900 mb-12">
          How It Works
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map(({ icon, title, description }, index) => (
            <motion.div
              key={index}
              className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 min-h-[280px]"
              variants={itemVariants}
            >
              <div className="text-6xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    );
};

export default HowItWorks;