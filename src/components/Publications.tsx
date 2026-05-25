import { motion } from 'motion/react';
import { BookOpen, ExternalLink, Award, FileText } from 'lucide-react';
import { resumeData } from '../data';

export default function Publications() {
  const { publications } = resumeData;

  return (
    <section id="publications-section" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-900/60 relative">
      <div className="absolute right-1/4 top-1/3 w-72 h-72 bg-rose-950/10 rounded-full filter blur-3xl opacity-20 pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <div className="flex items-center space-x-2 text-rose-500 font-mono text-xs uppercase tracking-widest leading-none">
          <BookOpen size={14} />
          <span>Academic & Research Output</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight font-serif">
          Conference Publications
        </h2>
        <p className="text-xs text-slate-500 font-mono tracking-wide max-w-xl">
          Peer-reviewed research and scholarly materials accepted by major AI/ML indexing systems (Springer, IEEE).
        </p>
      </div>

      {/* Publications Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {publications.map((pub, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="p-6 rounded-2xl bg-[#08090f]/90 border border-slate-900/80 hover:border-rose-500/25 transition-all duration-300 relative flex flex-col justify-between group h-full"
          >
            {/* Visual glow indicator */}
            <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-rose-500 to-transparent" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-900 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform duration-300">
                  <FileText size={18} />
                </div>
                
                <span className="flex items-center space-x-1 text-[9px] font-mono text-slate-500 bg-slate-900/40 border border-slate-800/80 px-2 py-0.5 rounded">
                  <Award size={10} className="text-rose-500" />
                  <span>Springer / IEEE</span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm md:text-base font-display font-medium text-white leading-snug group-hover:text-rose-400 transition-colors">
                  {pub.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  {pub.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom Info Row */}
            <div className="border-t border-slate-900/80 pt-4 mt-6 flex items-center justify-between text-[11px] font-mono text-rose-455/80">
              <span className="text-[10px] text-slate-500 font-mono">Conference Proceedings</span>
              {pub.url ? (
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-rose-400 hover:text-rose-300 font-semibold underline decoration-dotted transition-all cursor-pointer"
                >
                  <span>Read Paper</span>
                  <ExternalLink size={10} />
                </a>
              ) : (
                <div className="inline-flex items-center space-x-1 text-slate-500">
                  <span>Indexed</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
