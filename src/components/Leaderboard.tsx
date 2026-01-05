import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import { members } from "@/data/members";
import { LeaderboardCard } from "./LeaderboardCard";
import { MemberDetailModal } from "./MemberDetailModal";
import type { Member } from "@/data/members";

export const Leaderboard = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const sortedMembers = [...members].sort((a, b) => {
    const aLoss = ((a.startingWeight - a.currentWeight) / a.startingWeight) * 100;
    const bLoss = ((b.startingWeight - b.currentWeight) / b.startingWeight) * 100;
    return bLoss - aLoss;
  });

  return (
    <section className="px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        <motion.div 
          className="mb-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Flame className="h-8 w-8 text-primary" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold">Live Leaderboard</h2>
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          >
            <Trophy className="h-8 w-8 text-accent" />
          </motion.div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-6 text-sm"
        >
          Tap any card to see detailed stats and weight chart
        </motion.p>

        <div className="space-y-3">
          {sortedMembers.map((member, index) => {
            const percentLoss = ((member.startingWeight - member.currentWeight) / member.startingWeight) * 100;
            return (
              <LeaderboardCard
                key={member.id}
                member={member}
                rank={index + 1}
                percentLoss={percentLoss}
                index={index}
                onClick={() => setSelectedMember(member)}
              />
            );
          })}
        </div>
      </motion.div>

      <MemberDetailModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
};
