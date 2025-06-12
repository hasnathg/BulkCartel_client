import React from 'react';
import { useNavigate } from 'react-router';
import Rating from "react-rating-stars-component";

const ProductCard = ({product}) => {
    const navigate = useNavigate();
    return (
        <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Brand:</strong> {product.brand}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Category:</strong> {product.category}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Min Qty:</strong> {product.minimum_selling_quantity}
        </p>
        <p className="text-sm text-gray-700 mt-1">
          {product.description?.slice(0, 60)}...
        </p>
        <p className="text-primary font-bold mt-2 text-lg">
          ${product.price}
        </p>

        <div className="mt-2">
          <Rating value={product.rating} edit={false} size={20} />
        </div>

        <button
          onClick={() => navigate(`/products/${product._id}`)}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Details
        </button>
      </div>
    </div>
    );
};

export default ProductCard;