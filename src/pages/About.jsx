import React from "react";
import { Link } from "react-router";
const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif tracking-wide text-gray-900">
          About ETHEREAL SCENT
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-500">
          Our journey, our passion, and our commitment to creating extraordinary
          fragrances.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2025, ETHEREAL SCENT was born from a passion for fine
            fragrances and a desire to create scents that evoke emotion and
            capture memories. Our founder, Sophie Laurent, a third-generation
            perfumer, began creating unique compositions in her small Parisian
            workshop.
          </p>
          <p className="text-gray-600">
            What started as a boutique perfumery has grown into a respected name
            in the world of niche fragrances, with our creations now cherished
            by fragrance enthusiasts around the globe. Despite our growth, we
            remain committed to our founding principles: quality, creativity,
            and authenticity.
          </p>
        </div>
        <div className="relative h-96">
          <img
            src="https://images.unsplash.com/photo-1585652757141-8837d676fac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Perfume workshop"
            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-900">Our Philosophy</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-sm mb-4">
              <span className="text-2xl font-light">01</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Quality</h3>
            <p className="text-gray-600">
              We source only the finest ingredients from around the world,
              ensuring each fragrance is of exceptional quality.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-sm mb-4">
              <span className="text-2xl font-light">02</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Artistry</h3>
            <p className="text-gray-600">
              Each perfume is a work of art, meticulously crafted by our master
              perfumers to create unique and evocative compositions.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-sm mb-4">
              <span className="text-2xl font-light">03</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Sustainability
            </h3>
            <p className="text-gray-600">
              We are committed to ethical sourcing and sustainable practices,
              respecting both nature and the communities we work with.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-900">
            Our Craftsmanship
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative h-96">
            <img
              src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Perfume ingredients"
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <p className="text-gray-600 mb-4">
              Creating a fine fragrance is a delicate art that requires
              expertise, patience, and an exceptional sense of smell. Our
              perfumers spend years training their noses to identify thousands
              of different scents and understand how they interact with each
              other.
            </p>
            <p className="text-gray-600 mb-4">
              Each ETHEREAL SCENT perfume begins with an inspiration—a memory, a
              place, an emotion. From there, our perfumers carefully select
              ingredients and blend them in precise proportions to create a
              harmonious composition. This process often involves hundreds of
              iterations before the perfect formula is achieved.
            </p>
            <p className="text-gray-600">
              Once the formula is finalized, the fragrance is aged to allow the
              ingredients to fully blend and mature, resulting in a rich,
              complex scent that evolves beautifully on the skin.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          Experience ETHEREAL SCENT
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          We invite you to explore our collection and discover the perfect
          fragrance that speaks to you.
        </p>
        <Link
          to="/collection"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
        >
          Explore Our Collection
        </Link>
      </div>
    </div>
  );
};
export default About;
