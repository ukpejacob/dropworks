import { useState } from "react";

const workerSteps = [
  {
    num: "01",
    icon: "ri-map-pin-2-line",
    title: "Browse Jobs Near You",
    desc: "Open the app and instantly see live gigs within your radius — sorted by distance, pay, and urgency. No profile needed to start browsing.",
    img: "https://readdy.ai/api/search-image?query=mobile%20app%20map%20interface%20showing%20nearby%20job%20locations%20pins%20modern%20UI%20clean%20minimal%20dark%20mode%20gig%20economy%20app&width=480&height=360&seq=hiw-worker-1&orientation=landscape",
  },
  {
    num: "02",
    icon: "ri-send-plane-line",
    title: "Place a Bid",
    desc: "See a job you like? Swipe right or tap to place your bid. Set your price, add a quick note, and it's live to the recruiter instantly.",
    img: "https://readdy.ai/api/search-image?query=person%20on%20smartphone%20placing%20bid%20gig%20work%20app%20swipe%20modern%20tech%20urban%20setting%20clean%20background&width=480&height=360&seq=hiw-worker-2&orientation=landscape",
  },
  {
    num: "03",
    icon: "ri-shield-check-line",
    title: "Get Hired & Get Paid",
    desc: "If accepted, head to the job. Once done, payment is released instantly from secure escrow directly to your DropWorks wallet.",
    img: "https://readdy.ai/api/search-image?query=worker%20completing%20job%20satisfied%20happy%20payment%20confirmation%20mobile%20screen%20gig%20economy%20success%20moment&width=480&height=360&seq=hiw-worker-3&orientation=landscape",
  },
];

const recruiterSteps = [
  {
    num: "01",
    icon: "ri-file-list-3-line",
    title: "Post Your Job",
    desc: "Describe what you need, set a budget, and drop a pin on the map. Live in under 60 seconds.",
    img: "https://readdy.ai/api/search-image?query=recruiter%20posting%20job%20online%20form%20laptop%20office%20professional%20minimal%20clean%20modern%20interface&width=480&height=360&seq=hiw-recruiter-1&orientation=landscape",
  },
  {
    num: "02",
    icon: "ri-group-line",
    title: "Review Bids Live",
    desc: "Watch bids roll in from nearby workers in real-time. Browse profiles, ratings, and portfolios before deciding.",
    img: "https://readdy.ai/api/search-image?query=recruiter%20reviewing%20worker%20profiles%20bids%20dashboard%20modern%20app%20interface%20hiring%20decision%20professional&width=480&height=360&seq=hiw-recruiter-2&orientation=landscape",
  },
  {
    num: "03",
    icon: "ri-hand-coin-line",
    title: "Hire & Pay Safely",
    desc: "Hire with one tap. Funds go into secure escrow and are only released when you confirm the job is done.",
    img: "https://readdy.ai/api/search-image?query=employer%20confirming%20job%20completion%20payment%20release%20escrow%20satisfaction%20app%20confirmation%20screen%20professional&width=480&height=360&seq=hiw-recruiter-3&orientation=landscape",
  },
];

export default function HowItWorks() {
  const [tab, setTab] = useState<"worker" | "recruiter">("worker");
  const steps = tab === "worker" ? workerSteps : recruiterSteps;

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#194DDC] text-xs font-bold tracking-widest uppercase">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mt-2 mb-4">Zero friction. Real results.</h2>
          <p className="text-[#6B7280] text-base md:text-lg max-w-xl mx-auto">
            Whether you&apos;re looking for work or need work done — DropWorks gets it sorted in minutes.
          </p>

          {/* Tab switch */}
          <div className="inline-flex items-center bg-[#F1F5F9] rounded-full p-1 mt-8">
            <button
              onClick={() => setTab("worker")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                tab === "worker" ? "bg-[#194DDC] text-white shadow-sm" : "text-[#6B7280] hover:text-[#0F172A]"
              }`}
            >
              <i className="ri-user-smile-line mr-1.5"></i> I&apos;m a Worker
            </button>
            <button
              onClick={() => setTab("recruiter")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                tab === "recruiter" ? "bg-[#194DDC] text-white shadow-sm" : "text-[#6B7280] hover:text-[#0F172A]"
              }`}
            >
              <i className="ri-building-4-line mr-1.5"></i> I&apos;m a Recruiter
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-col group">
              {/* Image */}
              <div className="w-full h-48 md:h-52 rounded-2xl overflow-hidden mb-5">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Step number */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl font-black text-[#194DDC]/15 leading-none">{step.num}</span>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#194DDC]/10">
                  <i className={`${step.icon} text-[#194DDC] text-base`}></i>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex flex-1 items-center justify-end">
                    <div className="h-px flex-1 bg-gradient-to-r from-[#194DDC]/20 to-transparent"></div>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">{step.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
