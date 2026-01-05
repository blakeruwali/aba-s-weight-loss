import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, ChevronDown, Trophy, TrendingDown, Scale, DollarSign } from "lucide-react";
import { members, calculateFines, calculateBMI } from "@/data/members";
import { Button } from "./ui/button";

export const HeadToHead = () => {
  const [fighter1, setFighter1] = useState(members[0]);
  const [fighter2, setFighter2] = useState(members[1]);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const getStats = (member: typeof members[0]) => {
    const percentLoss = ((member.startingWeight - member.currentWeight) / member.startingWeight) * 100;
    const bmi = calculateBMI(member.currentWeight, member.heightInches);
    const fines = calculateFines(member);
    const rank = [...members]
      .sort((a, b) => {
        const aLoss = (a.startingWeight - a.currentWeight) / a.startingWeight;
        const bLoss = (b.startingWeight - b.currentWeight) / b.startingWeight;
        return bLoss - aLoss;
      })
      .findIndex((m) => m.id === member.id) + 1;
    
    return { percentLoss, bmi, fines, rank };
  };

  const stats1 = getStats(fighter1);
  const stats2 = getStats(fighter2);

  const comparisons = [
    { 
      label: "Weight Loss", 
      value1: `${stats1.percentLoss.toFixed(1)}%`, 
      value2: `${stats2.percentLoss.toFixed(1)}%`,
      winner: stats1.percentLoss > stats2.percentLoss ? 1 : stats1.percentLoss < stats2.percentLoss ? 2 : 0,
      icon: TrendingDown,
    },
    { 
      label: "Current Rank", 
      value1: `#${stats1.rank}`, 
      value2: `#${stats2.rank}`,
      winner: stats1.rank < stats2.rank ? 1 : stats1.rank > stats2.rank ? 2 : 0,
      icon: Trophy,
    },
    { 
      label: "BMI", 
      value1: stats1.bmi.toFixed(1), 
      value2: stats2.bmi.toFixed(1),
      winner: stats1.bmi < stats2.bmi ? 1 : stats1.bmi > stats2.bmi ? 2 : 0,
      icon: Scale,
    },
    { 
      label: "Fines Owed", 
      value1: `$${stats1.fines}`, 
      value2: `$${stats2.fines}`,
      winner: stats1.fines < stats2.fines ? 1 : stats1.fines > stats2.fines ? 2 : 0,
      icon: DollarSign,
    },
  ];

  const MemberSelector = ({ 
    selected, 
    onSelect, 
    showDropdown, 
    setShowDropdown,
    side 
  }: { 
    selected: typeof members[0];
    onSelect: (m: typeof members[0]) => void;
    showDropdown: boolean;
    setShowDropdown: (v: boolean) => void;
    side: 'left' | 'right';
  }) => (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full justify-between"
      >
        {selected.name}
        <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </Button>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute z-50 mt-2 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden ${side === 'right' ? 'right-0' : 'left-0'}`}
          >
            {members.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  onSelect(m);
                  setShowDropdown(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-muted transition-colors ${m.id === selected.id ? 'bg-primary/20' : ''}`}
              >
                {m.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full px-4 py-2 mb-4"
          >
            <Swords className="w-5 h-5 text-red-500" />
            <span className="text-red-500 font-bold text-sm">HEAD TO HEAD</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Battle of the Bulge
          </h2>
        </div>

        {/* Fighter Selection */}
        <div className="grid grid-cols-5 gap-4 mb-8 items-center">
          <div className="col-span-2">
            <MemberSelector
              selected={fighter1}
              onSelect={setFighter1}
              showDropdown={showDropdown1}
              setShowDropdown={setShowDropdown1}
              side="left"
            />
          </div>
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-3xl"
            >
              ⚔️
            </motion.div>
          </div>
          <div className="col-span-2">
            <MemberSelector
              selected={fighter2}
              onSelect={setFighter2}
              showDropdown={showDropdown2}
              setShowDropdown={setShowDropdown2}
              side="right"
            />
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="space-y-3">
          {comparisons.map((comp, index) => (
            <motion.div
              key={comp.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4"
            >
              <div className="grid grid-cols-3 items-center">
                <div className={`text-center ${comp.winner === 1 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                  <p className="text-2xl">{comp.value1}</p>
                  {comp.winner === 1 && <span className="text-xs">👑 Winner</span>}
                </div>
                
                <div className="text-center">
                  <comp.icon className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{comp.label}</p>
                </div>
                
                <div className={`text-center ${comp.winner === 2 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                  <p className="text-2xl">{comp.value2}</p>
                  {comp.winner === 2 && <span className="text-xs">👑 Winner</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Winner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          {stats1.percentLoss !== stats2.percentLoss && (
            <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-6 py-3">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">
                {stats1.percentLoss > stats2.percentLoss ? fighter1.name : fighter2.name} is winning!
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};
