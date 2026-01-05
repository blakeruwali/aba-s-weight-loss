import { motion } from "framer-motion";
import { Skull, Frown, TrendingDown, AlertTriangle } from "lucide-react";
import type { Member } from "@/data/members";
import { lastPlaceRoasts, getRandomRoast } from "@/lib/roasts";

interface WallOfShameProps {
  members: { member: Member; percentLoss: number; rank: number }[];
}

export const WallOfShame = ({ members }: WallOfShameProps) => {
  // Get bottom 3 members
  const bottom3 = members.slice(-3).reverse();

  if (bottom3.length === 0) return null;

  const shameLabels = [
    "The Struggle is Real",
    "Almost There... Maybe", 
    "Chief Motivation Officer"
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-4 py-12"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-destructive border border-destructive/20 mb-4"
          >
            <Skull className="h-5 w-5" />
            <span className="font-display font-bold">THE STRUGGLE BUS</span>
            <Skull className="h-5 w-5" />
          </motion.div>
          <p className="text-muted-foreground text-sm">
            These brave souls are fighting gravity... and losing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bottom3.map((entry, index) => (
            <motion.div
              key={entry.member.id}
              initial={{ opacity: 0, y: 20, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl border border-destructive/30 bg-gradient-to-br from-destructive/5 to-destructive/10 p-6 shadow-lg"
            >
              {/* Animated crying emoji */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.3 }}
              >
                <span className="text-2xl">😢</span>
              </motion.div>

              {/* Red glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-destructive/10 via-transparent to-destructive/10"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />

              <div className="relative">
                {/* Rank skull */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: index * 0.2 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 mx-auto mb-3"
                >
                  {index === 0 ? (
                    <Skull className="h-6 w-6 text-destructive" />
                  ) : index === 1 ? (
                    <Frown className="h-6 w-6 text-destructive" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  )}
                </motion.div>

                <h3 className="font-display text-lg font-bold text-center mb-1">
                  {entry.member.name}
                </h3>
                
                <p className="text-xs text-destructive font-medium text-center mb-2">
                  {shameLabels[index]}
                </p>

                <div className="flex items-center justify-center gap-2 text-sm">
                  <TrendingDown className={`h-4 w-4 ${entry.percentLoss >= 0 ? 'text-primary rotate-180' : 'text-destructive'}`} />
                  <span className={`font-bold ${entry.percentLoss >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {entry.percentLoss > 0 ? "-" : "+"}{Math.abs(entry.percentLoss).toFixed(1)}%
                  </span>
                </div>

                {/* Random roast */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="mt-3 text-xs text-muted-foreground italic text-center border-t border-destructive/20 pt-3"
                >
                  "{getRandomRoast(lastPlaceRoasts)}"
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
