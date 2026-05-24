import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import AnimatedBackground from './components/AnimatedBackground';
import Splash from './components/Splash';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Publications from './components/Publications';
import Education from './components/Education';
import ResumeDownload from './components/ResumeDownload';
import Navigation from './components/Navigation';
import { resumeData } from './data';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showPdfMode, setShowPdfMode] = useState(false);
  const { basics } = resumeData;

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#030712] selection:bg-indigo-500/30 selection:text-white">
      {/* Dynamic Animated Background Mesh & Canvas Particles */}
      <AnimatedBackground />

      {/* Interactive Monogram Splash Screen on Initial View */}
      <AnimatePresence>
        {showSplash && <Splash onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Main Website Wrapper with fade-in after Splash is dismissed */}
      {!showSplash && (
        <motion.div
          id="main-viewport-content"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col min-h-screen"
        >
          {/* Scroll Navigation Controls */}
          <Navigation onOpenPdfMode={() => setShowPdfMode(true)} />

          {/* Core Sections Stack */}
          <main className="flex-grow pt-8">
            {/* Visual Header / Hero Segment */}
            <Hero onOpenPdfMode={() => setShowPdfMode(true)} />

            {/* Timelines and Job Accordion details */}
            <Experience />

            {/* Spotlight Counter Bento Grid */}
            <Achievements />

            {/* Grouped Skills Stack */}
            <Skills />

            {/* Academic Scholarly publications */}
            <Publications />

            {/* University Progress timeline */}
            <Education />
          </main>

          {/* Dedicated Visual Portfolio Footer */}
          <footer className="bg-[#05070d]/80 border-t border-slate-900/60 py-12 px-6 backdrop-blur-md">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start space-x-2 text-indigo-400 font-mono text-xs uppercase tracking-widest">
                  <Sparkles size={12} />
                  <span>Richa Rameshkrishna Portfolio</span>
                </div>
                <p className="text-xs text-slate-500 max-w-sm font-sans mx-auto md:mx-0">
                  Architected with complete client-side React 19, Tailwind CSS v4, and dynamic High Performance Canvas renderings.
                </p>
              </div>

              {/* Contacts info panel */}
              <div className="flex flex-col md:items-end justify-center space-y-2 text-xs font-mono text-slate-400">
                <div className="flex items-center justify-center md:justify-end space-x-2">
                  <MapPin size={12} className="text-zinc-600" />
                  <span>{basics.location}</span>
                </div>
                <div className="flex items-center justify-center md:justify-end space-x-2">
                  <Mail size={12} className="text-zinc-600" />
                  <span>{basics.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-end space-x-2">
                  <Phone size={12} className="text-zinc-600" />
                  <span>{basics.phone}</span>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 font-mono tracking-widest uppercase">
              <span>All rights reserved &copy; 2026</span>
              <span className="mt-2 md:mt-0">Verified Raw Data representation only</span>
            </div>
          </footer>
        </motion.div>
      )}

      {/* PDF Printable CV View Modal Overlay */}
      <AnimatePresence>
        {showPdfMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResumeDownload onClose={() => setShowPdfMode(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
