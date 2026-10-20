import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email address."); return; }
    setError("");
    setLoading(true);
    // Simulate sending reset email
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => navigate("/landing")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-[#194DDC] rounded-xl">
              <i className="ri-briefcase-4-fill text-white"></i>
            </div>
            <span className="text-xl font-black text-[#0F172A]">DropWorks</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          {!submitted ? (
            <>
              {/* Back */}
              <button
                onClick={() => navigate("/auth/login")}
                className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#194DDC] mb-6 cursor-pointer transition-colors"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-left-line text-base"></i>
                </div>
                Back to login
              </button>

              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#EEF2FF] mb-4">
                  <i className="ri-key-2-line text-[#194DDC] text-2xl"></i>
                </div>
                <h1 className="text-2xl font-black text-[#0F172A] mb-2">Forgot password?</h1>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  No worries! Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
                  <i className="ri-error-warning-line text-red-500"></i>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#194DDC] hover:bg-[#1340C0] disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin text-base"></i>
                      Sending reset link...
                    </span>
                  ) : (
                    <>
                      <i className="ri-send-plane-line mr-2"></i>
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-50">
                <i className="ri-mail-check-line text-emerald-500 text-3xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0F172A] mb-2">Check your inbox!</h2>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  We sent a password reset link to<br />
                  <strong className="text-[#0F172A]">{email}</strong>
                </p>
              </div>
              <div className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 text-left">
                <p className="text-xs font-bold text-[#374151] mb-2">Didn&apos;t get the email?</p>
                <ul className="flex flex-col gap-1.5">
                  {["Check your spam / junk folder", "Make sure the email address is correct", "The link expires in 15 minutes"].map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-xs text-[#6B7280]">
                      <div className="w-3 h-3 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-information-line text-[#9CA3AF] text-xs"></i>
                      </div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-[#194DDC] hover:underline font-medium cursor-pointer"
              >
                Resend email
              </button>
              <Link
                to="/auth/login"
                className="w-full py-3 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#374151] font-semibold text-sm rounded-xl transition-all text-center whitespace-nowrap"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>

        <p className="text-xs text-center text-[#9CA3AF] mt-6">
          Remembered it?{" "}
          <Link to="/auth/login" className="text-[#194DDC] font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
