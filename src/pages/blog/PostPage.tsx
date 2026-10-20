import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LandingNav from "@/pages/landing/components/LandingNav";
import LandingFooter from "@/pages/landing/components/LandingFooter";

const posts = [
  {
    id: 1,
    category: "For Workers",
    title: "How to Win More Bids on DropWorks: A Worker's Complete Guide",
    excerpt: "Standing out in a competitive bid pool isn't just about price. Learn the profile optimizations, response strategies, and bid writing techniques that top earners use to consistently win jobs.",
    author: "Sofia Mendes",
    authorRole: "Head of Marketing",
    date: "Apr 18, 2026",
    readTime: "7 min read",
    img: "https://readdy.ai/api/search-image?query=skilled%20worker%20using%20smartphone%20app%20bidding%20on%20jobs%20gig%20economy%20professional%20portrait%20warm%20lighting%20urban%20background%20modern&width=1200&height=600&seq=blog-1&orientation=landscape",
    content: [
      {
        type: "intro",
        text: "Winning bids on DropWorks isn't just about being the cheapest option. Recruiters are looking for reliability, professionalism, and confidence — and your bid is the first impression you make. Here's the complete playbook top earners use to consistently land jobs.",
      },
      {
        type: "h2",
        text: "1. Optimize Your Profile Before You Bid",
      },
      {
        type: "p",
        text: "Before you send a single bid, make sure your profile is doing the heavy lifting. Recruiters often check your profile before reading your bid message. A complete profile with a professional photo, verified skills, and at least 3 portfolio items gets 4x more job offers than an incomplete one.",
      },
      {
        type: "tip",
        text: "Pro Tip: Add a short video introduction to your profile. Workers with video intros win 60% more bids on average.",
      },
      {
        type: "h2",
        text: "2. Respond Within the First 10 Minutes",
      },
      {
        type: "p",
        text: "Speed is everything in the gig economy. Jobs posted on DropWorks receive an average of 12 bids within the first 30 minutes. Being in the first 3 bids dramatically increases your chances of being selected — recruiters often stop reviewing after the first few strong candidates.",
      },
      {
        type: "p",
        text: "Enable push notifications and set up job alerts for your skill categories and preferred radius. The moment a matching job drops, you should be the first to know.",
      },
      {
        type: "h2",
        text: "3. Write a Bid That Speaks to the Job",
      },
      {
        type: "p",
        text: "Generic bids get ignored. Read the job description carefully and reference specific details in your message. If a recruiter mentions they need someone who can work quietly in a residential area, acknowledge that. If they mention a tight deadline, address it directly.",
      },
      {
        type: "list",
        items: [
          "Start with a direct statement of your relevant experience",
          "Reference one specific detail from the job post",
          "State your availability clearly (\"I can start today at 2pm\")",
          "Keep it under 100 words — recruiters are busy",
          "End with a confident, not desperate, close",
        ],
      },
      {
        type: "h2",
        text: "4. Price Strategically, Not Cheaply",
      },
      {
        type: "p",
        text: "Undercutting everyone else might get you a few jobs, but it signals low quality and attracts difficult clients. Instead, price at or slightly below the market rate for your skill level, and justify your price with your experience and track record.",
      },
      {
        type: "tip",
        text: "Pro Tip: Workers with 4.8+ ratings can charge 20-30% above market rate and still win consistently. Focus on building your rating first.",
      },
      {
        type: "h2",
        text: "5. Build Your Reputation Systematically",
      },
      {
        type: "p",
        text: "Every completed job is an opportunity to build social proof. After finishing a job, politely ask the recruiter to leave a review. A simple \"If you were happy with my work, a quick review would mean a lot\" goes a long way. Workers with 10+ reviews win 3x more bids than those with fewer.",
      },
      {
        type: "p",
        text: "Respond to every review — positive or negative. It shows professionalism and that you care about your work.",
      },
    ],
    relatedIds: [5, 6, 7],
  },
  {
    id: 2,
    category: "For Recruiters",
    title: "The Recruiter's Playbook: Hiring a Full Crew in Under an Hour",
    excerpt: "From posting your first job to having a verified team on-site — here's the exact workflow our top recruiters use to staff up fast without sacrificing quality.",
    author: "Daniel Torres",
    authorRole: "Head of Operations",
    date: "Apr 14, 2026",
    readTime: "5 min read",
    img: "https://readdy.ai/api/search-image?query=recruiter%20manager%20reviewing%20worker%20profiles%20on%20tablet%20laptop%20modern%20office%20professional%20hiring%20team%20management%20clean%20background&width=1200&height=600&seq=blog-2&orientation=landscape",
    content: [
      {
        type: "intro",
        text: "The best recruiters on DropWorks don't just post jobs and wait — they have a system. Here's the exact workflow that lets top recruiters go from zero to a fully staffed crew in under 60 minutes.",
      },
      {
        type: "h2",
        text: "Step 1: Write a Job Post That Attracts the Right People",
      },
      {
        type: "p",
        text: "A vague job post gets vague bids. Be specific about the work, the location, the timeline, and what you expect. Include the number of workers needed, any equipment they should bring, and whether parking is available. The more detail you provide, the better the bids you'll receive.",
      },
      {
        type: "h2",
        text: "Step 2: Set a Competitive Budget",
      },
      {
        type: "p",
        text: "Jobs with budgets at or above market rate receive 3x more bids and attract higher-rated workers. Use the budget estimator in the job post form to see what similar jobs in your area are paying. Underpaying might save money upfront but costs more in time and quality.",
      },
      {
        type: "tip",
        text: "Pro Tip: Add a 10% bonus for on-time completion. It motivates workers and costs you nothing if the job runs late.",
      },
      {
        type: "h2",
        text: "Step 3: Review Bids Strategically",
      },
      {
        type: "p",
        text: "Don't just pick the cheapest bid. Look at the worker's rating, number of completed jobs, response time, and how personalized their message is. A worker who references specific details from your job post is far more likely to show up prepared.",
      },
      {
        type: "list",
        items: [
          "Filter by rating (4.5+ recommended)",
          "Check their portfolio for relevant work",
          "Read their bid message — generic = red flag",
          "Look at their response time (under 10 min = highly engaged)",
          "Check if they've done similar jobs before",
        ],
      },
      {
        type: "h2",
        text: "Step 4: Communicate Before the Job Starts",
      },
      {
        type: "p",
        text: "Once you've accepted a bid, send a quick message confirming the start time, exact address, and any special instructions. This reduces no-shows and ensures the worker arrives prepared. Top recruiters do this within 5 minutes of accepting a bid.",
      },
    ],
    relatedIds: [1, 3, 7],
  },
  {
    id: 3,
    category: "Platform Updates",
    title: "Introducing Escrow 2.0: Faster Releases, Smarter Dispute Resolution",
    excerpt: "We've completely rebuilt our payment escrow system. Here's what's new, what's faster, and how it protects both workers and recruiters better than ever before.",
    author: "Aisha Okonkwo",
    authorRole: "CTO & Co-Founder",
    date: "Apr 10, 2026",
    readTime: "4 min read",
    img: "https://readdy.ai/api/search-image?query=digital%20payment%20escrow%20fintech%20abstract%20technology%20secure%20transaction%20modern%20clean%20minimal%20design%20blue%20tones&width=1200&height=600&seq=blog-3&orientation=landscape",
    content: [
      {
        type: "intro",
        text: "Today we're launching Escrow 2.0 — a complete rebuild of our payment protection system. It's faster, smarter, and more transparent than ever before.",
      },
      {
        type: "h2",
        text: "What's New in Escrow 2.0",
      },
      {
        type: "p",
        text: "The original escrow system worked, but it was slow. Funds could take up to 5 business days to release after job completion. With Escrow 2.0, standard releases happen within 2 hours of job confirmation — and instant releases are available for verified workers with 4.8+ ratings.",
      },
      {
        type: "list",
        items: [
          "2-hour standard release (down from 5 business days)",
          "Instant release for verified workers",
          "Real-time dispute tracking dashboard",
          "AI-assisted dispute resolution",
          "Automatic partial releases for milestone-based jobs",
        ],
      },
      {
        type: "h2",
        text: "Smarter Dispute Resolution",
      },
      {
        type: "p",
        text: "Disputes are now handled by our AI-assisted review system, which analyzes job photos, messages, and completion data to make fair recommendations within 24 hours. Human reviewers handle complex cases, but 80% of disputes are now resolved automatically.",
      },
    ],
    relatedIds: [4, 8, 1],
  },
  {
    id: 4,
    category: "Industry Insights",
    title: "The Gig Economy in 2026: What the Data Actually Says",
    excerpt: "We analyzed 2 million jobs on DropWorks to understand how the gig economy is evolving. The results might surprise you — especially around earnings, job types, and worker satisfaction.",
    author: "Marcus Reid",
    authorRole: "CEO & Co-Founder",
    date: "Apr 5, 2026",
    readTime: "9 min read",
    img: "https://readdy.ai/api/search-image?query=data%20analytics%20charts%20graphs%20gig%20economy%20workforce%20trends%202026%20modern%20infographic%20abstract%20clean%20professional&width=1200&height=600&seq=blog-4&orientation=landscape",
    content: [
      {
        type: "intro",
        text: "We analyzed over 2 million jobs completed on DropWorks in the past 12 months. Here's what the data actually says about the state of the gig economy in 2026.",
      },
      {
        type: "h2",
        text: "Earnings Are Up — Significantly",
      },
      {
        type: "p",
        text: "The average hourly rate for skilled workers on DropWorks increased 18% year-over-year, outpacing inflation by 11 points. Workers in trades (electrical, plumbing, HVAC) saw the biggest gains, with average rates now exceeding $45/hour in major metros.",
      },
      {
        type: "tip",
        text: "Key Stat: The top 10% of workers on DropWorks earned over $85,000 in 2025 — entirely through gig work.",
      },
      {
        type: "h2",
        text: "Job Types Are Diversifying",
      },
      {
        type: "p",
        text: "While moving and labor jobs still dominate (34% of all jobs), we're seeing rapid growth in skilled trades (up 67%), event staffing (up 45%), and professional services like photography and design (up 89%). The platform is evolving beyond physical labor.",
      },
      {
        type: "h2",
        text: "Worker Satisfaction Is at an All-Time High",
      },
      {
        type: "p",
        text: "Our annual worker survey showed 87% of active workers rate their DropWorks experience as \"good\" or \"excellent\" — up from 71% in 2024. The biggest drivers: faster payments, better job matching, and improved dispute resolution.",
      },
    ],
    relatedIds: [1, 5, 6],
  },
  {
    id: 5,
    category: "Tips & Guides",
    title: "Building a 5-Star Profile: The Checklist Every Worker Needs",
    excerpt: "Your profile is your storefront. We break down exactly what recruiters look for — from portfolio photos to response time — and how to optimize every section for maximum visibility.",
    author: "Priya Nair",
    authorRole: "Head of Product",
    date: "Mar 28, 2026",
    readTime: "6 min read",
    img: "https://readdy.ai/api/search-image?query=worker%20professional%20profile%20portfolio%20photo%20smiling%20confident%20clean%20background%20rating%20stars%20review%20gig%20platform&width=1200&height=600&seq=blog-5&orientation=landscape",
    content: [
      {
        type: "intro",
        text: "Your DropWorks profile is your digital storefront. Recruiters spend an average of 8 seconds scanning a profile before deciding whether to read the bid. Here's the complete checklist to make those 8 seconds count.",
      },
      {
        type: "h2",
        text: "Profile Photo",
      },
      {
        type: "p",
        text: "Use a clear, professional headshot with good lighting. Smile. Wear work-appropriate clothing. Avoid group photos, sunglasses, or blurry images. Workers with professional photos get 3x more profile views.",
      },
      {
        type: "h2",
        text: "Bio & Headline",
      },
      {
        type: "p",
        text: "Your headline should include your primary skill and years of experience. Your bio should be 3-4 sentences covering what you do, how long you've been doing it, and what makes you reliable. Avoid generic phrases like \"hard worker\" — be specific.",
      },
      {
        type: "list",
        items: [
          "Professional headshot (not a selfie)",
          "Headline with skill + experience years",
          "Bio: specific, confident, 3-4 sentences",
          "At least 5 verified skills listed",
          "3+ portfolio items with photos",
          "Response time under 15 minutes",
          "Availability calendar up to date",
          "At least 1 verified certification",
        ],
      },
    ],
    relatedIds: [1, 6, 8],
  },
  {
    id: 6,
    category: "For Workers",
    title: "Understanding Your Earnings: Taxes, Fees, and What You Actually Take Home",
    excerpt: "Confused about platform fees, tax obligations, and how escrow payouts work? This plain-English breakdown covers everything a gig worker needs to know about their money.",
    author: "James Osei",
    authorRole: "Head of Trust & Safety",
    date: "Mar 22, 2026",
    readTime: "8 min read",
    img: "https://readdy.ai/api/search-image?query=worker%20counting%20money%20earnings%20wallet%20payment%20gig%20economy%20income%20tax%20financial%20planning%20warm%20lighting%20professional&width=1200&height=600&seq=blog-6&orientation=landscape",
    content: [
      {
        type: "intro",
        text: "Money questions are the most common ones we get from workers. Here's a plain-English breakdown of platform fees, taxes, and how to maximize what you actually take home.",
      },
      {
        type: "h2",
        text: "Platform Fees",
      },
      {
        type: "p",
        text: "DropWorks charges a 12% service fee on all completed jobs. This covers payment processing, escrow protection, insurance, and platform maintenance. The fee is deducted automatically before funds are released to your wallet.",
      },
      {
        type: "tip",
        text: "Pro Tip: Factor the 12% fee into your bid price. If you want to take home $100, bid $114.",
      },
      {
        type: "h2",
        text: "Tax Obligations",
      },
      {
        type: "p",
        text: "As a gig worker, you're classified as an independent contractor. This means you're responsible for your own taxes, including self-employment tax (15.3% in the US). We recommend setting aside 25-30% of every payout for taxes.",
      },
      {
        type: "p",
        text: "DropWorks provides a 1099-K form at the end of each tax year for workers who earn over $600. You can download your earnings summary from the Wallet section of your profile.",
      },
    ],
    relatedIds: [1, 4, 5],
  },
  {
    id: 7,
    category: "For Recruiters",
    title: "How to Write a Job Post That Attracts Top Workers Instantly",
    excerpt: "Vague job posts get vague bids. Learn the anatomy of a high-performing job listing — the right details, the right budget signals, and the words that make skilled workers click Apply.",
    author: "Sofia Mendes",
    authorRole: "Head of Marketing",
    date: "Mar 15, 2026",
    readTime: "5 min read",
    img: "https://readdy.ai/api/search-image?query=recruiter%20writing%20job%20post%20on%20laptop%20modern%20office%20desk%20professional%20clean%20minimal%20workspace%20warm%20lighting&width=1200&height=600&seq=blog-7&orientation=landscape",
    content: [
      {
        type: "intro",
        text: "The difference between a job post that gets 20 quality bids and one that gets 2 mediocre ones often comes down to how it's written. Here's the anatomy of a high-performing job listing.",
      },
      {
        type: "h2",
        text: "The Title: Be Specific",
      },
      {
        type: "p",
        text: "\"Need help\" gets ignored. \"Licensed electrician needed for panel upgrade — 4 hours, Midtown Atlanta\" gets bids from exactly the right people. Include the skill, the task, the duration, and the location in your title.",
      },
      {
        type: "h2",
        text: "The Description: Answer Every Question",
      },
      {
        type: "p",
        text: "Workers want to know: What exactly needs to be done? How long will it take? What tools or equipment should they bring? Is parking available? Are there any special requirements (background check, certifications, etc.)? Answer all of these upfront.",
      },
      {
        type: "list",
        items: [
          "Specific task description (not just \"general labor\")",
          "Exact address or neighborhood",
          "Start time and expected duration",
          "Tools/equipment needed",
          "Number of workers required",
          "Any certifications or requirements",
          "Parking and access instructions",
        ],
      },
    ],
    relatedIds: [2, 3, 4],
  },
  {
    id: 8,
    category: "Platform Updates",
    title: "New: Real-Time Job Alerts and Geo-Radius Customization",
    excerpt: "Workers can now set custom notification zones and get pinged the moment a matching job drops within their preferred radius. Here's how to set it up.",
    author: "Priya Nair",
    authorRole: "Head of Product",
    date: "Mar 8, 2026",
    readTime: "3 min read",
    img: "https://readdy.ai/api/search-image?query=smartphone%20notification%20alert%20map%20location%20pin%20gig%20job%20app%20modern%20UI%20clean%20minimal%20design%20tech&width=1200&height=600&seq=blog-8&orientation=landscape",
    content: [
      {
        type: "intro",
        text: "We just shipped one of our most-requested features: real-time job alerts with customizable geo-radius. Here's everything you need to know.",
      },
      {
        type: "h2",
        text: "How It Works",
      },
      {
        type: "p",
        text: "Go to your profile settings and tap \"Job Alerts\". Set your preferred radius (1 mile to 50 miles), select your skill categories, and choose your notification preferences. The moment a matching job is posted within your zone, you'll get an instant push notification.",
      },
      {
        type: "h2",
        text: "Multiple Zones",
      },
      {
        type: "p",
        text: "You can now set up to 3 different alert zones — perfect if you work in multiple neighborhoods or cities. Each zone can have its own radius and skill category filters.",
      },
      {
        type: "tip",
        text: "Pro Tip: Set a tight 2-mile radius for your home neighborhood and a wider 15-mile radius for your primary skill category. This way you never miss a nearby job.",
      },
    ],
    relatedIds: [3, 5, 1],
  },
];

const categoryColors: Record<string, string> = {
  "For Workers": "bg-emerald-50 text-emerald-700",
  "For Recruiters": "bg-amber-50 text-amber-700",
  "Platform Updates": "bg-[#EEF2FF] text-[#194DDC]",
  "Industry Insights": "bg-rose-50 text-rose-600",
  "Tips & Guides": "bg-purple-50 text-purple-600",
};

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const post = posts.find((p) => p.id === Number(id));
  const related = post ? posts.filter((p) => post.relatedIds.includes(p.id)) : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-['Inter',sans-serif]">
        <div className="text-center">
          <p className="text-[#6B7280] text-lg mb-4">Post not found</p>
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-3 bg-[#194DDC] text-white font-semibold rounded-xl cursor-pointer whitespace-nowrap"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <LandingNav scrolled={scrolled} />

      {/* Hero image */}
      <div className="w-full h-[320px] md:h-[480px] overflow-hidden relative mt-0">
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30"></div>
        {/* Back button */}
        <button
          onClick={() => navigate("/blog")}
          className="absolute top-24 md:top-28 left-4 md:left-8 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/30 transition-all cursor-pointer whitespace-nowrap"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Blog
        </button>
        {/* Category badge on image */}
        <div className="absolute bottom-6 left-4 md:left-8">
          <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${categoryColors[post.category] || "bg-white/20 text-white"}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Header */}
        <h1 className="text-2xl md:text-4xl font-black text-[#0F172A] mb-5 leading-tight">
          {post.title}
        </h1>

        {/* Author + meta */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-100 mb-10">
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#194DDC]/10 flex-shrink-0">
            <i className="ri-user-line text-[#194DDC] text-lg"></i>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#0F172A]">{post.author}</p>
            <p className="text-xs text-[#9CA3AF]">{post.authorRole}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#6B7280]">{post.date}</p>
            <p className="text-xs text-[#9CA3AF]">{post.readTime}</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose-custom">
          {post.content.map((block, i) => {
            if (block.type === "intro") {
              return (
                <p key={i} className="text-lg text-[#374151] leading-relaxed mb-8 font-medium">
                  {block.text}
                </p>
              );
            }
            if (block.type === "h2") {
              return (
                <h2 key={i} className="text-xl md:text-2xl font-black text-[#0F172A] mt-10 mb-4">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "p") {
              return (
                <p key={i} className="text-[#4B5563] text-base leading-relaxed mb-5">
                  {block.text}
                </p>
              );
            }
            if (block.type === "tip") {
              return (
                <div key={i} className="my-6 flex gap-4 p-5 bg-[#EEF2FF] rounded-2xl border border-[#194DDC]/10">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#194DDC] flex-shrink-0 mt-0.5">
                    <i className="ri-lightbulb-flash-line text-white text-sm"></i>
                  </div>
                  <p className="text-[#194DDC] text-sm font-semibold leading-relaxed">{block.text}</p>
                </div>
              );
            }
            if (block.type === "list" && block.items) {
              return (
                <ul key={i} className="my-5 space-y-2.5">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#194DDC]/10 flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-[#194DDC] text-xs"></i>
                      </div>
                      <span className="text-[#4B5563] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-bold text-[#0F172A] mb-1">Share this article</p>
            <p className="text-xs text-[#9CA3AF]">Help others discover this guide</p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { icon: "ri-twitter-x-line", label: "X" },
              { icon: "ri-linkedin-box-line", label: "LinkedIn" },
              { icon: "ri-link", label: "Copy Link" },
            ].map((s) => (
              <button
                key={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#374151] transition-all cursor-pointer"
                title={s.label}
              >
                <i className={`${s.icon} text-sm`}></i>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-14 bg-[#FAFAFA] border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h2 className="text-xl font-black text-[#0F172A] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rp) => (
                <article
                  key={rp.id}
                  onClick={() => navigate(`/blog/${rp.id}`)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#194DDC]/20 transition-all group cursor-pointer"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={rp.img.replace("1200", "600").replace("600&seq", "380&seq")}
                      alt={rp.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide ${categoryColors[rp.category] || "bg-[#F1F5F9] text-[#6B7280]"}`}>
                      {rp.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#0F172A] mt-3 mb-2 leading-snug line-clamp-2">{rp.title}</h3>
                    <p className="text-[10px] text-[#9CA3AF]">{rp.date} · {rp.readTime}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 bg-[#0F172A]">
        <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Ready to put this into practice?</h2>
          <p className="text-white/60 text-sm mb-7">Join 200,000+ workers and recruiters already using DropWorks.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/auth/signup")}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#194DDC] hover:bg-[#1340C0] text-white font-bold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/blog")}
              className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Read More Articles
            </button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
