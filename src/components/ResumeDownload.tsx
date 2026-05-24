import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Printer, Copy, Check, X } from 'lucide-react';
import { resumeData } from '../data';

interface ResumeDownloadProps {
  onClose: () => void;
}

export default function ResumeDownload({ onClose }: ResumeDownloadProps) {
  const { basics, experience, skills, education, publications } = resumeData;
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    // Construct flat plain text of all data
    let text = `${basics.name}\n${basics.title}\n${basics.location} | ${basics.phone} | ${basics.email}\n`;
    text += `LinkedIn: ${basics.linkedin} | GitHub: ${basics.github}\n\n`;
    text += `= PROFESSIONAL SUMMARY =\n${basics.summary}\n\n`;
    
    text += `= TECHNICAL SKILLS =\n`;
    skills.forEach(s => {
      text += `${s.category}: ${s.skills.join(', ')}\n`;
    });
    text += `\n`;

    text += `= EXPERIENCE =\n`;
    experience.forEach(exp => {
      text += `${exp.company} - ${exp.role} (${exp.dates}) - ${exp.location}\n`;
      exp.bullets.forEach(b => {
        text += `• ${b}\n`;
      });
      text += `\n`;
    });

    text += `= EDUCATION =\n`;
    education.forEach(edu => {
      text += `${edu.institution} - ${edu.degree} (${edu.dates})${edu.gpa ? `, GPA: ${edu.gpa}` : ''}\n`;
      if (edu.extraDetails) text += `  ${edu.extraDetails}\n`;
    });

    text += `\n= SCHOLARLY PUBLICATIONS =\n`;
    publications.forEach(pub => {
      text += `• ${pub.title} (${pub.subtitle})\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="executive-cv-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
    >
      {/* Outer wrapper to print nicely */}
      <div className="w-full max-w-4xl bg-zinc-900 md:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Actions bar at header */}
        <div className="bg-[#090b11] px-6 py-4 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h3 className="text-xs font-mono text-slate-300 uppercase tracking-widest font-semibold">
              Executive Printable A4 CV
            </h3>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            {/* Copy button */}
            <button
              onClick={handleCopyText}
              className="cursor-pointer inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:text-white px-3 py-2 rounded-xl text-slate-400 transition-all duration-300"
              title="Copy plain text representation"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="cursor-pointer inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/25"
              title="Prints standard single A4 page"
            >
              <Printer size={13} />
              <span>Print A4 PDF</span>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="cursor-pointer w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Printable Paper container (classic off-white executive resume matching standard specifications) */}
        <div className="bg-white text-zinc-900 p-8 md:p-12 font-sans overflow-x-auto print:p-0 print:m-0 print:text-xs">
          <div className="min-w-[600px] print:min-w-0">
            {/* Name/Heading */}
            <div className="text-center space-y-2 border-b-2 border-slate-900 pb-4">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
                {basics.name}
              </h1>
              <p className="text-sm font-mono text-zinc-600 uppercase tracking-wider font-semibold">
                {basics.title}
              </p>
              
              {/* Coordinates line */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-500 font-mono mt-2">
                <span className="flex items-center space-x-1">
                  <MapPin size={11} />
                  <span>{basics.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Phone size={11} />
                  <span>{basics.phone}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Mail size={11} />
                  <span>{basics.email}</span>
                </span>
              </div>

              {/* Links */}
              <div className="flex justify-center space-x-6 text-xs text-zinc-600 font-mono mt-1">
                <span className="flex items-center space-x-1">
                  <Linkedin size={11} />
                  <span>richa-ramesh</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Github size={11} />
                  <span>richa-ramesh</span>
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="py-4 border-b border-zinc-200">
              <h2 className="text-xs font-mono font-bold uppercase text-slate-900 tracking-wider mb-2">
                Professional Summary
              </h2>
              <p className="text-xs leading-relaxed text-zinc-700 font-sans">
                {basics.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="py-4 border-b border-zinc-200">
              <h2 className="text-xs font-mono font-bold uppercase text-slate-900 tracking-wider mb-2">
                Technical Skills
              </h2>
              <div className="space-y-1.5 text-xs text-zinc-800">
                {skills.map((s, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-2">
                    <span className="font-bold text-zinc-700">{s.category}:</span>
                    <span className="col-span-3 text-zinc-600">{s.skills.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work History */}
            <div className="py-4 border-b border-zinc-200">
              <h2 className="text-xs font-mono font-bold uppercase text-slate-900 tracking-wider mb-3">
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-900">
                      <span>{exp.role} | {exp.company}</span>
                      <span>{exp.dates}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
                      <span>{exp.location}</span>
                      <span className="capitalize text-[10px] bg-zinc-100 px-1.5 py-0.2 rounded">{exp.category}</span>
                    </div>
                    <ul className="list-disc pl-4 text-xs text-zinc-600 space-y-1">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarly publications */}
            <div className="py-4 border-b border-zinc-200">
              <h2 className="text-xs font-mono font-bold uppercase text-slate-900 tracking-wider mb-2">
                Scholarly Publications
              </h2>
              <ul className="list-disc pl-4 text-xs text-zinc-600 space-y-1">
                {publications.map((pub, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <strong className="text-zinc-800">{pub.title}</strong> - {pub.subtitle}
                  </li>
                ))}
              </ul>
            </div>

            {/* Education History */}
            <div className="py-4 pb-0">
              <h2 className="text-xs font-mono font-bold uppercase text-slate-900 tracking-wider mb-2">
                Education
              </h2>
              <div className="space-y-2.5">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-zinc-700">
                    <div>
                      <span className="font-bold text-slate-900">{edu.institution}</span>
                      <span className="block text-zinc-500 text-[11px] font-mono">{edu.degree}</span>
                      {edu.extraDetails && (
                        <span className="block text-[10px] text-zinc-500 italic mt-0.5">{edu.extraDetails}</span>
                      )}
                    </div>
                    <div className="text-right font-mono text-[11px]">
                      <span>{edu.dates}</span>
                      {edu.gpa && <span className="block text-emerald-600 font-bold font-mono">GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* Footer info strip */}
        <div className="bg-[#090b11] px-6 py-4 border-t border-slate-800 text-[10px] text-center text-slate-600 font-mono print:hidden">
          Standard layout optimized for corporate Applicant Tracking Systems (ATS) and A4 printing.
        </div>
      </div>
    </div>
  );
}
