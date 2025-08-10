// src/components/Footer.jsx
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.JPG";

export default function Footer() {
  return (
    <footer className="w-full bg-base-200 text-base-content mt-20">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <img src={logo} alt="BulkCartel" className="h-10 w-auto rounded mb-4 object-contain" />
            </Link>
            <p className="opacity-80">
              BulkCartel is your global partner in wholesale sourcing and distribution.
            </p>
          </div>

          {/* Quick Links (internal links via <Link>) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-primary" to="/">Home</Link></li>
              <li><Link className="hover:text-primary" to="/about">About</Link></li>
              <li><Link className="hover:text-primary" to="/login">Login</Link></li>
              <li><Link className="hover:text-primary" to="/register">Register</Link></li>
            </ul>
          </div>

          {/* Protected shortcuts (optional to show even if they redirect to login) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Buyer Tools</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-primary" to="/all-products">All Products</Link></li>
              <li><Link className="hover:text-primary" to="/add-product">Add Product</Link></li>
              <li><Link className="hover:text-primary" to="/my-product">My Product</Link></li>
              <li><Link className="hover:text-primary" to="/cart">Cart</Link></li>
            </ul>
          </div>

          {/* Categories (link to category routes; encode spaces) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Top Categories</h3>
            <ul className="space-y-2 opacity-90">
              <li>
                <Link className="hover:text-primary" to={`/category/${encodeURIComponent("Electronics & Gadgets")}`}>
                  Electronics &amp; Gadgets
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={`/category/${encodeURIComponent("Home & Kitchen Appliances")}`}>
                  Home Appliances
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={`/category/${encodeURIComponent("Fashion & Apparel")}`}>
                  Fashion &amp; Apparel
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={`/category/${encodeURIComponent("Industrial Machinery & Tools")}`}>
                  Industrial Machinery
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to={`/category/${encodeURIComponent("Office Supplies & Stationery")}`}>
                  Office Supplies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 opacity-90">
              <li>
                <a href="mailto:support@bulkcartel.com" className="hover:text-primary">
                  support@bulkcartel.com
                </a>
              </li>
              <li>
                <a href="tel:+447802320986" className="hover:text-primary">
                  +44 7802 320986
                </a>
              </li>
            </ul>

            <h4 className="mt-5 mb-3 font-semibold">Follow Us</h4>
            <div className="flex gap-4 text-2xl opacity-80">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 ring-primary/40 rounded"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 ring-primary/40 rounded"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 ring-primary/40 rounded"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 ring-primary/40 rounded"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* bottom line */}
        <div className="mt-10 border-t border-base-300 pt-6 text-center text-sm opacity-70">
          © {new Date().getFullYear()} BulkCartel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
