export interface Member {
  id: string;
  name: string;
  balancePaid: number;
  startingWeight: number;
  currentWeight: number;
  fines: number;
}

export const members: Member[] = [
  { id: "1", name: "Shikhar", balancePaid: 100, startingWeight: 221.9, currentWeight: 221.9, fines: 0 },
  { id: "2", name: "Bivek", balancePaid: 100, startingWeight: 193, currentWeight: 193, fines: 0 },
  { id: "3", name: "Suraj", balancePaid: 100, startingWeight: 163.1, currentWeight: 163.1, fines: 0 },
  { id: "4", name: "Rabin", balancePaid: 100, startingWeight: 165.1, currentWeight: 165.1, fines: 0 },
  { id: "5", name: "Rajeev", balancePaid: 100, startingWeight: 200.2, currentWeight: 200.2, fines: 0 },
  { id: "6", name: "Pradeep", balancePaid: 100, startingWeight: 190.1, currentWeight: 190.1, fines: 0 },
  { id: "7", name: "Danny", balancePaid: 100, startingWeight: 191.1, currentWeight: 191.1, fines: 0 },
  { id: "8", name: "Purushottam", balancePaid: 100, startingWeight: 187.1, currentWeight: 187.1, fines: 0 },
  { id: "9", name: "Bipul", balancePaid: 100, startingWeight: 163.1, currentWeight: 163.1, fines: 0 },
  { id: "10", name: "Bishant", balancePaid: 100, startingWeight: 199.1, currentWeight: 199.1, fines: 0 },
  { id: "11", name: "Bikram", balancePaid: 100, startingWeight: 195.01, currentWeight: 195.01, fines: 0 },
  { id: "12", name: "Blake", balancePaid: 100, startingWeight: 157.6, currentWeight: 157.6, fines: 0 },
];

export const challengeConfig = {
  entryFee: 100,
  refundThreshold: 7, // 7% loss = $50 back
  refundAmount: 50,
  checkpointGainFine: 15,
  noShowFine: 15,
  finalGainFine: 50,
  winnerSplit: 0.75,
  runnerUpSplit: 0.25,
  nextCheckpoint: "January 18, 2025",
  finalCheckpoint: "March 29, 2025",
};

export const rules = [
  { text: "$100 Entry to participate", icon: "ticket" },
  { text: "Lose 7%+ overall → Get $50 back", icon: "gift" },
  { text: "$15 fine if you gain weight at any checkpoint", icon: "alert" },
  { text: "$15 fine for no-show at checkpoints", icon: "calendar" },
  { text: "Weigh more at final than start → $50 fine", icon: "warning" },
  { text: "Winner (highest % loss) gets 75% of pot", icon: "trophy" },
  { text: "Runner-up gets remaining 25%", icon: "medal" },
];
