import { motion } from "framer-motion";
import { TrendingDown, Target, AlertTriangle, CheckCircle } from "lucide-react";
import { members, challengeConfig } from "@/data/members";

interface Projection {
  member: typeof members[0];
  currentLoss: number;
  projectedLoss: number;
  willHitGoal: boolean;
  weeksRemaining: number;
  weeklyRateNeeded: number;
}

const calculateProjections = (): Projection[] => {
  const finalDate = new Date(challengeConfig.finalCheckpoint);
  const now = new Date();
  const weeksRemaining = Math.max(1, Math.ceil((finalDate.getTime() - now.getTime()) / (7 * 24 * 60 * 60 * 1000)));
  
  return members.map((member) => {
    const currentLoss = ((member.startingWeight - member.currentWeight) / member.startingWeight) * 100;
    
    // Calculate weekly rate based on history
    const weeksSinceStart = member.weightHistory.length > 1 
      ? Math.max(1, (new Date(member.weightHistory[member.weightHistory.length - 1].date).getTime() - 
          new Date(member.weightHistory[0].date).getTime()) / (7 * 24 * 60 * 60 * 1000))
      : 1;
    
    const weeklyRate = currentLoss / weeksSinceStart;
    const projectedLoss = currentLoss + (weeklyRate * weeksRemaining);
    
    // Weight needed to lose to hit 7%
    const targetWeight = member.startingWeight * 0.93;
    const weightToLose = member.currentWeight - targetWeight;
    const weeklyWeightNeeded = weightToLose / weeksRemaining;
    const weeklyRateNeeded = (weeklyWeightNeeded / member.currentWeight) * 100;
    
    return {
      member,
      currentLoss,
      projectedLoss: Math.min(projectedLoss, 15), // Cap at 15%
      willHitGoal: projectedLoss >= 7,
      weeksRemaining,
      weeklyRateNeeded: Math.max(0, weeklyRateNeeded),
    };
  }).sort((a, b) => b.projectedLoss - a.projectedLoss);
};

export const ProgressProjections = () => {
  const projections = calculateProjections();

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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full px-4 py-2 mb-4"
          >
            <Target className="w-5 h-5 text-blue-500" />
            <span className="text-blue-500 font-bold text-sm">PROJECTIONS</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Crystal Ball Predictions
          </h2>
          <p className="text-muted-foreground mt-2">
            Where everyone's headed if they keep this pace
          </p>
        </div>

        <div className="space-y-3">
          {projections.map((proj, index) => (
            <motion.div
              key={proj.member.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center font-bold shrink-0">
                    {proj.member.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{proj.member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Currently: {proj.currentLoss.toFixed(1)}% lost
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Projection bar */}
                  <div className="hidden sm:block w-32">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(proj.projectedLoss / 10 * 100, 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                        className={`h-full rounded-full ${proj.willHitGoal ? 'bg-primary' : 'bg-destructive'}`}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>0%</span>
                      <span className="text-primary">7%</span>
                      <span>10%</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <TrendingDown className={`w-4 h-4 ${proj.willHitGoal ? 'text-primary' : 'text-destructive'}`} />
                      <span className={`font-bold ${proj.willHitGoal ? 'text-primary' : 'text-destructive'}`}>
                        {proj.projectedLoss.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">projected</p>
                  </div>

                  {proj.willHitGoal ? (
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <div className="flex items-center gap-1 text-destructive shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-[10px]">Need {proj.weeklyRateNeeded.toFixed(1)}%/wk</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
