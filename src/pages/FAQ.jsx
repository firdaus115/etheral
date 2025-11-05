import React, { useState } from "react";
import { BiArrowFromBottom, BiArrowFromTop } from "react-icons/bi";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
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

const FAQSection = ({ title, faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">{title}</h2>
      <div className="border-t border-gray-200">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  );
};
const FAQ = () => {
  const orderingFAQs = [
    {
      question: "How do I place an order?",
      answer:
        "To place an order, browse our collection, select the perfume you'd like to purchase, and click 'Order via Email'. Fill out the contact form with your details and perfume selection, and our team will contact you with availability and payment information within 24 hours.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept mainly bank transfers. Payment details will be provided before you submit your order request.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer:
        "Yes, you can modify or cancel your order before it ships. Please contact our customer service team as soon as possible at orders@essence.com with your order details.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer:
        "Yes, we offer elegant gift wrapping for an additional fee of $5. Please mention that you would like gift wrapping in the message field when placing your order.",
    },
  ];
  const deliveryFAQs = [
    {
      question: "Where do you deliver to?",
      answer:
        "We currently deliver to mostly Lagos axises. Delivery rates and delivery times vary by location. For specific information about delivery, please contact our customer service team.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Domestic delivery typically takes 1-3 business days. depending on the destination and customs processing times.",
    },
    {
      question: "Do you offer free delivery?",
      answer: "We offer free domestic delivery on orders over $150.",
    },
  ];
  const returnsFAQs = [
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of delivery for unused and unopened products in their original packaging. Please note that for hygiene reasons, we cannot accept returns of opened perfume bottles.",
    },
    {
      question: "How do I initiate a return?",
      answer:
        "To initiate a return, please email returns@essence.com with your order number and reason for the return. Our team will provide you with return instructions and address information.",
    },
    {
      question: "How long does it take to process a refund?",
      answer:
        "Once we receive and inspect your return, refunds are typically processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution.",
    },
    {
      question: "What if my product arrives damaged?",
      answer:
        "If your product arrives damaged, please contact us within 48 hours of delivery with photos of the damaged item and packaging. We will arrange for a replacement or refund as soon as possible.",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif tracking-wide text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-500">
          Find answers to common questions about our perfumes, ordering process,
          shipping, and more.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <FAQSection title="Ordering & Payment" faqs={orderingFAQs} />
        <FAQSection title="Delivery" faqs={deliveryFAQs} />
        <FAQSection title="Returns & Exchanges" faqs={returnsFAQs} />
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-xl font-medium text-gray-900 mb-4">
          Still have questions?
        </h2>
        <p className="text-gray-600 mb-6">
          If you couldn't find the answer you were looking for, please contact
          our customer service team.
        </p>
        <a
          href="/contact"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};
export default FAQ;
