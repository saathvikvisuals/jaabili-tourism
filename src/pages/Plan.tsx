import React, { useState } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { IMG } from '@/lib/images';

type TabType = 'plan' | 'contact';

const REGIONS = ['India', 'Europe', 'Asia', 'Africa', 'Americas', 'Oceania', 'Middle East'];
const STYLES = [
  { key: 'adventure', label: 'Adventure', icon: '▲' },
  { key: 'luxury',    label: 'Luxury',    icon: '◈' },
  { key: 'culture',  label: 'Culture',   icon: '○' },
  { key: 'relaxation',label:'Relaxation', icon: '◇' },
  { key: 'wildlife', label: 'Wildlife',  icon: '△' },
  { key: 'food',     label: 'Food & Wine',icon:'✦' },
];

const PACKAGES = [
  {
    name: 'Explorer',
    price: '₹49,999',
    sub: 'per person',
    desc: 'Perfect introduction to world-class travel.',
    nights: '7 Nights',
    flights: 'Economy Class',
    hotels: '3-Star Hotels',
    transfers: 'Shared Transfers',
    guide: 'Group Guide',
    support: 'Email Support',
    accent: '#60a5fa',
    image: IMG.switzerland,
    gradient: 'from-blue-950 to-slate-950',
    border: 'border-blue-500/20',
    featured: false,
  },
  {
    name: 'Wanderer',
    price: '₹89,999',
    sub: 'per person',
    desc: 'Elevated experiences for the curious traveler.',
    nights: '10 Nights',
    flights: 'Economy+ Class',
    hotels: '4-Star Hotels',
    transfers: 'Private Transfers',
    guide: 'Dedicated Local Guide',
    support: '24/7 WhatsApp',
    accent: '#C4933F',
    image: IMG.kerala,
    gradient: 'from-amber-950 to-stone-950',
    border: 'border-primary/30',
    featured: false,
  },
  {
    name: 'Seeker',
    price: '₹1,49,999',
    sub: 'per person',
    desc: 'Immersive luxury for the passionate explorer.',
    nights: '14 Nights',
    flights: 'Business Class',
    hotels: '5-Star Hotels',
    transfers: 'VIP Transfers',
    guide: 'Expert Private Guide',
    support: 'Dedicated Concierge',
    accent: '#C4933F',
    image: IMG.rajasthan,
    gradient: 'from-amber-900 to-yellow-950',
    border: 'border-primary/60',
    featured: true,
  },
  {
    name: 'Elite',
    price: '₹2,99,999',
    sub: 'per person',
    desc: 'Fully bespoke. No limits. Pure indulgence.',
    nights: 'Custom',
    flights: 'First / Private Jet',
    hotels: 'Luxury Resorts & Villas',
    transfers: 'Helicopter + Yacht',
    guide: 'Personal Travel Architect',
    support: '24/7 White Glove Service',
    accent: '#f0d060',
    image: IMG.borabora,
    gradient: 'from-yellow-900 to-amber-950',
    border: 'border-yellow-400/30',
    featured: false,
  },
];

function FloatingInput({ label, type = 'text', placeholder, required = false, textarea = false }: {
  label: string; type?: string; placeholder?: string; required?: boolean; textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const cls = `w-full bg-transparent border-b ${focused ? 'border-primary' : 'border-white/15'} pt-6 pb-2 text-white placeholder:text-transparent outline-none transition-all duration-300 text-sm`;
  return (
    <div className="relative group">
      <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${
        focused || filled ? 'top-0 text-[10px] tracking-[0.2em] uppercase text-primary' : 'top-6 text-sm text-white/30'
      }`}>{label}</label>
      {textarea ? (
        <textarea className={cls + ' resize-none'} rows={4} placeholder={placeholder || label} required={required}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); setFilled(!!e.target.value); }} />
      ) : (
        <input type={type} className={cls} placeholder={placeholder || label} required={required}
          onFocus={() => setFocused(true)}
          onBlur={e => { setFocused(false); setFilled(!!e.target.value); }} />
      )}
    </div>
  );
}

function TravelerPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const presets = [1, 2, 3, 4, 5, 6, 8, 10];
  return (
    <div>
      <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-3">Number of Travelers</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {presets.map(n => (
          <button key={n} type="button"
            onClick={() => onChange(n)}
            className={`w-10 h-10 border text-sm font-semibold transition-all duration-200 font-sans ${
              value === n ? 'bg-primary border-primary text-black' : 'border-white/10 text-white/50 hover:border-primary hover:text-primary'
            }`}>{n}</button>
        ))}
        <div className="flex items-center border border-white/10 px-3 h-10">
          <span className="text-white/30 text-xs mr-2">Custom</span>
          <input
            type="number" min={1} max={100} value={value}
            onChange={e => onChange(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 bg-transparent text-white text-sm outline-none text-center" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(1, value - 1))}
          className="w-8 h-8 border border-white/10 text-white/50 hover:border-primary hover:text-primary text-lg transition-all">−</button>
        <span className="text-primary font-bold font-sans text-lg w-6 text-center">{value}</span>
        <button type="button" onClick={() => onChange(value + 1)}
          className="w-8 h-8 border border-white/10 text-white/50 hover:border-primary hover:text-primary text-lg transition-all">+</button>
        <span className="text-white/30 text-xs tracking-widest uppercase ml-2">
          {value === 1 ? 'Solo' : value === 2 ? 'Couple' : value <= 4 ? 'Small Group' : 'Large Group'}
        </span>
      </div>
    </div>
  );
}

export default function Plan() {
  const [tab, setTab] = useState<TabType>('plan');
  const [travelStyle, setTravelStyle] = useState('');
  const [region, setRegion] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(150000);
  const [submitted, setSubmitted] = useState(false);
  const [submittedType, setSubmittedType] = useState<TabType>('plan');
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleSubmit = (e: React.FormEvent, type: TabType) => {
    e.preventDefault();
    setSubmittedType(type);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#0A0D14]">
          <motion.div className="text-center max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="w-16 h-16 border-2 border-primary mx-auto mb-8 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-primary tracking-widest text-xs uppercase mb-4">Request Received</p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-white mb-4">Your journey is being crafted…</h2>
            <p className="text-white/40 text-base mb-10 leading-relaxed">Our travel experts will reach out within 24 hours with a bespoke itinerary tailored precisely to you.</p>
            <button onClick={() => setSubmitted(false)}
              className="border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 px-10 py-3.5 text-xs tracking-widest uppercase font-semibold">
              Plan Another Trip
            </button>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      {/* ── HERO SPLIT FORM ── */}
      <div className="min-h-screen bg-[#0A0D14] flex flex-col lg:flex-row">

        {/* Left visual */}
        <div className="relative h-64 md:h-80 lg:h-auto lg:w-[44%] flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.maldives})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-black/30 to-black/15" />
          <div className="absolute inset-0 lg:bg-gradient-to-r lg:from-transparent lg:to-[#0A0D14]" />
          <div className="absolute bottom-8 left-8 right-8 lg:bottom-16 lg:left-12">
            <p className="text-primary tracking-widest text-xs uppercase font-medium mb-3">Crafted for you</p>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">Every journey<br />is personal.</h2>
          </div>
          <motion.div
            className="absolute top-36 left-8 hidden lg:block bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-5"
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div className="text-3xl font-black text-primary font-sans">50K+</div>
            <div className="text-white/45 text-xs tracking-widest uppercase">Happy travelers</div>
          </motion.div>
        </div>

        {/* Right form */}
        <div className="flex-1 flex flex-col justify-center pt-8 pb-16 px-6 md:px-12 lg:px-16 xl:px-24 lg:pt-32">
          <div className="flex gap-0 mb-10 border-b border-white/10 max-w-md">
            {(['plan', 'contact'] as TabType[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`pb-4 pr-8 text-xs tracking-[0.2em] uppercase font-medium relative transition-colors ${tab === t ? 'text-primary' : 'text-white/30 hover:text-white'}`}>
                {t === 'plan' ? 'Plan a Journey' : 'Contact Us'}
                {tab === t && <motion.div className="absolute bottom-[-1px] left-0 right-8 h-[2px] bg-primary" layoutId="plan-tab" />}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'plan' ? (
              <motion.form key="plan" onSubmit={e => handleSubmit(e, 'plan')} className="space-y-9 max-w-lg"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                <div>
                  <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-4">Where are you dreaming of?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {REGIONS.map(r => (
                      <button key={r} type="button" onClick={() => setRegion(r === region ? '' : r)}
                        className={`py-2.5 text-[10px] tracking-widest uppercase font-medium transition-all duration-300 ${region === r ? 'bg-primary text-black' : 'border border-white/10 text-white/40 hover:border-primary/50 hover:text-white'}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-4">Travel style</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {STYLES.map(s => (
                      <button key={s.key} type="button" onClick={() => setTravelStyle(s.key === travelStyle ? '' : s.key)}
                        className={`flex items-center gap-2 py-2.5 px-3 text-[10px] tracking-widest uppercase font-medium transition-all duration-300 ${travelStyle === s.key ? 'bg-primary text-black' : 'border border-white/10 text-white/40 hover:border-primary/50 hover:text-white'}`}>
                        <span className="font-mono text-xs">{s.icon}</span>{s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <TravelerPicker value={travelers} onChange={setTravelers} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <FloatingInput label="Full Name" required />
                  <FloatingInput label="Email Address" type="email" required />
                  <FloatingInput label="Travel Dates" placeholder="e.g. Aug 2026" />
                  <FloatingInput label="Phone (WhatsApp)" type="tel" />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Budget per person</p>
                    <span className="text-primary text-sm font-sans font-bold">₹{budget.toLocaleString('en-IN')}</span>
                  </div>
                  <input type="range" min={30000} max={500000} step={5000} value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                    className="w-full h-[2px] appearance-none bg-white/10 accent-primary cursor-pointer" />
                  <div className="flex justify-between text-white/20 text-[10px] mt-1.5 uppercase tracking-wider">
                    <span>₹30K</span><span>₹5L+</span>
                  </div>
                </div>

                <FloatingInput label="Tell us about your dream trip" textarea />

                <button type="submit"
                  className="w-full bg-primary text-black py-4 text-xs tracking-[0.25em] uppercase font-bold hover:bg-white transition-colors duration-300">
                  Submit Request
                </button>
              </motion.form>
            ) : (
              <motion.form key="contact" onSubmit={e => handleSubmit(e, 'contact')} className="space-y-9 max-w-lg"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                <div>
                  <h2 className="font-sans text-3xl font-bold text-white mb-2">Get in touch</h2>
                  <p className="text-white/40 text-sm leading-relaxed">Questions, partnerships, media — we'd love to hear from you.</p>
                </div>
                <div className="space-y-8">
                  <FloatingInput label="Full Name" required />
                  <FloatingInput label="Email Address" type="email" required />
                  <FloatingInput label="Subject" required />
                  <FloatingInput label="Your message" textarea required />
                </div>
                <button type="submit"
                  className="w-full bg-primary text-black py-4 text-xs tracking-[0.25em] uppercase font-bold hover:bg-white transition-colors duration-300">
                  Send Message
                </button>
                <div className="pt-5 border-t border-white/5 grid grid-cols-2 gap-5 text-sm text-white/40">
                  <div><p className="text-[10px] tracking-widest uppercase mb-1">Email</p><a href="mailto:hello@jaabili.com" className="hover:text-primary transition-colors">hello@jaabili.com</a></div>
                  <div><p className="text-[10px] tracking-widest uppercase mb-1">Instagram</p><a href="#" className="hover:text-primary transition-colors">@jaabili.travel</a></div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── PACKAGES ── */}
      <section className="py-24 md:py-36 bg-[#080B11] border-t border-white/5 px-4 md:px-8">
        <div className="container mx-auto">
          <motion.p className="text-primary tracking-widest text-xs uppercase font-medium mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
            Choose your package
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
            <motion.h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: false }}>
              Travel Packages<br />in India ₹
            </motion.h2>
            <p className="text-white/35 text-sm max-w-xs leading-relaxed">All prices in Indian Rupees. Inclusive of accommodation, transfers, and guided experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
            {PACKAGES.map((pkg, i) => (
              <motion.div key={pkg.name}
                className={`group relative flex flex-col overflow-hidden bg-[#0F1420] border ${pkg.border} p-7 cursor-pointer transition-all duration-400 ${
                  selectedPackage === pkg.name ? 'ring-1 ring-primary scale-[1.02]' : 'hover:scale-[1.01]'
                } ${pkg.featured ? 'ring-1 ring-primary/60' : ''}`}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }} viewport={{ once: false }}
                onClick={() => setSelectedPackage(pkg.name === selectedPackage ? '' : pkg.name)}>

                <div
                  className="absolute inset-0 bg-cover bg-center opacity-35 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${pkg.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${pkg.gradient} opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

                {pkg.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-black text-[9px] tracking-[0.25em] uppercase px-4 py-1 font-bold whitespace-nowrap z-10">
                    Most Popular
                  </div>
                )}

                <div className="relative z-10 mb-6">
                  <p className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: pkg.accent }}>{pkg.name}</p>
                  <div className="text-3xl md:text-4xl font-black font-sans text-white mb-1">{pkg.price}</div>
                  <div className="text-white/35 text-xs">{pkg.sub}</div>
                </div>

                <p className="relative z-10 text-white/60 text-sm leading-relaxed mb-6">{pkg.desc}</p>

                <ul className="relative z-10 space-y-3 flex-1 mb-8">
                  {[
                    { icon: '🌙', label: pkg.nights },
                    { icon: '✈️', label: pkg.flights },
                    { icon: '🏨', label: pkg.hotels },
                    { icon: '🚗', label: pkg.transfers },
                    { icon: '🧭', label: pkg.guide },
                    { icon: '📱', label: pkg.support },
                  ].map(({ icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="text-sm flex-shrink-0">{icon}</span>
                      {label}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setTab('plan')}
                  className="relative z-10 w-full py-3.5 text-xs tracking-widest uppercase font-bold transition-all duration-300"
                  style={{
                    background: selectedPackage === pkg.name ? pkg.accent : 'transparent',
                    color: selectedPackage === pkg.name ? '#000' : pkg.accent,
                    border: `1px solid ${pkg.accent}55`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = pkg.accent; e.currentTarget.style.color = '#000'; }}
                  onMouseLeave={e => {
                    if (selectedPackage !== pkg.name) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = pkg.accent;
                    }
                  }}
                >
                  {pkg.name === 'Elite' ? 'Request Custom' : 'Select Package'}
                </button>
              </motion.div>
            ))}
          </div>

          <motion.p className="text-center text-white/25 text-xs mt-8 tracking-wider"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
            * Prices per person, subject to destination and season. GST extra. Contact us for group discounts.
          </motion.p>
        </div>
      </section>

    </PageTransition>
  );
}
