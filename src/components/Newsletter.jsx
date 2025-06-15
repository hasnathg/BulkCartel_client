import React, { useState } from 'react';
import { Mail,Briefcase } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
      const [submitted, setSubmitted] = useState(false);
    
      const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
            setEmail('');
          }, 3000);
        }
      };
    return (
        <section
      className="relative bg-cover bg-center min-h-[400px] text-white flex items-center justify-center"
      style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <Mail className="mx-auto text-green-300 w-10 h-10 mb-4" />
        <h2 className="text-3xl font-bold mb-3">Join Our Business Community 💼</h2>
        <p className="mb-6 text-white text-opacity-90">
          Get monthly news, exclusive offers and updates right to your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            className="w-full sm:w-auto px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Subscribe
          </button>
        </form>
        {submitted && (
          <p className="mt-4 text-green-300 font-semibold">Thanks for subscribing! 🌻</p>
        )}
      </div>
    </section>
    );
};

export default Newsletter;