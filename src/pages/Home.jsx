import React, { useState } from "react";
import { Link } from "react-router";
import perfume from "../image/perfume.webp";
import { perfumes } from "../JsFiles/Perfume";
import ProductCard from "./ProductCard";
import { BiArrowFromBottom, BiArrowFromTop } from "react-icons/bi";

const HomePageFAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-2 text-left focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        {isOpen ? (
          <BiArrowFromTop className="h-5 w-5 text-gray-500" />
        ) : (
          <BiArrowFromBottom className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 px-2">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const featuredPerfumes = perfumes.filter((perfume) => perfume.featured);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const homeFaqs = [
    {
      question: "How do I place an order?",
      answer:
        "To place an order, browse our collection, select the perfume you'd like to purchase, and click 'Order via Email'. Fill out the contact form with your details and perfume selection, and our team will contact you with availability and payment information within 24 hours.",
    },
    {
      question: "Do you offer free delivery?",
      answer: "We offer free domestic delivery on orders over $150.",
    },
    {
      question: "What if my product arrives damaged?",
      answer:
        "If your product arrives damaged, please contact us within 48 hours of delivery with photos of the damaged item and packaging. We will arrange for a replacement or refund as soon as possible.",
    },
  ];
  return (
    <div className='w-full'>
      <section className='relative bg-gray-900 text-white'>
        <div className='absolute inset-0 overflow-hidden'>
          <img
            src={perfume}
            alt='Luxury perfume bottles'
            className='w-full h-full object-cover opacity-50'
          />
        </div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48'>
          <div className='max-w-3xl'>
            <h1 className='text-4xl md:text-5xl font-serif font-light tracking-wide mb-4'>
              Discover Your Signature Scent
            </h1>
            <p className='text-lg mb-8'>
              Exquisite fragrances crafted with the finest ingredients, designed to evoke emotion
              and create lasting memories.
            </p>
            <Link
              to='/collection'
              className='inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors'
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-serif tracking-wide text-gray-900'>Featured Fragrances</h2>
          <p className='mt-4 max-w-2xl mx-auto text-gray-500'>
            Our most coveted scents, carefully selected for their unique character and exceptional
            quality.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {featuredPerfumes.map((perfume) => (
            <ProductCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
        <div className='mt-12 text-center'>
          <Link
            to='/collection'
            className='inline-block border border-gray-900 text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-900 hover:text-white transition-colors'
          >
            View All Perfumes
          </Link>
        </div>
      </section>
      <section className='bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            <div>
              <h2 className='text-3xl font-serif tracking-wide text-gray-900 mb-6'>
                Crafted with Passion
              </h2>
              <p className='text-gray-600 mb-4'>
                At ETHEREAL SCENT, we believe that a fragrance is more than just a scent—it's an
                expression of personality, a trigger for memories, and a statement of style.
              </p>
              <p className='text-gray-600 mb-6'>
                Each of our perfumes is meticulously crafted by master perfumers using the finest
                ingredients sourced from around the world, creating unique compositions that tell a
                story.
              </p>
              <Link to='/about' className='text-gray-900 font-medium hover:underline'>
                Discover Our Story
              </Link>
            </div>
            <div className='relative h-96'>
              <img
                src='https://images.unsplash.com/photo-1596742578443-7682ef5251cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                alt='Perfume making'
                className='absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg'
              />
            </div>
          </div>
        </div>
      </section>
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-serif tracking-wide text-gray-900'>Common Questions</h2>
          <p className='mt-4 max-w-2xl mx-auto text-gray-500'>
            Find quick answers to our most frequently asked questions.
          </p>
        </div>
        <div className='max-w-3xl mx-auto border-t border-gray-200'>
          {homeFaqs.map((faq, index) => (
            <HomePageFAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaqIndex === index}
              onClick={() => toggleFaq(index)}
            />
          ))}
        </div>
        <div className='mt-10 text-center'>
          <Link
            to='/faq'
            className='inline-flex items-center text-gray-900 font-medium hover:underline'
          >
            View all FAQs
            <svg
              className='ml-2 w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};
export default Home;
