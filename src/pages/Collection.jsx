import React, { useState } from "react";
import { categories, perfumes } from "../JsFiles/Perfume";
import ProductCard from "./ProductCard";
const Collection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredPerfumes =
    activeCategory === "All"
      ? perfumes
      : perfumes.filter((perfume) => perfume.category === activeCategory);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif tracking-wide text-gray-900">
          Our Collection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-500">
          Explore our range of exquisite fragrances, each telling its own unique
          story.
        </p>
      </div>
      <div className="flex flex-wrap justify-center mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`mx-2 my-1 px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === category
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            } transition-colors`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPerfumes.map((perfume) => (
          <ProductCard key={perfume.id} perfume={perfume} />
        ))}
      </div>
      {filteredPerfumes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No perfumes found in this category.</p>
        </div>
      )}
    </div>
  );
};
export default Collection;
