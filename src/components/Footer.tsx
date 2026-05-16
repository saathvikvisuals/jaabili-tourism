import React from 'react';
import { Link } from 'wouter';
import { FaInstagram, FaYoutube, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SOCIAL = [
  { Icon: FaXTwitter,    href: 'https://twitter.com',   label: 'X' },
  { Icon: FaInstagram,   href: 'https://instagram.com', label: 'Instagram' },
  { Icon: FaYoutube,     href: 'https://youtube.com',   label: 'YouTube' },
  { Icon: FaPinterestP,  href: 'https://pinterest.com', label: 'Pinterest' },
  { Icon: FaLinkedinIn,  href: 'https://linkedin.com',  label: 'LinkedIn' },
];

export const Footer = () => {
  return (
    <footer className="bg-[#060810] border-t border-white/5 pt-20 pb-8 relative overflow-hidden">
      {/* Subtle ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]
        bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-5">
              <img src="/jaabili-logo-full-clean.png" alt="Jaabili"
                className="h-12 md:h-16 w-auto object-contain" />
            </Link>
            <p className="text-white/35 text-sm max-w-xs leading-relaxed mb-7">
              Curating the world's most extraordinary destinations for the modern explorer. Premium. Purposeful. Personal.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30
                    hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-sm">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-[10px] tracking-[0.22em] uppercase font-semibold mb-5">Explore</h4>
            <ul className="space-y-3">
              {['Destinations', 'Experiences', 'Gallery'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`}
                    className="text-white/35 hover:text-primary transition-colors text-sm leading-relaxed">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[10px] tracking-[0.22em] uppercase font-semibold mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'Journal', href: '/journal' },
                { label: 'Plan a Trip', href: '/plan' },
                { label: 'Contact Us', href: '/plan' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href}
                    className="text-white/35 hover:text-primary transition-colors text-sm leading-relaxed">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[10px] tracking-[0.22em] uppercase font-semibold mb-5">Regions</h4>
            <ul className="space-y-3">
              {['India', 'Asia', 'Europe', 'Africa', 'Americas', 'Oceania'].map(r => (
                <li key={r}>
                  <Link href="/destinations"
                    className="text-white/35 hover:text-primary transition-colors text-sm leading-relaxed">
                    {r}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[10px] tracking-[0.22em] uppercase font-semibold mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-white/35">
              <li><a href="mailto:hello@jaabili.com" className="hover:text-primary transition-colors">hello@jaabili.com</a></li>
              <li><a href="tel:+911800000000" className="hover:text-primary transition-colors">+91 1800 000 000</a></li>
              <li className="leading-relaxed pt-1">Mumbai · Delhi<br />Bangalore · Goa</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">&copy; {new Date().getFullYear()} Jaabili. All rights reserved.</p>

          <p className="text-primary/50 tracking-[0.35em] uppercase text-[10px] font-medium">
            Explore · Dream · Discover
          </p>

          {/* SK designer credit */}
          <a
            href="https://saathvik-kalepu.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group"
            title="Designed by SK"
          >
            <span className="text-white/18 text-[10px] tracking-widest uppercase group-hover:text-white/35 transition-colors">
              Designed by
            </span>
            <div className="relative flex items-center justify-center rounded overflow-hidden"
              style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#1a0a2e,#16003a)' }}>
              <img src="/sk-logo.png" alt="SK" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};
