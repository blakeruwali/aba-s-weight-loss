import { motion } from "framer-motion";
import { Heart, Flame, Trophy } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl text-center"
      >
        <motion.div 
          className="mb-4 flex items-center justify-center gap-2"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Flame className="h-6 w-6 text-primary" />
          <Trophy className="h-6 w-6 text-accent" />
          <Flame className="h-6 w-6 text-primary" />
        </motion.div>
        
        <h3 className="font-display text-2xl font-bold mb-2">
          Let's Get It! 💪
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4">
          Every pound counts. Every checkpoint matters. Stay consistent!
        </p>
        
        <motion.p 
          className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          Made with <Heart className="h-3 w-3 text-destructive animate-scale-pulse" /> by Aba Dublauchha Long Island
        </motion.p>
      </motion.div>
    </footer>
  );
};
