"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("admin_token", data.token);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#f8f5f0] p-4">
      {/* Main Login Card */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl shadow-gray-200/50 flex flex-col md:flex-row overflow-hidden relative border border-gray-100">
        
        {/* LEFT COLUMN: Branding */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-start border-r border-gray-50">
          <div className="mb-8">
  {/* Logo Container */}
  <div className="w-16 h-16 relative flex items-center justify-center overflow-hidden rounded-full border border-gray-100 shadow-sm">
    {/* When you have your logo file, 
       1. Put it in the /public folder
       2. Replace "/logo-placeholder.png" with "/your-logo.png" 
    */}
    <img
      src="/logo.png" 
      alt="Logo"
      className="w-full h-full object-contain"
      onError={(e) => {
        // This fallback stays until you add the actual image file
        e.currentTarget.src = "https://ui-avatars.com/api/?name=Abhinandan+Events&background=e11d48&color=fff";
      }}
    />
  </div>
</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sign in to Dashboard
          </h1>
          <p className="text-gray-400 font-medium">
            Use your Login Credentials
          </p>
        </div>

        {/* RIGHT COLUMN: Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-white">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                Username / Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-300"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d6e4f7] text-[#2563eb] font-bold py-4 rounded-lg hover:bg-[#c5d9f3] transition-colors disabled:opacity-50 mt-4 shadow-sm"
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </form>
        </div>

        {/* BOTTOM ACCENT BAR: Matches the Yellow-Blue-Red bar in your image */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 flex">
          <div className="h-full w-[40%] bg-[#fbbf24]"></div> {/* Yellow */}
          <div className="h-full w-[25%] bg-[#2563eb]"></div> {/* Blue */}
          <div className="h-full w-[35%] bg-[#dc2626]"></div> {/* Red */}
        </div>
      </div>
    </main>
  );
}