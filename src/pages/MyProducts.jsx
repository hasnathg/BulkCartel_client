import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router';

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    document.title = 'My Products | BulkCartel';
    fetch(`https://bulk-cartel-server.vercel.app/products?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setProds(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user.email]);

  const handleDelete = async id => {
    const ok = await Swal.fire({
      title: 'Delete this product?',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    });
    if (!ok.isConfirmed) return;

    await fetch(`https://bulk-cartel-server.vercel.app/products/${id}`, { method: 'DELETE' });
    setProds(prev => prev.filter(p => p._id !== id));
    Swal.fire('Deleted', '', 'success');
  };

  if (loading) return <Spinner message="Loading your products..." />;

    return (
          <>
      <Helmet>
        <title>My Product | BulkCartel</title>
      </Helmet>
       <div className="max-w-4xl mx-auto py-8 px-6">
        <h2 className="text-2xl font-bold mb-4">My Products</h2>
        {prods.length === 0
          ? <p>You haven't added any products yet.</p>
          : (
            <div className="space-y-4">
              {prods.map(p => (
                <div key={p._id} className="border p-4 rounded shadow flex justify-between">
                  <div>
                    <h3 className="font-semibold">{p.name}</h3>
                    <p>Brand: {p.brand}</p>
                    <p>Category: {p.category}</p>
                    <p>Price: ${p.price}</p>
                    <p>Stock: {p.available_quantity}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => nav(`/update/${p._id}`)}
                      className="btn btn-sm btn-primary"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
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

export default MyProducts;