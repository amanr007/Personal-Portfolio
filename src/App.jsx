import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    if (!formData.message.trim()) return 'Message is required';
    if (formData.message.trim().length < 10) return 'Message must be at least 10 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setSubmitStatus(error);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

   try {
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_name: 'Aman Rawat', // Your name
  };

  await emailjs.send(
    'service_xb1n9bj',    // From EmailJS dashboard
    'template_pkvhyo5',   // From EmailJS dashboard  
    templateParams,
    'MCDxAwlXGvaiNbbi3'     // From EmailJS dashboard
  );
  
  setSubmitStatus('✅ Message sent successfully! I\'ll get back to you soon.');
  setFormData({ name: '', email: '', message: '' });
} catch (error) {
  console.error('EmailJS error:', error);
  setSubmitStatus('❌ Failed to send message. Please try again or contact me directly.');
}
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const navbar = document.querySelector('.navbar');
    const offset = navbar ? navbar.offsetHeight : 0;
    
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
    setActiveSection(sectionId);
  };

  const projects = [
    {
      title: "Chat Application with Socket.io",
      description: "A full-stack online chat app which runs on localhost React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      github: "#",
      live: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["Vue.js", "Firebase", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      github: "#",
      live: "#"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application with location-based forecasts, interactive maps, and weather alerts using OpenWeather API.",
      tech: ["JavaScript", "API Integration", "Chart.js"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      github: "#",
      live: "#"
    }
  ];

  const skills = [
    "JavaScript", "React", "Node.js", "SQL", "MongoDB", 
    "Tailwind CSS", "Git/Github", "Express", 
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Fixed Navbar */}
      <nav className="navbar fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Portfolio
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex space-x-8">
                {['home', 'about', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-all duration-300 px-3 py-2 rounded-lg ${
                      activeSection === section
                        ? 'text-purple-400 bg-purple-500/10'
                        : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/5'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="capitalize block w-full text-left px-3 py-2 text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">AR</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Aman Rawat
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            MERN Stack Developer crafting beautiful digital experiences with modern technologies
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-xl hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="mx-auto text-purple-400" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate full-stack developer. Who loves creating 
                innovative web applications. I love turning complex problems into simple, 
                beautiful designs that provide exceptional user experiences.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open-source projects, or enjoying a good cup of coffee while reading about 
                the latest industry trends.
              </p>

              <div className="flex space-x-6">
                <a href="
https://github.com/amanr007" className="text-gray-400 hover:text-purple-400 transition-colors transform hover:scale-110">
                  <Github size={28} />
                </a>
                <a href="https://www.linkedin.com/in/aman-rawat-322331314/" className="text-gray-400 hover:text-purple-400 transition-colors transform hover:scale-110">
                  <Linkedin size={28} />
                </a>
                <a href="amanrawat2558@gmail.com.com" className="text-gray-400 hover:text-purple-400 transition-colors transform hover:scale-110">
                  <Mail size={28} />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-slate-800 text-purple-300 rounded-full text-sm font-medium border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
            <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. 
              Let's create something amazing together!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <Mail className="text-purple-400 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-gray-400">amanrawat2558@gmail.com.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <Linkedin className="text-purple-400 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-white font-semibold">LinkedIn</h3>
                  <p className="text-gray-400">https://www.linkedin.com/in/aman-rawat-322331314/</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <Github className="text-purple-400 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-white font-semibold">GitHub</h3>
                  <p className="text-gray-400">https://github.com/amanr007</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {submitStatus && (
                <div className={`p-4 rounded-xl border text-sm font-medium ${
                  submitStatus.includes('✅') 
                    ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  {submitStatus}
                </div>
              )}
              
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message (minimum 10 characters)"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                  required
                ></textarea>
                <div className="text-xs text-gray-500 mt-1">
                  {formData.message.length}/10 characters minimum
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isSubmitting 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:shadow-purple-500/25'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
              
              <div className="text-xs text-gray-500 text-center">
                <p>💡 <strong>To make this fully functional:</strong></p>
                <p>1. Sign up for EmailJS (free)</p>
                <p>2. Replace the demo code with EmailJS integration</p>
                <p>3. Or use Netlify Forms, Formspree, or your own API</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 John Smith. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}