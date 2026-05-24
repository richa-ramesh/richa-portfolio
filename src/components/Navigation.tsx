import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Trophy, GraduationCap, Layers, BookOpen, FileDown, ArrowUp } from 'lucide-react';

interface NavigationProps {
  onOpenPdfMode: () => void;
}

const navItems = [
  { id: 'hero-section', label: 'Intro', icon: ArrowUp },
  { id: 'experience-section', label: 'Work', icon: Briefcase },
  { id: 'achievements-section', label: 'Impact', icon: Trophy },
  { id: 'skills-section', label: 'Skills', icon: Layers },
  { id: 'publications-section', label: 'Papers', icon: BookOpen },
  { id: 'education-section', label: 'Edu', icon: GraduationCap },
];

export default function Navigation({ onOpenPdfMode }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('hero-section');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll Spy active intersection detection
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check which section is currently centered on the viewport
      const scrollPos = window.scrollY + 200;
      let currentSection = 'hero-section';

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = item.id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll indicator bar pinned strictly to page top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-slate-900/40 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 shadow-md shadow-indigo-500/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Header (Desktop nav styling) - Hidden on Mobile */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-4xl hidden md:flex items-center justify-between p-2 rounded-2xl bg-[#090a0f]/70 border border-slate-900/60 backdrop-blur-md select-none shadow-xl">
        {/* Name initial branding */}
        <button
          onClick={() => handleScrollToSection('hero-section')}
          className="cursor-pointer font-display font-bold text-white tracking-tighter text-base px-3.5"
        >
          Richa<span className="text-indigo-500 font-mono font-normal">.R</span>
        </button>

        {/* Scroll spy list */}
        <nav className="flex space-x-1 font-mono text-xs text-slate-400">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.id)}
                className={`cursor-pointer px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white border border-slate-800'
                    : 'hover:text-white hover:bg-slate-950/40'
                }`}
              >
                <Icon size={12} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action item: printable cv overlay trigger */}
        <button
          onClick={onOpenPdfMode}
          className="cursor-pointer font-mono text-xs bg-indigo-505/10 text-indigo-400 hover:text-white hover:bg-indigo-600 px-4 py-2 rounded-xl border border-indigo-500/20 shadow-md transition-all flex items-center space-x-1.5"
        >
          <FileDown size={13} />
          <span>Interactive CV</span>
        </button>
      </header>

      {/* Floating Bottom Navigation ergonomics (Mobile Layout only) */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md md:hidden bg-[#090a0f]/80 border border-slate-900/60 backdrop-blur-md p-2 rounded-2xl flex items-center justify-around select-none shadow-[2px_10px_30px_rgba(0,0,0,0.6)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleScrollToSection(item.id)}
              className={`cursor-pointer p-2.5 rounded-xl transition-all flex flex-col items-center relative ${
                isActive ? 'text-indigo-400' : 'text-slate-400'
              }`}
            >
              <Icon size={16} />
              <span className="text-[9px] font-mono mt-0.5 tracking-wider">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-dot"
                  className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-md shadow-indigo-500/50"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}

        {/* PDF/Print mode for ergonomics */}
        <button
          onClick={onOpenPdfMode}
          className="cursor-pointer p-2.5 rounded-xl text-emerald-400 flex flex-col items-center"
        >
          <FileDown size={16} />
          <span className="text-[9px] font-mono mt-0.5 tracking-wider">CV</span>
        </button>
      </nav>
    </>
  );
}
