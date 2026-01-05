import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, TrendingUp, Ghost, AlertTriangle } from "lucide-react";
import { challengeConfig } from "@/data/members";
import { Slider } from "./ui/slider";

export const FineCalculator = () => {
  const [weightGains, setWeightGains] = useState(0);
  const [noShows, setNoShows] = useState(0);
  const [finalGain, setFinalGain] = useState(false);

  const checkpointFines = weightGains * challengeConfig.checkpointGainFine;
  const noShowFines = noShows * challengeConfig.noShowFine;
  const finalFine = finalGain ? challengeConfig.finalGainFine : 0;
  const totalFines = checkpointFines + noShowFines + finalFine;

  const scenarios = [
    { 
      label: "Perfect Run", 
      gains: 0, 
      noShows: 0, 
      final: false,
      emoji: "🏆",
      total: 0,
    },
    { 
      label: "One Slip", 
      gains: 1, 
      noShows: 0, 
      final: false,
      emoji: "😅",
      total: 15,
    },
    { 
      label: "Struggle Bus", 
      gains: 2, 
      noShows: 1, 
      final: false,
      emoji: "😬",
      total: 45,
    },
    { 
      label: "Total Disaster", 
      gains: 4, 
      noShows: 2, 
      final: true,
      emoji: "💀",
      total: 140,
    },
  ];

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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full px-4 py-2 mb-4"
          >
            <Calculator className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500 font-bold text-sm">FINE CALCULATOR</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            How Much Will You Owe? 💸
          </h2>
          <p className="text-muted-foreground mt-2">
            Preview your potential damage
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-6">
          {/* Weight Gains Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-destructive" />
                <span className="font-medium">Weight Gains at Checkpoints</span>
              </div>
              <span className="text-destructive font-bold">{weightGains} × ${challengeConfig.checkpointGainFine}</span>
            </div>
            <Slider
              value={[weightGains]}
              onValueChange={(v) => setWeightGains(v[0])}
              max={6}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>6</span>
            </div>
          </div>

          {/* No-Shows Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Ghost className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Missed Weigh-Ins</span>
              </div>
              <span className="text-muted-foreground font-bold">{noShows} × ${challengeConfig.noShowFine}</span>
            </div>
            <Slider
              value={[noShows]}
              onValueChange={(v) => setNoShows(v[0])}
              max={6}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>6</span>
            </div>
          </div>

          {/* Final Gain Toggle */}
          <div 
            onClick={() => setFinalGain(!finalGain)}
            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
              finalGain 
                ? 'bg-destructive/20 border border-destructive/50' 
                : 'bg-muted/50 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className={`w-4 h-4 ${finalGain ? 'text-destructive' : 'text-muted-foreground'}`} />
              <span className="font-medium">End heavier than start?</span>
            </div>
            <span className={`font-bold ${finalGain ? 'text-destructive' : 'text-muted-foreground'}`}>
              ${finalGain ? challengeConfig.finalGainFine : 0}
            </span>
          </div>

          {/* Total */}
          <motion.div
            key={totalFines}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-destructive/20 to-orange-500/20 border border-destructive/30 rounded-xl p-6 text-center"
          >
            <p className="text-muted-foreground mb-2">Total Fines</p>
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="w-8 h-8 text-destructive" />
              <span className="text-5xl font-display font-bold text-destructive">{totalFines}</span>
            </div>
            {totalFines > 50 && (
              <p className="text-sm text-muted-foreground mt-2">
                Maybe just... don't do this? 😬
              </p>
            )}
          </motion.div>

          {/* Quick Scenarios */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">Quick Scenarios:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.label}
                  onClick={() => {
                    setWeightGains(scenario.gains);
                    setNoShows(scenario.noShows);
                    setFinalGain(scenario.final);
                  }}
                  className="bg-muted/50 hover:bg-muted rounded-lg p-3 text-center transition-colors"
                >
                  <span className="text-2xl">{scenario.emoji}</span>
                  <p className="text-xs font-medium mt-1">{scenario.label}</p>
                  <p className="text-xs text-destructive">${scenario.total}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
