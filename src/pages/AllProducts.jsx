import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import Spinner from '../components/Spinner';
import AuthContext from '../context/AuthContext';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [viewMode, setViewMode] = useState("card");
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://bulk-cartel-server.vercel.app/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
          setDisplayedProducts(data);
        } else {
          console.error("Unexpected data:", data);
          setProducts([]);
          setDisplayedProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, [token]);

  const handleFilterToggle = () => {
    const filtered = filterActive
      ? products
      : products.filter(p => p.minimum_selling_quantity > 100);

    setFilterActive(!filterActive);
    setDisplayedProducts(filtered);
  };

  const handleViewChange = (e) => setViewMode(e.target.value);

  if (loading) return <Spinner message="Loading all products..." />;



    return (
        <>
      <Helmet>
        <title>All Products | BulkCartel</title>
      </Helmet>
        <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        
        <div className="flex gap-4">
          {/* Filter */}
          <button onClick={handleFilterToggle} className="btn btn-secondary">
            {filterActive ? "Show All" : "Show Available Products"}
          </button>

          {/* Toggle Dropdown */}
          <select
            onChange={handleViewChange}
            value={viewMode}
            className="select select-bordered"
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>
      </div>

      {/* Conditional Views */}
      {viewMode === "card" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map(product => (
            <div key={product._id} className="card bg-base-100 shadow-xl">
              <figure className="h-48 bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>Brand: {product.brand}</p>
                <p>Category: {product.category}</p>
                <p>Rating: {product.rating}</p>
                <p>Available: {product.available_quantity}</p>
                <p>Min Order Qty: {product.minimum_selling_quantity}</p>

                <div className="card-actions justify-end">
                  <Link to={`/update/${product._id}`} className="btn btn-sm btn-primary">
                    Update
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Available</th>
                <th>Min Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map(product => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.rating}</td>
                  <td>{product.available_quantity}</td>
                  <td>{product.minimum_selling_quantity}</td>
                  <td>
                    <Link to={`/update/${product._id}`} className="btn btn-xs btn-primary">
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
    );
};

export default AllProducts;