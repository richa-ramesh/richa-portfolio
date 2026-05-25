import { motion } from 'motion/react';
import { Layers, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data';

export default function Skills() {
  const { skills } = resumeData;

  const getGradientByCat = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'languages':
        return 'from-rose-500/10 via-slate-900 to-slate-950 hover:border-rose-500/30';
      case 'backend & cloud':
        return 'from-purple-500/10 via-slate-900 to-slate-950 hover:border-purple-500/30';
      case 'frontend & databases':
        return 'from-purple-650/10 via-slate-900 to-slate-950 hover:border-purple-600/30';
      case 'ml / ai':
        return 'from-red-500/10 via-slate-900 to-slate-950 hover:border-red-500/30';
      default:
        return 'from-slate-900 via-slate-900 to-slate-950 hover:border-slate-800';
    }
  };

  const getBulletColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'languages': return 'text-rose-400 bg-rose-500/5 border-rose-500/10';
      case 'backend & cloud': return 'text-purple-400 bg-purple-500/5 border-purple-500/10';
      case 'frontend & databases': return 'text-purple-300 bg-purple-500/5 border-purple-500/10';
      case 'ml / ai': return 'text-red-400 bg-red-500/5 border-red-500/10';
      default: return 'text-slate-400 bg-slate-500/5 border-slate-500/10';
    }
  };

  return (
    <section id="skills-section" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-900/60 relative">
      <div className="absolute left-1/3 bottom-5 w-80 h-80 bg-rose-950/10 rounded-full filter blur-3xl opacity-25 pointer-events-none" />

      {/* Headline Header */}
      <div className="space-y-2 mb-12">
        <div className="flex items-center space-x-2 text-rose-500 font-mono text-xs uppercase tracking-widest leading-none">
          <Layers size={14} />
          <span>Core Competence</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
          Technical Stack
        </h2>
        <p className="text-xs text-slate-500 font-mono tracking-wide max-w-xl">
          Grouped skills representing standard programming languages, cloud systems, and AI frameworks.
        </p>
      </div>

      {/* Staggered Grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((group, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`p-6 rounded-2xl bg-gradient-to-br border border-slate-900/60 transition-all duration-300 relative group flex flex-col justify-between ${getGradientByCat(group.category)}`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-mono text-white uppercase tracking-wider font-semibold border-b border-rose-950/40 pb-2 w-full">
                  {group.category}
                </h3>
              </div>

              {/* Badges Flow */}
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-transform duration-200 hover:-translate-y-0.5 ${getBulletColor(group.category)}`}
                  >
                    <CheckCircle2 size={11} className="opacity-80" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro details line */}
            <div className="mt-6 flex justify-between text-[9px] font-mono text-slate-600 select-none uppercase tracking-widest">
              <span>Stack Division</span>
              <span>Level: Production</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
