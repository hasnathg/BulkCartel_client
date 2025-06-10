import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.JPG";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 px-4 mt-16 border-gray-300">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">

        <div className="flex flex-col items-start">
          <img
            src={logo}
            alt="Logo"
            className="w-54 h-auto mb-2"
          />
          <p className="text-sm text-gray-500">
            Bulk Cartel for global wholesale buying and selling.
          </p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a className="link link-hover" href="/">Home</a></li>
            <li><a className="link link-hover" href="/all-products">All Products</a></li>
            <li><a className="link link-hover" href="/add-product">Add Product</a></li>
            <li><a className="link link-hover" href="/my-product">My Product</a></li>
            <li><a className="link link-hover" href="/cart">Cart</a></li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <ul className="space-y-1">
            <li>Electronics & Gadgets</li>
            <li>Home Appliances</li>
            <li>Fashion & Apparel</li>
            <li>Industrial Machinery</li>
            <li>Office Supplies</li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Email: support@bulcartel.com</p>
          <p>Phone: +7802320986</p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Bulk Cartel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
