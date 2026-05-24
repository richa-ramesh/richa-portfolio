import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Printer, Copy, Check, X, Sparkles, Filter, Info, EyeOff, LayoutTemplate, SlidersHorizontal, SunMedium } from 'lucide-react';
import { resumeData } from '../data';

interface ResumeDownloadProps {
  onClose: () => void;
}

type ExperienceFilter = 'all' | 'industry' | 'academic';
type BulletsDensity = 'full' | 'compact';
type PreviewTheme = 'light' | 'dark';

export default function ResumeDownload({ onClose }: ResumeDownloadProps) {
  const { basics, experience, skills, education, publications } = resumeData;
  const [copied, setCopied] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  
  // Interactive control states
  const [expFilter, setExpFilter] = useState<ExperienceFilter>('all');
  const [density, setDensity] = useState<BulletsDensity>('full');
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>('light');

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    // Construct flat plain text of all data
    let text = `${basics.name}\n${basics.title}\n${basics.location} | ${basics.phone} | ${basics.email}\n`;
    text = text + `LinkedIn: ${basics.linkedin} | GitHub: ${basics.github}\n\n`;
    text = text + `= PROFESSIONAL SUMMARY =\n${basics.summary}\n\n`;
    
    text = text + `= TECHNICAL SKILLS =\n`;
    skills.forEach(s => {
      text = text + `${s.category}: ${s.skills.join(', ')}\n`;
    });
    text = text + `\n`;

    text = text + `= EXPERIENCE =\n`;
    experience.forEach(exp => {
      text = text + `${exp.company} - ${exp.role} (${exp.dates}) - ${exp.location}\n`;
      exp.bullets.forEach(b => {
        text = text + `• ${b}\n`;
      });
      text = text + `\n`;
    });

    text = text + `= EDUCATION =\n`;
    education.forEach(edu => {
      text = text + `${edu.institution} - ${edu.degree} (${edu.dates})${edu.gpa ? `, GPA: ${edu.gpa}` : ''}\n`;
      if (edu.extraDetails) text = text + `  ${edu.extraDetails}\n`;
    });

    text = text + `\n= SCHOLARLY PUBLICATIONS =\n`;
    publications.forEach(pub => {
      text = text + `• ${pub.title} (${pub.subtitle})\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check if a bullet or paragraph mentions the highlighted skill
  const mentionsSkill = (text: string, skill: string | null) => {
    if (!skill) return false;
    const cleanSource = text.toLowerCase();
    const cleanSkill = skill.toLowerCase();
    
    // Exact match or general segment matching
    if (cleanSource.includes(cleanSkill)) return true;
    
    // Fallback checks (e.g. Spring Boot matches Spring, PyTorch matches Pytorch)
    if (cleanSkill === 'java' && (cleanSource.includes('java-based') || cleanSource.includes('junit'))) return true;
    if (cleanSkill === 'spring boot' && cleanSource.includes('spring')) return true;
    if (cleanSkill === 'react' && cleanSource.includes('react.js')) return true;
    
    return false;
  };

  // Filter experiences
  const filteredExperiences = experience.filter(exp => {
    if (expFilter === 'all') return true;
    if (expFilter === 'industry') return exp.category === 'industry' || exp.category === 'internship';
    if (expFilter === 'academic') return exp.category === 'academic';
    return true;
  });

  return (
    <div
      id="executive-cv-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-md flex items-start justify-center p-3 md:p-8"
    >
      {/* Outer block wrapper ensuring fluid container & neat printing styles */}
      <div className="w-full max-w-5xl bg-[#0b0f19] md:rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden my-4 print:my-0 print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Main Header / Interactive Actions Control Panel */}
        <div className="bg-[#070911]/90 px-6 py-5 border-b border-slate-800/80 sticky top-0 z-20 backdrop-blur-md print:hidden space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  Richa Rameshkrishna | Interactive Digital CV
                </h3>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                  Click skills below to highlight matched job parameters
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Copy flat text button */}
              <button
                onClick={handleCopyText}
                className="cursor-pointer inline-flex items-center space-x-1.5 bg-slate-900/80 border border-slate-800 hover:border-slate-700 px-3 py-2 rounded-xl text-xs font-mono text-slate-300 transition-all duration-300"
                title="Copy flat resume text to clipboard"
              >
                {copied ? <Check size={13} className="text-emerald-400 animate-scale" /> : <Copy size={13} className="text-indigo-400" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Plain Text'}</span>
              </button>

              {/* Print action */}
              <button
                onClick={handlePrint}
                className="cursor-pointer inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 shadow-md shadow-indigo-600/20 hover:scale-[1.02]"
                title="Generates standard formatted A4 PDF printout"
              >
                <Printer size={13} />
                <span>Print PDF Resume</span>
              </button>

              {/* Close toggle panel */}
              <button
                onClick={onClose}
                className="cursor-pointer w-8 h-8 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                title="Return to Portfolio view"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Interactive controls: Tabs / Filter triggers / Densities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-900">
            {/* Experience layout selector */}
            <div className="flex items-center space-x-2">
              <Filter size={11} className="text-zinc-500" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Focus:</span>
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800/60 grow">
                <button
                  onClick={() => setExpFilter('all')}
                  className={`text-[10px] font-mono py-1 px-2.5 rounded text-center grow cursor-pointer transition-all ${
                    expFilter === 'all'
                      ? 'bg-slate-900 border border-slate-800 text-indigo-400 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All (Full)
                </button>
                <button
                  onClick={() => setExpFilter('industry')}
                  className={`text-[10px] font-mono py-1 px-2.5 rounded text-center grow cursor-pointer transition-all ${
                    expFilter === 'industry'
                      ? 'bg-slate-900 border border-slate-800 text-indigo-400 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Industry Dev
                </button>
                <button
                  onClick={() => setExpFilter('academic')}
                  className={`text-[10px] font-mono py-1 px-2.5 rounded text-center grow cursor-pointer transition-all ${
                    expFilter === 'academic'
                      ? 'bg-slate-900 border border-slate-800 text-indigo-400 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Academic
                </button>
              </div>
            </div>

            {/* Bullets Detail / Scan density */}
            <div className="flex items-center space-x-2">
              <SlidersHorizontal size={11} className="text-zinc-500" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Aesthetic:</span>
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800/60 grow">
                <button
                  onClick={() => setDensity('full')}
                  className={`text-[10px] font-mono py-1 px-2.5 rounded text-center grow cursor-pointer transition-all ${
                    density === 'full'
                      ? 'bg-slate-900 border border-slate-800 text-indigo-400 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Shows all system experience bullet details"
                >
                  Corporate Detail
                </button>
                <button
                  onClick={() => setDensity('compact')}
                  className={`text-[10px] font-mono py-1 px-2.5 rounded text-center grow cursor-pointer transition-all ${
                    density === 'compact'
                      ? 'bg-slate-900 border border-slate-800 text-indigo-400 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Shows only key high impact bullets per role"
                >
                  Compact A4 Fit
                </button>
              </div>
            </div>

            {/* Theme matcher preview */}
            <div className="flex items-center space-x-2">
              <SunMedium size={11} className="text-zinc-500" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Canvas:</span>
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800/60 grow">
                <button
                  onClick={() => setPreviewTheme('light')}
                  className={`text-[10px] font-mono py-1 px-2.5 rounded text-center grow cursor-pointer transition-all ${
                    previewTheme === 'light'
                      ? 'bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Crisp A4 Light
                </button>
                <button
                  onClick={() => setPreviewTheme('dark')}
                  className={`text-[10px] font-mono py-1 px-2.5 rounded text-center grow cursor-pointer transition-all ${
                    previewTheme === 'dark'
                      ? 'bg-indigo-950/20 border border-indigo-500/20 text-indigo-400 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Console Dark
                </button>
              </div>
            </div>
          </div>

          {/* Prompt active skill filter reset */}
          {selectedSkill && (
            <div className="bg-indigo-505/10 border border-indigo-500/20 text-xs px-3 py-1.5 rounded-lg flex items-center justify-between text-indigo-300 font-mono animate-fade-in">
              <span className="flex items-center space-x-1.5">
                <Sparkles size={11} className="animate-pulse" />
                <span>
                  Highlighted Skill Metrics: <strong>{selectedSkill}</strong>
                </span>
              </span>
              <button
                onClick={() => setSelectedSkill(null)}
                className="hover:text-white cursor-pointer px-1.5 py-0.5 rounded bg-indigo-500/10 hover:bg-indigo-500/30 text-[10px] transition-colors"
              >
                Clear Highlight [X]
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Paper Canvas block wrapper */}
        <div
          className={`transition-colors duration-300 px-6 py-8 md:p-12 font-sans overflow-x-auto ${
            previewTheme === 'light'
              ? 'bg-[#ffffff] text-zinc-900'
              : 'bg-[#06080e] text-slate-200 border border-slate-900/50'
          } print:bg-white print:text-black print:p-0 print:m-0`}
        >
          {/* Constrain layout to standard A4 sheet context */}
          <div className="min-w-[690px] max-w-[800px] mx-auto print:min-w-0 print:max-w-none">
            
            {/* NAME HEADER / COORDINATES ZONE */}
            <div className="text-center space-y-2 border-b-2 border-slate-900 pb-5">
              <h1 className={`text-3xl font-extrabold tracking-tight font-display ${previewTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                {basics.name}
              </h1>
              <p className={`text-xs font-mono font-bold uppercase tracking-widest ${previewTheme === 'light' ? 'text-zinc-600' : 'text-indigo-400'}`}>
                {basics.title}
              </p>
              
              {/* Coordinates line (proper clickable coordinates) */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-zinc-500 mt-2.5 font-mono">
                <span className="flex items-center space-x-1">
                  <MapPin size={11} className="text-zinc-400" />
                  <span>{basics.location}</span>
                </span>
                <span>•</span>
                <a
                  href={`tel:${basics.phone.replace(/\s+/g, '')}`}
                  className="flex items-center space-x-1 hover:text-indigo-500 transition-colors"
                >
                  <Phone size={11} className="text-zinc-400" />
                  <span className="underline decoration-dotted">{basics.phone}</span>
                </a>
                <span>•</span>
                <a
                  href={`mailto:${basics.email}`}
                  className="flex items-center space-x-1 hover:text-indigo-500 transition-colors"
                >
                  <Mail size={11} className="text-zinc-400" />
                  <span className="underline decoration-dotted">{basics.email}</span>
                </a>
              </div>

              {/* Social URLs (Proper anchors) */}
              <div className="flex justify-center space-x-6 text-[11px] font-mono mt-2">
                <a
                  href={basics.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-zinc-600 hover:text-indigo-600 transition-colors font-bold"
                >
                  <Linkedin size={11} />
                  <span className="underline">linkedin.com/in/richa-ramesh</span>
                </a>
                <a
                  href={basics.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-zinc-600 hover:text-indigo-600 transition-colors font-bold"
                >
                  <Github size={11} />
                  <span className="underline">github.com/richa-ramesh</span>
                </a>
              </div>
            </div>

            {/* SUMMARY PARAGRAPH */}
            <div className="py-4 border-b border-zinc-200/80">
              <h2 className={`text-xs font-mono font-bold uppercase tracking-wider mb-2 ${previewTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Professional Summary
              </h2>
              <p className={`text-xs leading-relaxed font-sans ${previewTheme === 'light' ? 'text-zinc-700' : 'text-slate-400'}`}>
                {basics.summary}
              </p>
            </div>

            {/* INTERACTIVE TECHNICAL SKILLS MATRICES */}
            <div className="py-4 border-b border-zinc-200/80">
              <div className="flex items-center justify-between mb-2">
                <h2 className={`text-xs font-mono font-bold uppercase tracking-wider ${previewTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Technical Skills Matrix
                </h2>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest print:hidden">
                  (Click tags to trace skill usage in bullets)
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {skills.map((s, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-2 items-center">
                    <span className={`font-bold ${previewTheme === 'light' ? 'text-zinc-700' : 'text-slate-300'}`}>
                      {s.category}:
                    </span>
                    <div className="col-span-3 flex flex-wrap gap-1.5">
                      {s.skills.map((skillItem, sIdx) => {
                        const isHighlighted = selectedSkill === skillItem;
                        return (
                          <button
                            key={sIdx}
                            onClick={() => setSelectedSkill(isHighlighted ? null : skillItem)}
                            className={`cursor-pointer text-[10px] px-2 py-0.5 rounded font-mono transition-all ${
                              isHighlighted
                                ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-500/50'
                                : previewTheme === 'light'
                                  ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                                  : 'bg-slate-900 hover:bg-zinc-800 text-slate-300 border border-slate-800'
                            }`}
                            title={`Click to find '${skillItem}' within experience bullets`}
                          >
                            {skillItem}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DETAILED TIMELINES / ACCORDION EXPERIENCE GROUPS */}
            <div className="py-4 border-b border-zinc-200/80">
              <h2 className={`text-xs font-mono font-bold uppercase tracking-wider mb-3.5 ${previewTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Professional Experience
              </h2>
              
              <div className="space-y-5">
                {filteredExperiences.map((exp, idx) => {
                  const hasMatchesInThisCompany = exp.bullets.some(b => mentionsSkill(b, selectedSkill));
                  
                  // Filter bullet list based on density preference
                  const displayBullets = density === 'compact' ? exp.bullets.slice(0, 2) : exp.bullets;

                  return (
                    <div
                      key={idx}
                      className={`space-y-1 my-2 transition-all duration-300 rounded-lg ${
                        selectedSkill && hasMatchesInThisCompany
                          ? previewTheme === 'light' 
                            ? 'bg-indigo-50/50 p-2 border-l-2 border-indigo-600'
                            : 'bg-indigo-950/20 p-2 border-l-2 border-indigo-500'
                          : 'border-l border-zinc-200'
                      }`}
                    >
                      <div className="flex justify-between text-xs font-bold leading-none">
                        <span className={previewTheme === 'light' ? 'text-slate-900' : 'text-white'}>
                          {exp.role} <span className="font-normal opacity-70">|</span> {exp.company}
                        </span>
                        <span className={`font-mono text-[11px] ${previewTheme === 'light' ? 'text-zinc-600' : 'text-indigo-400'}`}>
                          {exp.dates}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-0.5">
                        <span>{exp.location}</span>
                        <span className={`capitalize px-1.5 py-0.2 rounded text-[9px] font-semibold border ${
                          previewTheme === 'light'
                            ? 'bg-zinc-100 text-zinc-600 border-zinc-200'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}>
                          {exp.category}
                        </span>
                      </div>

                      <ul className="list-disc pl-4 text-xs text-zinc-600 space-y-1.5 mt-2 print:space-y-1">
                        {displayBullets.map((bullet, bIdx) => {
                          const hasHighlight = mentionsSkill(bullet, selectedSkill);
                          return (
                            <li
                              key={bIdx}
                              className={`leading-relaxed transition-all duration-300 ${
                                hasHighlight
                                  ? 'bg-yellow-100/70 text-zinc-950 font-medium px-1 rounded ring-2 ring-yellow-400/30'
                                  : previewTheme === 'light'
                                    ? 'text-zinc-700'
                                    : 'text-slate-400'
                              }`}
                            >
                              {bullet}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SCHOLARLY AI PUBLICATIONS */}
            <div className="py-4 border-b border-zinc-200/80">
              <h2 className={`text-xs font-mono font-bold uppercase tracking-wider mb-2.5 ${previewTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Scholarly Publications
              </h2>
              <ul className="list-disc pl-4 text-xs text-zinc-600 space-y-1.5">
                {publications.map((pub, idx) => {
                  const hasHighlight = mentionsSkill(pub.title + ' ' + pub.subtitle, selectedSkill);
                  return (
                    <li
                      key={idx}
                      className={`leading-relaxed ${
                        hasHighlight
                          ? 'bg-yellow-105 text-zinc-950 font-medium px-1 rounded ring-1 ring-yellow-400/20'
                          : previewTheme === 'light'
                            ? 'text-zinc-700'
                            : 'text-slate-400'
                      }`}
                    >
                      <strong className={previewTheme === 'light' ? 'text-slate-900' : 'text-white'}>
                        {pub.title}
                      </strong>{' '}
                      - {pub.subtitle}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* EDUCATION CHRONOLOGY */}
            <div className="py-4 pb-0">
              <h2 className={`text-xs font-mono font-bold uppercase tracking-wider mb-3 ${previewTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Education Chronology
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => {
                  const hasHighlight = mentionsSkill(edu.institution + ' ' + edu.degree + ' ' + (edu.extraDetails || ''), selectedSkill);
                  return (
                    <div
                      key={idx}
                      className={`flex justify-between items-start text-xs rounded transition-all duration-300 p-1 ${
                        hasHighlight
                          ? 'bg-yellow-105 text-zinc-950 ring-1 ring-yellow-400/20'
                          : ''
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className={`font-bold ${previewTheme === 'light' ? 'text-slate-900' : 'text-slate-200'}`}>
                          {edu.institution}
                        </span>
                        <span className="block text-zinc-500 text-[11px] font-mono leading-none">
                          {edu.degree}
                        </span>
                        {edu.extraDetails && (
                          <span className="block text-[10px] text-zinc-500 italic mt-1 leading-normal">
                            {edu.extraDetails}
                          </span>
                        )}
                      </div>
                      <div className="text-right font-mono text-[11px] space-y-0.5">
                        <span className={previewTheme === 'light' ? 'text-zinc-600' : 'text-slate-400'}>
                          {edu.dates}
                        </span>
                        {edu.gpa && (
                          <span className="block text-emerald-600 font-bold font-mono">
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Footer actions / stats information */}
        <div className="bg-[#070911]/90 px-6 py-4 border-t border-slate-800 text-[10px] text-center text-slate-500 font-mono flex flex-col sm:flex-row sm:justify-between items-center gap-2 print:hidden">
          <span>
            Standard executive format completely optimized for modern corporate ATS parser algorithms.
          </span>
          <span className="text-indigo-400 flex items-center space-x-1">
            <Info size={11} />
            <span>Click any coordinate to dial or email directly contextually</span>
          </span>
        </div>
      </div>
    </div>
  );
}
