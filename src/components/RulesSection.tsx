import { motion } from "framer-motion";
import { 
  Ticket, 
  Gift, 
  AlertTriangle, 
  Calendar, 
  ShieldAlert, 
  Trophy, 
  Medal,
  ChevronDown
} from "lucide-react";
import { rules, challengeConfig } from "@/data/members";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const iconMap: Record<string, React.ReactNode> = {
  ticket: <Ticket className="h-5 w-5" />,
  gift: <Gift className="h-5 w-5" />,
  alert: <AlertTriangle className="h-5 w-5" />,
  calendar: <Calendar className="h-5 w-5" />,
  warning: <ShieldAlert className="h-5 w-5" />,
  trophy: <Trophy className="h-5 w-5" />,
  medal: <Medal className="h-5 w-5" />,
};

export const RulesSection = () => {
  return (
    <section className="px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="rules" className="rounded-lg border bg-gradient-card shadow-card">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h2 className="font-display text-xl font-bold">Challenge Rules</h2>
                  <p className="text-sm text-muted-foreground">Tap to expand</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4 pt-2">
                {rules.map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                      {iconMap[rule.icon]}
                    </div>
                    <p className="pt-1 text-foreground">{rule.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Important dates */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-secondary/50 p-4">
                  <p className="text-xs uppercase text-muted-foreground">Next Checkpoint</p>
                  <p className="font-display text-lg font-bold text-primary">{challengeConfig.nextCheckpoint}</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/50 p-4">
                  <p className="text-xs uppercase text-muted-foreground">Final Weigh-In</p>
                  <p className="font-display text-lg font-bold text-accent">{challengeConfig.finalCheckpoint}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </section>
  );
};
