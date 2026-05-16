import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Destinations', href: '/destinations' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Plan', href: '/plan' },
    { name: 'Journal', href: '/journal' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#0A0D14]/85 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 h-16 md:h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/jaabili-logo-full-clean.png"
              alt="Jaabili"
              className="h-8 md:h-14 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs tracking-[0.18em] uppercase font-medium transition-all duration-300 relative group ${
                  location === link.href ? 'text-primary' : 'text-white/50 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                  location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="/plan"
              className="border border-primary/70 text-primary hover:bg-primary hover:text-black transition-all duration-300 px-6 py-2.5 text-xs tracking-[0.18em] uppercase font-semibold"
            >
              Start Exploring
            </Link>
          </div>

          <button
            className="md:hidden text-white/80 hover:text-primary transition-colors p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0A0D14]/97 backdrop-blur-xl flex flex-col pt-20 px-5 pb-7"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-0 flex-1 pt-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3.5 text-2xl font-semibold border-b border-white/5 transition-colors ${
                      location === link.href ? 'text-primary' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <Link
              href="/plan"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-primary text-black py-3.5 text-xs tracking-widest uppercase font-bold"
            >
              Start Exploring
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
