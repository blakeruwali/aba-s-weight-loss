import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { Leaderboard } from "@/components/Leaderboard";
import { RulesCards } from "@/components/RulesCards";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Footer } from "@/components/Footer";
import { WallOfShame } from "@/components/WallOfShame";
import { motion } from "framer-motion";
import { members } from "@/data/members";

const Index = () => {
  // Calculate sorted members with percent loss for Wall of Shame
  const sortedMembers = [...members]
    .map((member) => ({
      member,
      percentLoss: ((member.startingWeight - member.currentWeight) / member.startingWeight) * 100,
      rank: 0,
    }))
    .sort((a, b) => b.percentLoss - a.percentLoss)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

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
          <CountdownTimer targetDate="2026-01-18T14:00:00" label="Next Weigh-In (Biweekly)" />
        </div>
      </motion.section>
      
      <Leaderboard />
      
      {/* Wall of Shame - Bottom 3 */}
      <WallOfShame members={sortedMembers} />
      
      <RulesCards />
      <Footer />
    </div>
  );
};

export default Index;
