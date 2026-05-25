import { motion } from 'motion/react';
import { ArrowDown, Github, Linkedin, Mail, Phone, MapPin, Eye, Sparkles } from 'lucide-react';
import { resumeData } from '../data';

interface HeroProps {
  onOpenPdfMode: () => void;
}

export default function Hero({ onOpenPdfMode }: HeroProps) {
  const { basics } = resumeData;

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="min-h-screen flex flex-col justify-center relative px-6 md:px-12 max-w-7xl mx-auto pt-24 pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Intro copy: Left column */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {/* Availability status line */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-rose-500/5 border border-rose-500/20 px-3.5 w-fit py-1.5 rounded-full text-[10px] font-mono text-rose-400 uppercase tracking-widest"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span>Available for Full-time Opportunities</span>
          </motion.div>

          {/* Core Branding, Titles & Meta headings */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl font-display font-medium tracking-tight text-white font-serif"
            >
              {basics.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg md:text-2xl font-mono bg-gradient-to-r from-rose-500 to-purple-400 bg-clip-text text-transparent font-light tracking-wide flex items-center space-x-2"
            >
              <Sparkles size={14} className="text-rose-550 animate-pulse" />
              <span>{basics.title}</span>
            </motion.h2>
          </div>

          {/* professional Summary */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl font-serif"
          >
            {basics.summary}
          </motion.p>

          {/* Contact coordinates list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-y-3 gap-x-6 text-[12px] font-mono text-slate-500 border-t border-slate-900/60 pt-6"
          >
            <div className="flex items-center space-x-2 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-900">
              <MapPin size={14} className="text-rose-400" />
              <span>{basics.location}</span>
            </div>
            
            <a
              href={`mailto:${basics.email}`}
              className="flex items-center space-x-2 hover:text-rose-455 transition-colors bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-900"
            >
              <Mail size={14} className="text-zinc-500" />
              <span>{basics.email}</span>
            </a>

            <div className="flex items-center space-x-2 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-900">
              <Phone size={14} className="text-zinc-500" />
              <span>{basics.phone}</span>
            </div>
          </motion.div>

          {/* Social connections & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            {/* Primary Scroll CTA */}
            <button
               onClick={() => handleScrollToSection('experience-section')}
              className="cursor-pointer group relative overflow-hidden inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-550 hover:to-purple-550 text-white font-mono text-xs font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(159,18,57,0.25)] hover:scale-[1.02] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>View Experience</span>
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
            </button>

            {/* Secondary PDF/Interactive CV Toggle */}
            <button
              onClick={onOpenPdfMode}
              className="cursor-pointer inline-flex items-center justify-center space-x-2 border border-slate-900 hover:border-rose-500/30 bg-[#020306]/85 hover:bg-slate-950/40 text-slate-300 hover:text-white font-mono text-xs px-6 py-3.5 rounded-xl transition-all duration-300"
            >
              <Eye size={14} className="text-rose-400" />
              <span>Interactive CV View</span>
            </button>

            {/* Social profiles */}
            <div className="flex items-center space-x-2 border-l border-slate-900/60 pl-4 h-10 ml-2">
              <a
                href={basics.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-950/60 border border-slate-900 hover:border-rose-550/30 font-mono text-slate-450 hover:text-rose-400 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105"
                title="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>

              <a
                href={basics.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-950/60 border border-slate-900 hover:border-rose-550/30 font-mono text-slate-450 hover:text-rose-400 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105"
                title="GitHub Source"
              >
                <Github size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Branding visual / Holographic badge: Right Column */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center rounded-3xl border border-rose-950/30 bg-[#020306]/40 backdrop-blur-md shadow-2xl p-6 overflow-hidden"
          >
            {/* Spinning ambient border gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-purple-500/5 to-transparent blur-2xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full filter blur-3xl opacity-30 animate-pulse" />
            
            {/* Aesthetic console display grid */}
            <div className="absolute inset-4 rounded-xl border border-dashed border-rose-955/35 flex flex-col justify-between p-4 font-mono select-none">
              <div className="flex justify-between text-[9px] text-rose-450/60">
                <span>SYSTEM: R_RAMESH_v1.0</span>
                <span>STATE: ACTIVE</span>
              </div>
              
              <div className="my-auto flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase text-slate-500 tracking-[0.2em] mb-2">Systems Architect</span>
                <span className="text-7xl font-display font-medium tracking-tighter text-rose-400/30 font-serif">RR</span>
                <span className="text-[8px] font-mono text-[#f43f5e] mt-4 px-2.5 py-1 border border-rose-800/20 bg-rose-900/5 rounded text-center">
                  Chicago, IL | Open to Relocation
                </span>
              </div>

              <div className="flex justify-between text-[9px] text-rose-455/60">
                <span>LOC: 41.8781° N</span>
                <span>ACC: 99.3%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
