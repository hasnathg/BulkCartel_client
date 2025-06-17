import React from 'react';
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router';
import Swal from "sweetalert2";
import AuthContext from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import Spinner from '../components/Spinner';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`http://localhost:3000/products/${id}`)
    .then(res => res.json())
    .then(data => {
      setProduct(data);
      setLoading(false); 
    })
    .catch(err => {
      console.error("Error fetching product:", err);
      setLoading(false); 
    });
}, [id]);
if (loading) return <Spinner message="Loading product..." />;

  const handleBuy = async () => {
    if (quantity < product.minimum_selling_quantity) {
      Swal.fire("Error", `Minimum order quantity is ${product.minimum_selling_quantity}`, "error");
      return;
    }

    const res = await fetch(`http://localhost:3000/products/decrement/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    const result = await res.json();

    if (result.success) {
      
      const cartRes = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          productId: product._id,
          quantity,
          name: product.name,
          image: product.image,
          price: product.price,
          brand: product.brand,
          category: product.category,
          description: product.description
        }),
      });

      const cartResult = await cartRes.json();

      if (cartResult.success) {
        Swal.fire("Success!", "Purchase completed and added to cart.", "success");
      } else {
        Swal.fire("Purchase done, but failed to add to cart.", "", "warning");
      }
    } else {
      Swal.fire("Error", result.message || "Not enough stock or server error.", "error");
    }
  };

  if (!product) return <Spinner></Spinner>;


  return (
      <>
      <Helmet>
        <title>Product Details | BulkCartel</title>
      </Helmet>
    <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-start">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg shadow-sm object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-3">{product.description}</p>

          <ul className="space-y-2 text-sm text-gray-700 mb-6">
            <li><strong>Brand:</strong> {product.brand}</li>
            <li><strong>Category:</strong> {product.category}</li>
            <li><strong>Min Order Qty:</strong> {product.minimum_selling_quantity}</li>
            <li><strong>In Stock:</strong> {product.available_quantity}</li>
          </ul>

          <div className="text-2xl font-bold text-green-600 mb-6">${product.price}</div>

          <button
            onClick={() => document.getElementById("buy_modal").showModal()}
            className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-black transition"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Modal */}
      <dialog id="buy_modal" className="modal">
        <div className="modal-box max-w-md">
          <h3 className="text-xl font-semibold mb-2">Confirm Purchase</h3>

          <p className="mb-1"><strong>Name:</strong> {user.displayName}</p>
          <p className="mb-3"><strong>Email:</strong> {user.email}</p>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Select Quantity
              <span className="text-xs text-gray-500 ml-2">(Available: {product.available_quantity})</span>
            </label>
            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="btn btn-outline btn-sm"
              >
                −
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => {
                  if (quantity < product.available_quantity) {
                    setQuantity(quantity + 1);
                  } else {
                    Swal.fire("Info", "You've reached max available stock", "info");
                  }
                }}
                className="btn btn-outline btn-sm"
              >
                +
              </button>
            </div>
          </div>

          <div className="modal-action mt-6">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button onClick={handleBuy} className="btn btn-success">Confirm</button>
          </div>
        </div>
      </dialog>
    
    </>
  );
};

export default ProductDetails;
