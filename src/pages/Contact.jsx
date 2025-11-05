import React, { useEffect, useState, useRef } from "react";
import { perfumes } from "../JsFiles/Perfume";
import { LiaTimesSolid } from "react-icons/lia";
import { FaChevronDown } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuUpload } from "react-icons/lu";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import { IoAlertCircleOutline } from "react-icons/io5";

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const calculatePrices = () => {
      let newSubtotal = 0;
      selectedPerfumes.forEach((item) => {
        const perfume = perfumes.find((p) => p.id === item.id);
        if (perfume) {
          newSubtotal += perfume.price * item.quantity;
        }
      });
      const newDeliveryFee = newSubtotal * 0.02;
      setSubtotal(newSubtotal);
      setDeliveryFee(newDeliveryFee);
      setTotal(newSubtotal + newDeliveryFee);

      if (paymentAmount) {
        validatePaymentAmount(paymentAmount);
      }
    };
    calculatePrices();
  }, [selectedPerfumes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePerfumeSelection = (id) => {
    setSelectedPerfumes([
      ...selectedPerfumes,
      {
        id,
        quantity: 1,
      },
    ]);
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
    if (selectedPerfumes.length > 0 && !validatePaymentAmount(paymentAmount)) {
      return;
    }

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
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setSelectedPerfumes([]);
    setBankTransferAcknowledged(false);
    setPaymentProof(null);
    setPaymentAmount("");
    setPaymentAmountValid(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              {selectedPerfumes.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Order Summary
                  </h3>
                  <div className="space-y-2">
                    {selectedPerfumes.map((item, index) => {
                      const perfume = perfumes.find((p) => p.id === item.id);
                      return (
                        <div
                          key={`summary-${item.id}-${index}`}
                          className="flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <span>{perfume?.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, -1)}
                              className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(index, 1)}
                              className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                              <FiPlus size={14} />
                            </button>
                            <span className="ml-4 w-20 text-right">
                              $
                              {perfume
                                ? (perfume.price * item.quantity).toFixed(2)
                                : "0.00"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee (2%):</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                ></textarea>
              </div>
              {selectedPerfumes.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                  <h3 className="font-medium text-amber-800 mb-2">
                    Payment Instructions
                  </h3>
                  <p className="text-amber-700 text-sm mb-2">
                    Please transfer the total amount to our bank account:
                  </p>
                  <div className="bg-white p-3 rounded border border-amber-100 text-sm">
                    <p>
                      <strong>Bank:</strong> ETHEREAL SCENT International Bank
                    </p>
                    <p>
                      <strong>Account Name:</strong> ETHEREAL SCENT Fragrances
                      Ltd
                    </p>
                    <p>
                      <strong>Account Number:</strong> 1234-5678-9012
                    </p>
                    <p>
                      <strong>IBAN:</strong> FR76 3000 6000 0123 4567 8901 234
                    </p>
                    <p>
                      <strong>Reference:</strong> Your Name + Email
                    </p>
                  </div>
                  <div className="mt-3">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={bankTransferAcknowledged}
                        onChange={() =>
                          setBankTransferAcknowledged(!bankTransferAcknowledged)
                        }
                        required
                        className="mt-1 mr-2"
                      />
                      <span className="text-sm text-amber-700">
                        I understand that I must complete the bank transfer for
                        the total amount of ${total.toFixed(2)} before my order
                        will be processed.
                      </span>
                    </label>
                  </div>
                </div>
              )}
              {selectedPerfumes.length > 0 && (
                <div className="border border-gray-300 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Payment Verification
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Please enter the exact amount you've transferred as shown on
                    your payment receipt
                  </p>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="text"
                      id="payment-amount"
                      value={paymentAmount}
                      onChange={handlePaymentAmountChange}
                      required
                      placeholder={total.toFixed(2)}
                      className={`w-full pl-8 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 
                        ${
                          paymentAmountValid === true
                            ? "border-green-500 focus:ring-green-500"
                            : paymentAmountValid === false
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-gray-500"
                        }`}
                    />
                    {paymentAmountValid !== null && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        {paymentAmountValid ? (
                          <IoMdCheckmarkCircleOutline className="h-5 w-5 text-green-500" />
                        ) : (
                          <IoAlertCircleOutline className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {paymentAmountValid === false && (
                    <p className="mt-2 text-sm text-red-600">
                      The payment amount must match the total order amount of $
                      {total.toFixed(2)}
                    </p>
                  )}
                  {paymentAmountValid === true && (
                    <p className="mt-2 text-sm text-green-600">
                      Payment amount verified! It matches your order total.
                    </p>
                  )}
                </div>
              )}
              {selectedPerfumes.length > 0 && (
                <div className="border border-gray-300 rounded-md p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Payment Proof
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Please upload a screenshot or photo of your payment receipt
                    or transfer confirmation. Accepted formats: JPG, PNG, PDF
                    (Max 5MB)
                  </p>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="payment-proof"
                      className="w-full flex flex-col items-center justify-center px-4 py-6 bg-white text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <LuUpload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-medium">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          JPG, PNG or PDF (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        id="payment-proof"
                        type="file"
                        className="hidden"
                        required
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  {fileError && (
                    <p className="mt-2 text-sm text-red-600">{fileError}</p>
                  )}
                  {paymentProof && (
                    <div className="mt-3 flex items-center bg-gray-50 p-2 rounded">
                      <div className="flex-1 truncate">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {paymentProof.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(paymentProof.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPaymentProof(null)}
                        className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
                      >
                        <LiaTimesSolid className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              <button
                type="submit"
                disabled={
                  selectedPerfumes.length === 0 ||
                  !bankTransferAcknowledged ||
                  (selectedPerfumes.length > 0 && paymentAmountValid === false)
                }
                className={`w-full px-6 py-3 rounded-md font-medium transition-colors 
                  ${
                    selectedPerfumes.length === 0 ||
                    !bankTransferAcknowledged ||
                    (selectedPerfumes.length > 0 &&
                      paymentAmountValid === false)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
              >
                Send Message
              </button>
              {selectedPerfumes.length > 0 && paymentAmountValid === false && (
                <p className="mt-2 text-sm text-center text-red-600">
                  Please verify your payment amount before submitting
                </p>
              )}
            </form>
          )}
        </div>
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
          <div className="mt-12 bg-gray-100 p-6 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Order Process
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Select your desired perfumes from the dropdown</li>
              <li>Complete the contact form with your details</li>
              <li>Review your order summary and total price</li>
              <li>Make a bank transfer using the provided details</li>
              <li>Enter the exact payment amount for verification</li>
              <li>Upload your payment receipt or confirmation</li>
              <li>Submit the form to complete your order request</li>
              <li>We'll confirm receipt and shipping details via email</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
