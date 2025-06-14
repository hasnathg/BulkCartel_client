import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/cart/${user.email}`)
      .then(res => res.json())
      .then(data => setCartItems(data));
  }, [user]);

  const handleRemove = async (item) => {
    const confirm = await Swal.fire({
      title: 'Cancel Purchase?',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel',
    });
    if (!confirm.isConfirmed) return;

    const res = await fetch(`http://localhost:3000/cart/${item._id}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      setCartItems(prev => prev.filter(i => i._id !== item._id));
      await fetch(`http://localhost:3000/products/decrement/${item.productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: -item.quantity })
      });
      Swal.fire('Removed', 'Purchase cancelled', 'success');
    } else {
      Swal.fire('Error', 'Failed to cancel', 'error');
    }
  };

    return (
       <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-semibold mb-6">Purchased Details</h2>
      {cartItems.length === 0
        ? <p>No purchased products.</p>
        : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="flex items-center bg-white p-4 rounded shadow">
                <img src={item.image} className="h-20 w-20 object-cover rounded" alt={item.name}/>
                <div className="flex-1 ml-4">
                  <h3 className="font-bold">{item.name}</h3>
                  <p>Category: {item.category}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Date of purchased: {new Date(item.purchasedAt).toLocaleDateString()}</p>
                  <p>Brand: {item.brand}</p>
                  <p>Minimum selling quantity: {item.minimum_selling_quantity}</p>
                  <p>Description: {item.description}</p>
                </div>
                <button onClick={() => handleRemove(item)} className="btn btn-danger btn-sm">Cancel</button>
              </div>
            ))}
          </div>
        )}
    </div>
    );
};

export default Cart;