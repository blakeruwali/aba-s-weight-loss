import { motion } from "framer-motion";
import { Trophy, TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { Member } from "@/data/members";

interface LeaderboardCardProps {
  member: Member;
  rank: number;
  percentLoss: number;
  index: number;
}

export const LeaderboardCard = ({ member, rank, percentLoss, index }: LeaderboardCardProps) => {
  const getRankStyle = () => {
    if (rank === 1) return "bg-gradient-gold text-accent-foreground";
    if (rank === 2) return "bg-gradient-silver text-foreground";
    if (rank === 3) return "bg-gradient-bronze text-foreground";
    return "bg-secondary text-secondary-foreground";
  };

  const getCardStyle = () => {
    if (rank === 1) return "border-accent/50 shadow-glow";
    if (rank === 2) return "border-muted-foreground/30";
    if (rank === 3) return "border-orange-600/30";
    return "border-border";
  };

  const getTrendIcon = () => {
    if (percentLoss > 0) return <TrendingDown className="h-4 w-4 text-primary" />;
    if (percentLoss < 0) return <TrendingUp className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const progressWidth = Math.min(Math.abs(percentLoss) * 10, 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.02, x: 5 }}
      className={`relative overflow-hidden rounded-lg border bg-gradient-card p-4 shadow-card transition-all ${getCardStyle()}`}
    >
      {/* Progress bar background */}
      <div
        className="absolute inset-y-0 left-0 bg-primary/10 transition-all duration-500"
        style={{ width: `${progressWidth}%` }}
      />

      <div className="relative flex items-center gap-4">
        {/* Rank badge */}
        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-display font-bold ${getRankStyle()}`}>
          {rank === 1 ? <Trophy className="h-5 w-5" /> : rank}
        </div>

        {/* Name and weight info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-bold truncate">{member.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{member.startingWeight} lbs</span>
            <span>→</span>
            <span className="text-foreground">{member.currentWeight} lbs</span>
          </div>
        </div>

        {/* Percentage loss */}
        <div className="flex items-center gap-2 text-right">
          {getTrendIcon()}
          <div>
            <p className={`font-display text-xl font-bold ${
              percentLoss > 0 ? "text-primary" : percentLoss < 0 ? "text-destructive" : "text-muted-foreground"
            }`}>
              {percentLoss > 0 ? "-" : percentLoss < 0 ? "+" : ""}{Math.abs(percentLoss).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">loss</p>
          </div>
        </div>
      </div>

      {/* Fines indicator */}
      {member.fines > 0 && (
        <div className="mt-2 flex items-center gap-1 text-xs text-destructive">
          <span>Fines: ${member.fines}</span>
        </div>
      )}
    </motion.div>
  );
};
