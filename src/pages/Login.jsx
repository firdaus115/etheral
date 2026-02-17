import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../JsFiles/Data";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      alert("Invalid email or password!");
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 via-white to-yellow-50 p-5">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <button
          type="submit"
          className="bg-pink-400 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-pink-500 transition-colors"
        >
          Login
        </button>

        <p className="text-center text-gray-500">
          No account?{" "}
          <a href="/signup" className="text-pink-400 hover:underline">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
