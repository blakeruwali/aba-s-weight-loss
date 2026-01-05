import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Shuffle, Copy, Check } from "lucide-react";
import { members, calculateFines } from "@/data/members";
import { Button } from "./ui/button";

const roastTemplates = [
  (name: string, stat: string) => `${name}'s diet plan: See food, eat food. ${stat}`,
  (name: string, stat: string) => `${name} thinks cardio is a type of coffee. ${stat}`,
  (name: string, stat: string) => `Breaking: ${name} caught negotiating with the scale. ${stat}`,
  (name: string, stat: string) => `${name}'s favorite exercise is jumping to conclusions. ${stat}`,
  (name: string, stat: string) => `Plot twist: ${name}'s gym membership is just for the parking. ${stat}`,
  (name: string, stat: string) => `${name} runs... late to every weigh-in. ${stat}`,
  (name: string, stat: string) => `Legend says ${name} once walked past a salad. ${stat}`,
  (name: string, stat: string) => `${name}'s workout routine: Lifting forks. ${stat}`,
  (name: string, stat: string) => `${name} thought this was a pizza challenge. ${stat}`,
  (name: string, stat: string) => `${name}'s scale filed for emotional damages. ${stat}`,
  (name: string, stat: string) => `Witnesses report ${name} made eye contact with a vegetable. ${stat}`,
  (name: string, stat: string) => `${name}'s cheat day has cheat days. ${stat}`,
];

export const TrashTalkGenerator = () => {
  const [selectedMember, setSelectedMember] = useState(members[0]);
  const [currentRoast, setCurrentRoast] = useState("");
  const [copied, setCopied] = useState(false);

  const generateRoast = () => {
    const percentLoss = ((selectedMember.startingWeight - selectedMember.currentWeight) / selectedMember.startingWeight) * 100;
    const fines = calculateFines(selectedMember);
    
    let stat = "";
    if (percentLoss < 0) {
      stat = `Currently UP ${Math.abs(percentLoss).toFixed(1)}%. Yikes.`;
    } else if (percentLoss === 0) {
      stat = `Still at ${selectedMember.currentWeight} lbs. The scale is bored.`;
    } else {
      stat = `Down ${percentLoss.toFixed(1)}%... barely.`;
    }
    
    if (fines > 0) {
      stat += ` Owes $${fines} in fines.`;
    }

    const template = roastTemplates[Math.floor(Math.random() * roastTemplates.length)];
    setCurrentRoast(template(selectedMember.name, stat));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentRoast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full px-4 py-2 mb-4"
          >
            <MessageSquare className="w-5 h-5 text-purple-500" />
            <span className="text-purple-500 font-bold text-sm">TRASH TALK</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Roast Generator 🔥
          </h2>
          <p className="text-muted-foreground mt-2">
            Generate custom trash talk for any member
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
          {/* Member Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Select your victim:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedMember.id === member.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {member.name}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateRoast}
            className="w-full mb-4 gap-2"
            size="lg"
          >
            <Shuffle className="w-5 h-5" />
            Generate Roast
          </Button>

          {/* Roast Display */}
          <AnimatePresence mode="wait">
            {currentRoast && (
              <motion.div
                key={currentRoast}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="relative bg-gradient-to-br from-primary/10 to-destructive/10 border border-primary/30 rounded-xl p-6"
              >
                <motion.span
                  className="absolute -top-3 -left-2 text-4xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  🔥
                </motion.span>
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  "{currentRoast}"
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-primary" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
