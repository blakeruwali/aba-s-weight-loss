import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Share2, Download, Trophy, TrendingDown, Scale } from "lucide-react";
import { members, calculateBMI, getMemberHeight } from "@/data/members";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const ShareCard = () => {
  const [selectedMember, setSelectedMember] = useState(members[0]);
  const cardRef = useRef<HTMLDivElement>(null);

  const percentLoss = ((selectedMember.startingWeight - selectedMember.currentWeight) / selectedMember.startingWeight) * 100;
  
  // Get height from localStorage or member data
  const storedHeight = getMemberHeight(selectedMember.id);
  const heightInches = storedHeight || selectedMember.heightInches;
  const hasBMI = heightInches != null && heightInches > 0;
  const bmi = hasBMI ? calculateBMI(selectedMember.currentWeight, heightInches) : null;
  
  const rank = [...members]
    .sort((a, b) => {
      const aLoss = (a.startingWeight - a.currentWeight) / a.startingWeight;
      const bLoss = (b.startingWeight - b.currentWeight) / b.startingWeight;
      return bLoss - aLoss;
    })
    .findIndex((m) => m.id === selectedMember.id) + 1;

  const copyShareText = () => {
    let text = `🏋️ ${selectedMember.name}'s Weight Loss Challenge Update!\n\n📊 Stats:\n• Rank: #${rank} of ${members.length}\n• Weight Loss: ${percentLoss.toFixed(1)}%\n• Current: ${selectedMember.currentWeight} lbs`;
    if (bmi) {
      text += `\n• BMI: ${bmi.toFixed(1)}`;
    }
    text += `\n\n💪 Aba Dublauchha Long Island Challenge`;
    navigator.clipboard.writeText(text);
    toast.success("Share text copied to clipboard!");
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full px-4 py-2 mb-4"
          >
            <Share2 className="w-5 h-5 text-pink-500" />
            <span className="text-pink-500 font-bold text-sm">SHARE CARDS</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Brag About Your Progress 📲
          </h2>
          <p className="text-muted-foreground mt-2">
            Generate shareable stats cards
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
          {/* Member Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Select member:
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

          {/* Share Card Preview */}
          <div
            ref={cardRef}
            className="bg-gradient-to-br from-background via-card to-muted rounded-xl p-6 border border-border"
          >
            <div className="text-center mb-4">
              <h3 className="font-display text-2xl font-bold">{selectedMember.name}</h3>
              <p className="text-muted-foreground text-sm">Aba Dublauchha Long Island</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <Trophy className={`w-6 h-6 mx-auto mb-1 ${rank <= 3 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                <p className="text-2xl font-bold">#{rank}</p>
                <p className="text-xs text-muted-foreground">Rank</p>
              </div>
              <div className="text-center">
                <TrendingDown className={`w-6 h-6 mx-auto mb-1 ${percentLoss > 0 ? 'text-primary' : 'text-destructive'}`} />
                <p className={`text-2xl font-bold ${percentLoss > 0 ? 'text-primary' : 'text-destructive'}`}>
                  {percentLoss > 0 ? '-' : '+'}{Math.abs(percentLoss).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Weight Change</p>
              </div>
              <div className="text-center">
                <Scale className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                <p className="text-2xl font-bold">{selectedMember.currentWeight}</p>
                <p className="text-xs text-muted-foreground">Current lbs</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm bg-muted/50 rounded-lg px-4 py-2">
              <span className="text-muted-foreground">Started: {selectedMember.startingWeight} lbs</span>
              {hasBMI && bmi && (
                <span className="text-muted-foreground">BMI: {bmi.toFixed(1)}</span>
              )}
            </div>

            {percentLoss >= 7 && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-4 bg-accent/20 text-accent rounded-lg px-4 py-2 text-center font-bold"
              >
                🎉 7% Goal Achieved! 🎉
              </motion.div>
            )}
          </div>

          {/* Share Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              onClick={copyShareText}
              className="flex-1 gap-2"
            >
              <Share2 className="w-4 h-4" />
              Copy Share Text
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("Screenshot the card above to share!")}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Save
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
