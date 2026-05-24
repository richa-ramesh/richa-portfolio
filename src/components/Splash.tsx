import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fill the progress bar smoothly over 1.4 seconds
    const duration = 1400;
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, intervalTime);

    // Call onComplete after 1.6s
    const timeout = setTimeout(() => {
      onComplete();
    }, 1600);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.05,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center select-none"
    >
      <div className="relative flex flex-col items-center justify-center max-w-xs w-full px-4">
        {/* Monogram Outer Glow Ring */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent blur-xl"
        />

        {/* Logo Monogram */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center border border-indigo-500/25 rounded-2xl bg-[#090b11]/80 backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.15)] overflow-hidden">
          {/* Decorative Corner lines inside the monogram frame */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-indigo-400" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-indigo-400" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-indigo-400" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-indigo-400" />
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-display font-medium tracking-lighter bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-400 bg-clip-text text-transparent"
          >
            RR
          </motion.div>
        </div>

        {/* Text Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-sm font-mono tracking-[0.25em] text-indigo-400 uppercase">
            Richa Ramesh
          </h2>
          <p className="text-[10px] text-slate-500 tracking-wider mt-1 font-mono uppercase">
            Systems & ML Engineer
          </p>
        </motion.div>

        {/* Loading Progress Frame */}
        <div className="w-full h-[2px] bg-slate-900/80 rounded-full mt-12 overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between w-full mt-2 text-[8.5px] font-mono text-slate-600 uppercase tracking-widest px-1">
          <span>Initializing</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
