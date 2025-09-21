import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown, ArrowRight, Code, Sparkles, Zap, Globe, Database, Server, Palette } from 'lucide-react';
import emailjs from '@emailjs/browser';



export default function Portfolio() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(false);
  const heroRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Intersection Observer for animations
  useEffect(() => {

   


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    // Replace these with your actual EmailJS credentials
    const serviceID = 'service_xb1n9bj'; // Your Service ID
    const templateID = 'template_pkvhyo5'; // Your Template ID  
    const publicKey = 'MCDxAwlXGvaiNbbi3'; // Your Public Key

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'amanrawat2558@gmail.com',
    };

    await emailjs.send(serviceID, templateID, templateParams, publicKey);
    
    setSubmitStatus('✅ Message sent successfully! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    console.error('EmailJS error:', error);
    setSubmitStatus('❌ Failed to send message. Please try again or contact me directly.');
  } finally {
    setIsSubmitting(false);
  }
};
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
      title: "AI Blog Platform",
      description: "Dynamic content platform built on the MERN stack, automating blog creation with the Gemini API to deliver high-quality content in seconds. Features a modern, responsive UI and complete routing for seamless viewing and management of all published posts.",
      tech: ["MongoDB", "Express.js", "Tailwind CSS", "React", "Node.js", "CORS", "OpenAI API"],
      image: "https://media.istockphoto.com/id/2058249361/photo/information-services-for-businesses-using-ai-technology-artificial-intelligence-businesswoman.webp?a=1&b=1&s=612x612&w=0&k=20&c=A6X6kX8ZbGzuyj9ae-9juijWlSEH3prjYRvbwQbQ6no=",
      github: "https://github.com/amanr007/ai-blog.git",
      live: "#",
      category: "Full Stack"
    },
    {
      title: "Chat Application",
      description: "A MERN-stack chat application with separate frontend and backend. Users can send and receive real-time messages. The project is built using MongoDB, Express, React, and Node.js.",
      tech: ["MongoDB", "Express.js", "Tailwind CSS", "React", "Node.js", "CORS"],
      image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhdCUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D",
      github: "https://github.com/amanr007/MERN-Chat-App.git",
      live: "#",
      category: "Full Stack"
    },
    {
      title: "Employee Management System",
      description: "The Employee Management System is a full-stack web app with separate frontend and backend that allows users to add, update, delete, and manage employee records efficiently.",
      tech: ["MongoDB", "Express.js", "Tailwind CSS", "React", "Node.js"],
      image: "https://images.unsplash.com/photo-1696041761374-6cfa63afe0b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZW1wbG95ZWUlMjBtYW5hZ2VtZW50JTIwc3lzdGVtfGVufDB8fDB8fHww",
      github: "https://github.com/amanr007/Employee-Mangement-System.git",
      live: "#",
      category: "Full Stack"
    },
    {
      title: "React Chatbot",
      description: "A lightweight frontend application built using React + Vite. It includes ESLint configuration and follows minimal setup with hot module replacement (HMR) for rapid development.",
      tech: ["JavaScript", "React", "Tailwind CSS", "API"],
      image :"https://images.unsplash.com/photo-1718241905916-1f9786324de9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoYXRCb3R8ZW58MHx8MHx8fDA%3D",
      github: "https://github.com/amanr007/Chatbot.git",
      live: "#",
      category: "Frontend"
    },

     {
      title: "Personal Portfolio Website",
      description: "Modern responsive portfolio website built with React showcasing MERN stack development skills, featuring minimalist black and deep blue design with space-themed background and smooth animations.",
      tech: ["JavaScript", "React", "Tailwind CSS",],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop",
      github: "https://github.com/amanr007/Personal-Portfolio.git",
      live: "#",
      category: "Frontend"
    },
    
  ];

  const skills = [
    { name: "JavaScript" },
    { name: "React" },
    { name: "Node.js" },
    { name: "MySQL" },
    { name: "MongoDB" },
    { name: "Tailwind CSS" },
    { name: "Git/Github" },
    { name: "Express" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Background */}
     <div className="fixed inset-0 z-0">
  <div className="absolute inset-0">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop)'
      }}
    />
    <div className="absolute inset-0 bg-black/70"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-black/50"></div>
  </div>
</div>


 
    



      {/* Fixed Navbar */}
      <nav className="navbar fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-blue-900/50 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-400">
                
              </h1>
            </div>

            
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex space-x-1">
                {['home', 'about', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-all duration-300 px-4 py-2 rounded-lg text-sm font-medium ${
                      activeSection === section
                        ? 'text-blue-300 bg-blue-600/20 border border-blue-500/30'
                        : 'text-gray-300 hover:text-blue-300 hover:bg-blue-600/10'
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
                className="text-gray-300 hover:text-blue-300 transition-colors p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden bg-black/95 backdrop-blur-xl border-b border-blue-900/50 transition-all duration-300 ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-4 py-4 space-y-2">
            {['home', 'about', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="capitalize block w-full text-left px-4 py-3 text-gray-300 hover:text-blue-300 hover:bg-blue-600/10 rounded-lg transition-all"
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative z-10" >
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} ref={heroRef}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-blue-400">
              Aman Rawat
            </span>
          </h1>
          
          <div className="mb-8 space-y-2">
            <p className="text-2xl md:text-3xl text-gray-300 font-light">
              ME<span className="text-red-500">R</span>N Stack Developer
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Crafting beautiful digital experiences with modern technologies
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>View My Work</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400 hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="mx-auto text-blue-400" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-blue-400">
              About Me
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-gray-300 text-xl leading-relaxed">
                I'm a passionate <span className="text-blue-400 font-semibold">full-stack developer</span> who loves creating 
                innovative web applications. I specialize in turning complex problems into simple, 
                beautiful designs that provide exceptional user experiences.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open-source projects, or enjoying a good cup of coffee while reading about 
                the latest industry trends.
              </p>

              <div className="flex space-x-6">
                <a 
                  href="https://github.com/amanr007" 
                  className="group p-3 bg-gray-900/50 hover:bg-blue-600/10 border border-gray-800 hover:border-blue-500/50 rounded-xl transition-all duration-300"
                >
                  <Github className="w-7 h-7 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/aman-rawat-322331314/" 
                  className="group p-3 bg-gray-900/50 hover:bg-blue-600/10 border border-gray-800 hover:border-blue-500/50 rounded-xl transition-all duration-300"
                >
                  <Linkedin className="w-7 h-7 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </a>
                <a 
                  href="mailto:amanrawat2558@gmail.com"
                  className="group p-3 bg-gray-900/50 hover:bg-blue-600/10 border border-gray-800 hover:border-blue-500/50 rounded-xl transition-all duration-300"
                >
                  <Mail className="w-7 h-7 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-8">
                  Skills & Technologies
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 bg-gray-900/50 border border-gray-800 hover:border-blue-500/30 rounded-lg transition-all duration-300 hover:bg-gray-900/80 text-center"
                    >
                      <span className="text-white font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 bg-blue-950/10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-blue-400">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for development
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-[1.02]"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-600/20 backdrop-blur-sm text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-600/10 text-blue-300 border border-blue-500/20 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-blue-400 rounded-lg transition-all duration-300"
                    >
                      <Github size={16} />
                      <span className="text-sm font-medium">Code</span>
                    </a>

                    {/* live Demo section is commented out for now */}
                    {/* <a
                      href={project.live}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:border-blue-500/50 rounded-lg transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a> */}


                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}

      <section id="contact" className="py-32 px-4 relative z-10">


        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-blue-400">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
            <p className="text-gray-300 text-xl mt-8 max-w-3xl mx-auto">
              I'm always interested in new opportunities and exciting projects. 
              Let's create something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600/10 rounded-xl">
                    <Mail className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Email</h3>
                    <p className="text-gray-400">amanrawat2558@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600/10 rounded-xl">
                    
                  <a href="https://www.linkedin.com/in/aman-rawat-322331314/"> <Linkedin className="text-blue-400" size={24}  /></a>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">LinkedIn</h3>
                    <p className="text-gray-400">Connect with me professionally</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-600/10 rounded-xl">
                    <a href="https://github.com/amanr007"><Github className="text-blue-400" size={24} /></a>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">GitHub</h3>
                    <p className="text-gray-400">Check out my repositories</p>
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {submitStatus && (
                <div className={`p-4 rounded-xl border text-sm font-medium backdrop-blur-sm ${
                  submitStatus.includes('✅') 
                    ? 'bg-green-600/10 border-green-500/30 text-green-400' 
                    : 'bg-red-600/10 border-red-500/30 text-red-400'
                }`}>
                  {submitStatus}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 focus:border-blue-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
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
                    className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 focus:border-blue-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message (minimum 10 characters)"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 focus:border-blue-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none"
                    required
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    {formData.message.length}/10 characters minimum
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isSubmitting 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <span>Send Message</span>
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800/50 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-blue-400 mb-2">
              Aman Rawat
            </h3>
            <p className="text-gray-400 text-sm">
              Made with ❤️ by Aman Rawat
            </p>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <a 
              href="https://github.com/amanr007" 
              className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/aman-rawat-322331314/" 
              className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:amanrawat2558@gmail.com"
              className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <Mail size={20} />
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0f0f0f;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
}