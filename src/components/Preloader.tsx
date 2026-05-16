import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 2800);
    const t2 = setTimeout(() => onComplete(), 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#070A10] overflow-hidden"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
              style={{ background: 'radial-gradient(circle, rgba(196,147,63,0.10) 0%, transparent 68%)' }} />
          </div>

          {/* Outer slow ring */}
          <motion.div
            className="absolute rounded-full border border-white/[0.06]"
            style={{ width: 260, height: 260 }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
          />

          {/* Mid gold ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 190, height: 190,
              border: '1px solid transparent',
              borderTopColor: 'rgba(196,147,63,0.7)',
              borderRightColor: 'rgba(196,147,63,0.15)',
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
          />

          {/* Inner ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 136, height: 136,
              border: '1px solid transparent',
              borderBottomColor: 'rgba(196,147,63,0.5)',
              borderLeftColor: 'rgba(196,147,63,0.1)',
            }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
          />

          {/* J Icon — central, no text */}
          <motion.div
            className="relative z-10 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src="/jaabili-j-icon.png"
              alt="Jaabili"
              className="w-14 h-14 object-contain"
              animate={{
                filter: [
                  'drop-shadow(0 0 6px rgba(196,147,63,0.35))',
                  'drop-shadow(0 0 20px rgba(196,147,63,0.85))',
                  'drop-shadow(0 0 6px rgba(196,147,63,0.35))',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Corner accents */}
          {['top-8 left-8 border-t border-l', 'top-8 right-8 border-t border-r',
            'bottom-8 left-8 border-b border-l', 'bottom-8 right-8 border-b border-r'].map((cls, i) => (
            <motion.div key={i}
              className={`absolute w-6 h-6 border-primary/25 ${cls}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }} />
          ))}

          {/* Gold bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0, transformOrigin: 'left center' }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
