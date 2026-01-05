import { useState, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import { playPop } from "@/lib/sounds";

export const useEasterEgg = (requiredClicks = 5, timeWindow = 1000) => {
  const [triggered, setTriggered] = useState(false);
  const clickTimestamps = useRef<number[]>([]);

  const triggerEasterEgg = useCallback(() => {
    // Crazy confetti explosion
    const duration = 2000;
    const end = Date.now() + duration;

    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 75,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Also fire some from the center
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { y: 0.6 },
      colors,
    });

    setTriggered(true);
    setTimeout(() => setTriggered(false), 3000);
  }, []);

  const handleClick = useCallback(() => {
    const now = Date.now();
    clickTimestamps.current.push(now);

    // Remove old clicks outside the time window
    clickTimestamps.current = clickTimestamps.current.filter(
      (timestamp) => now - timestamp < timeWindow
    );

    // Check if we have enough rapid clicks
    if (clickTimestamps.current.length >= requiredClicks) {
      playPop();
      triggerEasterEgg();
      clickTimestamps.current = []; // Reset
    }
  }, [requiredClicks, timeWindow, triggerEasterEgg]);

  return { handleClick, triggered };
};
