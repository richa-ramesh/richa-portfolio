import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Sparkles, Filter } from 'lucide-react';
import { resumeData } from '../data';

export default function Experience() {
  const { experience } = resumeData;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Default first one expanded
  const [filterMode, setFilterMode] = useState<'all' | 'industry' | 'academic' | 'internship'>('all');

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const filteredExperience = filterMode === 'all'
    ? experience
    : experience.filter(exp => exp.category === filterMode);

  // Auto-pull bullets with numerical metrics or powerful statistics
  const coreImpactPoints: { bullet: string; role: string; company: string; metricText: string }[] = [];
  
  experience.forEach((exp) => {
    exp.bullets.forEach((bullet) => {
      // Find matches for % or numbers like 2,410 or sub-second
      const hasPercent = bullet.includes('%');
      const hasNumber = /\d{3,}/.test(bullet) || bullet.includes('sub-');
      if (hasPercent || hasNumber) {
        // Find a short keyword for the metric text
        let metricText = "Scale / Efficiency";
        if (bullet.includes('50%')) metricText = "+50% Accuracy";
        else if (bullet.includes('99.3%')) metricText = "99.3% Model Accuracy";
        else if (bullet.includes('60%')) metricText = "-60% Manual QA";
        else if (bullet.includes('40%')) metricText = "-40% User Support Delay";
        else if (bullet.includes('10,000')) metricText = "10k+ Document Queries";
        else if (bullet.includes('5,000')) metricText = "5k+ Daily API Requests";
        else if (bullet.includes('45%')) metricText = "45% Fast Reporting";
        else if (bullet.includes('15 minutes')) metricText = "<15m Deployment Time";
        else if (bullet.includes('3x')) metricText = "3x Speed Upgrade";
        else if (bullet.includes('95%')) metricText = "95% Forecast Accuracy";
        else if (bullet.includes('2,410')) metricText = "2,410 Patient Datasets";
        else if (bullet.includes('1,000')) metricText = "1,000 Event Queue";

        coreImpactPoints.push({
          bullet,
          role: exp.role,
          company: exp.company,
          metricText
        });
      }
    });
  });

  // Limit to 5 diverse highlights
  const displayedHighlights = coreImpactPoints.slice(0, 5);

  return (
    <section id="experience-section" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-900/60 relative">
      <div className="absolute left-10 top-20 w-80 h-80 bg-rose-950/10 rounded-full filter blur-3xl opacity-20 pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-rose-500 font-mono text-xs uppercase tracking-widest leading-none">
            <Briefcase size={14} />
            <span>Interactive Timeline</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight font-serif">
            Work History
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0 bg-[#090b11]/80 p-1.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-400">
          <div className="flex items-center px-2 border-r border-slate-900">
            <Filter size={11} className="mr-1 text-slate-500" />
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Group</span>
          </div>
          {(['all', 'industry', 'academic', 'internship'] as const).map((mode) => (
            <button
               key={mode}
              onClick={() => setFilterMode(mode)}
              className={`cursor-pointer px-3.5 py-1.5 rounded-lg transition-all capitalize duration-200 ${
                filterMode === mode
                  ? 'bg-rose-800 text-white shadow-md'
                  : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: Stacked Interactive Story Cards list */}
        <div className="lg:col-span-8 space-y-4">
          {filteredExperience.slice().map((exp, trueIdx) => {
            const isExpanded = expandedIndex === trueIdx;
            
            // Extract some stats for badges
            const containsMetric = exp.bullets.some(b => b.includes('%') || /\d{3,}/.test(b));

            return (
              <motion.div
                key={trueIdx}
                layoutId={`exp-card-${trueIdx}`}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#0a0c14] border-rose-900/40 shadow-[0_4px_30px_rgba(159,18,57,0.08)]'
                    : 'bg-[#07090e]/80 border-slate-900/80 hover:border-slate-800 hover:bg-[#090b12]'
                }`}
              >
                {/* Accordion header toggle bar */}
                <button
                  onClick={() => toggleExpand(trueIdx)}
                  className="cursor-pointer w-full p-5 flex items-start justify-between text-left space-x-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="text-sm font-mono text-rose-400 tracking-wider">
                        {exp.company}
                      </span>
                      {containsMetric && (
                        <span className="inline-flex items-center space-x-1 bg-purple-500/10 border border-purple-500/25 px-2 py-0.5 rounded text-[9px] font-mono text-purple-400 uppercase tracking-widest font-normal">
                          High Impact
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded border border-slate-800 bg-slate-900/60 font-mono text-slate-500 capitalize">
                        {exp.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-display text-white font-medium leading-snug font-serif">
                      {exp.role}
                    </h3>

                    {/* Meta location & dates strip */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
                      <div className="flex items-center space-x-1.5">
                        <Calendar size={12} className="text-slate-600" />
                        <span>{exp.dates}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <MapPin size={12} className="text-slate-600" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Dropdown text details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="border-t border-slate-910 p-5 pt-4 bg-[#08090f]/40 space-y-3.5">
                        {exp.bullets.map((bullet, k) => {
                          // Inline highlighters for numbers/percents to lock visual attention
                          const parts = bullet.split(/(\d+%\s*|\d+,\d+\s*|\b\d+\s*users\b|\b\d+\s*events\b|\b\d+x\b|\bsub-second\b|\bsub-2-second\b)/gi);

                          return (
                            <div key={k} className="flex items-start space-x-3 text-slate-300 text-sm leading-relaxed">
                              <span className="text-rose-500/60 select-none mt-1.5 font-mono text-xs">•</span>
                              <span className="font-serif">
                                {parts.map((part, pIdx) => {
                                  // Regex tests for high impact words
                                  const isImportantVal = /%|\d+,\d+|\b\d+\s*users\b|\b\d+\s*events\b|\d+x|sub-/i.test(part);
                                  return isImportantVal ? (
                                    <strong key={pIdx} className="text-[#f43f5e] font-semibold font-mono bg-rose-500/5 border border-rose-500/10 px-1 rounded mx-0.5">
                                      {part}
                                    </strong>
                                  ) : (
                                    <span key={pIdx}>{part}</span>
                                  );
                                })}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Auto-pulled Impact Highlights panel */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="p-6 rounded-2xl bg-[#090b12]/95 border border-slate-900 shadow-xl space-y-5">
            <div className="flex items-center space-x-2 border-b border-rose-950 pb-4">
              <Sparkles size={16} className="text-rose-500" />
              <div>
                <h3 className="text-sm font-mono text-white tracking-wide uppercase">
                  Impact Highlights
                </h3>
                <p className="text-[10px] text-slate-500 font-sans tracking-wide">
                  Auto-pulled core results of Richa
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {displayedHighlights.map((hl, itemIdx) => (
                <div
                  key={itemIdx}
                  className="p-3.5 rounded-xl bg-[#06080e] border border-slate-900 hover:border-rose-500/30 transition-all duration-300 space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-medium text-purple-450 uppercase tracking-widest bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10">
                      {hl.metricText}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500 group-hover:text-rose-400 transition-colors">
                      {hl.company}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-serif line-clamp-2 italic">
                    "{hl.bullet}"
                  </p>
                </div>
              ))}
            </div>
            
            <div className="pt-2 text-[10px] font-mono text-zinc-650 text-center uppercase tracking-wide">
              No modifications of facts / raw data only
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
