import { motion } from "framer-motion";
import { Dumbbell, Flame, Apple, Heart, Zap } from "lucide-react";

const icons = [Dumbbell, Flame, Apple, Heart, Zap];

interface Particle {
  id: number;
  icon: typeof Dumbbell;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export const FloatingParticles = () => {
  const particles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    icon: icons[i % icons.length],
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 10,
    size: 12 + Math.random() * 12,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => {
        const Icon = particle.icon;
        return (
          <motion.div
            key={particle.id}
            className="absolute text-primary/10"
            initial={{ 
              x: `${particle.x}vw`, 
              y: "100vh",
              rotate: 0,
              opacity: 0 
            }}
            animate={{ 
              y: "-20vh",
              rotate: 360,
              opacity: [0, 0.3, 0.3, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Icon style={{ width: particle.size, height: particle.size }} />
          </motion.div>
        );
      })}
    </div>
  );
};
