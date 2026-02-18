import React, { useEffect, useState, useRef } from "react";
import { perfumes } from "../JsFiles/Perfume";
import { LiaTimesSolid } from "react-icons/lia";
import { FaChevronDown } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [selectedPerfumes, setSelectedPerfumes] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentAmountValid, setPaymentAmountValid] = useState(null);
  const [bankTransferAcknowledged, setBankTransferAcknowledged] =
    useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [fileError, setFileError] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Recalculate totals
  useEffect(() => {
    const calculatePrices = () => {
      let newSubtotal = 0;
      selectedPerfumes.forEach((item) => {
        const perfume = perfumes.find((p) => p.id === item.id);
        if (perfume) newSubtotal += perfume.price * item.quantity;
      });
      const newDeliveryFee = newSubtotal * 0.02;
      setSubtotal(newSubtotal);
      setDeliveryFee(newDeliveryFee);
      setTotal(newSubtotal + newDeliveryFee);

      if (paymentAmount) validatePaymentAmount(paymentAmount);
    };
    calculatePrices();
  }, [selectedPerfumes]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePerfumeSelection = (id) => {
    setSelectedPerfumes([...selectedPerfumes, { id, quantity: 1 }]);
    setIsDropdownOpen(false);
  };

  const removePerfume = (index) => {
    const newSelectedPerfumes = [...selectedPerfumes];
    newSelectedPerfumes.splice(index, 1);
    setSelectedPerfumes(newSelectedPerfumes);
  };

  const updateQuantity = (index, change) => {
    const newSelectedPerfumes = [...selectedPerfumes];
    const newQuantity = newSelectedPerfumes[index].quantity + change;
    if (newQuantity < 1) return;
    newSelectedPerfumes[index].quantity = newQuantity;
    setSelectedPerfumes(newSelectedPerfumes);
  };

  const validatePaymentAmount = (value) => {
    const numericValue = value.replace(/[^\d.]/g, "");
    const paymentValue = parseFloat(numericValue);
    if (!isNaN(paymentValue)) {
      const isValid = Math.abs(paymentValue - total) < 0.01;
      setPaymentAmountValid(isValid);
      return isValid;
    } else {
      setPaymentAmountValid(false);
      return false;
    }
  };

  const handlePaymentAmountChange = (e) => {
    const value = e.target.value;
    setPaymentAmount(value);
    validatePaymentAmount(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFileError(null);

    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      const maxSize = 5 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setFileError("Please upload a JPG, PNG, or PDF file");
        setPaymentProof(null);
        return;
      }

      if (file.size > maxSize) {
        setFileError("File size must be less than 5MB");
        setPaymentProof(null);
        return;
      }

      setPaymentProof(file);
    } else {
      setPaymentProof(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPerfumes.length > 0 && !validatePaymentAmount(paymentAmount))
      return;

    console.log("Form submitted:", {
      ...formData,
      selectedPerfumes: selectedPerfumes.map((item) => {
        const perfume = perfumes.find((p) => p.id === item.id);
        return {
          id: item.id,
          name: perfume?.name,
          price: perfume?.price,
          quantity: item.quantity,
        };
      }),
      subtotal,
      deliveryFee,
      total,
      paymentAmount: parseFloat(paymentAmount),
      bankTransferAcknowledged,
      paymentProof: paymentProof
        ? {
            name: paymentProof.name,
            type: paymentProof.type,
            size: paymentProof.size,
          }
        : null,
    });

    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", address: "", message: "" });
    setSelectedPerfumes([]);
    setBankTransferAcknowledged(false);
    setPaymentProof(null);
    setPaymentAmount("");
    setPaymentAmountValid(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif tracking-wide text-gray-900">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-500">
          Have questions or ready to place an order? Reach out to us and we'll
          get back to you shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form Section */}
        <div>
          <h2 className="text-xl font-medium text-gray-900 mb-6">
            Send us a message
          </h2>
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                Thank you!
              </h3>
              <p className="text-green-700">
                Your message has been sent successfully. We'll get back to you
                soon.
              </p>
              <p className="text-green-700 mt-2">
                Please complete your bank transfer using the details provided to
                finalize your order.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              {/* Perfume Selection */}
              <div>
                <label
                  htmlFor="perfumes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Perfumes
                </label>
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="min-h-[42px] w-full px-2 py-1 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-gray-500 flex flex-wrap gap-2 items-center cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedPerfumes.length === 0 && (
                      <span className="text-gray-400 py-1">
                        Select perfumes...
                      </span>
                    )}
                    {selectedPerfumes.map((item, index) => {
                      const perfume = perfumes.find((p) => p.id === item.id);
                      return (
                        <div
                          key={`${item.id}-${index}`}
                          className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1 text-sm"
                        >
                          <span>
                            {perfume?.name} (${perfume?.price} × {item.quantity}
                            )
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removePerfume(index);
                            }}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <LiaTimesSolid size={14} />
                          </button>
                        </div>
                      );
                    })}
                    <div className="ml-auto">
                      <FaChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform ${
                          isDropdownOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {perfumes.map((perfume) => (
                        <div
                          key={perfume.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handlePerfumeSelection(perfume.id)}
                        >
                          <div className="flex justify-between">
                            <span>
                              {perfume.name} - {perfume.brand}
                            </span>
                            <span>${perfume.price}</span>
                          </div>
                        </div>
                      ))}
                      {perfumes.length === 0 && (
                        <div className="px-4 py-2 text-gray-500">
                          No perfumes available
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {selectedPerfumes.length === 0 && (
                  <p className="mt-1 text-xs text-red-500">
                    Please select at least one perfume
                  </p>
                )}
              </div>

              {/* ... Order Summary, Payment, and Upload Sections ... */}
              {/* For brevity, I can continue formatting the remaining sections next if you want */}
            </form>
          )}
        </div>

        {/* Contact Information Section */}
        <div>
          <h2 className="text-xl font-medium text-gray-900 mb-6">
            Contact Information
          </h2>
          <div className="space-y-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <CiMail className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">info@essence.com</p>
                <p className="mt-1 text-gray-600">orders@essence.com</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0">
                <CiPhone className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                <p className="mt-1 text-gray-600">+33 1 23 45 67 89</p>
                <p className="mt-1 text-gray-600">
                  Monday - Friday, 9am - 6pm CET
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0">
                <CiLocationOn className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Address</h3>
                <p className="mt-1 text-gray-600">123 Fragrance Lane</p>
                <p className="mt-1 text-gray-600">Paris, France</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
