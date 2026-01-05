import type { Member } from "@/data/members";
import { calculateFines } from "@/data/members";

// Roast messages based on member status
export const gainingWeightRoasts = [
  "Did someone say unlimited khasi?",
  "The scale asked for emotional support",
  "Plot twist: You're cultivating mass",
  "Gravity seems extra strong on you today",
  "The diet starts... eventually",
  "Emotional eating champion 🏆",
  "Stress eating is cardio, right?",
];

export const lastPlaceRoasts = [
  "Someone has to hold the L",
  "At least you're consistent... at losing",
  "Your wallet is doing better than your diet",
  "Last but... no, just last",
  "The participation trophy goes to...",
  "Honorary Cheeseburger Ambassador",
  "Chief Motivation Officer (for everyone else)",
];

export const noProgressRoasts = [
  "Are you even trying or just here for the group chat?",
  "Standing still is a bold strategy",
  "The scale is confused too",
  "Maintaining is winning... sort of",
  "At least you didn't gain?",
  "Consistency is key (even at nothing)",
];

export const unpaidRoasts = [
  "Can't afford the entry fee after all those DoorDash orders?",
  "Money's tight after the buffet runs",
  "Payment pending... like your workout",
  "Venmo works, just saying",
  "The $100 won't diet itself",
];

export const missedWeighInRoasts = [
  "Ghost mode activated 👻",
  "Too scared to face the scale?",
  "Witness protection for weight gainers",
  "Strategic absence detected",
  "The scale misses you (not really)",
];

export type BadgeType = 
  | "on-fire" 
  | "khasi-suspect" 
  | "ghost-mode" 
  | "slowpoke" 
  | "danger-zone" 
  | "beast-mode"
  | "last-place"
  | "unpaid";

export interface StatusBadge {
  type: BadgeType;
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
}

export const statusBadges: Record<BadgeType, StatusBadge> = {
  "on-fire": {
    type: "on-fire",
    label: "On Fire",
    emoji: "🔥",
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
  },
  "khasi-suspect": {
    type: "khasi-suspect",
    label: "Khasi Suspect",
    emoji: "🍖",
    color: "text-amber-600",
    bgColor: "bg-amber-500/20",
  },
  "ghost-mode": {
    type: "ghost-mode",
    label: "Ghost Mode",
    emoji: "👻",
    color: "text-slate-400",
    bgColor: "bg-slate-400/20",
  },
  "slowpoke": {
    type: "slowpoke",
    label: "Slowpoke",
    emoji: "🐌",
    color: "text-yellow-600",
    bgColor: "bg-yellow-500/20",
  },
  "danger-zone": {
    type: "danger-zone",
    label: "Danger Zone",
    emoji: "💀",
    color: "text-red-500",
    bgColor: "bg-red-500/20",
  },
  "beast-mode": {
    type: "beast-mode",
    label: "Beast Mode",
    emoji: "💪",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
  },
  "last-place": {
    type: "last-place",
    label: "Holding the L",
    emoji: "📉",
    color: "text-red-600",
    bgColor: "bg-red-600/20",
  },
  "unpaid": {
    type: "unpaid",
    label: "Payment Pending",
    emoji: "💸",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
  },
};

export const getRandomRoast = (roasts: string[]): string => {
  return roasts[Math.floor(Math.random() * roasts.length)];
};

export const getMemberBadges = (
  member: Member, 
  percentLoss: number, 
  rank: number, 
  totalMembers: number
): StatusBadge[] => {
  const badges: StatusBadge[] = [];
  const fines = calculateFines(member);
  
  // Check for weight gain (Khasi Suspect)
  const hasGainedWeight = member.weightHistory.some((entry, i) => {
    if (i === 0) return false;
    return entry.weight > member.weightHistory[i - 1].weight;
  });
  
  // Check for missed weigh-ins (Ghost Mode)
  const hasMissedWeighIn = member.weightHistory.some(entry => !entry.attended);
  
  // Danger Zone - currently at or above starting weight
  if (percentLoss < 0) {
    badges.push(statusBadges["danger-zone"]);
  }
  
  // Khasi Suspect - gained weight at any checkpoint
  if (hasGainedWeight) {
    badges.push(statusBadges["khasi-suspect"]);
  }
  
  // Ghost Mode - missed a weigh-in
  if (hasMissedWeighIn) {
    badges.push(statusBadges["ghost-mode"]);
  }
  
  // Beast Mode - on track for 7% goal (4%+ already)
  if (percentLoss >= 4) {
    badges.push(statusBadges["beast-mode"]);
  }
  
  // On Fire - good progress (2-4%)
  if (percentLoss >= 2 && percentLoss < 4) {
    badges.push(statusBadges["on-fire"]);
  }
  
  // Slowpoke - least progress but still positive
  if (rank === totalMembers - 1 && percentLoss > 0 && percentLoss < 2) {
    badges.push(statusBadges["slowpoke"]);
  }
  
  // Last Place special treatment
  if (rank === totalMembers) {
    badges.push(statusBadges["last-place"]);
  }
  
  // Unpaid
  if (member.balancePaid === 0) {
    badges.push(statusBadges["unpaid"]);
  }
  
  return badges.slice(0, 2); // Max 2 badges per card
};

export const getMemberRoast = (
  member: Member, 
  percentLoss: number, 
  rank: number, 
  totalMembers: number
): string | null => {
  // Priority order for roasts
  if (rank === totalMembers) {
    return getRandomRoast(lastPlaceRoasts);
  }
  
  if (percentLoss < 0) {
    return getRandomRoast(gainingWeightRoasts);
  }
  
  const hasMissedWeighIn = member.weightHistory.some(entry => !entry.attended);
  if (hasMissedWeighIn) {
    return getRandomRoast(missedWeighInRoasts);
  }
  
  if (member.balancePaid === 0) {
    return getRandomRoast(unpaidRoasts);
  }
  
  if (percentLoss === 0) {
    return getRandomRoast(noProgressRoasts);
  }
  
  return null;
};

export const funnyHeadlines = [
  "Where Wallets Get Lighter, Bodies Get Fighter",
  "12 Friends. 1 Scale. 0 Excuses.",
  "Putting the 'die' in 'diet' since January 2025",
  "Gym spelled backwards is Myg. That means nothing. Go workout.",
  "May the best loser win 💪",
  "The only place where losing is winning",
  "Sweating money, one weigh-in at a time",
  "Your excuses weigh more than you think",
];

export const getRandomHeadline = (): string => {
  return funnyHeadlines[Math.floor(Math.random() * funnyHeadlines.length)];
};
