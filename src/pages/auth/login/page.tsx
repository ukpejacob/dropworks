import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-stretch">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-[520px] xl:w-[580px] flex-shrink-0 relative overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=urban%20workers%20collaboration%20team%20cityscape%20abstract%20dark%20navy%20professional%20gig%20economy%20modern%20art%20minimal%20background&width=580&height=900&seq=auth-left-1&orientation=portrait"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/85 via-[#0F2152]/70 to-[#194DDC]/60"></div>
        <div className="absolute inset-0 flex flex-col justify-between p-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
              <i className="ri-briefcase-4-fill text-white text-lg"></i>
            </div>
            <span className="text-xl font-black text-white">DropWorks</span>
          </div>
          {/* Quote */}
          <div>
            <blockquote className="text-white/80 text-lg font-medium leading-relaxed mb-6">
              &ldquo;Had my first job booked within 20 minutes. The escrow payment system means I never have to worry about getting paid.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <img
                src="https://readdy.ai/api/search-image?query=male%20construction%20worker%20headshot%20professional%20confident%20smiling&width=44&height=44&seq=auth-quote-face&orientation=squarish"
                alt="Marcus"
                className="w-11 h-11 rounded-full object-cover object-top border-2 border-white/30"
              />
              <div>
                <p className="text-white font-semibold text-sm">Marcus J.</p>
                <p className="text-white/50 text-xs">Electrician · 60 jobs completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-8 py-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 flex items-center justify-center bg-[#194DDC] rounded-xl">
              <i className="ri-briefcase-4-fill text-white"></i>
            </div>
            <span className="text-xl font-black text-[#0F172A]">DropWorks</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-1">Welcome back</h1>
          <p className="text-[#6B7280] text-sm mb-8">Sign in to continue to DropWorks</p>

          {/* Social login */}
          <button className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#374151] hover:bg-gray-50 transition-all cursor-pointer mb-5 whitespace-nowrap">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-[#9CA3AF] font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
              <i className="ri-error-warning-line text-red-500 text-base"></i>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#374151]">Email address</label>
              <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 gap-2 focus-within:border-[#194DDC] transition-colors">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-[#9CA3AF] text-sm"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 py-3 text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#374151]">Password</label>
                <Link to="/auth/forgot-password" className="text-xs text-[#194DDC] hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 gap-2 focus-within:border-[#194DDC] transition-colors">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <i className="ri-lock-line text-[#9CA3AF] text-sm"></i>
                </div>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 py-3 text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="w-4 h-4 flex items-center justify-center cursor-pointer"
                >
                  <i className={`${showPw ? "ri-eye-off-line" : "ri-eye-line"} text-[#9CA3AF] text-sm`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#194DDC] hover:bg-[#1340C0] disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-all cursor-pointer mt-1 whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin text-base"></i>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-sm text-center text-[#6B7280] mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/auth/signup" className="text-[#194DDC] font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
