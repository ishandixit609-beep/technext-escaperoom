import { useEffect } from 'react';
import { motion } from 'framer-motion';
import HologramButton from '../components/HologramButton';
import JediCharacter from '../components/JediCharacter';
import { play } from '../sound';
import { CHARACTERS } from '../config/gameConfig';

export default function VictoryScreen({ onEnd, score }) {
  useEffect(() => { const t = setTimeout(() => play('victory'), 800); return () => clearTimeout(t); }, []);
  const fade = (d) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: d, duration: 1.4 } });
  return (
    <div className="stage center">
      <JediCharacter image={CHARACTERS.yoda} position="bottom-right" width={15} opacity={0.22} />
      <motion.svg className="holocron" viewBox="0 0 200 200" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 3.2, ease: 'easeOut' }}>
        <polygon points="100,8 184,100 100,192 16,100" fill="none" strokeWidth="2" />
        <polygon points="100,44 148,100 100,156 52,100" fill="rgba(57,255,136,.12)" strokeWidth="1.5" />
        <line x1="100" y1="8" x2="100" y2="192" strokeWidth="1" /><line x1="16" y1="100" x2="184" y2="100" strokeWidth="1" />
        <circle cx="100" cy="100" r="14" strokeWidth="2" fill="rgba(57,255,136,.35)" />
      </motion.svg>
      <motion.h1 {...fade(2.4)}>HOLOCRON UNLOCKED</motion.h1>
      <motion.div {...fade(3.4)}><p className="label">JEDI SURVIVAL PROTOCOL · COMPLETE</p><p className="quote big-quote">THE FORCE IS WITH YOU.</p></motion.div>
      <motion.div {...fade(4.4)}>
        <p className="note">TEAM SCORE {score}</p>
        <HologramButton hold={1500} onClick={onEnd}>HOLD TO END TRANSMISSION</HologramButton>
      </motion.div>
    </div>
  );
}
