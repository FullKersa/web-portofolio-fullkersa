export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  tableau: string;
  summary: string;
  cvLink?: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number; // percentage width e.g. 95
  description: string;
  tools: string[];
}

export interface Experience {
  period: string;
  title: string;
  company: string;
  highlights: string[];
  tech: string[];
}

export interface ProjectType {
  title: string;
  description: string;
  link: string;
  category: string;
  tech: string[];
}

export interface EducationType {
  degree: string;
  institution: string;
  period: string;
  location: string;
}

export interface CertificationType {
  name: string;
  period: string;
  details: string;
}

export interface MetricState {
  throughput: number; // e.g. querying speeds
  clusterLoad: number; // e.g. warehouse cluster utilization
  latency: number; // database pipeline latency
  uptime: number; // reporting pipeline uptime
}
