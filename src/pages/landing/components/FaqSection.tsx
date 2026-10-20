import { useState } from "react";

const workerFaqs = [
  {
    q: "How do I start getting jobs on DropWorks?",
    a: "Create your free account, complete your profile with your skills and portfolio, and you'll immediately start seeing jobs in your area. You can bid on any job that matches your skills — there's no approval process or waiting period.",
  },
  {
    q: "How does the bidding system work?",
    a: "When a recruiter posts a job, you'll receive a notification if it matches your skills and location. You can submit a bid with your proposed price and a short message. The recruiter reviews all bids and selects the worker they feel is the best fit.",
  },
  {
    q: "When and how do I get paid?",
    a: "Payment is held in escrow when a recruiter accepts your bid. Once you complete the job and the recruiter confirms, funds are released to your DropWorks wallet within 2 hours. You can withdraw to your bank account or debit card at any time.",
  },
  {
    q: "What if a recruiter doesn't pay or disputes the job?",
    a: "DropWorks escrow protects you. If a recruiter refuses to release payment without valid reason, our Trust & Safety team reviews the case using job photos, messages, and completion data. 80% of disputes are resolved within 24 hours, and workers receive payment in valid cases.",
  },
  {
    q: "Is there a fee for workers?",
    a: "DropWorks charges a 12% service fee on completed jobs. This covers payment processing, escrow protection, and platform maintenance. There are no monthly fees, no subscription costs, and no charge for bidding on jobs.",
  },
  {
    q: "Can I work in multiple cities?",
    a: "Absolutely. You can set up to 3 different job alert zones across different cities or neighborhoods. Your profile is visible to recruiters across all active DropWorks cities, so you can pick up work wherever you travel.",
  },
  {
    q: "How do I build my rating quickly?",
    a: "Complete jobs on time, communicate proactively, and politely ask recruiters to leave a review after each job. Workers who respond to bids within 10 minutes and maintain a 4.8+ rating win significantly more jobs and can charge premium rates.",
  },
];

const recruiterFaqs = [
  {
    q: "How quickly can I find workers after posting a job?",
    a: "Most jobs on DropWorks receive their first bid within 5 minutes of posting. For common skills in major cities, you can have a verified worker confirmed and ready to start within 30-60 minutes of posting.",
  },
  {
    q: "How does payment work for recruiters?",
    a: "When you accept a worker's bid, the agreed amount is held in escrow from your linked payment method. The funds are only released to the worker after you confirm the job is complete. You're never charged until you're satisfied with the work.",
  },
  {
    q: "How are workers verified on DropWorks?",
    a: "All workers go through identity verification before they can bid on jobs. Workers can also add skill certifications, background check badges, and portfolio items. You can filter by verification level when reviewing bids.",
  },
  {
    q: "What if a worker doesn't show up or does poor work?",
    a: "If a worker no-shows, you can cancel the job and your escrow funds are returned immediately. For quality disputes, our Trust & Safety team reviews the case and can issue a full or partial refund based on the evidence provided.",
  },
  {
    q: "Can I hire the same worker again?",
    a: "Yes! You can save workers to your favorites list and invite them directly to future jobs. Many recruiters build a trusted roster of go-to workers for recurring needs. You can also message workers directly to check their availability.",
  },
  {
    q: "Is there a limit to how many workers I can hire at once?",
    a: "No limit. You can post multiple jobs simultaneously and hire as many workers as you need. For large crews, you can post a single job specifying the number of workers needed, and workers can apply as a team or individually.",
  },
  {
    q: "What types of jobs can I post?",
    a: "DropWorks supports a wide range of job types: skilled trades (electrical, plumbing, HVAC), general labor, moving and delivery, event staffing, cleaning, landscaping, photography, and more. If you need local help, DropWorks can find it.",
  },
];

interface FaqItemProps {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ q, a, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white transition-all">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer hover:bg-[#FAFAFA] transition-colors"
      >
        <span className="text-sm md:text-base font-semibold text-[#0F172A] leading-snug">{q}</span>
        <div className={`w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 transition-all ${isOpen ? "bg-[#194DDC] text-white" : "bg-[#F1F5F9] text-[#6B7280]"}`}>
          <i className={`${isOpen ? "ri-subtract-line" : "ri-add-line"} text-sm`}></i>
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-[#6B7280] text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState<"worker" | "recruiter">("worker");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = activeTab === "worker" ? workerFaqs : recruiterFaqs;

  const handleTabChange = (tab: "worker" | "recruiter") => {
    setActiveTab(tab);
    setOpenIndex(0);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#194DDC] text-xs font-bold tracking-widest uppercase mb-3">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4 leading-tight">
            Got questions? We've got answers.
          </h2>
          <p className="text-[#6B7280] text-base max-w-xl mx-auto">
            Everything you need to know about DropWorks — whether you're looking for work or looking to hire.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-full p-1">
            <button
              onClick={() => handleTabChange("worker")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "worker"
                  ? "bg-[#194DDC] text-white"
                  : "text-[#6B7280] hover:text-[#0F172A]"
              }`}
            >
              <i className="ri-hammer-line mr-2"></i>
              For Workers
            </button>
            <button
              onClick={() => handleTabChange("recruiter")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "recruiter"
                  ? "bg-[#194DDC] text-white"
                  : "text-[#6B7280] hover:text-[#0F172A]"
              }`}
            >
              <i className="ri-briefcase-line mr-2"></i>
              For Recruiters
            </button>
          </div>
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={`${activeTab}-${i}`}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#6B7280] text-sm mb-4">Still have questions?</p>
          <button className="px-6 py-3 border border-gray-200 hover:border-[#194DDC]/40 text-[#374151] hover:text-[#194DDC] text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap">
            <i className="ri-customer-service-2-line mr-2"></i>
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
