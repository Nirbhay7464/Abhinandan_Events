"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryHovered, setGalleryHovered] = useState(false);
  const galleryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    {
      name: "Gallery",
      href: "/#gallery",
      dropdown: [
        { name: "Photos", href: "/gallery/photos" },
        { name: "Videos", href: "/gallery/videos" }
      ]
    },
    { name: "Recent Events", href: "/#recent" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" }
  ];

  const handleGalleryMouseEnter = () => {
    if (galleryTimeoutRef.current) clearTimeout(galleryTimeoutRef.current);
    setGalleryHovered(true);
  };

  const handleGalleryMouseLeave = () => {
    galleryTimeoutRef.current = setTimeout(() => {
      setGalleryHovered(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (galleryRef.current && !galleryRef.current.contains(event.target as Node)) {
        setGalleryHovered(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMobileMenuOpen(false);
    setGalleryHovered(false);

    if (href.includes("#")) {
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] px-4 sm:px-6 py-5 transition-all duration-500 bg-transparent">
        <div className={`max-w-7xl mx-auto transition-all duration-500 flex items-center justify-between ${isScrolled
            ? 'border border-amber-200/50 bg-white/95 backdrop-blur-2xl rounded-2xl px-6 md:px-8 py-2 shadow-[0_10px_40px_-15px_rgba(180,140,50,0.2)]'
            : 'bg-transparent px-0 py-0'
          }`}>

          {/* LOGO */}
          <Link
            href="/#home"
            onClick={(e) => handleNavClick(e, '/#home')}
            className="flex items-center z-[101] shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`transition-all duration-500 flex items-center ${isScrolled
                  ? 'h-12 md:h-14'
                  : 'h-16 md:h-20'
                }`}
            >
              <Image
                src="/logo3.png"
                alt="Abhinandan Events Logo"
                width={140}
                height={60}
                priority
                className="object-contain"
              />
            </motion.div>
          </Link>

          {/* RIGHT SIDE CONTAINER: Nav + CTA */}
          <div className="flex items-center gap-6 xl:gap-10">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                item.name === "Gallery" ? (
                  <div
                    key={item.name}
                    ref={galleryRef}
                    className="relative flex items-center h-full"
                    onMouseEnter={handleGalleryMouseEnter}
                    onMouseLeave={handleGalleryMouseLeave}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="relative group flex items-center gap-1.5 py-2"
                    >
                      <span className="text-[11px] xl:text-[12px] font-bold uppercase tracking-widest text-slate-800 group-hover:text-amber-700 transition-colors">
                        {item.name}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${galleryHovered ? 'rotate-180 text-amber-600' : 'text-slate-500'}`} />
                    </Link>

                    <AnimatePresence>
                      {galleryHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white border border-amber-100 rounded-xl shadow-2xl overflow-hidden z-[110] p-2"
                        >
                          {item.dropdown?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) => handleNavClick(e, subItem.href)}
                              className="w-full px-4 py-3 flex items-center justify-between text-slate-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-all duration-200 group/item"
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider">{subItem.name}</span>
                              <div className="w-0 h-[1px] bg-amber-600 group-hover/item:w-4 transition-all" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="relative group py-2"
                  >
                    <span className="text-[11px] xl:text-[12px] font-bold uppercase tracking-widest text-slate-800 group-hover:text-amber-700 transition-colors duration-300">
                      {item.name}
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              ))}
            </div>

            {/* BOOK NOW BUTTON - DESKTOP */}
            <Link
              href="/booking"
              onClick={(e) => handleNavClick(e, '/booking')}
              className="hidden sm:block"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-amber-900/10 transition-all"
              >
                Book Now
              </motion.button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-amber-100 bg-white shadow-sm text-slate-900 z-[101]"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[150] lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 h-full w-80 bg-white z-[160] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-50 flex justify-center">
                <div className="relative h-20 w-44">
                  <Image
                    src="/logo1.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="p-6 flex-grow overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.name} className="mb-1">
                    {item.name === "Gallery" ? (
                      <>
                        <button
                          onClick={() => setGalleryHovered(!galleryHovered)}
                          className="w-full px-6 py-4 rounded-xl flex items-center justify-between text-slate-800 hover:bg-amber-50 transition-all"
                        >
                          <span className="font-bold uppercase tracking-widest text-xs">{item.name}</span>
                          <ChevronDown size={18} className={galleryHovered ? 'rotate-180 text-amber-600' : ''} />
                        </button>
                        <AnimatePresence>
                          {galleryHovered && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }} 
                              animate={{ height: "auto", opacity: 1 }} 
                              exit={{ height: 0, opacity: 0 }} 
                              className="overflow-hidden ml-6"
                            >
                              {item.dropdown?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={(e) => handleNavClick(e, subItem.href)}
                                  className="block py-3 px-6 text-[11px] font-bold text-slate-600 hover:text-amber-700"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="block px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs text-slate-800 hover:bg-amber-50"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 space-y-3 bg-white border-t border-slate-50">
                <Link
                  href="/booking"
                  onClick={(e) => handleNavClick(e, '/booking')}
                  className="block w-full py-4 rounded-xl bg-amber-600 text-white font-bold text-xs text-center uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                >
                  Book Now
                </Link>
                <Link
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, '/#contact')}
                  className="block w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-xs text-center uppercase tracking-widest active:scale-95 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;