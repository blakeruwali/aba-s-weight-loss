import { motion } from "framer-motion";
import { Trophy, TrendingDown, TrendingUp, Minus, DollarSign, ChevronRight, Sparkles, Skull } from "lucide-react";
import type { Member } from "@/data/members";
import { calculateFines } from "@/data/members";
import { getMemberBadges, getMemberRoast } from "@/lib/roasts";
import { StatusBadge } from "./StatusBadge";

interface LeaderboardCardProps {
  member: Member;
  rank: number;
  percentLoss: number;
  index: number;
  totalMembers: number;
  onClick?: () => void;
}

export const LeaderboardCard = ({ member, rank, percentLoss, index, totalMembers, onClick }: LeaderboardCardProps) => {
  const calculatedFines = calculateFines(member);
  const hasReachedGoal = percentLoss >= 7;
  const isLastPlace = rank === totalMembers;
  const badges = getMemberBadges(member, percentLoss, rank, totalMembers);
  const roast = getMemberRoast(member, percentLoss, rank, totalMembers);
  
  const getRankStyle = () => {
    if (isLastPlace) return "bg-destructive/80 text-destructive-foreground";
    if (rank === 1) return "bg-gradient-gold text-accent-foreground animate-scale-pulse";
    if (rank === 2) return "bg-gradient-silver text-foreground";
    if (rank === 3) return "bg-gradient-bronze text-foreground";
    return "bg-secondary text-secondary-foreground";
  };

  const getCardStyle = () => {
    if (isLastPlace) return "border-destructive/50 shadow-[0_0_30px_hsl(0_80%_50%_/_0.3)]";
    if (hasReachedGoal) return "border-accent/60 shadow-[0_0_40px_hsl(75_80%_60%_/_0.4)]";
    if (rank === 1) return "border-accent/50 shadow-[0_0_30px_hsl(45_100%_55%_/_0.3)]";
    if (rank === 2) return "border-muted-foreground/30 shadow-[0_0_20px_hsl(220_10%_50%_/_0.2)]";
    if (rank === 3) return "border-orange-600/30 shadow-[0_0_20px_hsl(25_60%_50%_/_0.2)]";
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
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: isLastPlace ? 1.02 : 1.03, 
        x: 10,
        rotate: isLastPlace ? [0, 1, -1, 0] : 0,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden rounded-xl border bg-gradient-card p-4 shadow-card transition-all ${getCardStyle()}`}
    >
      {/* Last place special effects */}
      {isLastPlace && (
        <>
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <motion.div
            className="absolute -top-1 -left-1"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <span className="text-lg">💀</span>
          </motion.div>
        </>
      )}

      {/* Goal achieved sparkle effect */}
      {hasReachedGoal && (
        <>
          {/* Pulsing glow overlay */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          
          {/* Sparkle icons */}
          <motion.div
            className="absolute top-2 left-2"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <Sparkles className="h-4 w-4 text-accent" />
          </motion.div>
          <motion.div
            className="absolute bottom-2 right-12"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          >
            <Sparkles className="h-3 w-3 text-accent" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
          
          {/* Goal badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 + 0.7, type: "spring" }}
            className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg"
          >
            7% GOAL!
          </motion.div>
        </>
      )}

      {/* Shimmer effect for top 3 */}
      {rank <= 3 && !isLastPlace && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: index * 0.5 }}
        />
      )}

      {/* Progress bar background */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progressWidth}%` }}
        transition={{ delay: index * 0.08 + 0.5, duration: 1, ease: "easeOut" }}
        className={`absolute inset-y-0 left-0 ${isLastPlace ? 'bg-destructive/10' : 'bg-primary/10'}`}
      />

      <div className="relative flex items-center gap-4">
        {/* Rank badge */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.08 + 0.3, type: "spring", stiffness: 200 }}
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-display font-bold text-lg ${getRankStyle()}`}
        >
          {isLastPlace ? (
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
              <Skull className="h-6 w-6" />
            </motion.div>
          ) : rank === 1 ? (
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
              <Trophy className="h-6 w-6" />
            </motion.div>
          ) : rank}
        </motion.div>

        {/* Name and weight info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display text-lg font-bold truncate">{member.name}</h3>
            {badges.map((badge, i) => (
              <StatusBadge key={badge.type} badge={badge} index={i} />
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{member.startingWeight} lbs</span>
            <motion.span 
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              →
            </motion.span>
            <span className="text-foreground font-medium">{member.currentWeight} lbs</span>
          </div>
          {/* Roast message */}
          {roast && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.6 }}
              className="text-xs text-muted-foreground italic mt-1"
            >
              "{roast}"
            </motion.p>
          )}
        </div>

        {/* Percentage loss */}
        <div className="flex items-center gap-3 text-right">
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <div>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.4 }}
                className={`font-display text-xl font-bold ${
                  percentLoss > 0 ? "text-primary" : percentLoss < 0 ? "text-destructive" : "text-muted-foreground"
                }`}
              >
                {percentLoss > 0 ? "-" : percentLoss < 0 ? "+" : ""}{Math.abs(percentLoss).toFixed(1)}%
              </motion.p>
              <p className="text-xs text-muted-foreground">loss</p>
            </div>
          </div>
          
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Fines indicator */}
      {calculatedFines > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 + 0.5 }}
          className="mt-3 flex items-center gap-1 text-xs text-destructive bg-destructive/10 rounded-full px-3 py-1 w-fit"
        >
          <DollarSign className="h-3 w-3" />
          <span className="font-medium">Fines: ${calculatedFines}</span>
        </motion.div>
      )}

      {/* Unpaid badge - only show if no unpaid status badge */}
      {member.balancePaid === 0 && !badges.some(b => b.type === "unpaid") && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08 + 0.6 }}
          className="absolute top-2 right-2 text-xs bg-destructive/20 text-destructive rounded-full px-2 py-0.5 font-medium"
        >
          Unpaid
        </motion.div>
      )}
    </motion.div>
  );
};
