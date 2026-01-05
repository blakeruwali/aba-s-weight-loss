export interface WeighIn {
  date: string;
  weight: number;
  attended: boolean;
}

export interface Member {
  id: string;
  name: string;
  balancePaid: number;
  startingWeight: number;
  currentWeight: number;
  fines: number;
  weightHistory: WeighIn[];
}

// Helper function to calculate fines based on weight history
export const calculateFines = (member: Member): number => {
  let totalFines = 0;
  
  for (let i = 1; i < member.weightHistory.length; i++) {
    const prev = member.weightHistory[i - 1];
    const curr = member.weightHistory[i];
    
    // $15 fine for weight gain at any checkpoint
    if (curr.weight > prev.weight) {
      totalFines += 15;
    }
    
    // $15 fine for no-show
    if (!curr.attended) {
      totalFines += 15;
    }
  }
  
  // $50 fine if ending weight > starting weight (only at final)
  if (member.weightHistory.length > 0) {
    const lastWeight = member.weightHistory[member.weightHistory.length - 1].weight;
    if (lastWeight > member.startingWeight) {
      totalFines += 50;
    }
  }
  
  return totalFines;
};

export const members: Member[] = [
  { 
    id: "1", 
    name: "Shikhar", 
    balancePaid: 0, 
    startingWeight: 221.9, 
    currentWeight: 221.9, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 221.9, attended: true }]
  },
  { 
    id: "2", 
    name: "Bivek", 
    balancePaid: 100, 
    startingWeight: 193, 
    currentWeight: 193, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 193, attended: true }]
  },
  { 
    id: "3", 
    name: "Suraj", 
    balancePaid: 100, 
    startingWeight: 163.1, 
    currentWeight: 163.1, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 163.1, attended: true }]
  },
  { 
    id: "4", 
    name: "Rabin", 
    balancePaid: 0, 
    startingWeight: 202.2, 
    currentWeight: 202.2, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 202.2, attended: true }]
  },
  { 
    id: "5", 
    name: "Rajeev", 
    balancePaid: 100, 
    startingWeight: 182.2, 
    currentWeight: 182.2, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 182.2, attended: true }]
  },
  { 
    id: "6", 
    name: "Pradeep", 
    balancePaid: 100, 
    startingWeight: 190.1, 
    currentWeight: 190.1, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 190.1, attended: true }]
  },
  { 
    id: "7", 
    name: "Danny", 
    balancePaid: 100, 
    startingWeight: 191.1, 
    currentWeight: 191.1, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 191.1, attended: true }]
  },
  { 
    id: "8", 
    name: "Purushottam", 
    balancePaid: 100, 
    startingWeight: 187.1, 
    currentWeight: 187.1, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 187.1, attended: true }]
  },
  { 
    id: "9", 
    name: "Bipul", 
    balancePaid: 0, 
    startingWeight: 163.1, 
    currentWeight: 163.1, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 163.1, attended: true }]
  },
  { 
    id: "10", 
    name: "Bishant", 
    balancePaid: 100, 
    startingWeight: 199.1, 
    currentWeight: 199.1, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 199.1, attended: true }]
  },
  { 
    id: "11", 
    name: "Bikram", 
    balancePaid: 100, 
    startingWeight: 195.1, 
    currentWeight: 195.1, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 195.1, attended: true }]
  },
  { 
    id: "12", 
    name: "Blake", 
    balancePaid: 100, 
    startingWeight: 157.6, 
    currentWeight: 157.6, 
    fines: 0,
    weightHistory: [{ date: "2025-01-04", weight: 157.6, attended: true }]
  },
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
  weighInFrequency: "biweekly",
  weighInTime: "2:00 PM",
  nextCheckpoint: "January 18, 2026",
  finalCheckpoint: "March 29, 2026",
};

export const rules = [
  { text: "$100 Entry to participate", icon: "ticket", type: "entry" },
  { text: "Lose 7%+ overall → Get $50 back", icon: "gift", type: "reward" },
  { text: "$15 fine if you gain weight at any checkpoint", icon: "alert", type: "penalty" },
  { text: "$15 fine for no-show at checkpoints", icon: "calendar", type: "penalty" },
  { text: "Weigh more at final than start → $50 fine", icon: "warning", type: "penalty" },
  { text: "Winner (highest % loss) gets 75% of pot", icon: "trophy", type: "prize" },
  { text: "Runner-up gets remaining 25%", icon: "medal", type: "prize" },
];
