import { motion } from "framer-motion";
import { Award, Sparkles } from "lucide-react";
import { members } from "@/data/members";
import { getSuperlatives } from "@/lib/superlatives";

export const Superlatives = () => {
  const awards = getSuperlatives(members);

  if (awards.length === 0) return null;

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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full px-4 py-2 mb-4"
          >
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500 font-bold text-sm">SUPERLATIVES</span>
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            The Unofficial Awards
          </h2>
          <p className="text-muted-foreground mt-2">
            Because everyone deserves recognition... even if it's questionable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {awards.slice(0, 6).map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                  className="text-4xl mb-3"
                >
                  {award.emoji}
                </motion.div>
                
                <h3 className="font-bold text-foreground text-sm mb-1">
                  {award.title}
                </h3>
                
                <p className="text-xs text-muted-foreground mb-3">
                  {award.description}
                </p>
                
                <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-sm font-bold">
                    {award.member?.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-foreground text-sm">
                    {award.member?.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
