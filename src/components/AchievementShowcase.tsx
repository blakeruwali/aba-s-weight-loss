import { motion } from "framer-motion";
import { Award, Lock } from "lucide-react";
import { members } from "@/data/members";
import { achievements, getMemberAchievements, getRarityColor, getRarityBorder } from "@/lib/achievements";

export const AchievementShowcase = () => {
  // Get all unlocked achievements across all members
  const unlockedByMember = members.map((member) => ({
    member,
    achievements: getMemberAchievements(member, members),
  }));

  // Count how many members have each achievement
  const achievementCounts = achievements.map((achievement) => ({
    achievement,
    count: unlockedByMember.filter((m) => 
      m.achievements.some((a) => a.id === achievement.id)
    ).length,
    members: unlockedByMember
      .filter((m) => m.achievements.some((a) => a.id === achievement.id))
      .map((m) => m.member.name),
  }));

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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full px-4 py-2 mb-4"
          >
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-amber-500 font-bold text-sm">ACHIEVEMENTS</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Unlockable Badges 🏅
          </h2>
          <p className="text-muted-foreground mt-2">
            Earn badges by hitting milestones
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievementCounts.map(({ achievement, count, members: unlockedBy }, index) => {
            const isUnlocked = count > 0;
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
                className={`relative rounded-xl p-4 border-2 transition-all ${
                  isUnlocked 
                    ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} ${getRarityBorder(achievement.rarity)}` 
                    : 'bg-muted/30 border-muted grayscale opacity-60'
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-xl">
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
                
                <motion.div
                  className="text-4xl text-center mb-2"
                  animate={isUnlocked ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {achievement.emoji}
                </motion.div>
                
                <h3 className="font-bold text-sm text-center text-white truncate">
                  {achievement.title}
                </h3>
                
                <p className="text-[10px] text-white/80 text-center mt-1 line-clamp-2">
                  {achievement.description}
                </p>
                
                {isUnlocked && (
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <p className="text-[10px] text-white/70 text-center">
                      {count === 1 ? unlockedBy[0] : `${count} members`}
                    </p>
                  </div>
                )}
                
                {/* Rarity indicator */}
                <div className="absolute top-1 right-1">
                  <span className={`text-[8px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    isUnlocked ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {achievement.rarity}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
