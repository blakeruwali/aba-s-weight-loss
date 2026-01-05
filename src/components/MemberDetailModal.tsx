import { useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Scale, AlertCircle, CheckCircle, DollarSign, PartyPopper } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WeightChart } from "./WeightChart";
import confetti from "canvas-confetti";
import type { Member } from "@/data/members";
import { calculateFines } from "@/data/members";

interface MemberDetailModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

const triggerConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const colors = ['#CAEF5D', '#FFD700', '#00FF00', '#FFFFFF'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export const MemberDetailModal = ({ member, isOpen, onClose }: MemberDetailModalProps) => {
  if (!member) return null;

  const percentLoss = ((member.startingWeight - member.currentWeight) / member.startingWeight) * 100;
  const isWinning = percentLoss > 0;
  const calculatedFines = calculateFines(member);
  const goalWeight = member.startingWeight * 0.93;
  const weightToGoal = member.currentWeight - goalWeight;
  const goalProgress = Math.min((percentLoss / 7) * 100, 100);
  const hasReachedGoal = percentLoss >= 7;

  // Trigger confetti when modal opens and member has reached 7% goal
  useEffect(() => {
    if (isOpen && hasReachedGoal) {
      triggerConfetti();
    }
  }, [isOpen, hasReachedGoal]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border-border bg-gradient-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-display text-2xl">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                isWinning ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
              }`}
            >
              {isWinning ? <TrendingDown className="h-6 w-6" /> : <TrendingUp className="h-6 w-6" />}
            </motion.div>
            {member.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg border border-border bg-secondary/50 p-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Scale className="h-4 w-4" />
                <span className="text-xs uppercase">Starting</span>
              </div>
              <p className="font-display text-xl font-bold">{member.startingWeight} lbs</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-lg border border-border bg-secondary/50 p-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Scale className="h-4 w-4" />
                <span className="text-xs uppercase">Current</span>
              </div>
              <p className="font-display text-xl font-bold">{member.currentWeight} lbs</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-lg border p-4 ${
                isWinning 
                  ? "border-primary/30 bg-primary/10" 
                  : percentLoss < 0 
                    ? "border-destructive/30 bg-destructive/10" 
                    : "border-border bg-secondary/50"
              }`}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                {isWinning ? <TrendingDown className="h-4 w-4 text-primary" /> : <TrendingUp className="h-4 w-4 text-destructive" />}
                <span className="text-xs uppercase">% Change</span>
              </div>
              <p className={`font-display text-xl font-bold ${
                isWinning ? "text-primary" : percentLoss < 0 ? "text-destructive" : "text-muted-foreground"
              }`}>
                {isWinning ? "-" : "+"}{Math.abs(percentLoss).toFixed(1)}%
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className={`rounded-lg border p-4 ${
                calculatedFines > 0 
                  ? "border-destructive/30 bg-destructive/10" 
                  : "border-primary/30 bg-primary/10"
              }`}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-xs uppercase">Fines</span>
              </div>
              <p className={`font-display text-xl font-bold ${
                calculatedFines > 0 ? "text-destructive" : "text-primary"
              }`}>
                ${calculatedFines}
              </p>
            </motion.div>
          </div>

          {/* Goal Progress */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress to 7% Goal</span>
              <span className={goalProgress >= 100 ? "text-accent font-bold" : "text-foreground"}>
                {goalProgress.toFixed(0)}%
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goalProgress}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className={`h-full rounded-full ${
                  goalProgress >= 100 
                    ? "bg-gradient-to-r from-accent to-primary" 
                    : "bg-gradient-to-r from-primary to-primary/70"
                }`}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {weightToGoal > 0 
                ? `${weightToGoal.toFixed(1)} lbs to go for $50 refund`
                : (
                  <span className="flex items-center gap-1 text-accent font-medium">
                    <PartyPopper className="h-3 w-3" />
                    Eligible for $50 refund!
                    <PartyPopper className="h-3 w-3" />
                  </span>
                )
              }
            </p>
          </motion.div>

          {/* Goal Achieved Banner */}
          {hasReachedGoal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 p-4 border border-accent/30"
            >
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <PartyPopper className="h-6 w-6 text-accent" />
              </motion.div>
              <span className="font-display font-bold text-accent">7% GOAL ACHIEVED!</span>
              <motion.div
                animate={{ rotate: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <PartyPopper className="h-6 w-6 text-accent" />
              </motion.div>
            </motion.div>
          )}

          {/* Weight Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Weight Journey
            </h3>
            <WeightChart 
              weightHistory={member.weightHistory} 
              startingWeight={member.startingWeight}
            />
          </motion.div>

          {/* Payment Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`flex items-center gap-2 rounded-lg p-3 ${
              member.balancePaid > 0 
                ? "bg-primary/10 text-primary" 
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {member.balancePaid > 0 ? (
              <>
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Entry fee paid (${member.balancePaid})</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Entry fee not paid</span>
              </>
            )}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
