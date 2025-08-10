import React, { useState } from "react";
import { Mail, Briefcase } from "lucide-react";
import { Link } from "react-router";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section
      className="relative w-full max-w-screen-xl mx-auto px-4 md:px-6 px-4 py-12 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")',
      }}
    >
      {/* DARK overlay so the image doesn't wash out */}
      <div className="absolute inset-0 bg-black/55 mix-blend-multiply" />

      <div className="relative w-full max-w-screen-xl mx-auto px-4 md:px-6 py-12">
        <div className="min-h-[360px] sm:min-h-[420px] grid place-items-center">
          <div className="max-w-3xl w-full text-center">
            <Mail className="mx-auto w-10 h-10 mb-3 text-accent" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Join Our Business Community
            </h2>
            <p className="mt-2 text-white/90">
              Get monthly updates, bulk deals, and procurement tips in your inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <input
                type="email"
                required
                autoComplete="email"
                aria-label="Email address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full sm:w-[300px] bg-base-100"
              />
              <button type="submit" className="btn btn-accent">
                Subscribe
              </button>
            </form>

            {submitted && (
              <p className="mt-3 text-green-300 font-medium" role="status" aria-live="polite">
                Thanks for subscribing! 🌿
              </p>
            )}

            <div className="mt-6 flex items-center justify-center gap-2">
              <Briefcase className="w-4 h-4 text-white/90" />
              <p className="text-white/90 text-sm">
                Are you a supplier?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  List your products with BulkCartel
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
