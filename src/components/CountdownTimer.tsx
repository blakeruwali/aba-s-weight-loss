import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Flame } from "lucide-react";

interface CountdownTimerProps {
  targetDate: string;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ targetDate, label = "Next Weigh-In" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
        setIsUrgent(days < 2);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, unit }: { value: number; unit: string }) => (
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        key={value}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex h-14 w-14 items-center justify-center rounded-lg font-display text-2xl font-bold ${
          isUrgent 
            ? "bg-destructive/20 text-destructive border border-destructive/30" 
            : "bg-primary/20 text-primary border border-primary/30"
        }`}
      >
        {value.toString().padStart(2, "0")}
      </motion.div>
      <span className="mt-1 text-xs uppercase text-muted-foreground">{unit}</span>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-6 ${
        isUrgent 
          ? "border-destructive/30 bg-destructive/5" 
          : "border-primary/30 bg-primary/5"
      }`}
    >
      <div className="mb-4 flex items-center justify-center gap-2">
        {isUrgent ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            <Flame className="h-5 w-5 text-destructive" />
          </motion.div>
        ) : (
          <Clock className="h-5 w-5 text-primary" />
        )}
        <span className="font-display text-sm font-bold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <div className="flex items-center justify-center gap-2">
        <TimeBlock value={timeLeft.days} unit="Days" />
        <span className="mt-[-1rem] text-2xl text-muted-foreground">:</span>
        <TimeBlock value={timeLeft.hours} unit="Hrs" />
        <span className="mt-[-1rem] text-2xl text-muted-foreground">:</span>
        <TimeBlock value={timeLeft.minutes} unit="Min" />
        <span className="mt-[-1rem] text-2xl text-muted-foreground">:</span>
        <TimeBlock value={timeLeft.seconds} unit="Sec" />
      </div>

      {isUrgent && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-sm text-destructive"
        >
          ⚡ Time is running out! Get on that scale!
        </motion.p>
      )}
    </motion.div>
  );
};
