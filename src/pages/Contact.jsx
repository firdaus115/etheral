
import React, { useEffect, useState, useRef, useCallback } from "react";
import { perfumes } from "../JsFiles/Perfume";
import { LiaTimesSolid } from "react-icons/lia";
import { FaChevronDown } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
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

  // 🔥 FIXED validatePaymentAmount using useCallback
  const validatePaymentAmount = useCallback(
    (value) => {
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
    },
    [total]
  );

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

  // 🔥 FIXED useEffect dependencies
  useEffect(() => {
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
  }, [selectedPerfumes, paymentAmount, validatePaymentAmount]);

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

    console.log("Form submitted");

    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
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
        Have questions or ready to place an order? Reach out to us and we'll get
        back to you shortly.
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
              Your message has been sent successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
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

            {/* EMAIL */}
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

            {/* PHONE */}
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

            {/* ADDRESS */}
            <div>
              <label
                htmlFor="address"
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

            {/* MESSAGE */}
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
                rows={4}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={
                selectedPerfumes.length === 0 ||
                !bankTransferAcknowledged ||
                (selectedPerfumes.length > 0 && paymentAmountValid === false)
              }
              className={`w-full px-6 py-3 rounded-md font-medium transition-colors ${
                selectedPerfumes.length === 0 ||
                !bankTransferAcknowledged ||
                (selectedPerfumes.length > 0 && paymentAmountValid === false)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* RIGHT SIDE INFO */}
      <div>
        <h2 className="text-xl font-medium text-gray-900 mb-6">
          Contact Information
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Email</h3>
            <p className="mt-1 text-gray-600">info@essence.com</p>
            <p className="mt-1 text-gray-600">orders@essence.com</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900">Phone</h3>
            <p className="mt-1 text-gray-600">+33 1 23 45 67 89</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900">Address</h3>
            <p className="mt-1 text-gray-600">123 Fragrance Lane</p>
            <p className="mt-1 text-gray-600">Paris, France</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default Contact;
