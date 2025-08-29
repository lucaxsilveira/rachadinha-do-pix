import { motion } from "framer-motion";
import { memo } from "react";

interface EmojiFloatingEffectProps {
  emojis: Array<{ id: number; emoji: string }>;
}

const EmojiFloatingEffect = memo<EmojiFloatingEffectProps>(({ emojis }) => {
  if (emojis.length === 0) return null;

  return (
    <>
      {emojis.map((effect) => (
        <motion.div
          key={effect.id}
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -120, opacity: 0, scale: 1.7 }}
          transition={{ duration: 2 }}
          className="absolute text-4xl pointer-events-none"
          style={{ left: `${20 + Math.random() * 60}%` }}
        >
          {effect.emoji}
        </motion.div>
      ))}
    </>
  );
});

EmojiFloatingEffect.displayName = "EmojiFloatingEffect";

export default EmojiFloatingEffect;
