import { motion } from "framer-motion";
import { Scale, Trophy, Users, AlertCircle } from "lucide-react";
import { members } from "@/data/members";

export const HeroSection = () => {
  const totalStartingWeight = members.reduce((sum, m) => sum + m.startingWeight, 0);
  const totalPaid = members.reduce((sum, m) => sum + m.balancePaid, 0);
  const unpaidCount = members.filter(m => m.balancePaid === 0).length;

  return (
    <section className="relative overflow-hidden py-16 px-4">
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary"
        >
          <Users className="h-4 w-4" />
          12 Members Strong
        </motion.div>

        <h1 className="mb-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          <span className="text-gradient-primary">Aba Dublauchha</span>
          <br />
          <span className="text-foreground">Long Island</span>
        </h1>

        <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
          A curated weight loss challenge. Track progress, stay accountable, 
          and compete for the prize pool.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 rounded-lg bg-gradient-card border border-border px-6 py-4 shadow-card"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-hero">
              <Scale className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Total Starting</p>
              <p className="font-display text-2xl font-bold">{totalStartingWeight.toFixed(1)} lbs</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 rounded-lg bg-gradient-card border border-border px-6 py-4 shadow-card"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold">
              <Trophy className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Collected So Far</p>
              <p className="font-display text-2xl font-bold">${totalPaid}</p>
              {unpaidCount > 0 && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {unpaidCount} unpaid
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
