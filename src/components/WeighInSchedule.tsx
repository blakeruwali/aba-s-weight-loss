import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, Circle } from "lucide-react";
import { challengeConfig } from "@/data/members";

const generateSchedule = () => {
  const schedule = [];
  const startDate = new Date("2026-01-04"); // First Sunday
  const endDate = new Date(challengeConfig.finalCheckpoint);
  
  let currentDate = new Date(startDate);
  let weekNumber = 0;
  
  while (currentDate <= endDate) {
    schedule.push({
      date: new Date(currentDate),
      label: weekNumber === 0 ? "Starting Weigh-In" : 
             currentDate.getTime() === endDate.getTime() ? "Final Weigh-In" :
             `Week ${weekNumber}`,
      isPast: currentDate < new Date(),
      isFinal: currentDate.getTime() === endDate.getTime(),
    });
    
    currentDate.setDate(currentDate.getDate() + 7); // Every Sunday (weekly)
    weekNumber++;
  }
  
  return schedule;
};

export const WeighInSchedule = () => {
  const schedule = generateSchedule();
  const now = new Date();

  return (
    <section className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full px-4 py-2 mb-4"
          >
            <Calendar className="w-5 h-5 text-cyan-500" />
            <span className="text-cyan-500 font-bold text-sm">SCHEDULE</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Weigh-In Calendar 📅
          </h2>
          <p className="text-muted-foreground mt-2">
            Every Sunday at {challengeConfig.weighInTime}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-4">
            {schedule.map((item, index) => {
              const isNext = !item.isPast && (index === 0 || schedule[index - 1].isPast);
              
              return (
                <motion.div
                  key={item.date.toISOString()}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative flex items-center gap-4 pl-4 ${item.isFinal ? 'pb-0' : ''}`}
                >
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full ${
                    item.isPast 
                      ? 'bg-primary' 
                      : isNext 
                        ? 'bg-accent animate-pulse' 
                        : 'bg-muted border-2 border-border'
                  }`}>
                    {item.isPast ? (
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    ) : (
                      <Circle className="w-2 h-2" />
                    )}
                  </div>

                  {/* Card */}
                  <div className={`flex-1 rounded-xl p-4 transition-all ${
                    isNext 
                      ? 'bg-accent/20 border border-accent/50 shadow-lg' 
                      : item.isPast 
                        ? 'bg-muted/30' 
                        : 'bg-card/50 border border-border/50'
                  } ${item.isFinal ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30' : ''}`}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <p className={`font-semibold ${isNext ? 'text-accent' : item.isFinal ? 'text-yellow-500' : ''}`}>
                          {item.label}
                          {isNext && <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">NEXT</span>}
                          {item.isFinal && <span className="ml-2 text-xs">🏆</span>}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {item.date.toLocaleDateString('en-US', { 
                              weekday: 'short',
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{challengeConfig.weighInTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
