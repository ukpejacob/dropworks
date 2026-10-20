import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const HIRE_TYPES = ["One-time job", "Recurring work", "Full-time role", "Emergency / urgent"];
const INDUSTRIES = ["Construction", "Cleaning", "Moving", "Landscaping", "Events", "Hospitality", "Tech Support", "Security", "Healthcare", "Retail", "Other"];

const STEPS = ["Company Info", "Hiring Needs", "Payment", "Done"];

export default function RecruiterSetupPage() {
  const navigate = useNavigate();
  const { completeSetup, user } = useAuth();
  const [step, setStep] = useState(0);

  // Step 0
  const [companyName, setCompanyName] = useState(user?.name || "");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");

  // Step 1
  const [hireTypes, setHireTypes] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState("1");
  const [monthlyBudget, setMonthlyBudget] = useState("");

  // Step 2
  const [cardName, setCardName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleHireType = (t: string) => {
    setHireTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  };

  const nextStep = () => {
    setError("");
    if (step === 0) {
      if (!companyName.trim() || !city.trim()) { setError("Please fill in company name and city."); return; }
    }
    if (step === 1) {
      if (hireTypes.length === 0) { setError("Please select at least one hiring type."); return; }
    }
    setStep((s) => s + 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    completeSetup({ name: companyName || contactName, role: "recruiter", setupComplete: true });
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[520px]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 flex items-center justify-center bg-[#194DDC] rounded-xl">
            <i className="ri-briefcase-4-fill text-white"></i>
          </div>
          <span className="text-lg font-black text-[#0F172A]">DropWorks</span>
          <span className="ml-auto text-xs text-[#9CA3AF] font-medium">Recruiter Setup</span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 transition-all ${
                    i < step
                      ? "bg-emerald-500 text-white"
                      : i === step
                      ? "bg-[#194DDC] text-white"
                      : "bg-gray-200 text-[#9CA3AF]"
                  }`}
                >
                  {i < step ? <i className="ri-check-line text-xs"></i> : i + 1}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap hidden sm:block ${i === step ? "text-[#0F172A]" : "text-[#9CA3AF]"}`}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-1 ${i < step ? "bg-emerald-400" : "bg-gray-200"}`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          {/* Step 0: Company Info */}
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black text-[#0F172A] mb-1">Tell us about your business</h2>
                <p className="text-[#6B7280] text-sm">Workers use this to verify you&apos;re a trusted recruiter</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <i className="ri-error-warning-line text-red-500"></i>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0 border-2 border-dashed border-emerald-200 cursor-pointer hover:bg-emerald-50/80 transition-colors">
                  <i className="ri-building-4-line text-emerald-500 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">Add company logo</p>
                  <p className="text-xs text-[#9CA3AF]">Recruiters with logos get more trust from workers</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#374151]">Company / Business name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Brooklyn Renovations LLC"
                  className="w-full py-3 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#194DDC] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#374151]">Your name (contact person)</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Sarah Kim"
                  className="w-full py-3 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#194DDC] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#374151]">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full py-3 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#194DDC] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#374151]">City <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. New York, NY"
                    className="w-full py-3 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#194DDC] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#374151]">Industry</label>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setIndustry(ind)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                        industry === ind
                          ? "bg-[#194DDC] text-white"
                          : "bg-[#F1F5F9] text-[#374151] hover:bg-[#E2E8F0]"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Hiring Needs */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black text-[#0F172A] mb-1">What kind of hiring do you do?</h2>
                <p className="text-[#6B7280] text-sm">We&apos;ll optimize your experience based on this</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <i className="ri-error-warning-line text-red-500"></i>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {HIRE_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleHireType(t)}
                    className={`flex items-center justify-center py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer text-center ${
                      hireTypes.includes(t)
                        ? "border-[#194DDC] bg-[#EEF2FF] text-[#194DDC]"
                        : "border-gray-200 text-[#374151] hover:border-gray-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#374151]">How many workers do you typically hire per job?</label>
                <div className="flex gap-2">
                  {["1", "2–5", "6–15", "15+"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setTeamSize(s)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all cursor-pointer whitespace-nowrap ${
                        teamSize === s
                          ? "border-[#194DDC] bg-[#EEF2FF] text-[#194DDC]"
                          : "border-gray-200 text-[#6B7280] hover:border-gray-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#374151]">Estimated monthly hiring budget (USD)</label>
                <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 gap-2 focus-within:border-[#194DDC] transition-colors">
                  <span className="text-[#9CA3AF] text-sm">$</span>
                  <input
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                    placeholder="e.g. 2000"
                    className="flex-1 py-3 text-sm outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black text-[#0F172A] mb-1">Add a payment method</h2>
                <p className="text-[#6B7280] text-sm">Used for escrow — funds only release when you confirm the job is done</p>
              </div>

              <div className="flex items-center gap-2 bg-[#EEF2FF] border border-[#194DDC]/20 rounded-xl px-4 py-3">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-keyhole-line text-[#194DDC] text-base"></i>
                </div>
                <p className="text-[#194DDC] text-xs font-medium">Protected by DropWorks Escrow — you&apos;re charged only when work is confirmed complete</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#374151]">Cardholder name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name on card"
                    className="w-full py-3 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#194DDC] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#374151]">Card number</label>
                  <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 gap-3 focus-within:border-[#194DDC] transition-colors">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                      <i className="ri-bank-card-line text-[#9CA3AF] text-sm"></i>
                    </div>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      className="flex-1 py-3 text-sm outline-none bg-transparent placeholder:text-[#9CA3AF]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#374151]">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      maxLength={7}
                      className="w-full py-3 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#194DDC] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#374151]">CVV</label>
                    <input
                      type="text"
                      placeholder="•••"
                      maxLength={4}
                      className="w-full py-3 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#194DDC] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full py-3 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#374151] font-semibold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                Skip for now — add later
              </button>
            </div>
          )}

          {/* Step 3: Done */}
          {step === 3 && (
            <div className="flex flex-col items-center text-center gap-4 py-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-50">
                <i className="ri-check-line text-emerald-500 text-3xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0F172A] mb-2">
                  Welcome, {companyName || contactName || "there"}!
                </h2>
                <p className="text-[#6B7280] text-sm leading-relaxed max-w-sm">
                  Your recruiter account is live. Post your first job and receive real-time bids from nearby workers.
                </p>
              </div>
              <div className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 text-left mt-2">
                <p className="text-xs font-bold text-[#374151] mb-3">What&apos;s next</p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: "ri-file-list-3-line", color: "text-[#194DDC]", text: "Post your first job — it only takes 60 seconds" },
                    { icon: "ri-auction-line", color: "text-yellow-500", text: "Watch bids come in live from verified workers" },
                    { icon: "ri-shield-check-line", color: "text-emerald-500", text: "Hire with confidence — escrow protects every payment" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className={`${item.icon} ${item.color} text-base`}></i>
                      </div>
                      <p className="text-sm text-[#374151] leading-snug">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            {step > 0 && step < 3 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex-1 py-3 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#374151] font-semibold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                Back
              </button>
            )}
            {step < 3 && (
              <button
                onClick={nextStep}
                className="flex-1 py-3 bg-[#194DDC] hover:bg-[#1340C0] text-white font-bold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                Continue <i className="ri-arrow-right-line ml-1"></i>
              </button>
            )}
            {step === 3 && (
              <button
                onClick={handleFinish}
                disabled={loading}
                className="w-full py-3 bg-[#194DDC] hover:bg-[#1340C0] disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-loader-4-line animate-spin"></i>
                    Setting up...
                  </span>
                ) : (
                  <>
                    <i className="ri-add-circle-line mr-2"></i>
                    Post My First Job
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
