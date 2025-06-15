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
    <div className="max-w-3xl mx-auto mt-10">
      <img src={product.image} className="w-full rounded" />
      <h2 className="text-2xl font-bold my-4">{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Minimum Quantity: {product.minimum_selling_quantity}</p>

      <button
        onClick={() => document.getElementById("buy_modal").showModal()}
        className="btn btn-primary mt-5"
      >
        Buy
      </button>

      {/* Modal */}
      <dialog id="buy_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Buy {product.name}</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>

          <div className="mt-6">
          <p className="mb-2 font-semibold">
            Select Quantity <span className="text-sm text-gray-500">(Available: {product.available_quantity})</span>
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="btn btn-outline btn-sm"
            >
              -
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

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button onClick={handleBuy} className="btn btn-success">Confirm Purchase</button>
          </div>
        </div>
      </dialog>
    </div>
    </>
  );
};

export default ProductDetails;
