import { Link, NavLink } from "react-router"; // or "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo1.JPG";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://bulk-cartel-server.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  const publicLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li tabIndex={0}>
        <details>
          <summary>Categories</summary>
          <ul className="p-2 bg-base-100 text-base-content z-50">
            {categories.map((cat) => (
              <li key={cat.name}>
                <NavLink to={`/category/${cat.name}`}>{cat.name}</NavLink>
              </li>
            ))}
          </ul>
        </details>
      </li>
      <li><NavLink to="/about">About</NavLink></li>
    </>
  );

  const protectedLinks = (
    <>
      <li><NavLink to="/all-products">All Products</NavLink></li>
      <li><NavLink to="/add-product">Add Product</NavLink></li>
      <li><NavLink to="/my-product">My Product</NavLink></li>
      <li>
        <NavLink to="/cart" aria-label="Cart" className="flex items-center gap-2">
          <FaShoppingCart size={16} />
          <span>Cart</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full bg-base-100 text-base-content shadow-md">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-3 items-center h-16">
          {/* LEFT: mobile menu + logo */}
          <div className="flex items-center gap-3">
            {/* Mobile menu (all links live here on small screens) */}
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost">Menu</label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-56"
              >
                {publicLinks}
                {user ? (
                  <>
                    <li className="menu-title mt-2">Private</li>
                    {protectedLinks}
                    <li><button onClick={logout}>Logout</button></li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="btn btn-sm btn-outline w-full">Login</Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="btn btn-sm w-full border-0 bg-gray-800 hover:bg-gray-900 text-white"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <Link to="/" className="shrink-0">
              <img
                src={logo}
                alt="BulkCartel"
                className="h-9 sm:h-10 md:h-12 w-auto object-contain rounded-lg"
              />
            </Link>
          </div>

          {/* CENTER: public links (desktop only) */}
          <div className="hidden lg:flex justify-center">
            <ul className="menu menu-horizontal gap-3">{publicLinks}</ul>
          </div>

          {/* RIGHT: auth (desktop only) */}
          <div className="hidden md:flex justify-end items-center gap-2">
            {!user ? (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-sm btn-outline w-24">Login</Link>
                <Link
                  to="/register"
                  className="btn btn-sm w-24 border-0 bg-gray-800 hover:bg-gray-900 text-white"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar tooltip tooltip-left"
                  data-tip={user.displayName || user.email}
                >
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL || "/avatar.png"} alt="User" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[100] p-2 bg-base-100 rounded-box w-56"
                >
                  <li className="px-3 py-2 text-sm opacity-70">
                    {user.displayName || user.email}
                  </li>
                  {protectedLinks}
                  <li><button onClick={logout} className="text-error">Logout</button></li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
