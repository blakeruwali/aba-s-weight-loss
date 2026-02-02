import { motion } from "framer-motion";
import { Crown, TrendingDown, Calendar } from "lucide-react";
import { members } from "@/data/members";
import { Card, CardContent } from "@/components/ui/card";

export const WeeklyWinner = () => {
  // Calculate weekly performance for each member
  const weeklyPerformance = members.map((member) => {
    const history = member.weightHistory;
    
    // Need at least 2 weigh-ins to calculate weekly change
    if (history.length < 2) {
      return {
        member,
        weeklyLoss: 0,
        weeklyPercentLoss: 0,
        previousWeight: member.startingWeight,
        currentWeight: member.currentWeight,
        latestDate: history[history.length - 1]?.date || "",
      };
    }

    const latestWeighIn = history[history.length - 1];
    const previousWeighIn = history[history.length - 2];
    
    const weeklyLoss = previousWeighIn.weight - latestWeighIn.weight;
    const weeklyPercentLoss = (weeklyLoss / previousWeighIn.weight) * 100;

    return {
      member,
      weeklyLoss,
      weeklyPercentLoss,
      previousWeight: previousWeighIn.weight,
      currentWeight: latestWeighIn.weight,
      latestDate: latestWeighIn.date,
    };
  });

  // Sort by weekly percent loss (highest first)
  const sorted = [...weeklyPerformance].sort(
    (a, b) => b.weeklyPercentLoss - a.weeklyPercentLoss
  );

  const winner = sorted[0];
  const runnerUp = sorted[1];
  const thirdPlace = sorted[2];

  // Format the latest weigh-in date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <section className="px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        <motion.div
          className="mb-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Crown className="h-7 w-7 text-accent" />
          </motion.div>
          <h2 className="font-display text-2xl font-bold">Weekly Winner</h2>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          >
            <TrendingDown className="h-7 w-7 text-primary" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6"
        >
          <Calendar className="h-4 w-4" />
          <span>Week ending {formatDate(winner.latestDate)}</span>
        </motion.div>

        {/* Winner Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-2 border-accent bg-gradient-to-br from-accent/20 via-accent/10 to-transparent">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg"
                  >
                    <Crown className="h-7 w-7" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">
                      This Week's Champion
                    </p>
                    <h3 className="font-display text-2xl font-bold">
                      {winner.member.name}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <motion.p
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="font-display text-3xl font-bold text-primary"
                  >
                    -{winner.weeklyPercentLoss.toFixed(2)}%
                  </motion.p>
                  <p className="text-sm text-muted-foreground">
                    {winner.previousWeight.toFixed(1)} → {winner.currentWeight.toFixed(1)} lbs
                  </p>
                  <p className="text-xs text-primary font-medium mt-1">
                    -{winner.weeklyLoss.toFixed(1)} lbs this week
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Runner-ups */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-bold">
                    2
                  </div>
                  <span className="font-semibold">{runnerUp.member.name}</span>
                </div>
                <p className="text-xl font-bold text-primary">
                  -{runnerUp.weeklyPercentLoss.toFixed(2)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  -{runnerUp.weeklyLoss.toFixed(1)} lbs
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-muted bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-bold">
                    3
                  </div>
                  <span className="font-semibold">{thirdPlace.member.name}</span>
                </div>
                <p className="text-xl font-bold">
                  -{thirdPlace.weeklyPercentLoss.toFixed(2)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  -{thirdPlace.weeklyLoss.toFixed(1)} lbs
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
