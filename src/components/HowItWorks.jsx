import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: "🏢",
    title: "Bulk Sourcing",
    description:
      "Browse verified manufacturers and distributors across multiple categories.",
  },
  {
    icon: "🔐",
    title: "Secure Checkout",
    description:
      "Clear MOQs, transparent pricing, and protected payments for peace of mind.",
  },
  {
    icon: "🚚",
    title: "Logistics & Delivery",
    description:
      "Reliable shipping coordination with lead-time visibility and tracking.",
  },
  {
    icon: "📈",
    title: "Scale with Confidence",
    description:
      "Reorder quickly, manage volumes, and streamline procurement in one place.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const HowItWorks = () => {
  return (
   return (
  <section className="w-full">
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 py-12 text-base-content">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold">How It Works</h2>
        <p className="mt-2 opacity-70">
          From discovery to delivery — designed for real wholesale volumes.
        </p>
      </div>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map(({ icon, title, description }, i) => (
          <motion.article
            key={i}
            variants={item}
            className="bg-base-100 border rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col text-center h-full"
          >
            <div className="text-5xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold leading-tight line-clamp-1 min-h-[1.75rem]">
              {title}
            </h3>
            <p className="text-sm opacity-80 mt-2 line-clamp-3 min-h-[3.25rem]">
              {description}
            </p>
            <div className="mt-auto pt-2" />
          </motion.article>
        ))}
      </motion.div>
    </div>
  </section>
  );
};

export default HowItWorks;
