
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

  return <div>Your existing JSX stays exactly the same here.</div>;
};

export default Contact;
