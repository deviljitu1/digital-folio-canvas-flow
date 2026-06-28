import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Moon, Sun, Menu, X, Download, Eye, ExternalLink, Mail, Phone, Github, Linkedin, Code2, Palette, TrendingUp, Star, Megaphone, PenTool, Video, BarChart, ShoppingCart, Globe, Sparkles, Award, Grid3x3, Box as BoxIcon } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Moon, Sun, Menu, X, Download, Eye, ExternalLink, Mail, Phone, Github, Linkedin, Code2, Palette, TrendingUp, Star, Megaphone, PenTool, Video, BarChart, ShoppingCart, Globe, Sparkles, Award, Grid3x3, Box as BoxIcon } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '@/components/LoadingScreen';
import MouseParallax from '@/components/MouseParallax';
import FloatingIcons from '@/components/FloatingIcons';

gsap.registerPlugin(ScrollTrigger);

// Import images
import kiranProfile from "@/assets/kiran-profile.jpeg";
import projectKisan from "@/assets/project-kisan.webp";
import linkpostAi from "@/assets/linkpost-ai.webp";
import tindog from "@/assets/tindog.webp";
import portfolioProject from "@/assets/portfolio-project.webp";
import poetree from "@/assets/poetree.webp";
import calmmindAi from "@/assets/calmmind-ai.webp";

const Portfolio = () => {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const certificationsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'certifications', 'contact'];
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations on load
  useEffect(() => {
    if (!isLoading) {
      // Hero section animation
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      // About section scroll animation
      if (aboutRef.current) {
        gsap.from(aboutRef.current, {
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power3.out'
        });
      }

      // Skills section scroll animation
      if (skillsRef.current) {
        gsap.from(skillsRef.current, {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power3.out'
        });

        // Animate skill cards
        const skillCards = skillsRef.current.querySelectorAll('.skill-card');
        gsap.from(skillCards, {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }

      // Projects section scroll animation
      if (projectsRef.current) {
        gsap.from(projectsRef.current, {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power3.out'
        });

        // Animate project cards
        const projectCards = projectsRef.current.querySelectorAll('.project-card');
        gsap.from(projectCards, {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          scale: 0.9,
          y: 50,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out'
        });
      }

      // Certifications section scroll animation
      if (certificationsRef.current) {
        gsap.from(certificationsRef.current, {
          scrollTrigger: {
            trigger: certificationsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power3.out'
        });
      }

      // Contact section scroll animation
      if (contactRef.current) {
        gsap.from(contactRef.current, {
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power3.out'
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

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const { data: response, error } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      e.currentTarget.reset();
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Project categories with subcategories
  const projectCategories = {
    'work-experience': {
      name: 'Work Experience',
      icon: Award,
      color: 'blue',
      subcategories: [
        { id: 'management', name: 'Management', icon: TrendingUp },
        { id: 'executive', name: 'Executive', icon: Star }
      ]
    },
    'project-based': {
      name: 'Project-Based',
      icon: Megaphone,
      color: 'purple',
      subcategories: [
        { id: 'marketing', name: 'Social Media Marketing', icon: Video },
        { id: 'design', name: 'Graphic Design', icon: PenTool }
      ]
    }
  };

  const projects = [
    {
      title: "Digital Marketing Manager @ ORGALIFE",
      description: "Managed social media platforms, content planning, and audience engagement. Executed Meta Ads campaigns and WhatsApp marketing activities. Planned product launch campaigns and designed graphics.",
      tools: ["Meta Ads", "WhatsApp Marketing", "Graphic Design"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "management",
      mediaType: "image"
    },
    {
      title: "Social Media Executive @ CHOUHAN HOUSING",
      description: "Managed Instagram, Facebook, and LinkedIn to increase brand awareness. Executed marketing campaigns, designed promotional creatives, and generated leads. Monitored insights and prepared reports.",
      tools: ["Instagram", "Facebook", "Lead Gen", "Reporting"],
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "executive",
      mediaType: "image"
    },
    {
      title: "Digital Marketing Executive @ GATE ACADEMY X UNACADEMY",
      description: "Oversaw YouTube channel, executed Meta Ads campaigns, designed thumbnails, and implemented on-page and off-page SEO strategies to improve organic traffic.",
      tools: ["YouTube SEO", "Meta Ads", "SEO"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "executive",
      mediaType: "image"
    },
    {
      title: "Social Media Manager @ GENIQUE EDUCATION",
      description: "Managed and grew social media accounts across platforms. Handled YouTube SEO, audience engagement, and analyzed performance insights to improve reach.",
      tools: ["Social Media", "Analytics", "Strategy"],
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "work-experience",
      subCategory: "management",
      mediaType: "image"
    },
    {
      title: "Rajim Kumbh (Jan 2026 - Feb 2026)",
      description: "Managed end-to-end social media marketing for the event. Planned content calendars, designed promotional posters, and increased event visibility.",
      tools: ["Content Calendar", "Design", "Event Marketing"],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "project-based",
      subCategory: "marketing",
      mediaType: "image"
    },
    {
      title: "Agrawal Samaj Event (2025)",
      description: "Planned and managed social media promotions for the event. Designed digital creatives and executed content strategies to maximize audience engagement.",
      tools: ["Social Media", "Graphic Design"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "project-based",
      subCategory: "marketing",
      mediaType: "image"
    },
    {
      title: "Saras Mela (2024)",
      description: "Managed social media platforms and event promotions. Designed banners, posters, and promotional creatives to maintain consistent branding.",
      tools: ["Graphic Design", "Social Media", "Branding"],
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop",
      liveLink: "#",
      category: "project-based",
      subCategory: "design",
      mediaType: "image"
    }
  ];

  const skills = {
    frontend: [
      { name: "Content Creation", level: 95, icon: "✍️" },
      { name: "Graphic Design", level: 90, icon: "🎨" },
      { name: "Email Marketing", level: 88, icon: "📧" },
      { name: "Campaign Planning", level: 85, icon: "📅" },
      { name: "Marketing Automation", level: 90, icon: "🤖" },
      { name: "E-commerce Marketing", level: 82, icon: "🛒" }
    ],
    marketing: [
      { name: "Social Media Mgt", level: 95, icon: "📱" },
      { name: "Meta Ads Manager", level: 92, icon: "📢" },
      { name: "SEO Optimization", level: 88, icon: "🔍" },
      { name: "Digital Strategy", level: 90, icon: "📈" },
      { name: "Influencer Marketing", level: 85, icon: "🤝" },
      { name: "Google Analytics", level: 87, icon: "📊" }
    ],
    soft: [
      { name: "Meta Business Suite", level: 93, icon: "💼" },
      { name: "YouTube Studio", level: 88, icon: "▶️" },
      { name: "Canva & Photoshop", level: 90, icon: "🖼️" },
      { name: "Shopify", level: 80, icon: "🛍️" },
      { name: "SEMrush & Yoast", level: 85, icon: "🎯" }
    ]
  };

  const certifications = [
    { name: "Bachelor of Commerce", issuer: "Sri Agrasen Kanya Mahavialaya, Korba, Chhattisgarh", year: "2026" },
    { name: "Digital Marketing Course", issuer: "Bizgurukul (Online)", year: "October 2022" }
  ];
      </section>

      {/* Certifications Section */}
      <section ref={certificationsRef} id="certifications" className={`py-20 relative z-10 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Certifications & Training</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Professional credentials and continuous learning</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className={`certification-card p-6 rounded-xl border-2 border-dashed ${isDark ? 'border-gray-600 hover:border-blue-500 hover:bg-blue-900/10' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'} transition-all duration-300 hover:scale-105`}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">{cert.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">{cert.issuer}</p>
                  <p className="text-blue-600 dark:text-blue-400 text-xs mt-1 font-medium">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className={`py-20 relative z-10 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Get In Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Let's collaborate and create something amazing</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:srivastavakirann012@gmail.com" className="text-blue-600 hover:underline">
                        srivastavakirann012@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <a href="https://wa.me/919340630254" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                        +91 934-063-0254
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Website</p>
                      <a href="https://www.reallygreatsite.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                        reallygreatsite.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/nahush-patel/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/deviljitu1" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Github size={20} />
                </a>
                <a href="https://wa.me/7875783498" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Phone size={20} />
                </a>
              </div>
            </div>
            
            <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none`}
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 relative z-10 ${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-6">
              <a href="https://www.linkedin.com/in/nahush-patel/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/deviljitu1" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.reallygreatsite.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors">
                <Globe size={24} />
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              © 2026 Kiran Srivastava. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Digital Marketing Professional | Building Digital Experiences
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Portfolio;