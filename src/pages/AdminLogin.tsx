import { useState } from "react";
import { supabase } from "../lib/supabase";
import { FiLock, FiUser } from "react-icons/fi";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("❌ Invalid email or password");
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl p-8 w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-black text-white rounded-full mx-auto">
            <FiLock size={24} />
          </div>
          <h2 className="text-xl font-bold mt-2">Admin Login</h2>
          <p className="text-sm text-gray-500">Restricted access</p>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="flex items-center border rounded px-2 mt-1">
            <FiUser className="text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 outline-none bg-transparent"
              placeholder="admin@example.com"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-900 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
