import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Linkedin, FileText, 
  TrendingUp, Shield, Moon, Sun, Facebook, 
  Twitter, Instagram, Send, CheckCircle2, ChevronRight, Award, GraduationCap, Briefcase
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
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

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

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Ephraim will receive your message shortly.');
    setFormData({ name: '', email: '', phone: '', message: '' });
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 selection:bg-emerald-200">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div>
            <h1 className={`text-xl font-bold tracking-tighter ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>EPHRAIM MBUGUA</h1>
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${scrolled ? 'text-emerald-600' : 'text-emerald-400'}`}>CPA | Financial Strategist</p>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {['About', 'Services', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-700 dark:text-slate-200 hover:text-emerald-600' : 'text-white/80 hover:text-white'}`}>{item}</a>
            ))}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              {darkMode ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20} className={scrolled ? 'text-slate-700' : 'text-white'}/>}
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}/> : <Menu className={scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}/>}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-48 pb-32 px-6 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-900"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 blur-[120px] rounded-full translate-x-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Award size={14} /> Registered Practicing Accountant
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.05]">Financial <br/><span className="text-emerald-500">Excellence.</span></h2>
            <p className="text-lg text-slate-400 mb-12 max-md leading-relaxed">Helping ambitious businesses transform complex numbers into strategic growth opportunities.</p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#contact" className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-full shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2">Request Consultation <ChevronRight size={18}/></a>
            </div>
          </div>
          
          <div ref={statsRef} className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-900/50 p-10">
                <AnimatedStat stat={stat} index={i} isVisible={statsVisible} />
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* About Me Section */}
      <section id="about" className="py-32 px-6 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 aspect-square">
                {/* Place image here */}
                <div className="w-full h-full flex items-center justify-center text-slate-400 italic p-12 text-center border-4 border-white dark:border-slate-700 rounded-[40px]">
                  [Portrait Image of Ephraim]
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 hidden md:block w-48 h-48 bg-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
                <p className="text-4xl font-black mb-1 italic">"Ethical"</p>
                <p className="text-[10px] uppercase font-black tracking-widest opacity-80">Foundation of every audit</p>
              </div>
            </div>

            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">The Professional Behind the Desk</h3>
                <h2 className="text-4xl md:text-5xl font-black dark:text-white tracking-tighter leading-none mb-6">Integrity Meets <br/>Financial Strategy.</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  I am Ephraim Mbugua, a Certified Public Accountant with a mission to simplify the complex. I don’t just deliver reports; I deliver clarity. My approach combines decades of traditional accounting rigor with modern financial strategy to ensure your business is not just compliant, but competitive.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600">
                    <GraduationCap size={24}/>
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-white">Education</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">MBA in Finance & Strategic Management</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600">
                    <Briefcase size={24}/>
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-white">Expertise</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Corporate Taxation & SME Growth</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-slate-500 dark:text-slate-500 text-sm italic">
                  "My goal is to provide entrepreneurs with the same financial expertise usually reserved for Fortune 500 companies."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stacked Services */}
      <section id="services" className="py-32 px-6 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter">Core Services</h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4"></div>
          </div>

          <div className="space-y-40">
            {services.map((service, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute -inset-4 bg-emerald-500/5 rounded-[40px] scale-95 group-hover:scale-100 transition-transform duration-500"></div>
                  <img src={service.image} alt={service.title} className="relative rounded-[32px] w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" />
                </div>
                <div className="w-full md:w-1/2 space-y-8">
                  <div className="inline-flex p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl">{service.icon}</div>
                  <h3 className="text-4xl font-bold dark:text-white tracking-tight">{service.title}</h3>
                  <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">"{service.description}"</p>
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-4 flex items-center gap-2">
                      <CheckCircle2 size={16}/> Impact Achievement
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">{service.achievement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-32 px-6 bg-white dark:bg-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black dark:text-white mb-4 uppercase tracking-tighter">Get In Touch</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Available for private consultations and corporate advisory roles.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] shadow-2xl space-y-8 border border-slate-100 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Message Inquiry</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} rows="5" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none" required />
            </div>
            <button type="submit" className="w-full py-5 bg-emerald-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/20">
              Send Message <Send size={18}/>
            </button>
          </form>

          {/* Social Media & Direct Info */}
          <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-700 text-center space-y-12">
            <div className="flex flex-col md:flex-row justify-center gap-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Email</p>
                <a href="mailto:ephraim@example.com" className="text-xl font-bold dark:text-white hover:text-emerald-500 transition-colors">ephraim@example.com</a>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Support</p>
                <a href="tel:+254700000000" className="text-xl font-bold dark:text-white hover:text-emerald-500 transition-colors">+254 700 000 000</a>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              {[Linkedin, Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#b" className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-2 shadow-lg dark:shadow-none dark:border dark:border-slate-800">
                  <Icon size={24}/>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] dark:bg-slate-900 transition-colors">
        Ephraim Mbugua © {new Date().getFullYear()} / Powered by Sammienator Inc
      </footer>
    </div>
  );
}