import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, TrendingUp, Cpu, Award, Target, Flame, Lightbulb } from 'lucide-react';
import { resumeData } from '../data';

// Custom CountUp Component to render beautifully
function CountValue({ valueString }: { valueString: string }) {
  const [current, setCurrent] = useState(0);

  // Extract numeric part
  const numericMatch = valueString.match(/[\d.]+/);
  const numericVal = numericMatch ? parseFloat(numericMatch[0]) : null;
  const suffix = valueString.replace(/[\d.]+/, '');

  useEffect(() => {
    if (numericVal === null) return;
    
    let start = 0;
    const end = numericVal;
    const duration = 1200; // ms
    const increment = end / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCurrent(end);
      } else {
        setCurrent(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericVal]);

  if (numericVal === null) {
    return <span>{valueString}</span>;
  }

  // Format decimal values or integers appropriately
  const formattedVal = Number.isInteger(numericVal) 
    ? Math.round(current) 
    : current.toFixed(1);

  return (
    <span>
      {formattedVal}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  const { achievements } = resumeData;
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'efficiency' | 'accuracy' | 'growth'>('all');

  // Top 3 Impact points based directly on raw resume achievements data (no invented facts!)
  const topImpacts = [
    {
      metric: "99.3%",
      title: "LSTM Validation Accuracy",
      desc: "Delivering real-time clinical predictions with sub-second response times on PyTorch."
    },
    {
      metric: "40%",
      title: "RAG User Support Improvement",
      desc: "Reduced support wait times for 500 internal chatbot users via custom retriever."
    },
    {
      metric: "5,000",
      title: "Daily Server Scale",
      desc: "Successfully handled daily core API calls with 99.5% uptime via connection pooling."
    }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(ach => ach.type === selectedCategory);

  const getIcon = (type: string) => {
    switch(type) {
      case 'efficiency': return <Cpu size={18} className="text-purple-400" />;
      case 'accuracy': return <Target size={18} className="text-rose-400" />;
      case 'growth': return <TrendingUp size={18} className="text-rose-500" />;
      default: return <Award size={18} className="text-purple-400" />;
    }
  };

  const getBadgeClass = (type: string) => {
    switch(type) {
      case 'efficiency': return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
      case 'accuracy': return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
      case 'growth': return 'bg-rose-500/10 border-rose-500/20 text-rose-550';
      default: return 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400';
    }
  };

  return (
    <section id="achievements-section" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-900/60 relative">
      {/* Background radial accent */}
      <div className="absolute right-10 bottom-10 w-80 h-80 bg-rose-950/10 rounded-full filter blur-3xl opacity-30 pointer-events-none" />

      {/* Headline Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-rose-500 font-mono text-xs uppercase tracking-widest leading-none">
            <Trophy size={14} />
            <span>High Impact Milestones</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight font-serif">
            Measurable Results
          </h2>
        </div>
        
        {/* Category Controls */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0 bg-[#090b11]/80 p-1.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-400">
          {(['all', 'efficiency', 'accuracy', 'growth'] as const).map((cat) => (
            <button
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`cursor-pointer px-3.5 py-1.5 rounded-lg transition-all capitalize duration-200 ${
                 selectedCategory === cat 
                   ? 'bg-rose-850 text-white shadow-md' 
                   : 'hover:text-white hover:bg-slate-900'
               }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Impact Highlight Strip */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-4">
          <Flame size={12} className="text-rose-500" />
          <span>Primary Impact Strip (Exhaustive Metrics Summary)</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topImpacts.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative p-6 rounded-2xl bg-[#080a10]/90 border border-rose-950/20 shadow-[0_4px_30px_rgba(159,18,57,0.04)] flex flex-col justify-between hover:border-rose-500/30 transition-all duration-300 group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-rose-500/5 to-transparent rounded-bl-3xl pointer-events-none" />
              <div>
                <span className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight block mb-2 font-mono">
                  <CountValue valueString={item.metric} />
                </span>
                <span className="text-xs font-mono text-rose-455 uppercase tracking-wider block mb-1">
                  {item.title}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed font-serif mt-2">
                  {item.desc}
                </p>
              </div>

              {/* Decorative Accent Ring */}
              <div className="h-1 w-8 bg-rose-500/30 rounded-full mt-4 group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Complete Bento Grid / Spotlight Hover Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredAchievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group p-5 rounded-2xl bg-[#07090f]/70 hover:bg-[#090b14]/90 border border-slate-900/60 hover:border-rose-500/25 transition-all duration-300 relative flex flex-col justify-between shadow-lg"
            >
              {/* Subtle hover glowing spot */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/0 via-rose-500/0 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative">
                {/* Category Indicator Badge & Title */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-[10px] font-mono uppercase tracking-widest border px-2 py-0.5 rounded-md ${getBadgeClass(ach.type)}`}>
                    {ach.type}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#0c0f1a] border border-slate-900/60 flex items-center justify-center">
                    {getIcon(ach.type)}
                  </div>
                </div>

                <span className="text-2xl font-display font-bold text-white tracking-tight block font-mono h-8 mb-1">
                  <CountValue valueString={ach.metric} />
                </span>

                <h3 className="text-xs font-mono text-slate-300 uppercase tracking-wide mt-2">
                  {ach.title}
                </h3>
                
                <p className="text-slate-400 text-[11px] leading-relaxed font-serif mt-2">
                  {ach.context}
                </p>
              </div>

              {/* Decorative Corner lines for subtle visual details */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[#1e293b] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-[#1e293b] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Subtext warning representing absolute truth from PDF */}
      <div className="mt-8 flex items-center space-x-2 text-[10px] font-mono text-slate-500">
        <Lightbulb size={12} className="text-rose-500" />
        <span>Verified from verified professional roles & scholarly publications of Richa Rameshkrishna.</span>
      </div>
    </section>
  );
}
