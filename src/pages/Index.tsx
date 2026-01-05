import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { Leaderboard } from "@/components/Leaderboard";
import { RulesCards } from "@/components/RulesCards";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      
      {/* Countdown Timer Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-4 py-8"
      >
        <div className="mx-auto max-w-md">
          <CountdownTimer targetDate="2025-01-18T10:00:00" label="Next Weigh-In" />
        </div>
      </motion.section>
      
      <Leaderboard />
      <RulesCards />
      <Footer />
    </div>
  );
};

export default Index;
