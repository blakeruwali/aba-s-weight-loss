import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { Leaderboard } from "@/components/Leaderboard";
import { RulesSection } from "@/components/RulesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <Leaderboard />
      <RulesSection />
      <Footer />
    </div>
  );
};

export default Index;
