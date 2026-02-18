"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Sparkles, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const footerData = {
    company: {
      name: "ABHINANDAN EVENTS",
      tagline: "",
      description: "Crafting legacies through precision event architecture and unparalleled creative vision since 2009.",
    },
    
    quickLinks: [
      { name: "The Atelier", href: "#home" },
      { name: "Our Story", href: "#about" },
      { name: "Curation", href: "#services" },
      { name: "Gallery", href: "#gallery" },
      { name: "Contact", href: "#contact" }
    ],
    
    services: [
      { name: "Corporate Galas", href: "/services#corporate" },
      { name: "Bespoke Weddings", href: "/services#weddings" },
      { name: "Social Soirees", href: "/services#social" },
      { name: "Design & Decor", href: "/services#design" }
    ],
    
    contact: {
      phone: "+91 98765 43210",
      email: "concierge@abhinandan.com",
      address: "123 Royal Estate, Mumbai, MH 400001",
    },
    
    social: [
      { platform: "Instagram", icon: <Instagram className="w-4 h-4" />, href: "#" },
      { platform: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, href: "#" },
      { platform: "Facebook", icon: <Facebook className="w-4 h-4" />, href: "#" },
      { platform: "Twitter", icon: <Twitter className="w-4 h-4" />, href: "#" }
    ]
  };

  return (
    <footer className="relative bg-[#FCFBF7] pt-24 pb-12 px-6 overflow-hidden border-t border-amber-100">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-50/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Identity (Col 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <div className="space-y-4">
  <div className="relative h-16 w-48">
    <img
      src="/logo1.png"
      alt="Abhinandan Events Logo"
      className="h-full w-auto object-contain"
    />
  </div>

  <h3 className="text-lg font-serif text-slate-900 tracking-wide uppercase">
    Abhinandan Events
  </h3>
</div>

              <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
                {footerData.company.description}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Follow Us</h4>
              <div className="flex gap-3">
                {footerData.social.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-white border border-amber-100 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-all duration-500 shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation (Col 2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Navigation</h4>
            <ul className="space-y-4">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-slate-500 hover:text-amber-600 text-[13px] font-semibold transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-4 h-px bg-amber-400 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services (Col 2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Expertise</h4>
            <ul className="space-y-4">
              {footerData.services.map((service, index) => (
                <li key={index}>
                  <Link href={service.href} className="text-slate-500 hover:text-amber-600 text-[13px] font-semibold transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Direct Contact (Col 3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Direct Line</h4>
            <div className="space-y-5">
              <a href={`tel:${footerData.contact.phone}`} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-900 font-serif text-sm group-hover:text-amber-600 transition-colors">{footerData.contact.phone}</span>
              </a>
              <a href={`mailto:${footerData.contact.email}`} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-900 font-serif text-sm group-hover:text-amber-600 transition-colors">{footerData.contact.email}</span>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-500 font-medium text-[13px] leading-relaxed">{footerData.contact.address}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-amber-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Abhinandan. Redefining Events.
            </p>
            
            <div className="flex items-center gap-8">
              {["Privacy", "Terms", "Atelier"].map((item) => (
                <Link key={item} href="#" className="text-slate-400 hover:text-slate-900 text-[11px] font-bold uppercase tracking-widest transition-colors">
                  {item}
                </Link>
              ))}
            </div>

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-amber-600 text-[11px] font-black uppercase tracking-widest hover:text-slate-900 transition-colors"
            >
              Back to Top
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;