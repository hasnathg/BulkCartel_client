import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

const AddProduct = () => {
     const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
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
    fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const newProduct = {
      ...formData,
      available_quantity: parseInt(formData.available_quantity),
      minimum_selling_quantity: parseInt(formData.minimum_selling_quantity),
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      email: user?.email || 'unknown'
    };

    try {
      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });

      const data = await res.json();

    if (res.status === 409) {
      Swal.fire({
        icon: 'warning',
        title: 'Duplicate Product',
        toast: true,
        position: 'top-end',
        timer: 6000,
        showConfirmButton: false
    });
    return;
    }

      if (data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Product added successfully!',
          toast: true,
          position: 'top-end',
          timer: 6000,
          timerProgressBar: true,
          showConfirmButton: false
        });

        setFormData({
          name: '',
          image: '',
          available_quantity: '',
          minimum_selling_quantity: '',
          brand: '',
          category: '',
          description: '',
          price: '',
          rating: ''
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };


    return (
        <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input input-bordered"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="input input-bordered"
        />
        <input
          type="number"
          name="available_quantity"
          placeholder="Available Quantity"
          value={formData.available_quantity}
          onChange={handleChange}
          required
          className="input input-bordered"
        />
        <input
          type="number"
          name="minimum_selling_quantity"
          placeholder="Minimum Selling Quantity"
          value={formData.minimum_selling_quantity}
          onChange={handleChange}
          required
          className="input input-bordered"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand Name"
          value={formData.brand}
          onChange={handleChange}
          required
          className="input input-bordered"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="select select-bordered"
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <input
          type="number"
          step="0.1"
          name="price"
          placeholder="Price per item"
          value={formData.price}
          onChange={handleChange}
          required
          className="input input-bordered"
        />
        <input
          type="number"
          step="0.1"
          max="5"
          min="1"
          name="rating"
          placeholder="Rating (1 - 5)"
          value={formData.rating}
          onChange={handleChange}
          required
          className="input input-bordered"
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="textarea textarea-bordered md:col-span-2"
        ></textarea>

        <div className="md:col-span-2">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Note:</strong> This product will be listed for wholesale buyers only. Minimum quantity applies.
          </p>
          <button type="submit" className="btn btn-primary w-full">
            Add Product
          </button>
        </div>
      </form>
    </div>
    );
};

export default AddProduct;