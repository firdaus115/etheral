import React from "react";
import { Link } from "react-router";
// import { Link } from "react-router-dom";

const ProductCard = ({ perfume }) => {
  return (
    <Link to={`/product/${perfume.id}`} className="group">
      <div className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-64 object-cover object-center group-hover:opacity-75 transition-opacity"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm text-gray-500">{perfume.brand}</h3>
          <h2 className="mt-1 font-medium text-gray-900">{perfume.name}</h2>
          <p className="mt-1 text-gray-900">${perfume.price}</p>
          <p className="mt-1 text-xs text-gray-500">{perfume.size}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;