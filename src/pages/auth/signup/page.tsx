import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AppMode } from "@/hooks/useMode";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [step, setStep] = useState<"role" | "form">("role");
  const [role, setRole] = useState<AppMode | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoleSelect = (r: AppMode) => {
    setRole(r);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPw) { setError("Please fill in all fields."); return; }
    if (password !== confirmPw) { setError("Passwords don&apos;t match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setError("");
    setLoading(true);
    try {
      await signUp(email, password, role!);
      navigate(role === "worker" ? "/auth/setup/worker" : "/auth/setup/recruiter");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-stretch">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[520px] xl:w-[580px] flex-shrink-0 relative overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=diverse%20group%20workers%20professionals%20city%20background%20teamwork%20collaboration%20modern%20vibrant%20colorful%20gig%20economy%20startup&width=580&height=900&seq=signup-left-1&orientation=portrait"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/85 via-[#0F2152]/70 to-[#194DDC]/55"></div>
        <div className="absolute inset-0 flex flex-col justify-between p-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/landing")}>
            <div className="w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
              <i className="ri-briefcase-4-fill text-white text-lg"></i>
            </div>
            <span className="text-xl font-black text-white">DropWorks</span>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { val: "28K+", lbl: "Active Workers" },
                { val: "50K+", lbl: "Jobs Completed" },
                { val: "< 8min", lbl: "Avg. Hire Time" },
                { val: "4.9★", lbl: "Platform Rating" },
              ].map((s) => (
                <div key={s.lbl} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4">
                  <p className="text-white text-xl font-black">{s.val}</p>
                  <p className="text-white/50 text-xs">{s.lbl}</p>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm">Join the fastest growing local work marketplace.</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-8 py-12">
        <div className="w-full max-w-[440px]">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 flex items-center justify-center bg-[#194DDC] rounded-xl">
              <i className="ri-briefcase-4-fill text-white"></i>
            </div>
            <span className="text-xl font-black text-[#0F172A]">DropWorks</span>
          </div>

          {step === "role" ? (
            <>
              <h1 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-1">Join DropWorks</h1>
              <p className="text-[#6B7280] text-sm mb-8">How will you use DropWorks?</p>

              <div className="grid grid-cols-1 gap-4 mb-6">
                {/* Worker card */}
                <button
                  onClick={() => handleRoleSelect("worker")}
                  className="flex items-center gap-5 p-5 bg-white border-2 border-gray-200 hover:border-[#194DDC] rounded-2xl text-left transition-all group cursor-pointer"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#EEF2FF] group-hover:bg-[#194DDC] transition-all flex-shrink-0">
                    <i className="ri-user-smile-line text-[#194DDC] group-hover:text-white text-2xl transition-colors"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-[#0F172A] mb-1">I&apos;m a Worker</p>
                    <p className="text-[#6B7280] text-xs leading-relaxed">Find local gigs, bid on jobs, and get paid securely</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {["Flexible hours", "Instant pay", "No fees"].map((t) => (
                        <span key={t} className="text-[10px] font-semibold text-[#194DDC] bg-[#EEF2FF] rounded-full px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <i className="ri-arrow-right-line text-[#9CA3AF] group-hover:text-[#194DDC] text-lg transition-colors"></i>
                  </div>
                </button>

                {/* Recruiter card */}
                <button
                  onClick={() => handleRoleSelect("recruiter")}
                  className="flex items-center gap-5 p-5 bg-white border-2 border-gray-200 hover:border-[#194DDC] rounded-2xl text-left transition-all group cursor-pointer"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-emerald-50 group-hover:bg-emerald-500 transition-all flex-shrink-0">
                    <i className="ri-building-4-line text-emerald-600 group-hover:text-white text-2xl transition-colors"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-[#0F172A] mb-1">I&apos;m a Recruiter</p>
                    <p className="text-[#6B7280] text-xs leading-relaxed">Post jobs, review bids, and hire local talent fast</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {["Free to post", "Real-time bids", "Secure escrow"].map((t) => (
                        <span key={t} className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <i className="ri-arrow-right-line text-[#9CA3AF] group-hover:text-emerald-500 text-lg transition-colors"></i>
                  </div>
                </button>
              </div>

              <p className="text-sm text-center text-[#6B7280]">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-[#194DDC] font-semibold hover:underline">Sign in</Link>
              </p>
            </>
          ) : (
            <>
              {/* Back button */}
              <button
                onClick={() => setStep("role")}
                className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#194DDC] mb-6 cursor-pointer transition-colors"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-left-line text-base"></i>
                </div>
                Back
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${role === "worker" ? "bg-[#EEF2FF]" : "bg-emerald-50"}`}>
                  <i className={`${role === "worker" ? "ri-user-smile-line text-[#194DDC]" : "ri-building-4-line text-emerald-600"} text-lg`}></i>
                </div>
                <div>
                  <h1 className="text-xl font-black text-[#0F172A]">Create your account</h1>
                  <p className="text-xs text-[#6B7280]">Joining as a {role === "worker" ? "Worker" : "Recruiter"}</p>
                </div>
              </div>

              {/* Social login */}
              <button className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#374151] hover:bg-gray-50 transition-all cursor-pointer mb-5 whitespace-nowrap">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-[#9CA3AF] font-medium">or sign up with email</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
                  <i className="ri-error-warning-line text-red-500 text-base"></i>
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

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#374151]">Password</label>
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 gap-2 focus-within:border-[#194DDC] transition-colors">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <i className="ri-lock-line text-[#9CA3AF] text-sm"></i>
                    </div>
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="flex-1 py-3 text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none bg-transparent"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="w-4 h-4 flex items-center justify-center cursor-pointer">
                      <i className={`${showPw ? "ri-eye-off-line" : "ri-eye-line"} text-[#9CA3AF] text-sm`}></i>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#374151]">Confirm password</label>
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 gap-2 focus-within:border-[#194DDC] transition-colors">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <i className="ri-lock-2-line text-[#9CA3AF] text-sm"></i>
                    </div>
                    <input
                      type={showPw ? "text" : "password"}
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      placeholder="Repeat password"
                      className="flex-1 py-3 text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none bg-transparent"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-[#9CA3AF] leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <a href="#" rel="nofollow" className="text-[#194DDC] hover:underline">Terms of Service</a> and{" "}
                  <a href="#" rel="nofollow" className="text-[#194DDC] hover:underline">Privacy Policy</a>.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#194DDC] hover:bg-[#1340C0] disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin text-base"></i>
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <p className="text-sm text-center text-[#6B7280] mt-6">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-[#194DDC] font-semibold hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
