import { useState, useEffect, MouseEvent } from 'react';
import { 
  Terminal as TerminalIcon, 
  Cloud, 
  Cpu, 
  Database, 
  Network, 
  Sliders, 
  ChevronRight, 
  Activity, 
  Shield, 
  Globe, 
  FileText, 
  Github, 
  ExternalLink, 
  Lock, 
  Server,
  Download,
  Clock,
  BarChart2,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Twitter
} from 'lucide-react';

import { Skill, Experience, MetricState } from './types';
import cvData from './data.json';
import TelemetryChart from './components/TelemetryChart';
import PythonPipelineRunner from './components/PythonPipelineRunner';
import DeployModal from './components/DeployModal';
import ContactModal from './components/ContactModal';
import SystemsLogConsole from './components/SystemsLogConsole';

// Custom generated Medium post thumbnails
import chicagoCrimeImg from './assets/images/chicago_crime_thumbnail_1779568417989.png';
import rfmAnalyticsImg from './assets/images/rfm_analytics_thumbnail_1779568438856.png';
import profpic from './assets/images/bintang_avatar2.png';
import chicago_thumbnail from './assets/images/chicago.png';
import ecommerce_thumbnail from './assets/images/ecommerce.png';
import dexPnlThumbnail from './assets/images/dex_pnl_thumbnail.png';

export default function App() {
  // Modal visibility states
  const [isDeployOpen, setIsDeployOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Profile picture states with resilient fallback candidate paths
  const personal = cvData.personal;
  const profileImgCandidates = [
    profpic,
    '/input_file_0.png',
    '/input_file_1.png',
    '/input_file_2.png'
  ];
  const [profileImg, setProfileImg] = useState(profileImgCandidates[0]);
  const [profileImgIndex, setProfileImgIndex] = useState(0);

  const handleProfileImgError = () => {
    if (profileImgIndex + 1 < profileImgCandidates.length) {
      const nextIndex = profileImgIndex + 1;
      setProfileImgIndex(nextIndex);
      setProfileImg(profileImgCandidates[nextIndex]);
    }
  };

  // Expended skill card detailing
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Real-time metric states with dynamic fluctuations (representing ClickHouse querying speed & S3 queues)
  const [metrics, setMetrics] = useState<MetricState>({
    throughput: 1.20,
    clusterLoad: 92.4,
    latency: 1.2,
    uptime: 99.99
  });

  // Smoothly oscillate metrics to simulate a live database environment
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => {
        const tDrift = (Math.random() * 0.06 - 0.03); // +/- 0.03 M rows/sec
        const lDrift = (Math.random() * 8 - 4);      // +/- 4% Load
        const latDrift = (Math.random() * 0.15 - 0.075); // +/- 0.075 ms

        let newThroughput = Number((prev.throughput + tDrift).toFixed(2));
        if (newThroughput < 1.05) newThroughput = 1.05;
        if (newThroughput > 1.35) newThroughput = 1.35;

        let newLoad = Number((prev.clusterLoad + lDrift).toFixed(1));
        if (newLoad < 85.0) newLoad = 85.0;
        if (newLoad > 98.5) newLoad = 98.5;

        let newLatency = Number((prev.latency + latDrift).toFixed(1));
        if (newLatency < 0.9) newLatency = 0.9;
        if (newLatency > 1.5) newLatency = 1.5;

        // Keep uptime rock solid at 99.99%
        return {
          throughput: newThroughput,
          clusterLoad: newLoad,
          latency: newLatency,
          uptime: 99.99
        };
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Track active scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'education-section', 'projects', 'contacts'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'terminal': return <TerminalIcon className="text-primary-fixed w-5 h-5 flex-shrink-0" />;
      case 'cloud': return <Cloud className="text-primary-fixed w-5 h-5 flex-shrink-0" />;
      case 'cpu': return <Cpu className="text-primary-fixed w-5 h-5 flex-shrink-0" />;
      case 'database': return <Database className="text-primary-fixed w-5 h-5 flex-shrink-0" />;
      case 'network': return <Network className="text-primary-fixed w-5 h-5 flex-shrink-0" />;
      case 'sliders': return <Sliders className="text-primary-fixed w-5 h-5 flex-shrink-0" />;
      default: return <Database className="text-primary-fixed w-5 h-5 flex-shrink-0" />;
    }
  };
  // personal is already declared near the top of the App function
  const skills = cvData.skills;
  const experience = cvData.experience;
  const projects = cvData.projects;
  const education = cvData.education;
  const certifications = cvData.certifications;

  return (
    <div className="grid-pattern min-h-screen selection:bg-primary-container selection:text-on-primary">
      
      {/* TopNavBar */}
      <nav id="nav" className="fixed top-0 w-full z-30 bg-background/85 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-[1280px] mx-auto">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-2xl font-bold tracking-tighter text-primary cursor-pointer hover:opacity-80 transition-opacity uppercase"
          >
            BINTANG MUHAMMAD
          </div>
          
          {/* Menu Items */}
          <div className="hidden md:flex gap-8 items-center">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'education-section', label: 'education and certifications' },
              { id: 'projects', label: 'Projects' },
              { id: 'contacts', label: 'Contacts' }
            ].map(link => {
              const active = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleSmoothScroll(e, link.id)}
                  className={`font-mono text-xs tracking-wider uppercase transition-all duration-300 relative py-1 ${
                    active ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-fixed block animate-pulse"></span>
                  )}
                </a>
              );
            })}
          </div>
          
          {/* Actions */}

        </div>
      </nav>

      {/* Main Grid */}
      <main className="pt-32 pb-24 max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* Hero Section */}
        <section id="hero" className="flex flex-col items-center text-center pt-8 mb-24 md:mb-32">
          
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary-fixed/20 bg-primary-fixed/5 text-primary-fixed font-mono text-xs tracking-wider font-semibold mb-6 animate-pulse-glow">
            <span className="w-2 h-2 rounded-full bg-primary-fixed inline-block"></span>
            BUSINESS INTELLIGENCE & DATA ANALYTICS
          </div>
          
          {/* Main Title heading - responsive display */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold max-w-5xl mx-auto mb-8 tracking-tighter text-white uppercase leading-[1.08] select-text">
            {personal.subtitle}
          </h1>
          
          {/* Subheading */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface-variant max-w-3xl mx-auto mb-12 leading-relaxed select-text">
            Business Intelligence Analyst & Engineer with a Master’s in Applied Business Analytics. Offers 4+ years of experience optimizing Retail, Fashion, and F&B operations.
          </p>
          
          {/* Main image banner device */}
          <div 
            id="hero-banner"
            className="relative w-full aspect-[1.3] sm:aspect-[1.8] md:aspect-[2.1] rounded-xl overflow-hidden glass-card group transition-all duration-700 mx-auto max-w-5xl"
          >
            <img 
              className="w-full h-full object-cover opacity-60 group-hover:scale-[1.03] transition-transform duration-1000 ease-out" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXyIZNdcZ54XgJ-QR-JtUaBwlMuXO1zjX2LnHvmNoEk-E9aeBYEzL7nYXH3Wo25bJ9WapEvvk06g3Mg4cnxXEa7UogalnaRKBzeOtfVAO4fG7TqBNP0bUVVmRJY7QhHIgyRZHGJE9P2zez5QGJlCjlN5xLl5hG8CG0LxYYwNgyLwFsTF5hn0JWG-9rjbbQor5UnxAgke6Rv4mwuxZ-uVY50qu8w3_qmIztqO6p51fraA0ZyKztKsIuNS2MPuunXyvsn-N7qvnaWvY"
              alt="Data Analysis and Dashboard visualization"
              referrerPolicy="no-referrer"
            />
            
            {/* Centered Circular Profile Frame */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-56 h-56 sm:w-72 sm:h-72 md:w-88 md:h-88 rounded-full border-8 border-[#0b0c0c] shadow-2xl overflow-hidden bg-background">
              <img 
                className="w-full h-full object-cover"
                src={profileImg}
                onError={handleProfileImgError}
                alt="Bintang Muhammad"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
            
            {/* Visual anchor elements */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-left z-10 font-mono">
              <div className="text-primary-fixed text-xs tracking-wider uppercase mb-1 font-semibold flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded inline-block font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim inline-block animate-ping"></span>
                BINTANG MUHAMMAD
              </div>
            </div>
          </div>

        </section>

        {/* About & Skills Section */}
        <section id="about" className="pt-20 border-t border-outline-variant/30 mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Narrative Col */}
            <div className="lg:col-span-5 space-y-6 select-text">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight uppercase">
                Bridging Data Engineering & Tactical Analysis
              </h2>
              
              <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {personal.summary}
              </p>              {/* Informative Icons Panel */}
              <div className="space-y-4 pt-4 text-lg sm:text-xl font-sans text-neutral-200 font-bold">
                <div className="flex items-center gap-4">
                  <Mail className="w-8 h-8 text-primary-fixed shrink-0" />
                  <span>{personal.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-8 h-8 text-primary-fixed shrink-0" />
                  <span>{personal.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-8 h-8 text-primary-fixed shrink-0" />
                  <span>{personal.location}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-4">
                <a 
                  href={personal.cvLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary-container text-on-primary font-mono text-xs font-semibold tracking-wider uppercase px-6 py-2.5 rounded-full bloom-hover transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
                <a 
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-outline hover:border-white text-on-surface hover:text-white font-mono text-xs px-6 py-2.5 rounded-full hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  Github Profile
                </a>
                <a 
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-outline hover:border-white text-on-surface hover:text-white font-mono text-xs px-6 py-2.5 rounded-full hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn
                </a>
                <a 
                  href={personal.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-outline hover:border-white text-on-surface hover:text-white font-mono text-xs px-6 py-2.5 rounded-full hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Twitter className="w-4 h-4 text-primary-fixed" />
                  X Profile
                </a>
              </div>
            </div>
            
            {/* Right Skills Grid Col */}
            <div id="skills" className="lg:col-span-7 space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-primary-fixed font-bold">
                Professional Expertise & Core Domains
              </div>

              <div className="space-y-4">
                {[
                  {
                    category: "Languages & Frameworks",
                    skills: "Python, SQL, and Django.",
                    icon: <TerminalIcon className="text-primary-fixed w-5 h-5 flex-shrink-0" />
                  },
                  {
                    category: "Database & Cloud Architecture",
                    skills: "Cloud platforms (GCP, AWS) and data warehouses (BigQuery, ClickHouse).",
                    icon: <Database className="text-primary-fixed w-5 h-5 flex-shrink-0" />
                  },
                  {
                    category: "Business Intelligence & Dashboards",
                    skills: "Metabase, Tableau, Looker, and KPI development.",
                    icon: <Sliders className="text-primary-fixed w-5 h-5 flex-shrink-0" />
                  },
                  {
                    category: "Data Engineering & ETL",
                    skills: "Data pipelines, SQL transformations, and validation.",
                    icon: <Cpu className="text-primary-fixed w-5 h-5 flex-shrink-0" />
                  },
                  {
                    category: "Advanced Analytics & Modeling",
                    skills: "Predictive analytics, machine learning, and statistical forecasting.",
                    icon: <TrendingUp className="text-primary-fixed w-5 h-5 flex-shrink-0" />
                  },
                  {
                    category: "Customer & Product Analytics",
                    skills: "Segmentation, A/B testing, cohort analysis, and CRM analytics.",
                    icon: <BarChart2 className="text-primary-fixed w-5 h-5 flex-shrink-0" />
                  },
                  {
                    category: "Web3 & On-Chain Analytics",
                    skills: "Dune Analytics.",
                    icon: <Network className="text-primary-fixed w-5 h-5 flex-shrink-0" />
                  },
                  {
                    category: "Technical Communication",
                    skills: "Data storytelling and requirements gathering.",
                    icon: <FileText className="text-primary-fixed w-5 h-5 flex-shrink-0" />
                  },
                  {
                    category: "Development Workflows",
                    skills: "Git version control and Jupyter Notebook.",
                    icon: <ChevronRight className="text-primary-fixed w-5 h-5 flex-shrink-0" />
                  },
                  {
                    category: "Bilingual Communication",
                    skills: "Fluent English and Native Bahasa Indonesia.",
                    icon: <Globe className="text-primary-fixed w-5 h-5 flex-shrink-0" />
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="glass-card p-4 rounded-lg flex items-start gap-4 hover:border-primary-fixed/40 transition-all border border-[#1e2224] bg-black/30"
                  >
                    <div className="p-2 bg-primary-fixed/5 rounded-lg shrink-0 border border-primary-fixed/10">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-mono text-sm font-bold text-white tracking-wide uppercase">
                        {item.category}
                      </h4>
                      <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                        {item.skills}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Professional Trajectory (Experience Timeline) */}
        <section id="experience" className="pt-20 border-t border-outline-variant/30 mb-24 md:mb-32">
          
          <h2 className="font-display text-3xl font-bold text-white tracking-tight leading-none mb-12 uppercase">
            Professional Trajectory
          </h2>
          
          <div className="relative border-l border-outline-variant/40 pl-6 ml-4 space-y-12">
            
            {experience.map((exp: Experience, idx: number) => {
              const themeColor = idx % 2 === 0 ? "border-primary-fixed text-primary-fixed" : "border-secondary-fixed text-secondary-fixed";
              const hoverColor = idx % 2 === 0 ? "hover:border-primary-fixed/25" : "hover:border-secondary-fixed/25";
              
              return (
                <div key={exp.company} className="relative group select-text">
                  {/* Glowing Timeline Node marker anchor */}
                  <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 ${themeColor} emissive-glow group-hover:scale-125 transition-transform duration-300`}></div>
                  
                  <div className={`glass-card p-6 rounded ${hoverColor} transition-all bg-black/40 space-y-3 max-w-4xl shadow-md`}>
                    <div className={`font-mono text-xs tracking-widest uppercase font-semibold ${idx % 2 === 0 ? "text-primary-fixed" : "text-secondary-fixed"}`}>
                      {exp.period}
                    </div>
                    
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-white uppercase tracking-tight">
                      {exp.title}
                    </h3>
                    
                    <div className="font-mono text-xs text-white/50 tracking-wider font-semibold uppercase flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {exp.company}
                    </div>
                    
                    <ul className="text-on-surface-variant font-sans text-xs sm:text-sm space-y-2 pt-2 leading-relaxed">
                      {exp.highlights.map((highlight: string, hIdx: number) => (
                        <li key={hIdx} className="flex items-start gap-1.5 group/bullet">
                          <ChevronRight className="text-primary-fixed w-4 h-4 pt-1 shrink-0 group-hover/bullet:translate-x-1 transition-transform" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Associated Technologies badges */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {exp.tech.map((t: string) => (
                        <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-white/60 uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}          </div>
        </section>

        {/* Academics & Certifications Panel (Refined CV Section) - Positioned right after experience */}
        <section id="education-section" className="pt-20 border-t border-outline-variant/30 mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Narrative: Education */}
            <div className="lg:col-span-5 space-y-6 select-text text-left">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white leading-tight uppercase flex items-center gap-2">
                <BookOpen className="text-primary-fixed w-6 h-6 shrink-0" />
                education
              </h2>

              <div className="space-y-6 pt-4">
                {education.map((edu: any) => (
                  <div key={edu.degree} className="border-l-2 border-primary-fixed-dim/40 pl-4 space-y-1.5 bg-white/[0.01] p-3 rounded-r">
                    <span className="font-mono text-[10px] text-primary-fixed font-semibold uppercase block">{edu.period}</span>
                    <h4 className="font-display text-base font-bold text-white uppercase">{edu.degree}</h4>
                    <p className="font-mono text-xs text-white/50">{edu.institution} — <span className="italic">{edu.location}</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Narrative: Certifications */}
            <div className="lg:col-span-7 space-y-6 select-text text-left">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white leading-tight uppercase flex items-center gap-2">
                <Award className="text-primary-fixed w-6 h-6 shrink-0" />
                Certifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {certifications.map((cert: any) => (
                  <div key={cert.name} className="glass-card p-4 rounded flex flex-col justify-between hover:border-secondary-fixed/20 transition-all bg-black/10">
                    <div>
                      <div className="flex justify-between items-center mb-2 font-mono text-[9px] text-secondary-fixed font-semibold uppercase">
                        <span>
                          {cert.name.toLowerCase().includes('account') || cert.name.toLowerCase().includes('brevet') 
                            ? 'ACCOUNTING & TAX' 
                            : cert.name.toLowerCase().includes('scholarship') 
                              ? 'SCHOLARSHIP / GTM' 
                              : 'DATA SCIENCE'}
                        </span>
                        <span>{cert.period}</span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-white uppercase leading-snug tracking-wide">{cert.name}</h4>
                      {cert.details && (
                        <p className="font-sans text-xs text-on-surface-variant mt-2 leading-relaxed">{cert.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Active Nodes & Systems (Projects & Dashboards) */}
        <section id="projects" className="pt-20 border-t border-outline-variant/30 mb-24 md:mb-32">
          
          <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-12 uppercase">
            projects
          </h2>

          {/* Grid of the projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {projects.map((proj: any) => (
              <div key={proj.title} className="glass-card p-6 rounded flex flex-col justify-between hover:border-primary-fixed/20 transition-all bg-black/20 group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 bg-primary-fixed/5 text-primary-fixed text-[9px] font-mono border border-primary-fixed/15 rounded-sm font-semibold uppercase tracking-widest">
                      {proj.category}
                    </span>
                    {proj.title !== "Independent Crypto Trader & Researcher" && proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors cursor-pointer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  <h4 className="font-display text-lg font-bold text-white group-hover:text-primary-fixed transition-colors pointer-events-none uppercase">
                    {proj.title}
                  </h4>
                  
                  <p className="text-on-surface-variant font-sans text-xs mt-2.5 leading-relaxed mb-6 select-text">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {proj.tech.map((t: string) => (
                    <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-white/50 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Medium Publications & Case Studies (First under projects) */}
          <div className="mt-16 pt-16 border-t border-outline-variant/30 text-left">
            <div className="font-mono text-xs uppercase tracking-widest text-primary-fixed mb-2 font-bold">
              Engineering Journals
            </div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight uppercase">
              Medium Publications & Portfolios
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              
              {/* Article 1 */}
              <a 
                href="https://medium.com/@bintangm22/calculating-realized-pnl-from-dex-trades-using-fifo-in-sql-fe339fb779c8"
                target="_blank"
                rel="noreferrer"
                className="glass-card overflow-hidden bg-black/20 hover:border-primary-fixed/35 transition-all group flex flex-col rounded-lg hover:-translate-y-1 duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5 bg-neutral-900">
                  <img 
                    src={dexPnlThumbnail}
                    alt="Calculating Realized PnL from DEX Trades Thumbnail"
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f10] via-transparent to-transparent"></div>
                  
                  {/* Badge overlay bottom left */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-2 py-1 bg-black/85 text-primary-fixed text-[9px] font-mono border border-primary-fixed/20 rounded font-bold uppercase tracking-wider">
                      ON-CHAIN PNL
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div className="p-6 flex flex-col justify-between flex-1 text-left space-y-4">
                  <div>
                    <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-bold flex items-center gap-1">
                      <span>CASE STUDY</span>
                      <span>•</span>
                      <span>READ TIME: 4 MIN</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-primary-fixed transition-colors mt-2 uppercase">
                      Calculating Realized PnL from DEX Trades Using FIFO in SQL
                    </h3>
                    <p className="text-on-surface-variant font-sans text-xs mt-3 leading-relaxed">
                      A walkthrough of a pure-SQL approach to cost basis tracking across all DEX swaps. Every DEX swap is publicly recorded on-chain, but knowing whether you're in profit requires calculating realized PnL using FIFO cost basis — entirely in SQL.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wide text-primary-fixed shrink-0 pt-2 border-t border-white/5">
                    <span>Read full publication on Medium</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 duration-300 transition-transform" />
                  </div>
                </div>
              </a>

              {/* Article 2 */}
              <a 
                href="https://medium.com/@bintangm22/chicago-crime-rates-in-2012-2017-sekolah-data-pacmann-project-820669f9394d"
                target="_blank"
                rel="noreferrer"
                className="glass-card overflow-hidden bg-black/20 hover:border-primary-fixed/35 transition-all group flex flex-col rounded-lg hover:-translate-y-1 duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5 bg-neutral-900">
                  <img 
                    src={chicagoCrimeImg}
                    alt="Chicago Crime Rates Thumbnail"
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f10] via-transparent to-transparent"></div>
                  
                  {/* Badge overlay bottom left */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-2 py-1 bg-black/85 text-primary-fixed text-[9px] font-mono border border-primary-fixed/20 rounded font-bold uppercase tracking-wider">
                      CRIME DATA DESIGN
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div className="p-6 flex flex-col justify-between flex-1 text-left space-y-4">
                  <div>
                    <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-bold flex items-center gap-1">
                      <span>CASE STUDY</span>
                      <span>•</span>
                      <span>READ TIME: 6 MIN</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-primary-fixed transition-colors mt-2 uppercase">
                      Chicago Crime Rates in 2012–2017
                    </h3>
                    <p className="text-on-surface-variant font-sans text-xs mt-3 leading-relaxed">
                      Chicago, one of the largest cities in the United States, has been at the forefront of discussions regarding urban crime and safety. Over the years, the city has witnessed varying levels of crime, which have had significant implications for its residents, governance, and public policies.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wide text-primary-fixed shrink-0 pt-2 border-t border-white/5">
                    <span>Read full publication on Medium</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 duration-300 transition-transform" />
                  </div>
                </div>
              </a>

              {/* Article 3 */}
              <a 
                href="https://medium.com/@bintangm22/customer-personality-analysis-with-rfm-e10028d98c7b"
                target="_blank"
                rel="noreferrer"
                className="glass-card overflow-hidden bg-black/20 hover:border-primary-fixed/35 transition-all group flex flex-col rounded-lg hover:-translate-y-1 duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5 bg-neutral-900">
                  <img 
                    src={rfmAnalyticsImg}
                    alt="Customer Personality RFM Analysis Thumbnail"
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f10] via-transparent to-transparent"></div>
                  
                  {/* Badge overlay bottom left */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-2 py-1 bg-black/85 text-primary-fixed text-[9px] font-mono border border-primary-fixed/20 rounded font-bold uppercase tracking-wider">
                      RFM SEGMENTATION
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div className="p-6 flex flex-col justify-between flex-1 text-left space-y-4">
                  <div>
                    <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-bold flex items-center gap-1">
                      <span>CASE STUDY</span>
                      <span>•</span>
                      <span>READ TIME: 8 MIN</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-primary-fixed transition-colors mt-2 uppercase">
                      Customer Personality Analysis with RFM
                    </h3>
                    <p className="text-on-surface-variant font-sans text-xs mt-3 leading-relaxed">
                      In today's business world, knowing what your customers do is super important. One of the best ways to figure this out is by using something called RFM analysis. It's a simple yet powerful way to see what your customers are up to by looking at their shopping habits.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wide text-primary-fixed shrink-0 pt-2 border-t border-white/5">
                    <span>Read full publication on Medium</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 duration-300 transition-transform" />
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* Tableau BI Analytics Hub (Second under projects) */}
          <div className="mt-16 pt-16 border-t border-outline-variant/30">
            <div className="flex flex-col justify-between items-start mb-8 text-left">
              <div>
                <span className="px-2.5 py-1 bg-primary-fixed/5 text-primary-fixed text-[9px] font-mono border border-primary-fixed/15 rounded-sm font-semibold uppercase tracking-widest">
                  BI TELEMETRY & DASHBOARDS
                </span>
                <h3 className="font-display text-2xl font-bold text-white uppercase mt-3 tracking-tight">
                  Interactive Tableau BI Analytics Hub
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Ecommerce Sales Dashboard (First) */}
              <a 
                href="https://public.tableau.com/app/profile/bintang2902/viz/EcommerceSalesDashboard_17603901437910/Dashboard1"
                target="_blank"
                rel="noreferrer"
                className="glass-card overflow-hidden bg-[#070808]/90 rounded-xl relative border border-white/5 shadow-2xl flex flex-col justify-between hover:border-primary-fixed/35 transition-all duration-300 group hover:-translate-y-1 block"
              >
                <div className="px-5 py-3 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/50 font-mono text-[9px] text-white/50 tracking-wider">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-ping"></span>
                    <span className="text-white group-hover:text-primary-fixed transition-colors uppercase">
                      Ecommerce Sales Dashboard
                    </span>
                  </div>
                  <div className="px-2.5 py-1 bg-[#161a1d] group-hover:bg-primary-fixed/10 text-primary-fixed text-[8px] font-bold border border-primary-fixed/20 rounded flex items-center gap-1 transition-all">
                    <span>VIEW ON TABLEAU</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Aspect ratio bounding box for image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
                  <img 
                    src={ecommerce_thumbnail}
                    alt="Ecommerce Sales Dashboard"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                </div>
              </a>

              {/* Chicago Crime Dashboard (Second) */}
              <a 
                href="https://public.tableau.com/app/profile/bintang2902/viz/ChicagoCrimeDataDashboard_17603899316410/Dashboard1"
                target="_blank"
                rel="noreferrer"
                className="glass-card overflow-hidden bg-[#070808]/90 rounded-xl relative border border-white/5 shadow-2xl flex flex-col justify-between hover:border-secondary-fixed/35 transition-all duration-300 group hover:-translate-y-1 block"
              >
                <div className="px-5 py-3 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/50 font-mono text-[9px] text-white/50 tracking-wider">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
                    <span className="text-white group-hover:text-secondary-fixed transition-colors uppercase">
                      Chicago Crime Dashboard
                    </span>
                  </div>
                  <div className="px-2.5 py-1 bg-[#161a1d] group-hover:bg-secondary-fixed/10 text-secondary-fixed text-[8px] font-bold border border-secondary-fixed/20 rounded flex items-center gap-1 transition-all">
                    <span>VIEW ON TABLEAU</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Aspect ratio bounding box for image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
                  <img 
                    src={chicago_thumbnail}
                    alt="Chicago Crime Dashboard"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"></div>
                </div>
              </a>

            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section id="contacts" className="pt-20 border-t border-outline-variant/30 mb-24 md:mb-12">
          
          <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-4 uppercase">
            contacts
          </h2>
          <p className="font-sans text-sm text-on-surface-variant mb-10 max-w-xl leading-relaxed">
            Have a project in mind, want to discuss on-chain analytics, or looking for a certified Business Intelligence specialist? Reach out via any of the channels below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Email Card */}
            <a 
              href={`mailto:${personal.email}`}
              className="glass-card p-6 bg-[#070808]/90 rounded-xl border border-white/5 hover:border-primary-fixed/20 transition-all flex flex-col justify-between group h-36"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary-fixed/5 rounded-lg border border-primary-fixed/10 text-primary-fixed group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary-fixed group-hover:translate-x-1 transition-all" />
              </div>
              <div className="mt-4">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block font-bold">Email Address</span>
                <span className="font-sans text-sm font-semibold text-white truncate block mt-1 transition-all group-hover:text-primary-fixed">{personal.email}</span>
              </div>
            </a>

            {/* Phone Card */}
            <a 
              href={`tel:${personal.phone.replace(/\s+/g, '')}`}
              className="glass-card p-6 bg-[#070808]/90 rounded-xl border border-white/5 hover:border-primary-fixed/20 transition-all flex flex-col justify-between group h-36"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary-fixed/5 rounded-lg border border-primary-fixed/10 text-primary-fixed group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary-fixed group-hover:translate-x-1 transition-all" />
              </div>
              <div className="mt-4">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block font-bold">Phone Number</span>
                <span className="font-sans text-sm font-semibold text-white block mt-1 transition-all group-hover:text-primary-fixed">{personal.phone}</span>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a 
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-6 bg-[#070808]/90 rounded-xl border border-white/5 hover:border-primary-fixed/20 transition-all flex flex-col justify-between group h-36"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary-fixed/5 rounded-lg border border-primary-fixed/10 text-primary-fixed group-hover:scale-110 transition-transform duration-300">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary-fixed group-hover:translate-x-1 transition-all" />
              </div>
              <div className="mt-4">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block font-bold">LinkedIn</span>
                <span className="font-sans text-sm font-semibold text-white block mt-1 transition-all group-hover:text-primary-fixed">Bintang Muhammad</span>
              </div>
            </a>

            {/* GitHub Card */}
            <a 
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-6 bg-[#070808]/90 rounded-xl border border-white/5 hover:border-primary-fixed/20 transition-all flex flex-col justify-between group h-36"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary-fixed/5 rounded-lg border border-primary-fixed/10 text-primary-fixed group-hover:scale-110 transition-transform duration-300">
                  <Github className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary-fixed group-hover:translate-x-1 transition-all" />
              </div>
              <div className="mt-4">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block font-bold">GitHub Portfolio</span>
                <span className="font-sans text-sm font-semibold text-white block mt-1 transition-all group-hover:text-primary-fixed">FullKersa</span>
              </div>
            </a>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-12 mt-12 border-t border-outline-variant/30 bg-background select-all">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto px-6 md:px-12 font-mono">
          
          <div className="flex flex-col items-center md:items-start gap-3 mb-8 md:mb-0 text-left">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display text-2xl font-bold tracking-tighter text-on-surface cursor-pointer inline-block uppercase"
            >
              BINTANG MUHAMMAD
            </div>
            <p className="font-mono text-[10px] text-primary-fixed-dim/80 uppercase tracking-widest font-bold">
              © 2026 BINTANG MUHAMMAD
            </p>
          </div>
          


        </div>
      </footer>

      {/* Deploy cluster modal full-screen simulation */}
      {isDeployOpen && (
        <DeployModal onClose={() => setIsDeployOpen(false)} />
      )}

      {/* Contact vault secure modal */}
      {isContactOpen && (
        <ContactModal 
          onClose={() => setIsContactOpen(false)} 
          userEmail={personal.email} 
        />
      )}

      {/* Sliding telemetry drawer cluster console */}
      <SystemsLogConsole 
        isOpen={isConsoleOpen} 
        onClose={() => setIsConsoleOpen(false)} 
      />

    </div>
  );
}
