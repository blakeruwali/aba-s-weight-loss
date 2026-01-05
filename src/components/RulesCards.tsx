import { motion } from "framer-motion";
import { 
  Ticket, 
  Gift, 
  AlertTriangle, 
  Calendar, 
  ShieldAlert, 
  Trophy, 
  Medal,
  Flame
} from "lucide-react";
import { rules, challengeConfig } from "@/data/members";

const iconMap: Record<string, React.ReactNode> = {
  ticket: <Ticket className="h-6 w-6" />,
  gift: <Gift className="h-6 w-6" />,
  alert: <AlertTriangle className="h-6 w-6" />,
  calendar: <Calendar className="h-6 w-6" />,
  warning: <ShieldAlert className="h-6 w-6" />,
  trophy: <Trophy className="h-6 w-6" />,
  medal: <Medal className="h-6 w-6" />,
};

const typeStyles: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  entry: { 
    bg: "bg-secondary/50", 
    border: "border-border", 
    text: "text-foreground",
    glow: ""
  },
  reward: { 
    bg: "bg-primary/10", 
    border: "border-primary/30", 
    text: "text-primary",
    glow: "shadow-[0_0_20px_hsl(90_70%_50%_/_0.2)]"
  },
  penalty: { 
    bg: "bg-destructive/10", 
    border: "border-destructive/30", 
    text: "text-destructive",
    glow: ""
  },
  prize: { 
    bg: "bg-accent/10", 
    border: "border-accent/30", 
    text: "text-accent",
    glow: "shadow-[0_0_20px_hsl(45_100%_55%_/_0.2)]"
  },
};

export const RulesCards = () => {
  return (
    <section className="px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 flex items-center justify-center gap-3">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Flame className="h-8 w-8 text-accent" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold">Challenge Rules</h2>
          <motion.div
            animate={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          >
            <Flame className="h-8 w-8 text-accent" />
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((rule, index) => {
            const style = typeStyles[rule.type] || typeStyles.entry;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className={`relative overflow-hidden rounded-xl border p-5 ${style.bg} ${style.border} ${style.glow}`}
              >
                {/* Shimmer effect for prize rules */}
                {rule.type === "prize" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  />
                )}
                
                <div className="relative flex items-start gap-4">
                  <motion.div
                    animate={rule.type === "penalty" ? { 
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                      rule.type === "prize" ? "bg-accent/20 text-accent" :
                      rule.type === "reward" ? "bg-primary/20 text-primary" :
                      rule.type === "penalty" ? "bg-destructive/20 text-destructive" :
                      "bg-secondary text-foreground"
                    }`}
                  >
                    {iconMap[rule.icon]}
                  </motion.div>
                  <p className={`pt-1 text-sm font-medium leading-relaxed ${style.text}`}>
                    {rule.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Important Dates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center"
          >
            <Calendar className="mx-auto mb-2 h-8 w-8 text-primary" />
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Next Checkpoint</p>
            <p className="font-display text-2xl font-bold text-primary">{challengeConfig.nextCheckpoint}</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center"
          >
            <Trophy className="mx-auto mb-2 h-8 w-8 text-accent" />
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Final Weigh-In</p>
            <p className="font-display text-2xl font-bold text-accent">{challengeConfig.finalCheckpoint}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
