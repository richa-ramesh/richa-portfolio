import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { resumeData } from '../data';

export default function Education() {
  const { education } = resumeData;

  return (
    <section id="education-section" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-900/60 relative">
      <div className="absolute left-10 bottom-20 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl opacity-20 pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-2 mb-12">
        <div className="flex items-center space-x-2 text-indigo-400 font-mono text-xs uppercase tracking-widest leading-none">
          <GraduationCap size={14} />
          <span>Academic Background</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight text-left">
          Education History
        </h2>
        <p className="text-xs text-slate-500 font-mono tracking-wide max-w-xl text-left">
          Formal university degrees, research focuses, and secondary qualifications.
        </p>
      </div>

      {/* Structured timeline layout */}
      <div className="relative border-l border-slate-900/80 ml-4 md:ml-6 space-y-10 pl-6 md:pl-8">
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="relative bg-[#07090e]/80 border border-slate-900/80 hover:border-indigo-500/15 p-6 rounded-2xl transition-all duration-300 hover:bg-[#090b14]/40"
          >
            {/* Timeline node circle */}
            <div className="absolute -left-[31px] md:-left-[39px] top-7 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#030712] shadow-sm shadow-indigo-500/50" />

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-indigo-400 tracking-wider font-semibold block uppercase">
                  {edu.institution}
                </span>

                <h3 className="text-lg md:text-xl font-display text-white font-medium">
                  {edu.degree}
                </h3>

                {/* Meta details strip */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
                  <div className="flex items-center space-x-1.5">
                    <Calendar size={12} className="text-slate-600" />
                    <span>{edu.dates}</span>
                  </div>
                  {edu.location && (
                    <div className="flex items-center space-x-1.5">
                      <MapPin size={12} className="text-slate-600" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                  {edu.gpa && (
                    <div className="flex items-center space-x-1.5 bg-indigo-505/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px]">
                      <Award size={10} className="text-emerald-400" />
                      <span>GPA: {edu.gpa}</span>
                    </div>
                  )}
                </div>

                {edu.extraDetails && (
                  <p className="text-xs text-slate-400 leading-relaxed font-sans pt-3 border-t border-slate-900/60 mt-3 italic">
                    {edu.extraDetails}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
