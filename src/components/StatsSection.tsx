import { motion } from "framer-motion";
import { Users, Target, DollarSign, Percent, TrendingDown, AlertTriangle } from "lucide-react";
import { members, challengeConfig, calculateFines } from "@/data/members";
import { AnimatedCounter } from "./AnimatedCounter";

export const StatsSection = () => {
  const totalStartingWeight = members.reduce((sum, m) => sum + m.startingWeight, 0);
  const totalCurrentWeight = members.reduce((sum, m) => sum + m.currentWeight, 0);
  const totalLost = totalStartingWeight - totalCurrentWeight;
  const avgPercentLoss = (totalLost / totalStartingWeight) * 100;
  const totalPaid = members.reduce((sum, m) => sum + m.balancePaid, 0);
  const totalFines = members.reduce((sum, m) => sum + calculateFines(m), 0);

  const stats = [
    {
      label: "Members",
      value: members.length,
      prefix: "",
      suffix: "",
      decimals: 0,
      icon: <Users className="h-5 w-5" />,
      color: "text-primary",
      bgColor: "bg-primary/10 border-primary/20",
    },
    {
      label: "Collective Loss",
      value: totalLost,
      prefix: "",
      suffix: " lbs",
      decimals: 1,
      icon: <TrendingDown className="h-5 w-5" />,
      color: "text-primary",
      bgColor: "bg-primary/10 border-primary/20",
    },
    {
      label: "Avg % Loss",
      value: avgPercentLoss,
      prefix: "",
      suffix: "%",
      decimals: 1,
      icon: <Percent className="h-5 w-5" />,
      color: "text-accent",
      bgColor: "bg-accent/10 border-accent/20",
    },
    {
      label: "Prize Pool",
      value: totalPaid + totalFines,
      prefix: "$",
      suffix: "",
      decimals: 0,
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-accent",
      bgColor: "bg-accent/10 border-accent/20",
    },
  ];

  return (
    <section className="px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ y: -5, scale: 1.05 }}
              viewport={{ once: true }}
              className={`rounded-xl border p-4 text-center ${stat.bgColor}`}
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-secondary ${stat.color}`}
              >
                {stat.icon}
              </motion.div>
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                className={`font-display text-2xl font-bold ${stat.color}`}
              />
              <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Fines collected indicator */}
        {totalFines > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span>Includes <span className="text-destructive font-medium">${totalFines}</span> in fines collected</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
