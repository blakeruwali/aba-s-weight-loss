import type { Member } from "@/data/members";

export interface Superlative {
  title: string;
  emoji: string;
  description: string;
  getMember: (members: Member[]) => Member | null;
}

export const superlatives: Superlative[] = [
  {
    title: "Most Likely to Blame the Scale",
    emoji: "⚖️",
    description: "Has gained weight at least once",
    getMember: (members) => {
      const gainers = members.filter((m) =>
        m.weightHistory.some((entry, i) => {
          if (i === 0) return false;
          return entry.weight > m.weightHistory[i - 1].weight;
        })
      );
      return gainers[Math.floor(Math.random() * gainers.length)] || null;
    },
  },
  {
    title: "Wallet's Best Friend",
    emoji: "💰",
    description: "Paid in full, no fines",
    getMember: (members) => {
      const paidUp = members.filter((m) => {
        const hasMissed = m.weightHistory.some((e) => !e.attended);
        const hasGained = m.weightHistory.some((e, i) => {
          if (i === 0) return false;
          return e.weight > m.weightHistory[i - 1].weight;
        });
        return m.balancePaid === 100 && !hasMissed && !hasGained;
      });
      return paidUp[0] || members.find((m) => m.balancePaid === 100) || null;
    },
  },
  {
    title: "Ghost Champion",
    emoji: "👻",
    description: "Most mysterious attendance",
    getMember: (members) => {
      let maxMissed = 0;
      let ghost: Member | null = null;
      members.forEach((m) => {
        const missed = m.weightHistory.filter((e) => !e.attended).length;
        if (missed > maxMissed) {
          maxMissed = missed;
          ghost = m;
        }
      });
      return ghost;
    },
  },
  {
    title: "The Overachiever",
    emoji: "🏆",
    description: "Already crushed their goal",
    getMember: (members) => {
      const achievers = members.filter((m) => {
        const current = m.weightHistory[m.weightHistory.length - 1]?.weight || m.startingWeight;
        const percentLoss = ((m.startingWeight - current) / m.startingWeight) * 100;
        return percentLoss >= 7;
      });
      return achievers[0] || null;
    },
  },
  {
    title: "Steady Eddie",
    emoji: "🐢",
    description: "Slow and steady progress",
    getMember: (members) => {
      const steady = members.filter((m) => {
        const losses = m.weightHistory.every((entry, i) => {
          if (i === 0) return true;
          return entry.weight <= m.weightHistory[i - 1].weight;
        });
        const current = m.weightHistory[m.weightHistory.length - 1]?.weight || m.startingWeight;
        const percentLoss = ((m.startingWeight - current) / m.startingWeight) * 100;
        return losses && percentLoss > 0 && percentLoss < 4;
      });
      return steady[0] || null;
    },
  },
  {
    title: "The Procrastinator",
    emoji: "💸",
    description: "Still hasn't paid up",
    getMember: (members) => {
      return members.find((m) => m.balancePaid === 0) || null;
    },
  },
];

export const getSuperlatives = (members: Member[]) => {
  return superlatives
    .map((s) => ({
      ...s,
      member: s.getMember(members),
    }))
    .filter((s) => s.member !== null);
};
