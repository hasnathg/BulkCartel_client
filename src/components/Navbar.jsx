import { Link, NavLink } from "react-router";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import logo from "../assets/logo1.JPG";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  // responsive
    const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  fetch("https://bulk-cartel-server.vercel.app/categories")
    .then((res) => res.json())
    .then((data) => setCategories(data));
}, []);

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li tabIndex={0}>
  <details>
    <summary>Categories</summary>
    <ul className="p-2 bg-base-100 z-50">
      {categories.map((cat) => (
        <li key={cat.name}>
          <NavLink to={`/category/${cat.name}`}>{cat.name}</NavLink>
        </li>
      ))}
    </ul>
  </details>
</li>

      <li><NavLink to="/all-products">All Products</NavLink></li>
      <li><NavLink to="/add-product">Add Product</NavLink></li>
      <li><NavLink to="/my-product">My Product</NavLink></li>
      <li><NavLink to="/cart"><FaShoppingCart size={24} /></NavLink></li>
    </>
  );

  return (
    
    <div className="navbar bg-base-100 shadow-md px-4">

  <div className="navbar-start">
   
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {navLinks}
      </ul>
    </div>
    
    <Link to="/">
      <img src={logo} alt="logo" className="w-[180px] rounded-lg" />
    </Link>
  </div>

  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-3">{navLinks}</ul>
  </div>


  <div className="navbar-end gap-2">
    {user ? (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={user.photoURL} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[100] p-2 bg-base-100 rounded-box w-52"
        >
          <li>
            <p className="text-sm text-center">{user.displayName}</p>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    ) : (
      <div className="flex gap-2">
        <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
        <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
      </div>
    )}
  </div>
</div>

  );
};

export default Navbar;
