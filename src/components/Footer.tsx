import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 text-primary">
          <Flame className="h-5 w-5" />
          <span className="font-display text-lg font-bold uppercase">
            Good Luck Guys... Let's Do This!
          </span>
          <Flame className="h-5 w-5" />
        </div>
        <p className="text-sm text-muted-foreground">
          Aba Dublauchha Long Island • Weight Loss Challenge 2025
        </p>
      </motion.div>
    </footer>
  );
};
