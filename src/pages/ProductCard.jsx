import React from 'react';
import { useNavigate } from 'react-router';
import Rating from "react-rating-stars-component";

const ProductCard = ({product}) => {
    //  console.log("Product data in ProductCard:", product);
    const navigate = useNavigate();
    return (
   
    
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="h-44 w-full object-cover rounded-md mb-4"
      />

      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>

        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Brand:</span> {product.brand}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Category:</span> {product.category}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Min Qty:</span> {product.minimum_selling_quantity}
        </p>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">${product.price}</span>
          <Rating value={product.rating} edit={false} size={20} />
        </div>

        <button
          onClick={() => navigate(`/products/${product._id}`)}
          className="mt-4 w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
    );
};

export default ProductCard;