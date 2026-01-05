import type { Member } from "@/data/members";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  check: (member: Member, allMembers: Member[]) => boolean;
}

export const achievements: Achievement[] = [
  {
    id: "first-loss",
    title: "First Blood",
    description: "Lost weight at your first checkpoint",
    emoji: "🩸",
    rarity: "common",
    check: (member) => {
      if (member.weightHistory.length < 2) return false;
      return member.weightHistory[1].weight < member.weightHistory[0].weight;
    },
  },
  {
    id: "five-percent",
    title: "Halfway There",
    description: "Reached 5% weight loss",
    emoji: "🎯",
    rarity: "rare",
    check: (member) => {
      const percentLoss = ((member.startingWeight - member.currentWeight) / member.startingWeight) * 100;
      return percentLoss >= 5;
    },
  },
  {
    id: "goal-crusher",
    title: "Goal Crusher",
    description: "Hit the 7% target",
    emoji: "💪",
    rarity: "epic",
    check: (member) => {
      const percentLoss = ((member.startingWeight - member.currentWeight) / member.startingWeight) * 100;
      return percentLoss >= 7;
    },
  },
  {
    id: "overachiever",
    title: "Overachiever",
    description: "Lost more than 10%",
    emoji: "🚀",
    rarity: "legendary",
    check: (member) => {
      const percentLoss = ((member.startingWeight - member.currentWeight) / member.startingWeight) * 100;
      return percentLoss >= 10;
    },
  },
  {
    id: "streak-3",
    title: "Three-Peat",
    description: "Lost weight 3 checkpoints in a row",
    emoji: "🔥",
    rarity: "rare",
    check: (member) => {
      if (member.weightHistory.length < 4) return false;
      let streak = 0;
      for (let i = 1; i < member.weightHistory.length; i++) {
        if (member.weightHistory[i].weight < member.weightHistory[i - 1].weight) {
          streak++;
          if (streak >= 3) return true;
        } else {
          streak = 0;
        }
      }
      return false;
    },
  },
  {
    id: "perfect-attendance",
    title: "Perfect Attendance",
    description: "Never missed a weigh-in",
    emoji: "📅",
    rarity: "common",
    check: (member) => {
      return member.weightHistory.every((entry) => entry.attended);
    },
  },
  {
    id: "comeback-kid",
    title: "Comeback Kid",
    description: "Gained weight then lost more than gained",
    emoji: "🔄",
    rarity: "epic",
    check: (member) => {
      let hadGain = false;
      let recoveredAfterGain = false;
      let weightBeforeGain = member.startingWeight;
      
      for (let i = 1; i < member.weightHistory.length; i++) {
        if (member.weightHistory[i].weight > member.weightHistory[i - 1].weight) {
          hadGain = true;
          weightBeforeGain = member.weightHistory[i - 1].weight;
        } else if (hadGain && member.weightHistory[i].weight < weightBeforeGain) {
          recoveredAfterGain = true;
        }
      }
      
      return recoveredAfterGain;
    },
  },
  {
    id: "paid-up",
    title: "Money Talks",
    description: "Paid the full entry fee",
    emoji: "💵",
    rarity: "common",
    check: (member) => member.balancePaid === 100,
  },
  {
    id: "leading",
    title: "Top Dog",
    description: "Currently in first place",
    emoji: "👑",
    rarity: "legendary",
    check: (member, allMembers) => {
      const sorted = [...allMembers].sort((a, b) => {
        const aLoss = (a.startingWeight - a.currentWeight) / a.startingWeight;
        const bLoss = (b.startingWeight - b.currentWeight) / b.startingWeight;
        return bLoss - aLoss;
      });
      return sorted[0].id === member.id;
    },
  },
  {
    id: "underdog",
    title: "Underdog Rising",
    description: "Climbed at least 3 spots in rankings",
    emoji: "📈",
    rarity: "epic",
    check: () => false, // Would need historical rank data
  },
];

export const getMemberAchievements = (member: Member, allMembers: Member[]): Achievement[] => {
  return achievements.filter((achievement) => achievement.check(member, allMembers));
};

export const getRarityColor = (rarity: Achievement["rarity"]): string => {
  switch (rarity) {
    case "common": return "from-slate-400 to-slate-500";
    case "rare": return "from-blue-400 to-blue-600";
    case "epic": return "from-purple-400 to-purple-600";
    case "legendary": return "from-yellow-400 to-amber-500";
  }
};

export const getRarityBorder = (rarity: Achievement["rarity"]): string => {
  switch (rarity) {
    case "common": return "border-slate-500/50";
    case "rare": return "border-blue-500/50";
    case "epic": return "border-purple-500/50";
    case "legendary": return "border-yellow-500/50";
  }
};
