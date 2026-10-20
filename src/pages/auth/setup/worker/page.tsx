import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const SKILL_OPTIONS = [
  "Electrical", "Plumbing", "Carpentry", "Painting", "Moving & Hauling",
  "Cleaning", "Landscaping", "HVAC", "Roofing", "Tiling",
  "Welding", "Locksmith", "Handyman", "Delivery", "IT Support",
  "Security", "Catering", "Event Setup", "Childcare", "Pet Care",
];

const STEPS = ["Profile Info", "Skills", "Availability", "Done"];

export default function WorkerSetupPage() {
  const navigate = useNavigate();
  const { completeSetup, user } = useAuth();
  const [step, setStep] = useState(0);

  // Step 0 — Profile Info
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [bioLen, setBioLen] = useState(0);

  // Step 1 — Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState("");

  // Step 2 — Availability
  const [days, setDays] = useState<string[]>([]);
  const [timeSlot, setTimeSlot] = useState("anytime");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleSkill = (s: string) => {
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const toggleDay = (d: string) => {
    setDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  };

  const nextStep = () => {
    setError("");
    if (step === 0) {
      if (!name.trim() || !city.trim()) { setError("Please fill in your name and city."); return; }
    }
    if (step === 1) {
      if (selectedSkills.length === 0) { setError("Please select at least one skill."); return; }
    }
    if (step === 2) {
      if (days.length === 0) { setError("Please select at least one available day."); return; }
    }
    setStep((s) => s + 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    completeSetup({
      name,
      role: "worker",
      setupComplete: true,
    });
    // simulate a brief loading state
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    navigate("/");
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[520px]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 flex items-center justify-center bg-[#194DDC] rounded-xl">
            <i className="ri-briefcase-4-fill text-white"></i>
          </div>
          <span className="text-lg font-black text-[#0F172A]">DropWorks</span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center gap-2 flex-1 ${i < STEPS.length - 1 ? "" : ""}`}>
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

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          {/* Step 0: Profile info */}
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black text-[#0F172A] mb-1">Set up your worker profile</h2>
                <p className="text-[#6B7280] text-sm">This helps recruiters find and trust you</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <i className="ri-error-warning-line text-red-500"></i>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Avatar placeholder */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0 border-2 border-dashed border-[#194DDC]/30 cursor-pointer hover:bg-[#EEF2FF]/80 transition-colors">
                  <i className="ri-camera-line text-[#194DDC] text-xl"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">Add profile photo</p>
                  <p className="text-xs text-[#9CA3AF]">Profiles with photos get 3x more views</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#374151]">Full name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marcus Johnson"
                  className="w-full py-3 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none focus:border-[#194DDC] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#374151]">Phone number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full py-3 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none focus:border-[#194DDC] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#374151]">City / Neighborhood <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Brooklyn, NY"
                  className="w-full py-3 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none focus:border-[#194DDC] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#374151]">Short bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => { setBio(e.target.value.slice(0, 300)); setBioLen(e.target.value.length); }}
                  placeholder="Tell recruiters a bit about yourself and your experience..."
                  rows={3}
                  className="w-full py-3 px-4 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none focus:border-[#194DDC] transition-colors resize-none"
                />
                <p className="text-[10px] text-[#9CA3AF] self-end">{bioLen}/300</p>
              </div>
            </div>
          )}

          {/* Step 1: Skills */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black text-[#0F172A] mb-1">What are your skills?</h2>
                <p className="text-[#6B7280] text-sm">Select all that apply — you can edit anytime</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <i className="ri-error-warning-line text-red-500"></i>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSkill(s)}
                    className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      selectedSkills.includes(s)
                        ? "bg-[#194DDC] text-white"
                        : "bg-[#F1F5F9] text-[#374151] hover:bg-[#E2E8F0]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#374151]">Hourly rate (USD)</label>
                <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 gap-2 focus-within:border-[#194DDC] transition-colors">
                  <span className="text-[#9CA3AF] text-sm">$</span>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="e.g. 35"
                    min="0"
                    className="flex-1 py-3 text-sm text-[#0F172A] placeholder:text-[#9CA3AF] outline-none bg-transparent"
                  />
                  <span className="text-[#9CA3AF] text-sm">/hr</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Availability */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black text-[#0F172A] mb-1">When are you available?</h2>
                <p className="text-[#6B7280] text-sm">This helps match you with the right jobs</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <i className="ri-error-warning-line text-red-500"></i>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-[#374151] mb-3">Available days <span className="text-red-400">*</span></p>
                <div className="flex flex-wrap gap-2">
                  {weekDays.map((d) => (
                    <button
                      key={d}
                      onClick={() => toggleDay(d)}
                      className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        days.includes(d)
                          ? "bg-[#194DDC] text-white"
                          : "bg-[#F1F5F9] text-[#374151] hover:bg-[#E2E8F0]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#374151] mb-3">Preferred time</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "morning", label: "Morning", sub: "6am – 12pm", icon: "ri-sun-foggy-line" },
                    { val: "afternoon", label: "Afternoon", sub: "12pm – 6pm", icon: "ri-sun-line" },
                    { val: "evening", label: "Evening", sub: "6pm – 10pm", icon: "ri-moon-line" },
                    { val: "anytime", label: "Anytime", sub: "Flexible", icon: "ri-time-line" },
                  ].map((t) => (
                    <button
                      key={t.val}
                      onClick={() => setTimeSlot(t.val)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        timeSlot === t.val
                          ? "border-[#194DDC] bg-[#EEF2FF]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className={`${t.icon} text-lg ${timeSlot === t.val ? "text-[#194DDC]" : "text-[#9CA3AF]"}`}></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F172A]">{t.label}</p>
                        <p className="text-[10px] text-[#9CA3AF]">{t.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Done */}
          {step === 3 && (
            <div className="flex flex-col items-center text-center gap-4 py-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-50">
                <i className="ri-check-line text-emerald-500 text-3xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0F172A] mb-2">You&apos;re all set, {name || "there"}!</h2>
                <p className="text-[#6B7280] text-sm leading-relaxed max-w-sm">
                  Your worker profile is ready. Start browsing jobs near you and place your first bid.
                </p>
              </div>
              <div className="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 text-left mt-2">
                <p className="text-xs font-bold text-[#374151] mb-3">Your profile summary</p>
                <div className="flex flex-col gap-2">
                  {[
                    { icon: "ri-user-line", label: name || "—" },
                    { icon: "ri-map-pin-line", label: city || "—" },
                    { icon: "ri-tools-line", label: selectedSkills.slice(0, 3).join(", ") || "—" },
                    { icon: "ri-calendar-line", label: days.join(", ") || "—" },
                  ].map((item) => (
                    <div key={item.icon} className="flex items-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                        <i className={`${item.icon} text-[#194DDC] text-sm`}></i>
                      </div>
                      <span className="text-sm text-[#374151]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className={`flex gap-3 mt-6 ${step > 0 && step < 3 ? "flex-row" : ""}`}>
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
                    <i className="ri-map-pin-2-line mr-2"></i>
                    Browse Jobs Near Me
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
