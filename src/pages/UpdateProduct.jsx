import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import AuthContext from '../context/AuthContext';

const UpdateProduct = () => {
    const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    image: '',
    name: '',
    brand: '',
    category: '',
    rating: '',
    description: '',
    available_quantity: '',
    minimum_selling_quantity: ''
  });
  const [loading, setLoading] = useState(true);

  //Fetch current product info
  useEffect(() => {
  if (!token) return; // Don't fetch until token is available

  fetch(`https://bulk-cartel-server.vercel.app/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      setForm({
        image: data.image || '',
        name: data.name || '',
        brand: data.brand || '',
        category: data.category || '',
        rating: data.rating?.toString() || '',
        description: data.description || '',
        available_quantity: data.available_quantity?.toString() || '',
        minimum_selling_quantity: data.minimum_selling_quantity?.toString() || ''
      });
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      Swal.fire('Error', 'Unable to fetch product details', 'error');
      setLoading(false);
    });
}, [id, token]);
  

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = {
      image: form.image,
      name: form.name,
      brand: form.brand,
      category: form.category,
      rating: parseFloat(form.rating),
      description: form.description,
      available_quantity: parseInt(form.available_quantity, 10),
      minimum_selling_quantity: parseInt(form.minimum_selling_quantity, 10)
    };

    fetch(`https://bulk-cartel-server.vercel.app/products/update/${id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify(payload)
})
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          Swal.fire('Success', 'Product updated ✨', 'success').then(() => {
            navigate('/all-products');
          });
        } else {
          Swal.fire('Error', result.message || 'Update failed', 'error');
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire('Error', 'Server error', 'error');
      });
  };

  if (loading) return <p>Loading...</p>;

    return (
        <>
      <Helmet>
        <title>Update Product | BulkCartel</title>
      </Helmet>
       <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['image','name','brand','category','description'].map(field => (
          <div key={field}>
            <label className="block mb-1 font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full input input-bordered"
              required
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <input
            type="number"
            name="rating"
            step="0.1"
            min="1"
            max="5"
            value={form.rating}
            onChange={handleChange}
            className="w-full input input-bordered"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Available Quantity</label>
          <input
            type="number"
            name="available_quantity"
            min="0"
            value={form.available_quantity}
            onChange={handleChange}
            className="w-full input input-bordered"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Minimum Selling Quantity</label>
          <input
            type="number"
            name="minimum_selling_quantity"
            min="1"
            value={form.minimum_selling_quantity}
            onChange={handleChange}
            className="w-full input input-bordered"
            required
          />
        </div>

        <button
          type="submit"
          className="btn border-0 bg-gray-800 hover:bg-gray-900 text-white w-full"
        >
          Update Product
        </button>
      </form>
    </div>
    </>
    );
};

export default UpdateProduct;