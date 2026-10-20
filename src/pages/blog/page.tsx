import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingNav from "@/pages/landing/components/LandingNav";
import LandingFooter from "@/pages/landing/components/LandingFooter";

const categories = ["All", "For Workers", "For Recruiters", "Platform Updates", "Industry Insights", "Tips & Guides"];

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
    img: "https://readdy.ai/api/search-image?query=skilled%20worker%20using%20smartphone%20app%20bidding%20on%20jobs%20gig%20economy%20professional%20portrait%20warm%20lighting%20urban%20background%20modern&width=600&height=380&seq=blog-1&orientation=landscape",
    featured: true,
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
    img: "https://readdy.ai/api/search-image?query=recruiter%20manager%20reviewing%20worker%20profiles%20on%20tablet%20laptop%20modern%20office%20professional%20hiring%20team%20management%20clean%20background&width=600&height=380&seq=blog-2&orientation=landscape",
    featured: false,
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
    img: "https://readdy.ai/api/search-image?query=digital%20payment%20escrow%20fintech%20abstract%20technology%20secure%20transaction%20modern%20clean%20minimal%20design%20blue%20tones&width=600&height=380&seq=blog-3&orientation=landscape",
    featured: false,
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
    img: "https://readdy.ai/api/search-image?query=data%20analytics%20charts%20graphs%20gig%20economy%20workforce%20trends%202026%20modern%20infographic%20abstract%20clean%20professional&width=600&height=380&seq=blog-4&orientation=landscape",
    featured: false,
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
    img: "https://readdy.ai/api/search-image?query=worker%20professional%20profile%20portfolio%20photo%20smiling%20confident%20clean%20background%20rating%20stars%20review%20gig%20platform&width=600&height=380&seq=blog-5&orientation=landscape",
    featured: false,
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
    img: "https://readdy.ai/api/search-image?query=worker%20counting%20money%20earnings%20wallet%20payment%20gig%20economy%20income%20tax%20financial%20planning%20warm%20lighting%20professional&width=600&height=380&seq=blog-6&orientation=landscape",
    featured: false,
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
    img: "https://readdy.ai/api/search-image?query=recruiter%20writing%20job%20post%20on%20laptop%20modern%20office%20desk%20professional%20clean%20minimal%20workspace%20warm%20lighting&width=600&height=380&seq=blog-7&orientation=landscape",
    featured: false,
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
    img: "https://readdy.ai/api/search-image?query=smartphone%20notification%20alert%20map%20location%20pin%20gig%20job%20app%20modern%20UI%20clean%20minimal%20design%20tech&width=600&height=380&seq=blog-8&orientation=landscape",
    featured: false,
  },
];

export default function BlogPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);
  const featured = posts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeCategory !== "All");

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <LandingNav scrolled={scrolled} />

      {/* Hero */}
      <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-block text-[#194DDC] text-xs font-bold tracking-widest uppercase mb-4">DropWorks Blog</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4 leading-tight">
            Insights for workers<br />and recruiters
          </h1>
          <p className="text-[#6B7280] text-base md:text-lg max-w-xl mx-auto">
            Tips, platform updates, industry data, and guides to help you get the most out of DropWorks — whether you're hiring or getting hired.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          {/* Featured post */}
          {activeCategory === "All" && featured && (
            <div onClick={() => navigate(`/blog/${featured.id}`)} className="mb-14 rounded-3xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row group cursor-pointer hover:border-[#194DDC]/20 transition-all">
              <div className="w-full lg:w-[55%] h-64 lg:h-auto overflow-hidden flex-shrink-0">
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 p-7 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#EEF2FF] text-[#194DDC] text-xs font-bold rounded-full">{featured.category}</span>
                  <span className="text-[#9CA3AF] text-xs">Featured</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-[#0F172A] mb-3 leading-snug">{featured.title}</h2>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#194DDC]/10">
                    <i className="ri-user-line text-[#194DDC] text-sm"></i>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#0F172A]">{featured.author}</p>
                    <p className="text-xs text-[#9CA3AF]">{featured.date} · {featured.readTime}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category filter */}
          <div className="flex items-center gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#194DDC] text-white"
                    : "bg-[#F1F5F9] text-[#6B7280] hover:bg-[#E2E8F0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#194DDC]/20 transition-all group cursor-pointer"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="px-2.5 py-1 bg-[#F1F5F9] text-[#6B7280] text-[10px] font-bold rounded-full uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#0F172A] mt-3 mb-2 leading-snug line-clamp-2">{post.title}</h3>
                  <p className="text-[#6B7280] text-xs leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#194DDC]/10">
                        <i className="ri-user-line text-[#194DDC] text-xs"></i>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#374151]">{post.author}</p>
                        <p className="text-[10px] text-[#9CA3AF]">{post.date}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] whitespace-nowrap">{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-12">
            <button className="px-8 py-3.5 border border-gray-200 hover:border-[#194DDC]/40 text-[#374151] hover:text-[#194DDC] text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#0F172A]">
        <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
          <i className="ri-mail-send-line text-[#6B9EFF] text-3xl mb-4 block"></i>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Stay in the loop</h2>
          <p className="text-white/60 text-sm mb-7">
            Get the latest DropWorks tips, platform updates, and gig economy insights delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#6B9EFF]"
            />
            <button className="px-6 py-3 bg-[#194DDC] hover:bg-[#1340C0] text-white font-bold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
