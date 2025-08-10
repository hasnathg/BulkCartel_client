import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.JPG";

const Footer = () => {
  return (
  
    <footer className="w-full max-w-screen-xl mx-auto px-4 md:px-6 bg-gradient-to-tr from-green-50 to-green-100 text-gray-800 py-12 mt-20 border-t border-gray-300 font-semibold">
     
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        
       
        <div>
          <img src={logo} alt="Logo" className="w-44 mb-4 rounded" />
          <p className="text-base leading-relaxed text-gray-700">
            Bulk Cartel is your global partner in wholesale sourcing and distribution.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-900">Quick Links</h3>
          <ul className="space-y-2 text-base">
            <li><a className="hover:text-green-600" href="/">Home</a></li>
            <li><a className="hover:text-green-600" href="/all-products">All Products</a></li>
            <li><a className="hover:text-green-600" href="/add-product">Add Product</a></li>
            <li><a className="hover:text-green-600" href="/my-product">My Product</a></li>
            <li><a className="hover:text-green-600" href="/cart">Cart</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-900">Top Categories</h3>
          <ul className="space-y-2 text-base text-gray-700">
            <li>Electronics & Gadgets</li>
            <li>Home Appliances</li>
            <li>Fashion & Apparel</li>
            <li>Industrial Machinery</li>
            <li>Office Supplies</li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-900">Contact Us</h3>
          <p className="text-base text-gray-700">📧 support@bulkcartel.com</p>
          <p className="text-base text-gray-700">📞 +07802320986</p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-900">Follow Us</h3>
          <div className="flex gap-4 text-2xl text-gray-600">
            <a href="https://www.facebook.com/" className="hover:text-blue-600"><FaFacebookF /></a>
            <a href="https://x.com/" className="hover:text-sky-500"><FaTwitter /></a>
            <a href="https://www.instagram.com/" className="hover:text-pink-600"><FaInstagram /></a>
            <a href="https://www.linkedin.com/" className="hover:text-blue-800"><FaLinkedin /></a>
          </div>
        </div>
      </div>

     
      <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500 px-4">
        © {new Date().getFullYear()} Bulk Cartel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
