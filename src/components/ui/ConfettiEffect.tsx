import { motion } from "framer-motion";
import { memo } from "react";

interface ConfettiEffectProps {
  isVisible: boolean;
}

const ConfettiEffect = memo<ConfettiEffectProps>(({ isVisible }) => {
  if (!isVisible) return null;

  const particles = Array.from({ length: 40 }, (_, i) => {
    const left = Math.round(Math.random() * 100);
    const size = 6 + Math.round(Math.random() * 10);
    const delay = Math.random() * 0.5;
    const colors = ["#FF6B6B", "#FFD166", "#06D6A0", "#4ECDC4", "#9B5DE5"];

    return {
      id: i,
      left,
      size,
      delay,
      color: colors[i % colors.length],
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            background: particle.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: 800, opacity: 0, rotate: 360 }}
          transition={{
            duration: 2 + Math.random() * 1.5,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
});

ConfettiEffect.displayName = "ConfettiEffect";

export default ConfettiEffect;
