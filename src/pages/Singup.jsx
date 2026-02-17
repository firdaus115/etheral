import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../JsFiles/Data";

function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert("User already exists!");
      return;
    }

    users.push({
      id: String(users.length + 1),
      name: fullName,
      email: email,
      password: password,
    });

    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-white to-pink-50 p-5">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Signup
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <button
          type="submit"
          className="bg-purple-400 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-purple-500 transition-colors"
        >
          Signup
        </button>

        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
