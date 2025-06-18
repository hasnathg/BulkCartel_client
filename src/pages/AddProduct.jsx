import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router';


const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    image: '',
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    rating: '',
    available_quantity: '',
    minimum_selling_quantity: '',
  });


  useEffect(() => {
    document.title = 'Add Product | BulkCartel';
    fetch('https://bulk-cartel-server.vercel.app/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const newProduct = {
      ...formData,
      email: user?.email || 'unknown',
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      available_quantity: parseInt(formData.available_quantity),
      minimum_selling_quantity: parseInt(formData.minimum_selling_quantity),
    };

    try {
      const res = await fetch('https://bulk-cartel-server.vercel.app/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (res.status === 409) {
        Swal.fire({
          icon: 'warning',
          title: 'Duplicate Product',
          toast: true,
          position: 'top-end',
          timer: 4000,
          showConfirmButton: false,
        });
        return;
      }

      if (data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Product Added!',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        });
        navigate('/my-product');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

    if (loading) return <Spinner message="Loading categories..." />;


  return (
     <>
      <Helmet>
        <title>Add Product | BulkCartel</title>
      </Helmet>
      
      <section className="max-w-5xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Product</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="available_quantity"
            placeholder="Available Stock Quantity"
            value={formData.available_quantity}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <input
            type="number"
            name="minimum_selling_quantity"
            placeholder="Minimum Order Quantity"
            value={formData.minimum_selling_quantity}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="textarea textarea-bordered md:col-span-2"
            rows="4"
          ></textarea>

          <div className="md:col-span-2 flex flex-col gap-2 mt-4">
            <p className="text-sm text-gray-500">
              * Note: Minimum selling quantity applies on all wholesale listings.
            </p>
            <button type="submit" className="w-full btn bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-600 hover:to-green-800 transition">
              Add Product
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProduct;