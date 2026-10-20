import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import FeaturesSection from "./components/FeaturesSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CtaSection from "./components/CtaSection";
import LandingFooter from "./components/LandingFooter";
import LandingNav from "./components/LandingNav";
import FaqSection from "./components/FaqSection";

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <LandingNav scrolled={scrolled} />
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <FeaturesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
