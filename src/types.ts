export interface Basics {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  metrics?: string[]; // highlighting specific results/metrics
  category?: 'industry' | 'academic' | 'internship';
}

export interface Achievement {
  id: string;
  title: string;
  metric: string;
  context: string;
  type: 'growth' | 'efficiency' | 'academic' | 'accuracy';
}

export interface Publication {
  title: string;
  subtitle: string;
  bullets?: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Education {
  institution: string;
  degree: string;
  dates: string;
  gpa?: string;
  location?: string;
  extraDetails?: string;
}

export interface ResumeData {
  basics: Basics;
  experience: Experience[];
  achievements: Achievement[];
  publications: Publication[];
  skills: SkillGroup[];
  education: Education[];
  extra: string[];
}
