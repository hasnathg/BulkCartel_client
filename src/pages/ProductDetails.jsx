import React from 'react';
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router';
import Swal from "sweetalert2";
import AuthContext from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

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
      Swal.fire("Success!", "Purchase completed.", "success");
    } else {
      Swal.fire("Error", "Not enough stock or server error.", "error");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
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
          <div className="flex items-center gap-2 mt-4">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="btn">-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="btn">+</button>
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
  );
};

export default ProductDetails;
