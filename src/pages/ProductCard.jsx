import React from "react";
import { useNavigate } from "react-router";
import Rating from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <article className="bg-base-100 border rounded-2xl shadow-sm hover:shadow-md transition p-4 h-full flex flex-col">
      {/* uniform image height */}
      <div className="aspect-[4/3] w-full overflow-hidden rounded-md mb-4 bg-base-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-base-content leading-tight line-clamp-1 min-h-[1.75rem]">
          {product.name}
        </h3>

        <p className="text-sm text-base-content/80">
          <span className="font-medium">Brand:</span> {product.brand}
        </p>
        <p className="text-sm text-base-content/80">
          <span className="font-medium">Category:</span> {product.category}
        </p>
        <p className="text-sm text-base-content/80">
          <span className="font-medium">Min Qty:</span> {product.minimum_selling_quantity}
        </p>

        <p className="text-sm text-base-content/70 mt-2 line-clamp-2 min-h-[3.25rem]">
          {product.description || " "}
        </p>

        <div className="mt-3 flex justify-between items-center min-h-[1.5rem]">
          <span className="text-xl font-bold text-primary">${product.price}</span>
          <Rating value={product.rating} edit={false} size={20} />
        </div>

        {/* pin actions to bottom */}
        <div className="mt-auto pt-4">
          <button
            onClick={() => navigate(`/products/${product._id}`)}
            className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition text-sm font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
