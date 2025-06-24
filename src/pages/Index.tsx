
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Download, Eye, ExternalLink, Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react';

const Portfolio = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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

  const projects = [
    {
      title: "Personal Portfolio Website",
      description: "Modern, responsive portfolio built with HTML5, CSS3, and JavaScript featuring dark mode and smooth animations.",
      tools: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      liveLink: "#",
      category: "Web Development"
    },
    {
      title: "SEO-Optimized Blog",
      description: "WordPress blog with advanced SEO optimization, achieving 95+ PageSpeed score and top search rankings.",
      tools: ["WordPress", "Yoast SEO", "Google Analytics", "PageSpeed"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop",
      liveLink: "#",
      category: "SEO & Content"
    },
    {
      title: "Google Ads Campaign",
      description: "Comprehensive PPC campaign setup with conversion tracking, achieving 150% ROI improvement.",
      tools: ["Google Ads", "Analytics", "Tag Manager", "Conversion Tracking"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      liveLink: "#",
      category: "Paid Advertising"
    },
    {
      title: "Social Media Strategy",
      description: "Complete social media marketing plan with content calendar and Meta Ads implementation.",
      tools: ["Canva", "Meta Ads", "Content Strategy", "Analytics"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop",
      liveLink: "#",
      category: "Social Media"
    },
    {
      title: "Local Business Optimization",
      description: "Google My Business optimization project resulting in 200% increase in local visibility.",
      tools: ["Google My Business", "Local SEO", "Schema Markup", "Citations"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      liveLink: "#",
      category: "Local SEO"
    }
  ];

  const skills = {
    frontend: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "WordPress", "Responsive Design"],
    marketing: ["Google Analytics", "Tag Manager", "Canva", "Chatbots", "Email Automation", "Meta Ads"],
    soft: ["Content Strategy", "Branding", "Conversion Optimization", "SEO", "PPC Management"]
  };

  const certifications = [
    { name: "Webfame Digital Marketing Certificate", issuer: "Webfame Academy", year: "2024" },
    { name: "Google Ads Certified", issuer: "Google", year: "2024" },
    { name: "SEO Fundamentals", issuer: "SEMrush", year: "2024" },
    { name: "Canva Pro Design", issuer: "Canva", year: "2024" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDark ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-sm border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Hero', 'About', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`hover:text-blue-600 transition-colors duration-200 ${
                    activeSection === item.toLowerCase() ? 'text-blue-600 font-medium' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden ${isDark ? 'bg-gray-900' : 'bg-white'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Hero', 'About', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 text-base font-medium hover:text-blue-600 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-x"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
            Hi, I'm Your Name
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 animate-fade-in delay-300">
            Web Developer & Digital Marketer
          </p>
          <p className="text-lg mb-12 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in delay-500">
            Creating beautiful, functional websites and driving digital growth through strategic marketing solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-700">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Eye size={20} />
              View Projects
            </button>
            <button className="px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              <Download size={20} />
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Passionate about creating digital experiences</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a passionate web developer and digital marketing specialist with expertise in creating stunning websites and driving online growth. Currently enrolled at <strong>Webfame Digital Marketing Academy</strong>, ranked among the top 10 digital marketing institutes in India.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-3">Core Digital Marketing Modules Mastered:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['SEO Optimization', 'Google Ads', 'Social Media Marketing', 'Content Strategy', 'Email Marketing', 'Analytics & Tracking'].map((module) => (
                    <div key={module} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">{module}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-600 to-purple-600 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Professional headshot"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  Hello!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Technologies and tools I work with</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="skill-category">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">Front-end Development</h3>
              <div className="space-y-3">
                {skills.frontend.map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="block p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skill-category">
              <h3 className="text-2xl font-semibold mb-6 text-purple-600">Marketing Tools</h3>
              <div className="space-y-3">
                {skills.marketing.map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="block p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skill-category">
              <h3 className="text-2xl font-semibold mb-6 text-pink-600">Soft Skills</h3>
              <div className="space-y-3">
                {skills.soft.map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="block p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Showcasing my best work in web development and digital marketing</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="project-card group">
                <div className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isDark ? 'bg-gray-900' : 'bg-white'} hover:scale-105`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tools.map((tool) => (
                        <span key={tool} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-md">
                          {tool}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href={project.liveLink}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                    >
                      <ExternalLink size={16} />
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Certifications</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Professional credentials and achievements</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className={`certification-card p-6 rounded-xl border-2 border-dashed ${isDark ? 'border-gray-600 hover:border-blue-500' : 'border-gray-300 hover:border-blue-500'} hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300`}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">{cert.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">{cert.issuer}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Let's discuss your next project</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:your.email@example.com" className="text-blue-600 hover:underline">
                        your.email@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <a href="https://wa.me/1234567890" className="text-green-600 hover:underline">
                        +1 (234) 567-8900
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600 dark:text-gray-300">Your City, Country</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 dark:bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            <div className={`p-8 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
              <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none`}
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${isDark ? 'bg-gray-900 border-t border-gray-700' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              © 2024 Your Name. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Powered by Your Name - Web Developer & Digital Marketer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
