import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Trophy, AlertCircle, Sparkles } from "lucide-react";
import { members } from "@/data/members";
import { AnimatedCounter } from "./AnimatedCounter";
import { FloatingParticles } from "./FloatingParticles";
import { funnyHeadlines } from "@/lib/roasts";

export const HeroSection = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  
  const totalStartingWeight = members.reduce((sum, m) => sum + m.startingWeight, 0);
  const totalCurrentWeight = members.reduce((sum, m) => sum + m.currentWeight, 0);
  const totalLost = totalStartingWeight - totalCurrentWeight;
  const totalPaid = members.reduce((sum, m) => sum + m.balancePaid, 0);
  const unpaidCount = members.filter(m => m.balancePaid === 0).length;

  // Rotate headlines every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % funnyHeadlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 px-4">
      {/* Floating particles background */}
      <FloatingParticles />
      
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]"
        />
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
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
            <Sparkles className="h-4 w-4" />
          </motion.div>
          <span className="font-display font-bold">{members.length} Members Strong</span>
          <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
            <Sparkles className="h-4 w-4" />
          </motion.div>
        </motion.div>

        <motion.h1 
          className="mb-4 font-display text-5xl font-bold tracking-tight md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span 
            className="text-gradient-primary inline-block"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            Aba Dublauchha
          </motion.span>
          <br />
          <span className="text-foreground">Long Island</span>
        </motion.h1>

        {/* Rotating funny headlines */}
        <div className="mx-auto mb-8 max-w-lg h-14 relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentHeadline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-muted-foreground italic absolute inset-0 flex items-center justify-center"
            >
              "{funnyHeadlines[currentHeadline]}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Weight lost counter */}
        {totalLost > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-primary border border-primary/30"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              🔥
            </motion.span>
            <span className="font-display font-bold">
              {totalLost.toFixed(1)} lbs of regret leaving Long Island
            </span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
            >
              🔥
            </motion.span>
          </motion.div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex items-center gap-3 rounded-xl bg-gradient-card border border-border px-6 py-4 shadow-card"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-hero shadow-lg"
            >
              <Scale className="h-7 w-7 text-primary-foreground" />
            </motion.div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Total Starting</p>
              <AnimatedCounter
                value={totalStartingWeight}
                suffix=" lbs"
                decimals={1}
                className="font-display text-2xl font-bold text-foreground"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, type: "spring" }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex items-center gap-3 rounded-xl bg-gradient-card border border-accent/30 px-6 py-4 shadow-card animate-pulse-glow"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold shadow-lg"
            >
              <Trophy className="h-7 w-7 text-accent-foreground" />
            </motion.div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Collected So Far</p>
              <AnimatedCounter
                value={totalPaid}
                prefix="$"
                className="font-display text-2xl font-bold text-accent"
              />
              {unpaidCount > 0 && (
                <motion.p 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="flex items-center gap-1 text-xs text-destructive"
                >
                  <AlertCircle className="h-3 w-3" />
                  {unpaidCount} unpaid
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
