import { motion } from "framer-motion";
import { Flame, Snowflake, TrendingUp, TrendingDown } from "lucide-react";
import { members } from "@/data/members";

interface MomentumMember {
  member: typeof members[0];
  recentTrend: number; // Positive = losing weight, Negative = gaining
  isHot: boolean;
}

const calculateMomentum = (): { hot: MomentumMember[]; not: MomentumMember[] } => {
  const withMomentum: MomentumMember[] = members.map((member) => {
    const history = member.weightHistory;
    let recentTrend = 0;
    
    if (history.length >= 2) {
      const recent = history[history.length - 1].weight;
      const previous = history[history.length - 2].weight;
      recentTrend = ((previous - recent) / previous) * 100;
    } else {
      // No history yet, neutral
      recentTrend = 0;
    }
    
    return {
      member,
      recentTrend,
      isHot: recentTrend > 0,
    };
  });

  const hot = withMomentum
    .filter((m) => m.recentTrend > 0)
    .sort((a, b) => b.recentTrend - a.recentTrend)
    .slice(0, 3);

  const not = withMomentum
    .filter((m) => m.recentTrend <= 0)
    .sort((a, b) => a.recentTrend - b.recentTrend)
    .slice(0, 3);

  return { hot, not };
};

export const MomentumTracker = () => {
  const { hot, not } = calculateMomentum();
  const hasData = hot.length > 0 || not.length > 0;

  // If no momentum data yet (everyone is at starting weight), show a placeholder
  if (!hasData || (hot.length === 0 && not.every(m => m.recentTrend === 0))) {
    return (
      <section className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-orange-500/20 via-muted/20 to-blue-500/20 rounded-full px-6 py-3 mb-4">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="font-bold text-foreground">MOMENTUM TRACKER</span>
            <Snowflake className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Who's Hot 🔥 / Who's Not ❄️</h2>
          <p className="text-muted-foreground">Check back after the first weigh-in to see who's trending!</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-orange-500/20 via-muted/20 to-blue-500/20 rounded-full px-6 py-3 mb-4">
            <Flame className="w-6 h-6 text-orange-500" />
            <span className="font-bold text-foreground">MOMENTUM TRACKER</span>
            <Snowflake className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Who's Hot 🔥 / Who's Not ❄️
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Hot Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Flame className="w-6 h-6 text-orange-500" />
              </motion.div>
              <h3 className="font-bold text-orange-500">ON FIRE</h3>
            </div>
            
            {hot.length > 0 ? (
              <div className="space-y-3">
                {hot.map((m, index) => (
                  <motion.div
                    key={m.member.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-card/50 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{index === 0 ? '🔥' : index === 1 ? '🌶️' : '✨'}</span>
                      <span className="font-medium">{m.member.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <TrendingDown className="w-4 h-4" />
                      <span className="font-bold">-{m.recentTrend.toFixed(1)}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No one's on fire yet... 🥶</p>
            )}
          </motion.div>

          {/* Not Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Snowflake className="w-6 h-6 text-blue-400" />
              </motion.div>
              <h3 className="font-bold text-blue-400">ICE COLD</h3>
            </div>
            
            {not.length > 0 ? (
              <div className="space-y-3">
                {not.map((m, index) => (
                  <motion.div
                    key={m.member.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-card/50 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{index === 0 ? '🥶' : index === 1 ? '❄️' : '🧊'}</span>
                      <span className="font-medium">{m.member.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-destructive">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-bold">
                        {m.recentTrend === 0 ? 'No change' : `+${Math.abs(m.recentTrend).toFixed(1)}%`}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">Everyone's doing great! 🎉</p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
