import { Link, NavLink } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import logo from "../assets/logo1.JPG"

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/category">Categories</NavLink></li>
      <li><NavLink to="/all-products">All Products</NavLink></li>
      <li><NavLink to="/add-product">Add Product</NavLink></li>
      <li><NavLink to="/my-product">My Product</NavLink></li>
      <li><NavLink to="/cart"><FaShoppingCart /></NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
        <div className="flex flex-1">
            <div >
                <img src={logo} alt="logo" style={{ width: '220px', borderRadius: '8px' }}   />
            </div>

         {/* <div >
        <Link to="/" className="text-xl font-bold text-primary">Bulk Cartel</Link>
      </div> */}
        </div>
     
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-3">{navLinks}</ul>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-box w-52">
              <li><p className="text-sm text-center">{user.displayName}</p></li>
              <li><button onClick={logOut}>Logout</button></li>
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
