import { motion } from "framer-motion";
import { Users, Target, DollarSign, Percent } from "lucide-react";
import { members, challengeConfig } from "@/data/members";

export const StatsSection = () => {
  const totalStartingWeight = members.reduce((sum, m) => sum + m.startingWeight, 0);
  const totalCurrentWeight = members.reduce((sum, m) => sum + m.currentWeight, 0);
  const totalLost = totalStartingWeight - totalCurrentWeight;
  const avgPercentLoss = (totalLost / totalStartingWeight) * 100;
  const prizePool = members.length * challengeConfig.entryFee;

  const stats = [
    {
      label: "Members",
      value: members.length.toString(),
      icon: <Users className="h-5 w-5" />,
      color: "text-primary",
    },
    {
      label: "Collective Loss",
      value: `${totalLost.toFixed(1)} lbs`,
      icon: <Target className="h-5 w-5" />,
      color: "text-primary",
    },
    {
      label: "Avg % Loss",
      value: `${avgPercentLoss.toFixed(1)}%`,
      icon: <Percent className="h-5 w-5" />,
      color: "text-accent",
    },
    {
      label: "Prize Pool",
      value: `$${prizePool}`,
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-accent",
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
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg border border-border bg-gradient-card p-4 text-center shadow-card"
            >
              <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-secondary ${stat.color}`}>
                {stat.icon}
              </div>
              <p className={`font-display text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
