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
    fetch('http://localhost:3000/categories')
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
      const res = await fetch('http://localhost:3000/products', {
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
     <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Add a Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Inputs */}
          <input name="name" placeholder="Name" value={formData.name}
            onChange={handleChange} required className="input input-bordered" />
          <input name="image" placeholder="Image URL" value={formData.image}
            onChange={handleChange} required className="input input-bordered" />
          <input name="brand" placeholder="Brand" value={formData.brand}
            onChange={handleChange} required className="input input-bordered" />
          <select name="category" value={formData.category} onChange={handleChange}
            required className="select select-bordered">
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <input name="available_quantity" type="number" placeholder="Stock Quantity"
            value={formData.available_quantity} onChange={handleChange}
            required className="input input-bordered" />
          <input name="minimum_selling_quantity" type="number" placeholder="Min Order Qty"
            value={formData.minimum_selling_quantity} onChange={handleChange}
            required className="input input-bordered" />
          <input name="price" type="number" step="0.01" placeholder="Price"
            value={formData.price} onChange={handleChange}
            required className="input input-bordered" />
          <input name="rating" type="number" min="1" max="5" step="0.1"
            placeholder="Rating" value={formData.rating}
            onChange={handleChange} required className="input input-bordered" />
          <textarea name="description" placeholder="Description"
            value={formData.description} onChange={handleChange}
            required className="textarea textarea-bordered md:col-span-2" />

          {/* Submit */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              * Wholesale platform: Minimum quantity applies.
            </p>
            <button type="submit" className="btn btn-primary w-full">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;