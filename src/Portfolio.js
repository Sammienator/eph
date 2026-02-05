import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X,  Linkedin, FileText, 
  TrendingUp, Shield, Moon, Sun, Facebook, 
  Twitter, Instagram, Send, CheckCircle2,  Award, GraduationCap, Briefcase
} from 'lucide-react';

// Counter hook for animated numbers
const useCountUp = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!shouldStart) return;
    let startTime;
    let animationFrame;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * easeOutQuart));
      if (percentage < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);
  
  return count;
};

export default function AccountantPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  
  // State for the contact form
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    darkMode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    const currentRef = statsRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setStatsVisible(true);
    }, { threshold: 0.5 });
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  // FIXED: Now being used in the form below
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Ephraim will receive your message shortly.`);
    setFormData({ name: '', email: '', message: '' });
  };

  const services = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Tax Planning & Preparation",
      description: "Strategic navigation of local and international tax landscapes.",
      achievement: "Consistently delivered an average of 22% in tax savings for SME clients through legal optimization. Managed over 150+ complex KRA compliance filings with a zero-penalty record.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Financial Advisory & Strategy",
      description: "Data-driven insights to fuel sustainable business growth.",
      achievement: "Led a major logistics firm through a financial restructuring that cut operational costs by 15%. I have helped clients secure over $5M in combined funding through robust financial forecasting.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Audit & Assurance",
      description: "Providing the transparency required for institutional trust.",
      achievement: "Maintained a 100% clean record in external regulatory audits for over a decade. My auditing process ensures your business remains investment-ready and fully compliant with IFRS standards.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
    }
  ];

  const stats = [
    { number: 15, label: "Years Experience", suffix: "+" },
    { number: 200, label: "Clients Served", suffix: "+" },
    { number: 98, label: "Client Satisfaction", suffix: "%" },
    { number: 50, label: "Assets Managed", suffix: "M+" }
  ];

  const AnimatedStat = ({ stat, index, isVisible }) => {
    const count = useCountUp(stat.number, 2000, isVisible);
    return (
      <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${index * 100}ms` }}>
        <div className="text-4xl font-bold text-white mb-1">{count}{stat.suffix}</div>
        <div className="text-emerald-100 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 selection:bg-emerald-200 scroll-smooth">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white dark:bg-slate-800 shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="z-[110]">
            <h1 className={`text-xl font-bold tracking-tighter transition-colors ${scrolled || isMenuOpen ? 'text-slate-900 dark:text-white' : 'text-white'}`}>EPHRAIM MBUGUA</h1>
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${scrolled || isMenuOpen ? 'text-emerald-600' : 'text-emerald-400'}`}>CPA | Financial Strategist</p>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {['About', 'Services', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-700 dark:text-slate-200 hover:text-emerald-600' : 'text-white/80 hover:text-white'}`}>{item}</a>
            ))}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              {darkMode ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20} className={scrolled ? 'text-slate-700' : 'text-white'}/>}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4 z-[110]">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${scrolled || isMenuOpen ? 'text-slate-700 dark:text-slate-200' : 'text-white'}`}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className={`p-2 transition-colors ${scrolled || isMenuOpen ? 'text-slate-900 dark:text-white' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`absolute top-0 left-0 w-full bg-white dark:bg-slate-800 transition-all duration-500 ease-in-out transform ${isMenuOpen ? 'translate-y-0 opacity-100 visible h-screen' : '-translate-y-full opacity-0 invisible h-0'} md:hidden flex flex-col items-center justify-center space-y-8 z-[105]`}>
            {['About', 'Services', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white hover:text-emerald-500 transition-colors"
              >
                {item}
              </a>
            ))}
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-48 pb-32 px-6 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-900"></div>
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Award size={14} /> Registered Practicing Accountant
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.05]">Financial <br/><span className="text-emerald-500">Excellence.</span></h2>
            <p className="text-lg text-slate-400 mb-12 max-w-md leading-relaxed">Helping ambitious businesses transform complex numbers into strategic growth opportunities.</p>
            <a href="#contact" className="inline-block px-8 py-4 bg-emerald-500 text-white font-bold rounded-full shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all">Request Consultation</a>
          </div>
          
          <div ref={statsRef} className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-900/50 p-10">
                <AnimatedStat stat={stat} index={i} isVisible={statsVisible} />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* About Me */}
      <section id="about" className="py-32 px-6 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 aspect-square flex items-center justify-center border-4 border-slate-50 dark:border-slate-800">
               <span className="text-slate-400 italic">[Portrait Image]</span>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black dark:text-white tracking-tighter">Integrity Meets <br/>Financial Strategy.</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                I am Ephraim Mbugua, a Certified Public Accountant with a mission to simplify the complex. I provide the same financial expertise usually reserved for Fortune 500 companies to growing SMEs.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600"><GraduationCap/></div>
                  <div><h4 className="font-bold dark:text-white">MBA Finance</h4><p className="text-xs text-slate-500 uppercase tracking-widest">Education</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600"><Briefcase/></div>
                  <div><h4 className="font-bold dark:text-white">Tax Expert</h4><p className="text-xs text-slate-500 uppercase tracking-widest">Specialization</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-6 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto space-y-40">
          {services.map((service, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2">
                <img src={service.image} alt={service.title} className="rounded-[32px] w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h3 className="text-4xl font-bold dark:text-white tracking-tight">{service.title}</h3>
                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium italic">"{service.description}"</p>
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-4 flex items-center gap-2"><CheckCircle2 size={16}/> Impact Achievement</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">{service.achievement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-32 px-6 bg-white dark:bg-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-4xl font-black dark:text-white uppercase tracking-tighter">Get In Touch</h2></div>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] shadow-2xl space-y-8 border border-slate-100 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-8">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name" 
                className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl px-6 py-4 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" 
                required 
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address" 
                className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl px-6 py-4 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500" 
                required 
              />
            </div>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="How can I help you today?" 
              rows="5" 
              className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl px-6 py-4 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 resize-none" 
              required 
            />
            <button type="submit" className="w-full py-5 bg-emerald-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-3">
              Send Message <Send size={18}/>
            </button>
          </form>
          
          <div className="mt-24 text-center space-y-8">
            <div className="flex justify-center gap-4">
              {[Linkedin, Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#b" className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-2 shadow-lg dark:border dark:border-slate-800"><Icon size={24}/></a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] dark:bg-slate-900">
        Ephraim Mbugua © {new Date().getFullYear()} / Precision Financial Advisory
      </footer>
    </div>
  );
}