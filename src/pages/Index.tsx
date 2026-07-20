import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Moon, Sun, Menu, X, Download, Eye, ExternalLink, Mail, Phone, Github, Linkedin, Code2, Palette, TrendingUp, Star, Megaphone, PenTool, Video, BarChart, ShoppingCart, Globe, Sparkles, Award, Grid3x3, ChevronLeft, ChevronRight, ChevronDown, Briefcase, GraduationCap, Users, User, Target, Rocket, Search, Calendar, BarChart2, Hourglass } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '@/components/LoadingScreen';
gsap.registerPlugin(ScrollTrigger);

// Import images
import heroImg from "@/assets/hero.webp";
import aboutImg from "@/assets/nahush-about.webp";
import projectKisan from "@/assets/project-kisan.webp";
import linkpostAi from "@/assets/linkpost-ai.webp";
import tindog from "@/assets/tindog.webp";
import portfolioProject from "@/assets/portfolio-project.webp";
import poetree from "@/assets/poetree.webp";
import calmmindAi from "@/assets/calmmind-ai.webp";

// Import icons
import instagramIcon from "@/assets/Icons/instagram.svg";
import metaIcon from "@/assets/Icons/meta.svg";
import shopifyIconOld from "@/assets/Icons/shopify.svg";
import whatsappIconOld from "@/assets/Icons/whatsapp.svg";
import googleAnalyticsIcon from "@/assets/Icons/google-analytics-icon.svg";
import googleMyBusinessIcon from "@/assets/Icons/google-my-business-icon.svg";
import metaIconNew from "@/assets/Icons/meta-icon.svg";
import n8nIcon from "@/assets/Icons/n8n-icon.svg";
import reactJsIcon from "@/assets/Icons/react-js-icon.svg";
import semrushIcon from "@/assets/Icons/semrush-icon.svg";
import shopifyIcon from "@/assets/Icons/shopify-icon.svg";
import whatsappIcon from "@/assets/Icons/wa-whatsapp-icon.svg";

type Project = {
  title: string;
  description: string;
  tools: string[];
  liveLink: string;
  category: string;
  subCategory: string;
  mediaType: string;
  image?: string;
  video?: string;
  aspectRatio?: string;
  iframeSrc?: string;
  graphicCategory?: string;
};

// Typewriter hook
function useTypewriter(words: string[], speed = 100, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? speed / 2 : speed);
    }

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, speed, pause]);

  return text;
}

// Particles component for hero
function HeroParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: `${4 + Math.random() * 6}s`,
    delay: `${Math.random() * 4}s`,
    dx: `${(Math.random() - 0.5) * 60}px`,
    dy: `${(Math.random() - 0.5) * 60}px`,
    size: `${2 + Math.random() * 3}px`,
  }));

  return (
    <div className="hero-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="hero-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            '--duration': p.duration,
            '--delay': p.delay,
            '--dx': p.dx,
            '--dy': p.dy,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}


const Portfolio = () => {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState('digital-marketing');
  const [selectedSubCategory, setSelectedSubCategory] = useState('graphic-design');
  const [selectedGraphicCategory, setSelectedGraphicCategory] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(6);
  const [navHidden, setNavHidden] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [expandedTimeline, setExpandedTimeline] = useState<Record<string, boolean>>({
    'project-based': true,
    'managed': true,
  });

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);
  const lastScrollY = useRef(0);

  const typedText = useTypewriter(
    ['Digital Marketer', 'SEO Specialist', 'Meta Ads Expert', 'Graphic Designer'],
    80,
    1800
  );

  useEffect(() => {
    setVisibleProjectsCount(6);
  }, [selectedCategory, selectedSubCategory, selectedGraphicCategory]);

  // Scroll tracking for active section & nav hide
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Auto-hide nav on mobile scroll down
      if (window.innerWidth < 768) {
        if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
          setNavHidden(true);
        } else {
          setNavHidden(false);
        }
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations on load
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      // Hero
      if (heroRef.current) {
        gsap.from(heroRef.current, { opacity: 0, y: 60, duration: 1, ease: 'power3.out' });
      }
      // About
      if (aboutRef.current) {
        gsap.from(aboutRef.current, {
          scrollTrigger: { trigger: aboutRef.current, start: 'top 85%', once: true },
          opacity: 0, y: 80, duration: 0.8, ease: 'power3.out'
        });
      }
      // Skills
      if (skillsRef.current) {
        gsap.from(skillsRef.current, {
          scrollTrigger: { trigger: skillsRef.current, start: 'top 85%', once: true },
          opacity: 0, y: 80, duration: 0.8, ease: 'power3.out'
        });
      }
      // Projects
      if (projectsRef.current) {
        gsap.from(projectsRef.current, {
          scrollTrigger: { trigger: projectsRef.current, start: 'top 85%', once: true },
          opacity: 0, y: 80, duration: 0.8, ease: 'power3.out'
        });
      }
      // Experience
      if (experienceRef.current) {
        gsap.from(experienceRef.current, {
          scrollTrigger: { trigger: experienceRef.current, start: 'top 85%', once: true },
          opacity: 0, y: 80, duration: 0.8, ease: 'power3.out'
        });
      }
      // Contact
      if (contactRef.current) {
        gsap.from(contactRef.current, {
          scrollTrigger: { trigger: contactRef.current, start: 'top 85%', once: true },
          opacity: 0, y: 80, duration: 0.8, ease: 'power3.out'
        });
      }
    }
  }, [isLoading]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:nahushpatel880@gmail.com?subject=${subject}&body=${body}`;
    toast({ title: "Opening email client...", description: "Please complete sending the email from your email application." });
    e.currentTarget.reset();
    setIsSubmitting(false);
  };

  // Project categories
  const projectCategories = {
    'digital-marketing': {
      name: 'Digital Marketing',
      icon: Megaphone,
      color: 'purple',
      subcategories: [
        { id: 'graphic-design', name: 'Graphic Design', icon: PenTool },
        { id: 'social-media', name: 'Social Media Content', icon: Video },
        { id: 'paid-ads', name: 'Paid Advertising', icon: BarChart }
      ]
    }
  };

  const portfolioImports = import.meta.glob('@/assets/My Portfolio/**/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

  const generatedProjects: Project[] = Object.entries(portfolioImports).map(([path, url]) => {
    const parts = path.split('/');
    const fileName = parts.pop() || '';
    const folderName = parts.pop() || '';
    const title = fileName.replace(/\.[^/.]+$/, "");
    return {
      title,
      description: `Creative design work for ${folderName}`,
      tools: ["Graphic Design", "Photoshop", "Illustrator"],
      image: url as string,
      liveLink: "#",
      category: "digital-marketing",
      subCategory: "graphic-design",
      mediaType: "image",
      graphicCategory: folderName
    };
  });

  const graphicCategories = Array.from(new Set(generatedProjects.map(p => p.graphicCategory))).filter(Boolean) as string[];

  const projects: Project[] = [
    {
      title: "Orgalife Food Reel 1",
      description: "Social media reel for Orgalife Food.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DSFMZfYDKY1/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DSFMZfYDKY1/embed"
    },
    {
      title: "Orgalife Food Reel 2",
      description: "Social media reel for Orgalife Food.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DTHnQl5DAyi/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DTHnQl5DAyi/embed"
    },
    {
      title: "Orgalife Food Reel 3",
      description: "Social media reel for Orgalife Food.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DO8fqHmjsb6/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DO8fqHmjsb6/embed"
    },
    {
      title: "Digital Pallavi Reel",
      description: "Social media reel for Digital Pallavi.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DOOJbE2CaJr/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DOOJbE2CaJr/embed"
    },
    {
      title: "Orgalife Food Reel 4",
      description: "Social media reel for Orgalife Food.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DLL-6OwxKpi/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DLL-6OwxKpi/embed"
    },
    {
      title: "Orgalife Food Reel 5",
      description: "Social media reel for Orgalife Food.",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DLo8Fr0TdBL/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DLo8Fr0TdBL/embed"
    },
    {
      title: "Nexafloors Reel 1",
      description: "🏠 Flooring Installation Experts | Tiles • Marble • Granite • more ✨ Interior & Exterior Flooring 📍Chennai",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DayBEjzKyyM/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DayBEjzKyyM/embed"
    },
    {
      title: "Nexafloors Reel 2",
      description: "🏠 Flooring Installation Experts | Tiles • Marble • Granite • more ✨ Interior & Exterior Flooring 📍Chennai",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DaX81vLKsfn/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DaX81vLKsfn/embed"
    },
    {
      title: "Nexafloors Reel 3",
      description: "🏠 Flooring Installation Experts | Tiles • Marble • Granite • more ✨ Interior & Exterior Flooring 📍Chennai",
      tools: ["Instagram", "Video Editing", "Content Creation"],
      liveLink: "https://www.instagram.com/reel/DaF8w--iD8U/",
      category: "digital-marketing",
      subCategory: "social-media",
      mediaType: "iframe",
      iframeSrc: "https://www.instagram.com/reel/DaF8w--iD8U/embed"
    },
    ...generatedProjects,
  ];

  const experiences = [
    {
      title: "Digital Marketing Executive @ ORGALIFE (Oct 2025 - Present)",
      description: "Managed social media platforms, content strategy, and audience engagement. Executed Meta Ads, WhatsApp marketing, and product launch campaigns. Planned content calendars and managed influencer marketing, barter collaborations, and brand partnerships. Managed day-to-day e-commerce and digital marketing operations. Designed social media creatives, ad graphics, and promotional materials. Managed SEO activities and optimized Google Business Profile (GMB) to improve online visibility and local search performance.",
      tools: ["Meta Ads", "WhatsApp Marketing", "Graphic Design", "SEO"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "management",
      mediaType: "image"
    },
    {
      title: "Freelance Digital Marketer @ GrahSiddhi Constructions",
      description: "Managed social media platforms. Executed Meta Ads campaigns to drive leads and conversions. Designed social media creatives, thumbnails, and ad graphics. Implemented SEO strategies to improve website visibility and rankings. Analyzed campaign performance and optimized marketing efforts.",
      tools: ["Meta Ads", "SEO", "Graphic Design"],
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
      liveLink: "https://www.instagram.com/grahsiddhiconstruction/",
      category: "project-based",
      subCategory: "executive",
      mediaType: "image"
    },
    {
      title: "Medical Coding & Billing @ Omega Healthcare (April 2024 - March 2025)",
      description: "Built data accuracy habits in high-volume record processing - directly applied to campaign tracking, UTM analysis, and SEO reporting.",
      tools: ["Data Accuracy", "UTM Analysis", "Reporting"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "executive",
      mediaType: "image"
    },
    {
      title: "Customer Care Executive @ Sutherland Global (August 2023 - April 2024)",
      description: "Developed persuasive communication, audience empathy, and objection handling - skills directly transferred to ad copywriting and targeting strategy.",
      tools: ["Communication", "Empathy", "Copywriting"],
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "management",
      mediaType: "image"
    },
    {
      title: "Rajim Kumbh (Jan 2026 - Feb 2026)",
      description: "Managed end-to-end social media marketing for the event. Planned and executed content calendars across digital platforms. Designed promotional creatives, posters, and campaign graphics. Increased event visibility through engaging social media campaigns. Coordinated with the team to ensure timely campaign execution.",
      tools: ["Content Calendar", "Design", "Event Marketing"],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "project-based",
      subCategory: "marketing",
      mediaType: "image"
    },
    {
      title: "Rashtriye Kavi Sammelan (Jan 2026)",
      description: "Planned and managed social media promotions for the event. Designed digital creatives and promotional content. Executed content strategy to maximize audience engagement. Coordinated with organizers for campaign planning.",
      tools: ["Social Media", "Graphic Design", "Content Strategy"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "project-based",
      subCategory: "marketing",
      mediaType: "image"
    },
    {
      title: "Nexafloors",
      description: "🏠 Flooring Installation Experts | Tiles • Marble • Granite • more ✨ Interior & Exterior Flooring",
      tools: ["Social Media", "Content Creation"],
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop",
      liveLink: "https://www.instagram.com/nexafloors/",
      category: "project-based",
      subCategory: "marketing",
      mediaType: "image"
    }
  ];

  const skills = {
    frontend: [
      { name: "Content Creation", level: 95, icon: "✍️" },
      { name: "Graphic Design", level: 90, icon: "🎨" },
      { name: "Email Marketing", level: 88, icon: "📧" },
      { name: "Marketing Automation", level: 90, icon: <img src={n8nIcon} alt="n8n" className="w-5 h-5" /> },
      { name: "React JS", level: 82, icon: <img src={reactJsIcon} alt="React" className="w-5 h-5" /> },
      { name: "E-commerce Marketing", level: 82, icon: "🛒" }
    ],
    marketing: [
      { name: "Social Media Mgt", level: 95, icon: <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" /> },
      { name: "Meta Ads Manager", level: 92, icon: <img src={metaIconNew} alt="Meta" className="w-5 h-5" /> },
      { name: "SEO Optimization", level: 88, icon: "🔍" },
      { name: "Google My Business", level: 90, icon: <img src={googleMyBusinessIcon} alt="GMB" className="w-5 h-5" /> },
      { name: "Influencer Marketing", level: 85, icon: "🤝" },
      { name: "Google Analytics", level: 87, icon: <img src={googleAnalyticsIcon} alt="Analytics" className="w-5 h-5" /> }
    ],
    soft: [
      { name: "Meta Business Suite", level: 93, icon: <img src={metaIconNew} alt="Meta" className="w-5 h-5" /> },
      { name: "YouTube Studio", level: 88, icon: "▶️" },
      { name: "Canva & Photoshop", level: 90, icon: "🖼️" },
      { name: "Shopify", level: 80, icon: <img src={shopifyIcon} alt="Shopify" className="w-5 h-5" /> },
      { name: "SEMrush & Yoast", level: 85, icon: <img src={semrushIcon} alt="SEMrush" className="w-5 h-5" /> }
    ]
  };

  const certifications = [
    { name: "6-Month Full Digital Marketing Course", issuer: "Webfame Digital Marketing Institute", year: "2025" },
    { name: "Diploma in Pharmacy (D.Pharm)", issuer: "The Pharmaceutical College, Barpali", year: "2022" },
    { name: "Higher Secondary (12th Science - CBSE)", issuer: "Padampur Public School, Bargarh", year: "2019" },
    { name: "Secondary (10th - BSE Odisha)", issuer: "C.S. High School, Jagdalpur", year: "2017" }
  ];

  const managedAccounts = [
    { name: "Orgalife Food", url: "https://www.instagram.com/orgalifefood?igsh=MTRhdGk2YWVwbHVjMw==" },
    { name: "Rajim Kumbh 2026", url: "https://www.instagram.com/rajimkumbhkalp2026?igsh=MTFkeGMzaXh3c2Y2ag==" },
    { name: "Chhattisgarhi Agrwal Samaj", url: "https://www.instagram.com/cgdauagrawalsamaj?igsh=MTV1NGtndGVrdDhyNg==" },
    { name: "Nexafloors", url: "https://www.instagram.com/nexafloors/" },
    { name: "GrahSiddhi Constructions", url: "https://www.instagram.com/grahsiddhiconstruction/" }
  ];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    if (selectedCategory !== 'all' && selectedCategory !== project.category) return false;
    if (selectedSubCategory !== 'all' && selectedSubCategory !== project.subCategory) return false;
    if (selectedSubCategory === 'graphic-design' && selectedGraphicCategory !== 'all' && project.graphicCategory !== selectedGraphicCategory) return false;
    return true;
  });

  const displayedProjects = filteredProjects.slice(0, visibleProjectsCount);

  const navItems = ['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

  // Helper to parse experience title
  const parseExpTitle = (title: string) => {
    const titleParts = title.split(' @ ');
    const role = titleParts[0].replace(/\s*\(.*?\)\s*/g, '');
    const company = titleParts[1] ? titleParts[1].split(' (')[0] : '';
    const dateMatch = title.match(/\((.*?)\)/);
    const date = dateMatch ? dateMatch[1] : '';
    return { role, company, date };
  };

  const skillColors = {
    frontend: { accent: 'blue', gradient: 'from-blue-500 to-blue-400', dot: 'bg-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
    marketing: { accent: 'yellow', gradient: 'from-yellow-500 to-yellow-400', dot: 'bg-yellow-500', bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20' },
    soft: { accent: 'cyan', gradient: 'from-cyan-500 to-cyan-400', dot: 'bg-cyan-500', bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/20' },
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className={`min-h-screen transition-colors duration-300 relative ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>

        {/* ===== FLOATING NAV ===== */}
        <nav className={`nav-floating ${isDark ? 'dark-mode' : 'light-mode'} ${navHidden ? 'nav-hidden' : ''}`}>
          <div className="flex items-center gap-1">
            {/* Logo - visible on desktop */}
            <div className="hidden md:flex items-center mr-4">
              <img 
                src={heroImg} 
                alt="Nahush Patel" 
                className="w-8 h-8 rounded-full object-cover border border-yellow-500/30 shadow-sm"
              />
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''} ${isDark ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-600 hover:text-yellow-600'}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ml-2 ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile fullscreen overlay */}
        <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''} ${isDark ? 'dark-mode' : 'light-mode'}`}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`mobile-nav-link ${isDark ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-yellow-600'} ${activeSection === item.toLowerCase() ? 'text-yellow-500' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* ===== HERO SECTION ===== */}
        <section ref={heroRef} id="hero" className="min-h-[85vh] md:min-h-[90vh] flex items-center justify-center relative overflow-hidden pt-16">
          <HeroParticles />
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
              {/* Profile Image with glow ring */}
              <div className="flex-shrink-0 animate-fade-in">
                <div className="hero-glow-ring">
                  <div className="w-44 h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden bg-gray-900">
                    <img
                      src={heroImg}
                      alt="Nahush Patel - Digital Marketing Professional"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Content */}
              <div className="flex-1 text-center lg:text-left">
                <p className={`text-xs md:text-sm uppercase tracking-[0.2em] mb-2 md:mb-3 animate-fade-in ${isDark ? 'text-yellow-400/80' : 'text-yellow-600/80'}`}>
                  Welcome to my portfolio
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-fade-in">
                  Hi, I'm Nahush Patel
                </h1>
                <p className={`text-lg md:text-2xl mb-3 md:mb-5 font-semibold animate-fade-in delay-300 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {typedText}<span className="typewriter-cursor" />
                </p>
                <p className={`text-sm md:text-base mb-5 md:mb-7 max-w-xl mx-auto lg:mx-0 animate-fade-in delay-500 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Creative and detail-oriented Digital Marketing Professional with hands-on experience in social media management, content strategy, Meta Ads, graphic design, and e-commerce coordination.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in delay-700">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="btn-shimmer px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-full hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Eye size={18} />
                    View My Work
                  </button>
                  <a
                    href="/Nahush_Patel_Resume.pdf"
                    download
                    className={`px-6 py-3 border-2 border-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}
                  >
                    <Download size={18} />
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT SECTION — Bento Grid ===== */}
        <section ref={aboutRef} id="about" className={`py-12 md:py-20 relative z-10 ${isDark ? 'bg-gray-900/50' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">About Me</h2>
              <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Passionate about creating digital experiences that matter</p>
              <div className="section-divider" />
            </div>

            <div className="bento-grid">
              {/* Bio card — Who I Am */}
              <div className="bento-card col-span-2 lg:col-span-2 bg-white border border-gray-100 shadow-sm flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 flex-shrink-0">
                      <User size={20} className="stroke-2" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Who <span className="text-yellow-400">I Am</span></h3>
                  </div>
                  <div className="w-10 h-1 bg-yellow-400 mb-4 rounded-full ml-1" />

                  <p className="text-xs md:text-sm leading-relaxed mb-2.5 text-gray-700">
                    I'm <strong className="text-gray-900">Nahush Patel</strong>, a passionate Digital Marketing Professional skilled in social media strategy, content creation, SEO, Meta Ads, and graphic design. I execute engaging campaigns that boost online presence and visibility for brands.
                  </p>
                  <p className="text-xs md:text-sm leading-relaxed text-gray-700">
                    With experience at <strong className="text-gray-900">ORGALIFE</strong>, <strong className="text-gray-900">GrahSiddhi Constructions</strong>, <strong className="text-gray-900">Omega Healthcare</strong>, and <strong className="text-gray-900">Sutherland Global</strong>, I bring a unique blend of campaign execution and data-driven marketing skills.
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-2 md:divide-x divide-gray-100">
                  <div className="flex items-center gap-2.5 px-1">
                    <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-500 flex-shrink-0">
                      <Target size={18} className="stroke-2" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-xs">Data-Driven</span>
                      <span className="text-[10px] text-gray-500">Strategic Approach</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 px-1 md:pl-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-500 flex-shrink-0">
                      <Rocket size={18} className="stroke-2" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-xs">Result-Oriented</span>
                      <span className="text-[10px] text-gray-500">Campaign Execution</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 px-1 md:pl-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-500 flex-shrink-0">
                      <TrendingUp size={18} className="stroke-2" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-xs">Growth Focused</span>
                      <span className="text-[10px] text-gray-500">Measurable Impact</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image card */}
              <div className="bento-card col-span-2 md:col-span-1 lg:col-span-2 p-0 flex flex-col relative overflow-hidden bg-[#0f172a] border border-white/10 shadow-xl">
                
                {/* Decorative Dots Top-Left */}
                <div className="absolute top-4 left-4 grid grid-cols-4 gap-1.5 opacity-30 z-0">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]" />
                  ))}
                </div>

                {/* Decorative Swoosh Bottom-Right */}
                <svg className="absolute -right-4 bottom-12 w-40 h-40 text-yellow-500 opacity-80 z-0 pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 100 Q 50 100 100 50" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>

                <div className="relative px-6 pt-8 pb-3 z-10 w-full flex justify-center mt-2">
                  <div className="w-full max-w-[180px] md:max-w-[200px] aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl">
                    <img
                      src={aboutImg}
                      alt="Nahush Patel"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                
                <div className="px-6 pb-6 relative z-10 mt-auto">
                  <h3 className="text-2xl font-bold mb-1 text-white">Nahush Patel</h3>
                  <p className="text-[#14b8a6] font-medium text-xs md:text-sm mb-2">Digital Marketing Professional</p>
                  <p className="text-xs flex items-center gap-1.5 text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    Raipur, Chhattisgarh, India
                  </p>
                </div>
              </div>

              {/* Core Competencies — spans full width on mobile */}
              <div className="bento-card col-span-2 md:col-span-3 lg:col-span-2 bg-white border border-gray-100 shadow-sm flex flex-col p-6">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-10 h-10 rounded-full bg-[#0f172a] flex items-center justify-center text-yellow-400 flex-shrink-0">
                    <Star size={20} className="stroke-2" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Core <span className="text-yellow-400">Competencies</span></h3>
                </div>
                <div className="w-10 h-1 bg-yellow-400 mb-5 rounded-full ml-1" />

                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 md:divide-x divide-gray-100 my-auto">
                  {[
                    { icon: <Megaphone size={16} className="text-slate-800" />, l1: 'Social Media', l2: 'Strategy' },
                    { icon: <PenTool size={16} className="text-slate-800" />, l1: 'Content', l2: 'Creation' },
                    { icon: <Search size={16} className="text-slate-800" />, l1: 'SEO', l2: 'Optimization' },
                    { icon: <img src="/src/assets/Icons/meta-icon.svg" alt="Meta" className="w-4 h-4 opacity-80" />, l1: 'Meta Ads', l2: 'Manager' },
                    { icon: <Palette size={16} className="text-slate-800" />, l1: 'Graphic', l2: 'Design' },
                    { icon: <Calendar size={16} className="text-slate-800" />, l1: 'Campaign', l2: 'Planning' },
                    { icon: <BarChart2 size={16} className="text-slate-800" />, l1: 'Analytics &', l2: 'Tracking' },
                    { icon: <ShoppingCart size={16} className="text-slate-800" />, l1: 'E-commerce', l2: 'Marketing' },
                    { icon: <Users size={16} className="text-slate-800" />, l1: 'Influencer', l2: 'Marketing' },
                    { icon: <Hourglass size={16} className="text-slate-800" />, l1: 'Email', l2: 'Marketing' }
                  ].map((c) => (
                    <div key={c.l1} className="flex flex-col items-center justify-center text-center px-1">
                      <div className="w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center mb-1.5">
                        {c.icon}
                      </div>
                      <div className="w-3 h-0.5 bg-yellow-400 mb-1.5 rounded-full" />
                      <span className="text-[10px] md:text-[11px] font-bold text-gray-800 leading-tight">{c.l1}</span>
                      <span className="text-[10px] md:text-[11px] font-bold text-gray-800 leading-tight">{c.l2}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="bento-card col-span-2 p-0 overflow-hidden bg-[#0f172a] border border-white/10 shadow-xl">
                <div className="grid grid-cols-2 h-full divide-x divide-y divide-white/5">
                  {[
                    { icon: <Star size={24} />, value: '16+', title: 'Skills', subtitle: 'Mastered', iconBg: 'bg-[#14b8a6]', iconColor: 'text-white' },
                    { icon: <Code2 size={24} />, value: '6+', title: 'Tech', subtitle: 'Stack', iconBg: 'bg-yellow-500', iconColor: 'text-[#0f172a]' },
                    { icon: <Palette size={24} />, value: '6+', title: 'Design', subtitle: 'Tools', iconBg: 'bg-[#14b8a6]', iconColor: 'text-white' },
                    { icon: <TrendingUp size={24} />, value: '89%', title: 'Avg', subtitle: 'Proficiency', iconBg: 'bg-yellow-500', iconColor: 'text-[#0f172a]' },
                  ].map((stat, idx) => (
                    <div key={stat.title} className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 ${idx === 0 || idx === 1 ? 'border-b' : ''} ${idx % 2 === 0 ? 'border-r' : ''} border-white/5`}>
                      <div className={`w-14 h-14 rounded-full ${stat.iconBg} ${stat.iconColor} flex items-center justify-center flex-shrink-0`}>
                        {stat.icon}
                      </div>
                      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <span className="text-[11px] text-gray-300 font-medium tracking-wide">{stat.title}</span>
                        <span className="text-3xl font-bold text-white leading-none my-1.5">{stat.value}</span>
                        <span className="text-[11px] text-gray-400 font-medium">{stat.subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SKILLS SECTION — Compact Chips ===== */}
        <section ref={skillsRef} id="skills" className={`py-12 md:py-20 relative z-10 overflow-hidden ${isDark ? '' : 'bg-gray-50'}`}>
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-600/5' : 'bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-600/10'}`} />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Skills & Expertise</h2>
              <p className={`text-sm md:text-base max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Mastering digital creation through cutting-edge technologies
              </p>
              <div className="section-divider" />
            </div>

            <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
              {(Object.entries(skills) as [keyof typeof skills, typeof skills.frontend][]).map(([key, skillList]) => {
                const colors = skillColors[key];
                const titles = { frontend: 'Content & Design', marketing: 'Digital Marketing', soft: 'Strategic Tools' };
                const icons = { frontend: <Code2 size={20} />, marketing: <Palette size={20} />, soft: <TrendingUp size={20} /> };

                return (
                  <div key={key} className={`rounded-2xl p-4 md:p-5 border transition-all duration-300 hover:scale-[1.02] ${isDark
                    ? `bg-gray-800/60 ${colors.border} hover:border-${colors.accent}-500/40`
                    : `bg-white ${colors.border} shadow-sm hover:shadow-md`
                  }`}>
                    {/* Card header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white shadow-lg`}>
                        {icons[key]}
                      </div>
                      <div>
                        <h3 className="font-bold text-base">{titles[key]}</h3>
                      </div>
                    </div>

                    {/* Skill chips */}
                    <div className="space-y-1.5">
                      {skillList.map((skill, i) => (
                        <div key={skill.name} className={`skill-chip group ${isDark ? 'bg-gray-900/60 hover:bg-gray-900' : 'bg-gray-50 hover:bg-gray-100'} rounded-lg`}>
                          <span className="text-base flex-shrink-0">{skill.icon}</span>
                          <span className={`text-sm font-medium flex-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                              <div className={`h-full rounded-full bg-gradient-to-r ${colors.gradient}`} style={{ width: `${skill.level}%` }} />
                            </div>
                            <span className={`text-[10px] font-bold ${colors.text} opacity-70`}>{skill.level}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ===== PROJECTS SECTION ===== */}
        <section ref={projectsRef} id="projects" className={`py-12 md:py-20 relative z-10 ${isDark ? 'bg-gray-900/50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Featured Projects</h2>
              <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Showcasing professional work across digital marketing</p>
              <div className="section-divider" />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-10">
              {projectCategories['digital-marketing'].subcategories.map((sub) => {
                const SubIcon = sub.icon;
                const count = projects.filter(p => p.subCategory === sub.id).length;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubCategory(sub.id)}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${selectedSubCategory === sub.id
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg shadow-yellow-500/20 scale-105'
                      : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-white/5' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <SubIcon size={14} />
                    {sub.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Graphic Category Filter */}
            {selectedSubCategory === 'graphic-design' && graphicCategories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button
                  onClick={() => setSelectedGraphicCategory('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${selectedGraphicCategory === 'all'
                    ? 'bg-yellow-500 text-black shadow-md'
                    : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Designs
                </button>
                {graphicCategories.map((gCat) => {
                  const count = projects.filter(p => p.category === selectedCategory && p.subCategory === 'graphic-design' && p.graphicCategory === gCat).length;
                  return (
                    <button
                      key={gCat}
                      onClick={() => setSelectedGraphicCategory(gCat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1 ${selectedGraphicCategory === gCat
                        ? 'bg-yellow-500 text-black shadow-md'
                        : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Palette size={12} />
                      {gCat} ({count})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {displayedProjects.map((project, index) => (
                <div key={index} className="project-card group">
                  <div className={`rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] ${isDark ? 'bg-gray-800/60 border border-white/5 hover:border-yellow-500/20' : 'bg-white shadow-sm hover:shadow-xl border border-gray-100'}`}>
                    {/* Media */}
                    <div className="relative overflow-hidden bg-gray-800">
                      {project.mediaType === 'video' ? (
                        <div className={`relative w-full ${project.aspectRatio === '9:16' ? 'aspect-[9/16] max-h-96 mx-auto' : project.aspectRatio === '1:1' ? 'aspect-square' : 'aspect-video'}`}>
                          <video className="w-full h-full object-cover" controls>
                            <source src={project.video} type="video/mp4" />
                          </video>
                        </div>
                      ) : project.mediaType === 'iframe' ? (
                        <div className="relative w-full overflow-hidden aspect-[9/16]">
                          <iframe
                            src={project.iframeSrc}
                            className="absolute top-0 left-0 w-full border-0"
                            style={{ height: 'calc(100% + 150px)' }}
                            allowTransparency={true}
                            allow="encrypted-media"
                            scrolling="no"
                          />
                        </div>
                      ) : (
                        <div
                          className={`relative ${project.subCategory === 'graphic-design' ? 'p-3 cursor-pointer' : ''}`}
                          onClick={() => project.subCategory === 'graphic-design' && setLightboxIndex(index)}
                        >
                          <div className={`${project.subCategory === 'graphic-design' ? 'border-2 border-white/10 rounded-lg' : ''} overflow-hidden aspect-[4/3]`}>
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Info */}
                    {project.subCategory !== 'graphic-design' && (
                      <div className="p-4">
                        <h3 className={`text-base font-bold mb-2 group-hover:text-yellow-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                        <p className={`text-xs mb-3 leading-relaxed line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tools.slice(0, 3).map((tool) => (
                            <span key={tool} className={`px-2 py-0.5 text-[10px] rounded-md font-semibold ${isDark ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-50 text-yellow-700'}`}>
                              {tool}
                            </span>
                          ))}
                        </div>
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-yellow-500 hover:text-yellow-400 font-semibold text-xs transition-colors"
                        >
                          <ExternalLink size={14} />
                          View Project
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {visibleProjectsCount < filteredProjects.length && (
              <div className="text-center mt-8 md:mt-12">
                <button
                  onClick={() => setVisibleProjectsCount(prev => prev + 6)}
                  className="btn-shimmer px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-full hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 font-semibold text-sm"
                >
                  See More Projects
                </button>
              </div>
            )}

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* ===== EXPERIENCE SECTION — Timeline ===== */}
        <section ref={experienceRef} id="experience" className={`py-12 md:py-20 relative z-10 ${isDark ? '' : 'bg-gray-50'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Experience & Education</h2>
              <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Professional journey and academic background</p>
              <div className="section-divider" />
            </div>

            {/* Work Experience — Timeline */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase size={20} className="text-yellow-500" />
                <h3 className="text-xl md:text-2xl font-bold">Work Experience</h3>
              </div>

              <div className="timeline timeline-desktop">
                {experiences.filter(e => e.category === 'work-experience').map((exp, index) => {
                  const { role, company, date } = parseExpTitle(exp.title);
                  return (
                    <div key={index} className="timeline-item">
                      <div className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-gray-800/60 border-white/5 hover:border-yellow-500/30' : 'bg-white border-gray-100 shadow-sm hover:shadow-lg'}`}>
                        <h4 className="font-bold text-sm md:text-base mb-1">{role}</h4>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {company && <span className="text-yellow-500 text-xs font-bold uppercase tracking-wide">{company}</span>}
                          {date && <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isDark ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{date}</span>}
                        </div>
                        <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{exp.description}</p>
                        <div className="flex flex-wrap gap-1.5 timeline-tags">
                          {exp.tools.map(tool => (
                            <span key={tool} className={`px-2 py-0.5 text-[10px] rounded-full font-semibold ${isDark ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project-Based Experience — Collapsible */}
            <div className="mb-10">
              <button
                onClick={() => setExpandedTimeline(prev => ({ ...prev, 'project-based': !prev['project-based'] }))}
                className="flex items-center gap-2 mb-6 group"
              >
                <Users size={20} className="text-yellow-500" />
                <h3 className="text-xl md:text-2xl font-bold">Project-Based Work</h3>
                <ChevronDown size={18} className={`text-gray-400 transition-transform ${expandedTimeline['project-based'] ? 'rotate-180' : ''}`} />
              </button>

              {expandedTimeline['project-based'] && (
                <div className="grid md:grid-cols-2 gap-4">
                  {experiences.filter(e => e.category === 'project-based').map((exp, index) => {
                    const { role, company, date } = parseExpTitle(exp.title);
                    return (
                      <div key={index} className={`p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-gray-800/60 border-white/5 hover:border-yellow-500/30' : 'bg-white border-gray-100 shadow-sm hover:shadow-lg'}`}>
                        <h4 className="font-bold text-sm md:text-base mb-1">{role}</h4>
                        {date && <span className={`text-[10px] font-mono px-2 py-0.5 rounded inline-block mb-2 ${isDark ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{date}</span>}
                        <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{exp.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tools.map(tool => (
                            <span key={tool} className={`px-2 py-0.5 text-[10px] rounded-full font-semibold ${isDark ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Managed Accounts — Collapsible */}
            <div className="mb-10">
              <button
                onClick={() => setExpandedTimeline(prev => ({ ...prev, 'managed': !prev['managed'] }))}
                className="flex items-center gap-2 mb-6 group"
              >
                <Globe size={20} className="text-yellow-500" />
                <h3 className="text-xl md:text-2xl font-bold">Accounts Managed</h3>
                <ChevronDown size={18} className={`text-gray-400 transition-transform ${expandedTimeline['managed'] ? 'rotate-180' : ''}`} />
              </button>

              {expandedTimeline['managed'] && (
                <div className="flex flex-wrap gap-3">
                  {managedAccounts.map((account, index) => (
                    <a
                      key={index}
                      href={account.url}
                      target={account.url !== '#' ? "_blank" : undefined}
                      rel={account.url !== '#' ? "noopener noreferrer" : undefined}
                      className={`px-4 py-2.5 rounded-xl border transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm font-medium ${isDark ? 'bg-gray-800/60 border-white/5 hover:border-yellow-500/30 text-white' : 'bg-white border-gray-100 shadow-sm hover:shadow-md text-gray-900'}`}
                    >
                      <img src={instagramIcon} alt="IG" className="w-4 h-4" />
                      {account.name}
                      {account.url !== '#' && <ExternalLink size={12} className="text-gray-400" />}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap size={20} className="text-yellow-500" />
                <h3 className="text-xl md:text-2xl font-bold">Education & Certifications</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {certifications.map((cert, index) => (
                  <div key={index} className={`certification-card p-4 rounded-2xl border text-center transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gray-800/60 border-white/5 hover:border-yellow-500/30' : 'bg-white border-gray-100 shadow-sm hover:shadow-lg'}`}>
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="text-white" size={16} />
                    </div>
                    <h4 className="font-bold text-xs md:text-sm mb-1">{cert.name}</h4>
                    <p className={`text-[10px] md:text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{cert.issuer}</p>
                    <p className="text-yellow-500 text-xs font-bold">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT SECTION ===== */}
        <section ref={contactRef} id="contact" className={`py-12 md:py-20 relative z-10 ${isDark ? 'bg-gray-900/50' : 'bg-white'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Get In Touch</h2>
              <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Let's discuss how we can work together</p>
              <div className="section-divider" />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
              {/* Contact info */}
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] ${isDark ? 'bg-gray-800/60 border border-white/5' : 'bg-gray-50 border border-gray-100'}`}>
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Email</h4>
                    <a href="mailto:nahushpatel880@gmail.com" className={`text-xs hover:text-yellow-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      nahushpatel880@gmail.com
                    </a>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] ${isDark ? 'bg-gray-800/60 border border-white/5' : 'bg-gray-50 border border-gray-100'}`}>
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-700">
                    <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">WhatsApp</h4>
                    <a href="https://wa.me/917875783498" target="_blank" rel="noopener noreferrer" className={`text-xs hover:text-yellow-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      +91 787-578-3498
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a href="https://www.linkedin.com/in/nahush-patel/" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? 'bg-gray-800 hover:bg-yellow-500 text-gray-400 hover:text-black' : 'bg-gray-100 hover:bg-yellow-500 text-gray-500 hover:text-black'}`}>
                    <Linkedin size={16} />
                  </a>
                  <a href="https://github.com/deviljitu1" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? 'bg-gray-800 hover:bg-yellow-500 text-gray-400 hover:text-black' : 'bg-gray-100 hover:bg-yellow-500 text-gray-500 hover:text-black'}`}>
                    <Github size={16} />
                  </a>
                  <a href="https://wa.me/917875783498" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? 'bg-gray-800 hover:bg-yellow-500' : 'bg-gray-100 hover:bg-yellow-500'}`}>
                    <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Contact form with floating labels */}
              <div className={`p-5 md:p-8 rounded-2xl ${isDark ? 'bg-gray-800/60 border border-white/5' : 'bg-gray-50 border border-gray-100'}`}>
                <h3 className="text-lg font-bold mb-5">Send Message</h3>
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder=" "
                      className={`w-full px-4 py-3 rounded-xl border transition-colors text-sm outline-none ${isDark ? 'bg-gray-900/60 border-gray-700 focus:border-yellow-500 text-white' : 'bg-white border-gray-200 focus:border-yellow-500 text-gray-900'}`}
                    />
                    <label>Your name</label>
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder=" "
                      className={`w-full px-4 py-3 rounded-xl border transition-colors text-sm outline-none ${isDark ? 'bg-gray-900/60 border-gray-700 focus:border-yellow-500 text-white' : 'bg-white border-gray-200 focus:border-yellow-500 text-gray-900'}`}
                    />
                    <label>Your email</label>
                  </div>
                  <div className="floating-label-group">
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder=" "
                      className={`w-full px-4 py-3 rounded-xl border transition-colors text-sm outline-none resize-none ${isDark ? 'bg-gray-900/60 border-gray-700 focus:border-yellow-500 text-white' : 'bg-white border-gray-200 focus:border-yellow-500 text-gray-900'}`}
                    />
                    <label>Your message</label>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-shimmer w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-[1.02] font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FOOTER — Minimal Single-Row ===== */}
        <footer className={`py-6 relative z-10 ${isDark ? 'bg-gray-950 border-t border-white/5' : 'bg-gray-50 border-t border-gray-200'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-bold text-sm bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Nahush Patel
              </span>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/in/nahush-patel/" target="_blank" rel="noopener noreferrer" className={`hover:text-yellow-500 transition-colors ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  <Linkedin size={16} />
                </a>
                <a href="https://github.com/deviljitu1" target="_blank" rel="noopener noreferrer" className={`hover:text-yellow-500 transition-colors ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  <Github size={16} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <img src={instagramIcon} alt="Instagram" className="w-4 h-4" />
                </a>
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                © 2026 Nahush Patel. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* ===== LIGHTBOX ===== */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setLightboxIndex(null)}>
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 z-[101]"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            >
              <X size={28} />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                let prevIndex = lightboxIndex - 1;
                while (prevIndex >= 0 && filteredProjects[prevIndex].subCategory !== 'graphic-design') {
                  prevIndex--;
                }
                if (prevIndex < 0) {
                  prevIndex = filteredProjects.length - 1;
                  while (prevIndex >= 0 && filteredProjects[prevIndex].subCategory !== 'graphic-design') {
                    prevIndex--;
                  }
                }
                setLightboxIndex(Math.max(0, prevIndex));
              }}
            >
              <ChevronLeft size={40} />
            </button>

            <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
              <img
                src={filteredProjects[lightboxIndex].image}
                alt={filteredProjects[lightboxIndex].title}
                className="max-w-full max-h-full object-contain select-none"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                let nextIndex = lightboxIndex + 1;
                while (nextIndex < filteredProjects.length && filteredProjects[nextIndex].subCategory !== 'graphic-design') {
                  nextIndex++;
                }
                if (nextIndex >= filteredProjects.length) {
                  nextIndex = 0;
                  while (nextIndex < filteredProjects.length && filteredProjects[nextIndex].subCategory !== 'graphic-design') {
                    nextIndex++;
                  }
                }
                setLightboxIndex(Math.min(filteredProjects.length - 1, nextIndex));
              }}
            >
              <ChevronRight size={40} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;