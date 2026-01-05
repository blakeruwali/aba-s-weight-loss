import { motion } from "framer-motion";
import { members } from "@/data/members";
import { LeaderboardCard } from "./LeaderboardCard";

export const Leaderboard = () => {
  // Calculate percentage loss and sort by it
  const rankedMembers = members
    .map((member) => ({
      ...member,
      percentLoss: ((member.startingWeight - member.currentWeight) / member.startingWeight) * 100,
    }))
    .sort((a, b) => b.percentLoss - a.percentLoss);

  return (
    <section className="px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-display text-3xl font-bold md:text-4xl">
            Leaderboard
          </h2>
          <p className="text-muted-foreground">
            Ranked by percentage weight loss
          </p>
        </div>

        <div className="space-y-3">
          {rankedMembers.map((member, index) => (
            <LeaderboardCard
              key={member.id}
              member={member}
              rank={index + 1}
              percentLoss={member.percentLoss}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
