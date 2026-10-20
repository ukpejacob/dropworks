import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CtaSection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const body = new URLSearchParams({ email });
    await fetch("https://readdy.ai/api/form/d7keim89tv6a23o164i0", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=urban%20cityscape%20night%20aerial%20bokeh%20lights%20abstract%20geometric%20dark%20modern%20minimal%20professional&width=1440&height=600&seq=cta-bg-1&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#0A1628]/90"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        <span className="text-[#6B9EFF] text-xs font-bold tracking-widest uppercase mb-4 block">Ready to start?</span>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-5">
          Your next job is{" "}
          <span className="text-[#6DB3FF]">minutes away.</span>
        </h2>
        <p className="text-white/60 text-base md:text-lg mb-10 max-w-xl mx-auto">
          Join 28,000+ workers and recruiters who are already using DropWorks to get things done faster.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => navigate("/auth/signup")}
            className="w-full sm:w-auto px-8 py-4 bg-[#194DDC] hover:bg-[#1340C0] text-white font-bold text-base rounded-2xl transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-user-smile-line mr-2"></i>
            Join as a Worker
          </button>
          <button
            onClick={() => navigate("/auth/signup")}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-bold text-base rounded-2xl transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-building-4-line mr-2"></i>
            Hire Workers Now
          </button>
        </div>

        {/* Newsletter */}
        <div className="max-w-md mx-auto">
          <p className="text-white/40 text-xs mb-3">Or get notified when new jobs launch in your city</p>
          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-green-400 font-semibold text-sm">
              <i className="ri-checkbox-circle-fill text-lg"></i>
              You&apos;re on the list! We&apos;ll reach out soon.
            </div>
          ) : (
            <form
              data-readdy-form
              id="newsletter-form"
              onSubmit={handleSubmit}
              className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-1.5 gap-2"
            >
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address..."
                className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm px-4 outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#194DDC] hover:bg-[#1340C0] text-white text-sm font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
