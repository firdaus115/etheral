import React from "react";
// import { useParams, Link } from "react-router-dom";
import { perfumes } from "../JsFiles/Perfume";
import { Link, useParams } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();
  const perfume = perfumes.find((p) => p.id === id);

  if (!perfume) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-medium text-gray-900">
          Product not found
        </h2>
        <p className="mt-2 text-gray-600">
          The perfume you're looking for doesn't exist.
        </p>
        <Link
          to="/collection"
          className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
        >
          Return to collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div>
          <div className="mb-2">
            <Link
              to="/collection"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Collection
            </Link>
          </div>

          <h1 className="text-2xl font-medium text-gray-900 mt-4">
            {perfume.name}
          </h1>
          <p className="text-lg text-gray-500 mt-1">{perfume.brand}</p>

          <div className="mt-6">
            <h2 className="text-xl font-medium text-gray-900">
              ${perfume.price}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{perfume.size}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-gray-600">{perfume.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Notes</h3>
            <p className="mt-2 text-gray-600">{perfume.details}</p>
          </div>

          <div className="mt-8">
            <Link
              to="/contact"
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              Order via Email
            </Link>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Category</h3>
            <p className="mt-2 text-gray-600">{perfume.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
