import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Trophy, Users } from "lucide-react";
import { members, challengeConfig, calculateFines } from "@/data/members";
import { AnimatedCounter } from "./AnimatedCounter";

export const PrizePoolTracker = () => {
  const totalEntryFees = members.length * challengeConfig.entryFee;
  const totalFines = members.reduce((sum, m) => sum + calculateFines(m), 0);
  const totalPot = totalEntryFees + totalFines;
  
  // Calculate potential refunds (members who hit 7% get $50 back)
  const qualifiedForRefund = members.filter((m) => {
    const percentLoss = ((m.startingWeight - m.currentWeight) / m.startingWeight) * 100;
    return percentLoss >= 7;
  });
  const totalRefunds = qualifiedForRefund.length * challengeConfig.refundAmount;
  
  const distributablePot = totalPot - totalRefunds;
  const winnerPrize = distributablePot * challengeConfig.winnerSplit;
  const runnerUpPrize = distributablePot * challengeConfig.runnerUpSplit;

  const stats = [
    { label: "Entry Fees", value: totalEntryFees, icon: Users, color: "text-primary" },
    { label: "Fines Collected", value: totalFines, icon: TrendingUp, color: "text-destructive" },
    { label: "Winner Takes", value: winnerPrize, icon: Trophy, color: "text-yellow-500" },
    { label: "Runner-up", value: runnerUpPrize, icon: Trophy, color: "text-slate-400" },
  ];

  return (
    <section className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full px-4 py-2 mb-4"
          >
            <DollarSign className="w-5 h-5 text-green-500" />
            <span className="text-green-500 font-bold text-sm">PRIZE POOL</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            The Money on the Line
          </h2>
        </div>

        {/* Main Prize Display */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-primary/20 rounded-2xl p-8 mb-6 border border-green-500/30 overflow-hidden"
        >
          {/* Animated money particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ opacity: 0, y: 100, x: Math.random() * 100 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [-20, -100],
                x: 50 + Math.random() * 200,
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: i * 0.5,
                ease: "easeOut",
              }}
            >
              💵
            </motion.div>
          ))}
          
          <div className="relative z-10 text-center">
            <p className="text-muted-foreground mb-2">Total Prize Pool</p>
            <motion.div
              className="text-5xl md:text-7xl font-display font-bold text-green-400"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <AnimatedCounter value={totalPot} prefix="$" duration={2} />
            </motion.div>
            {qualifiedForRefund.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                ({qualifiedForRefund.length} qualified for ${totalRefunds} in refunds)
              </p>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center"
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <p className={`text-2xl font-bold ${stat.color}`}>
                ${stat.value.toFixed(0)}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
