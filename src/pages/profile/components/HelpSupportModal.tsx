import { useState } from "react";

interface HelpSupportModalProps {
  onClose: () => void;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq1",
    question: "How do I get paid for completed jobs?",
    answer: "Once a job is marked complete by the recruiter, funds held in escrow are released to your wallet within 24 hours. You can then withdraw to your linked bank account anytime.",
  },
  {
    id: "faq2",
    question: "How does the bidding system work?",
    answer: "When a job is posted near you, you can place a bid with your proposed price and a short message. The recruiter reviews all bids and accepts the one that best fits their needs.",
  },
  {
    id: "faq3",
    question: "What happens if a recruiter cancels a job?",
    answer: "If a job is cancelled after you've been accepted, you'll receive a partial compensation based on work done. Disputes can be raised through the Help & Support section.",
  },
  {
    id: "faq4",
    question: "How do I improve my profile visibility?",
    answer: "Complete your profile with a photo, bio, skills, and portfolio items. Profiles with 5-star ratings and verified badges appear higher in search results.",
  },
  {
    id: "faq5",
    question: "Can I work in multiple cities?",
    answer: "Yes! You can update your location at any time from your profile settings. Jobs are shown based on your current location and the radius you set.",
  },
];

export default function HelpSupportModal({ onClose }: HelpSupportModalProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"faq" | "contact">("faq");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-white dark:bg-[#1F2937] rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F3F4F6] dark:border-[#374151] flex-shrink-0">
          <div>
            <h2 className="text-base font-black text-[#111827] dark:text-white">Help &amp; Support</h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">We&apos;re here to help you</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-full cursor-pointer"
          >
            <i className="ri-close-line text-[#6B7280] dark:text-[#9CA3AF] text-base"></i>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-4 flex-shrink-0">
          <div className="flex gap-1 bg-[#F3F4F6] dark:bg-[#111827] rounded-xl p-1">
            {(["faq", "contact"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white dark:bg-[#1F2937] text-[#194DDC] dark:text-[#6B9EFF]"
                    : "text-[#6B7280] dark:text-[#9CA3AF]"
                }`}
              >
                {tab === "faq" ? "FAQs" : "Contact Us"}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 py-4 overflow-y-auto flex flex-col gap-3 flex-1">
          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <>
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-[#F8FAFC] dark:bg-[#111827] rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer text-left"
                  >
                    <div className="w-7 h-7 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-lg flex-shrink-0">
                      <i className="ri-question-line text-[#194DDC] dark:text-[#6B9EFF] text-sm"></i>
                    </div>
                    <p className="flex-1 text-sm font-semibold text-[#111827] dark:text-white leading-snug">{faq.question}</p>
                    <i className={`${openFaq === faq.id ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} text-[#9CA3AF] text-lg flex-shrink-0`}></i>
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed pl-10">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Quick links */}
              <div className="mt-2">
                <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Quick Links</p>
                <div className="bg-[#F8FAFC] dark:bg-[#111827] rounded-2xl overflow-hidden">
                  {[
                    { icon: "ri-file-text-line", label: "Terms of Service", color: "text-[#194DDC]", bg: "bg-[#EEF2FF] dark:bg-[#1e3a8a]/20" },
                    { icon: "ri-shield-line", label: "Privacy Policy", color: "text-[#16A34A]", bg: "bg-[#DCFCE7] dark:bg-[#14532d]/20" },
                    { icon: "ri-book-open-line", label: "How It Works", color: "text-[#F59E0B]", bg: "bg-[#FEF3C7] dark:bg-[#78350f]/20" },
                  ].map((link, idx) => (
                    <button
                      key={link.label}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-[#F3F4F6] dark:hover:bg-[#374151]/30 transition-colors ${idx < 2 ? "border-b border-[#F3F4F6] dark:border-[#374151]" : ""}`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center ${link.bg} rounded-lg flex-shrink-0`}>
                        <i className={`${link.icon} ${link.color} text-sm`}></i>
                      </div>
                      <span className="flex-1 text-sm font-medium text-[#374151] dark:text-[#D1D5DB] text-left">{link.label}</span>
                      <i className="ri-external-link-line text-[#9CA3AF] text-sm"></i>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#DCFCE7] dark:bg-[#14532d]/20 rounded-full mb-4">
                    <i className="ri-checkbox-circle-line text-[#16A34A] text-3xl"></i>
                  </div>
                  <h3 className="text-base font-black text-[#111827] dark:text-white">Message Sent!</h3>
                  <p className="text-xs text-[#9CA3AF] mt-2 max-w-xs leading-relaxed">
                    Our support team will get back to you within 24 hours. Check your email for updates.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-5 h-10 px-6 bg-[#194DDC] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  {/* Contact channels */}
                  <div className="bg-[#F8FAFC] dark:bg-[#111827] rounded-2xl overflow-hidden">
                    {[
                      { icon: "ri-mail-line", label: "Email Support", sub: "support@quickhire.ng", color: "text-[#194DDC]", bg: "bg-[#EEF2FF] dark:bg-[#1e3a8a]/20" },
                      { icon: "ri-whatsapp-line", label: "WhatsApp Chat", sub: "+234 800 QUICKHIRE", color: "text-[#16A34A]", bg: "bg-[#DCFCE7] dark:bg-[#14532d]/20" },
                    ].map((ch, idx) => (
                      <div
                        key={ch.label}
                        className={`flex items-center gap-3 px-4 py-3.5 ${idx < 1 ? "border-b border-[#F3F4F6] dark:border-[#374151]" : ""}`}
                      >
                        <div className={`w-9 h-9 flex items-center justify-center ${ch.bg} rounded-xl flex-shrink-0`}>
                          <i className={`${ch.icon} ${ch.color} text-base`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#111827] dark:text-white">{ch.label}</p>
                          <p className="text-[10px] text-[#9CA3AF]">{ch.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message form */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Send a Message</p>
                    <div>
                      <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">Subject</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="What do you need help with?"
                        className="w-full h-11 px-3 bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">Message</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                        placeholder="Describe your issue in detail..."
                        rows={4}
                        className="w-full px-3 py-2.5 bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors resize-none leading-relaxed"
                      />
                      <p className="text-right text-[10px] text-[#9CA3AF] mt-1">{message.length}/500</p>
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={!subject.trim() || !message.trim() || submitting}
                      className="w-full h-11 bg-[#194DDC] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Sending...</>
                      ) : (
                        <><i className="ri-send-plane-line"></i>Send Message</>
                      )}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
