import { motion } from "framer-motion";
import type { StatusBadge as StatusBadgeType } from "@/lib/roasts";

interface StatusBadgeProps {
  badge: StatusBadgeType;
  index?: number;
}

export const StatusBadge = ({ badge, index = 0 }: StatusBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.1 }}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${badge.bgColor} ${badge.color}`}
    >
      <motion.span
        animate={{ 
          rotate: badge.type === "on-fire" ? [0, 10, -10, 0] : 0,
          scale: badge.type === "beast-mode" ? [1, 1.2, 1] : 1,
        }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        {badge.emoji}
      </motion.span>
      <span>{badge.label}</span>
    </motion.div>
  );
};
