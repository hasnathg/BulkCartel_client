import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import Spinner from '../components/Spinner';

const Cart = () => {
  const { user,token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await fetch(`https://bulk-cartel-server.vercel.app/cart/${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  if (user && token) fetchCart();
}, [user, token]);

  // Remove from cart
  const handleRemove = async (item) => {
  const confirm = await Swal.fire({
    title: 'Cancel Purchase?',
    showCancelButton: true,
    confirmButtonText: 'Yes, cancel',
  });
  if (!confirm.isConfirmed) return;

  try {
    const res = await fetch(`https://bulk-cartel-server.vercel.app/cart/${item._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      setCartItems(prev => prev.filter(i => i._id !== item._id));

      await fetch(`https://bulk-cartel-server.vercel.app/products/decrement/${item.productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: -item.quantity }),
      });

      Swal.fire('Removed', 'Purchase cancelled', 'success');
    } else {
      Swal.fire('Error', 'Failed to cancel', 'error');
    }
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'Something went wrong', 'error');
  }
};
  if (loading) return <Spinner message="Loading product..." />;

    return (
          <>
      <Helmet>
        <title>Cart | BulkCartel</title>
      </Helmet>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Purchases</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">No purchased products found.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map(item => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row gap-6 bg-white shadow-md rounded-lg p-6 border border-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-32 h-32 object-cover rounded-md"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <p><strong>Brand:</strong> {item.brand}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Qty:</strong> {item.quantity}</p>
                    <p><strong>Min Qty:</strong> {item.minimum_selling_quantity}</p>
                    <p><strong>Purchased on:</strong> {new Date(item.purchasedAt).toLocaleDateString()}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                  </div>
                </div>

                <div className="flex justify-end md:items-start">
                  <button
                    onClick={() => handleRemove(item)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
    );
};

export default Cart;