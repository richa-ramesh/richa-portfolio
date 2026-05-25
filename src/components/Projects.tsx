import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Star, GitFork, ExternalLink, Sparkles, Code2, Search, Filter, BookOpen } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

// Explicit exclusion list
const EXCLUDED_REPOS = new Set([
  'richa-portfolio',
  'portfolio',
  'albumy-ml',
  'academic-ir-search-engine',
  'autonomous-gazebo-ros2',
  'pes1ug20cs712_jenkins',
  'neural-style-transfer-vgg'
]);

const STATIC_FEATURED_PROJECTS: GitHubRepo[] = [];

// Helper to beautify repo attributes at runtime for an elevated UI/UX
export function getBeautifiedDetails(name: string, originalDescription: string | null, language: string | null) {
  const norm = name.toLowerCase().trim();

  if (norm === 'neural-style-transfer-vgg' || norm.includes('style-transfer')) {
    return {
      title: 'Neural Artistic Style Transfer',
      description: 'An advanced AI synthesis engine based on the VGG-19 deep convolutional network to transpose aesthetic style fingerprints onto raw target scenes.',
      category: 'Computer Vision',
      tags: ['PyTorch', 'VGG-19', 'Optimization']
    };
  }

  // Handle standard PES course libraries or generic repos
  if (norm.startsWith('pes1ug')) {
    return {
      title: 'Systems & Computing Project Repository',
      description: originalDescription || 'A curated compilation of decoupled algorithms, software architecture paradigms, and computer science systems benchmarks.',
      category: 'Computer Science',
      tags: [language || 'Java', 'Algorithms', 'Systems']
    };
  }

  // General conversion: Clean typography (dashes/underscores to title case words)
  const words = name.split(/[-_]+/);
  const title = words
    .map(word => {
      if (/^(ros|vgg|tf|idf|ir|rest|api|ml|ai|gcp|aws|db|sql|rag|lstm)$/i.test(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  let description = originalDescription || '';
  if (!description) {
    if (language === 'Python') {
      description = 'Robust data engineering and modeling suite written in Python for high-performance workflows.';
    } else if (language === 'Java' || language === 'Kotlin') {
      description = 'Highly scalable structured system engineered utilizing standard object-oriented architectural patterns.';
    } else if (language === 'C++' || language === 'C') {
      description = 'Low-latency native system core optimized with structured memory management routines.';
    } else if (language === 'TypeScript' || language === 'JavaScript') {
      description = 'Interactive modern web component leveraging decoupled state machines and responsive interface patterns.';
    } else {
      description = 'An optimized system library compiled to handle specific workflow parameters and active code processes.';
    }
  }

  let category = 'Engineering';
  if (language === 'Python' || norm.includes('ml') || norm.includes('learning')) {
    category = 'Machine Learning';
  } else if (language === 'C++' || language === 'C' || norm.includes('ros') || norm.includes('gazebo')) {
    category = 'Robotics & Systems';
  } else if (language === 'Java') {
    category = 'Enterprise Systems';
  } else if (language === 'TypeScript' || language === 'JavaScript') {
    category = 'Web Technology';
  }

  const tags = [];
  if (language) tags.push(language);
  if (norm.includes('style') || norm.includes('vgg')) tags.push('AI');
  if (norm.includes('ros')) tags.push('Simulation');
  if (tags.length < 3) tags.push('Design');
  if (tags.length < 3) tags.push('Performance');

  return {
    title,
    description,
    category,
    tags: tags.slice(0, 3)
  };
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>(STATIC_FEATURED_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState<'stars' | 'updated'>('updated');

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('https://api.github.com/users/richa-ramesh/repos?per_page=100');
        if (response.ok) {
          const data: GitHubRepo[] = await response.json();
          // Filter out forks AND excluded repositories requested by user
          const cleanData = data.filter((repo: any) => 
            !repo.fork && !EXCLUDED_REPOS.has(repo.name.toLowerCase())
          );
          
          if (cleanData.length > 0) {
            // Merge & deduplicate
            const fetchedIds = new Set(cleanData.map(r => r.name.toLowerCase()));
            const nonOverlappingStatic = STATIC_FEATURED_PROJECTS.filter(s => 
              !fetchedIds.has(s.name.toLowerCase()) && !EXCLUDED_REPOS.has(s.name.toLowerCase())
            );
            setRepos([...nonOverlappingStatic, ...cleanData]);
          } else {
            // Fallback: make sure we still filter the static ones
            const nonOverlappingStatic = STATIC_FEATURED_PROJECTS.filter(s => 
              !EXCLUDED_REPOS.has(s.name.toLowerCase())
            );
            setRepos(nonOverlappingStatic);
          }
        }
      } catch (err) {
        console.warn('GitHub API fetch failed, falling back to static portfolio metadata:', err);
        // Fallback: make sure we still filter the static ones
        const nonOverlappingStatic = STATIC_FEATURED_PROJECTS.filter(s => 
          !EXCLUDED_REPOS.has(s.name.toLowerCase())
        );
        setRepos(nonOverlappingStatic);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  // Filter & Search Engine
  const languagesList = Array.from(
    new Set(repos.map(r => r.language).filter(Boolean) as string[])
  );

  const filteredRepos = repos.filter(repo => {
    const beautified = getBeautifiedDetails(repo.name, repo.description, repo.language);
    const matchesSearch = beautified.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          beautified.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          beautified.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  // Sort Engine
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sortBy === 'stars') {
      return b.stargazers_count - a.stargazers_count;
    } else {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
  });

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto relative border-t border-slate-900">
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-rose-950/10 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-purple-955/10 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
      
      {/* Editorial Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-900 pb-6 mb-12">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
            Technical Projects & Code
          </h2>
        </div>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="bg-[#020306]/85 rounded-2xl border border-slate-900 p-5 mb-8 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search code bases..."
            className="w-full bg-[#000000]/90 text-xs text-slate-200 pl-10 pr-4 py-2.5 rounded-xl border border-slate-900 focus:border-rose-500/40 outline-none transition-all duration-300 font-serif"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Sorting controls */}
          <div className="flex bg-[#000000]/90 rounded-xl p-1 border border-slate-900 text-[10px] font-mono">
            <button
               onClick={() => setSortBy('updated')}
               className={`px-3 py-1.5 rounded-lg transition-all ${sortBy === 'updated' ? 'bg-rose-950/30 text-rose-455 border border-rose-950/35 font-bold' : 'text-slate-450 hover:text-white'}`}
            >
              Latest Activity
            </button>
            <button
               onClick={() => setSortBy('stars')}
               className={`px-3 py-1.5 rounded-lg transition-all ${sortBy === 'stars' ? 'bg-rose-950/30 text-rose-455 border border-rose-950/35 font-bold' : 'text-slate-450 hover:text-white'}`}
            >
              Star Volume
            </button>
          </div>

          {/* Language filter dropdown */}
          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
            <Filter size={11} className="text-rose-500/80" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-[#000000]/90 border border-slate-900 rounded-xl px-2.5 py-1.5 text-slate-300 focus:border-rose-500/30 outline-none text-xs"
            >
              <option value="All">All Languages</option>
              {languagesList.map((lang, idx) => (
                <option key={idx} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-rose-500/20 border-t-rose-500 animate-spin" />
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Querying GitHub Server API...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRepos.map((repo, idx) => {
            const beautified = getBeautifiedDetails(repo.name, repo.description, repo.language);
            return (
              <motion.div
                layout
                key={repo.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative p-6 rounded-2xl bg-[#030409]/95 border border-slate-900/80 hover:border-rose-900/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                {/* Highlight gradient glow ring on card bottom hover */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-rose-600/0 via-rose-600/35 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-rose-950/20 border border-rose-955/30 flex items-center justify-center text-rose-500">
                        <Code2 size={14} />
                      </div>
                      <span className="text-[9px] bg-[#000000] px-2.5 py-0.5 rounded-full font-mono border border-slate-900 text-purple-300 tracking-wider">
                        {beautified.category}
                      </span>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Open GitHub source"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-rose-455 transition-colors duration-250 font-sans">
                      {beautified.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-serif line-clamp-3">
                      {beautified.description}
                    </p>
                  </div>

                  {/* Skills/Tags row */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {beautified.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-900/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-950 text-[10px] font-mono">
                  <div className="flex items-center space-x-3 text-slate-500">
                    <span className="flex items-center space-x-0.5">
                      <Star size={10} className="text-rose-400/85" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center space-x-0.5">
                      <GitFork size={10} className="text-slate-500" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                  
                  <span className="text-[9px] text-slate-600">
                    {new Date(repo.updated_at).toLocaleDateString(undefined, {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* No results prompt */}
      {!loading && sortedRepos.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-xs font-mono">
          No repositories match the specified query filters. Adjust filters to continue.
        </div>
      )}
    </section>
  );
}
