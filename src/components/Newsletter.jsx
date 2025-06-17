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
      className="relative bg-cover bg-center min-h-[550px] sm:min-h-[600px] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")',
      }}
    >
     
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Mail className="mx-auto text-green-400 w-10 h-10 mb-4" />
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 leading-tight">
          Join Our Business Community
        </h2>
        <p className="mb-6 text-white/90 text-lg">
          Get monthly updates, deals, and industry tips in your inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            className="w-full sm:w-[280px] px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-all font-medium"
          >
            Subscribe
          </button>
        </form>

        {/* Success Message */}
        {submitted && (
          <p className="mt-4 text-green-300 font-medium">
            Thanks for subscribing! 🌿
          </p>
        )}
      </div>
    </section>
    );
};

export default Newsletter;