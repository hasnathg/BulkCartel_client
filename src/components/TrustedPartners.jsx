// src/components/TrustedPartners.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const partners = [
  { name: "Samsung", logo: "https://i.ibb.co/0V2jrFrD/samsung-JPG.jpg" },
  { name: "Bosch",   logo: "https://i.ibb.co/nqVgSyPg/bosch.jpg" },
  { name: "LG",      logo: "https://i.ibb.co/Ng8gj69C/LG.jpg" },
  { name: "Sony",    logo: "https://i.ibb.co/B5YkJVTJ/sony.jpg" },
  { name: "Philips", logo: "https://i.ibb.co/N6R4yMsY/phillips.jpg" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function TrustedPartners() {
  return (
    <section className="w-full bg-base-200">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">Trusted Partners</h2>
          <p className="mt-2 opacity-70">
            We collaborate with leading global manufacturers and distributors.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-stretch justify-items-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {partners.map(({ name, logo }, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group bg-base-100 border rounded-2xl shadow-sm hover:shadow-md transition p-4 w-full max-w-[160px] aspect-square flex items-center justify-center"
              title={name}
            >
              <img
                src={logo}
                alt={name}
                className="max-h-12 md:max-h-14 object-contain grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA (optional) */}
        <div className="mt-10 flex justify-center">
          <Link to="/register" className="btn btn-outline">
            Become a Supplier
          </Link>
        </div>
      </div>
    </section>
  );
}
