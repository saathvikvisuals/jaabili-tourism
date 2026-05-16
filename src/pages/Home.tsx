import React, { useRef } from 'react';
import { Link } from 'wouter';
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { DestinationCard } from '@/components/DestinationCard';
import { HeroCanvas } from '@/components/HeroCanvas';
import { MarqueeStrip } from '@/components/MarqueeStrip';
import { IMG } from '@/lib/images';

const DESTINATIONS = [
  { name: "Swiss Alps",  country: "Switzerland",       price: "₹1,08,000", image: IMG.switzerland },
  { name: "Maldives",    country: "Indian Ocean",       price: "₹2,08,000", image: IMG.maldives    },
  { name: "Kyoto",       country: "Japan",              price: "₹1,58,000", image: IMG.kyoto       },
  { name: "Morocco",     country: "North Africa",       price: "₹99,900",   image: IMG.morocco     },
  { name: "Patagonia",   country: "Chile",              price: "₹1,83,000", image: IMG.patagonia   },
  { name: "Santorini",   country: "Greece",             price: "₹1,25,000", image: IMG.santorini   },
];

const STORY_PANELS = [
  {
    num: "01",
    title: "A Different Kind of Travel Company",
    body: "We don't sell tours. We craft transformative journeys tailored to who you are — not who the brochure thinks you are.",
    image: IMG.kyoto,
  },
  {
    num: "02",
    title: "Every Detail. Considered.",
    body: "From the private transfer that meets you at the gate, to the chef's table reserved under your name — nothing is accidental.",
    image: IMG.borabora,
  },
  {
    num: "03",
    title: "The World as It Should Be Seen",
    body: "Sunrise over Santorini with no crowds. The Serengeti at dusk with only the sound of wildlife. This is Jaabili.",
    image: IMG.serengeti,
  },
];

const EXPERIENCE_CARDS = [
  { title: "Adventure",   count: "48 Exp.", image: IMG.patagonia, accent: "#ff7c3a", border: "border-orange-500/25"  },
  { title: "Luxury",      count: "32 Exp.", image: IMG.maldives,  accent: "#C4933F", border: "border-amber-500/25"   },
  { title: "Wildlife",    count: "27 Exp.", image: IMG.serengeti, accent: "#22c55e", border: "border-emerald-500/25" },
  { title: "Culture",     count: "54 Exp.", image: IMG.kyoto,     accent: "#a855f7", border: "border-purple-500/25"  },
  { title: "Food & Wine", count: "41 Exp.", image: IMG.morocco,   accent: "#fb7185", border: "border-rose-500/25"    },
  { title: "Road Trips",  count: "19 Exp.", image: IMG.iceland,   accent: "#60a5fa", border: "border-sky-500/25"     },
];

const WHY_ITEMS = [
  { icon: "◈", title: "Curated Exclusivity",    desc: "Hand-selected properties and experiences that can't be booked anywhere else." },
  { icon: "△", title: "Zero Compromise",         desc: "Every detail reviewed and refined before it reaches your itinerary." },
  { icon: "○", title: "24/7 Concierge",          desc: "Your personal travel consultant is always reachable — before, during, and after." },
  { icon: "✦", title: "Sustainable Travel",      desc: "Partnerships with local communities, conservation projects, and carbon-neutral options." },
];

function GlitchTitle({ text }: { text: string }) {
  return <span className="glitch" data-text={text}>{text}</span>;
}

function RollingTitle({ text }: { text: string }) {
  return (
    <span className="inline-flex overflow-hidden text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.75)]">
      {text.split('').map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          className="inline-block"
          initial={{ y: '105%', rotateX: -80, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.48 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '50% 100%' }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

function Stat3D({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  return (
    <motion.div ref={ref} className="text-center"
      initial={{ opacity: 0, y: 50, rotateX: -25 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 600 }}>
      <div className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary font-sans mb-2 tracking-tight">{value}</div>
      <div className="text-white/40 text-[10px] tracking-[0.28em] uppercase">{label}</div>
    </motion.div>
  );
}

function ImmersivePhilosophyLayer({ progress }: { progress: MotionValue<number> }) {
  const rotateY = useTransform(progress, [0, 1], [-22, 22]);
  const rotateX = useTransform(progress, [0, 1], [12, -10]);
  const scanY = useTransform(progress, [0, 1], ['8%', '86%']);
  const depth = useTransform(progress, [0, 1], [0.92, 1.08]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute left-[12%] top-[16%] h-[66%] w-[76%] immersive-stage"
        style={{ rotateY, rotateX, scale: depth }}
      >
        <div className="ar-grid absolute inset-0" />
        <motion.div
          className="absolute left-[8%] top-[10%] h-[80%] w-[84%] rounded-full border border-primary/35"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute left-[18%] top-[18%] h-[64%] w-[64%] rounded-full border border-white/18"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute left-[34%] top-[28%] h-[44%] w-[34%] border border-primary/35 bg-black/20 backdrop-blur-[2px] shadow-[0_0_45px_rgba(196,147,63,0.12)]" />
        <motion.div
          className="absolute left-[4%] right-[4%] h-px bg-primary/80 shadow-[0_0_22px_rgba(196,147,63,0.9)]"
          style={{ top: scanY }}
        />
        <div className="absolute left-[12%] top-[22%] h-px w-24 bg-primary/55" />
        <div className="absolute right-[10%] top-[34%] h-px w-32 bg-white/25" />
        <div className="absolute bottom-[18%] left-[18%] h-px w-28 bg-white/20" />
        <div className="absolute bottom-[25%] right-[16%] h-px w-20 bg-primary/45" />
        {['VR', 'AR', '3D'].map((label, index) => (
          <motion.div
            key={label}
            className="absolute border border-white/15 bg-black/30 px-3 py-2 text-[10px] tracking-[0.24em] text-white/70 backdrop-blur-sm"
            style={{
              left: `${18 + index * 22}%`,
              top: `${70 - index * 18}%`,
              transform: `translateZ(${40 + index * 28}px)`,
            }}
            animate={{ y: [0, -10, 0], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 3.6 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const storyRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroImgY   = useTransform(scrollY, [0, 700], [0, 140]);
  const heroTextY  = useTransform(scrollY, [0, 700], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  // Panels fade in/out
  const p1Op = useTransform(scrollYProgress, [0, 0.28, 0.42], [1, 1, 0]);
  const p2Op = useTransform(scrollYProgress, [0.28, 0.42, 0.60, 0.74], [0, 1, 1, 0]);
  const p3Op = useTransform(scrollYProgress, [0.60, 0.74, 1], [0, 1, 1]);
  const p1Y  = useTransform(scrollYProgress, [0.28, 0.42], [0, -28]);
  const p2Y  = useTransform(scrollYProgress, [0.28, 0.42, 0.60, 0.74], [28, 0, 0, -28]);
  const p3Y  = useTransform(scrollYProgress, [0.60, 0.74], [28, 0]);

  // Images crossfade
  const i1Op = useTransform(scrollYProgress, [0, 0.32, 0.48], [1, 1, 0]);
  const i2Op = useTransform(scrollYProgress, [0.32, 0.48, 0.66, 0.80], [0, 1, 1, 0]);
  const i3Op = useTransform(scrollYProgress, [0.62, 0.78, 1], [0, 1, 1]);
  const i1Sc = useTransform(scrollYProgress, [0, 0.45], [1, 1.07]);
  const i2Sc = useTransform(scrollYProgress, [0.32, 0.60, 0.80], [1.05, 1, 1.05]);
  const i3Sc = useTransform(scrollYProgress, [0.62, 1], [1.05, 1]);

  const panelOps = [p1Op, p2Op, p3Op];
  const panelYs  = [p1Y,  p2Y,  p3Y];
  const imgOps   = [i1Op, i2Op, i3Op];
  const imgScs   = [i1Sc, i2Sc, i3Sc];

  return (
    <PageTransition>
      <div className="w-full overflow-x-hidden">

        {/* ── HERO ───────────────────────────── */}
        <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
          <motion.div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG.hero})`, y: heroImgY, scale: 1.12 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-[#0A0D14]" />
          <div className="absolute inset-0">
            <HeroCanvas />
          </div>

          <motion.div className="relative z-10 text-center px-4 max-w-7xl mx-auto mt-16"
            style={{ y: heroTextY, opacity: heroOpacity }}>
            <motion.div className="flex items-center justify-center gap-4 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
              <div className="h-px w-12 bg-black/55" />
              <span className="text-black/80 drop-shadow-[0_1px_10px_rgba(255,255,255,0.35)] tracking-[0.35em] text-[10px] md:text-xs uppercase font-extrabold">Explore. Dream. Discover.</span>
              <div className="h-px w-12 bg-black/55" />
            </motion.div>

            <h1 className="font-sans font-extrabold leading-[0.88] tracking-[-0.03em] mb-6 md:mb-8"
              style={{ fontSize: 'clamp(3rem, 13vw, 9.5rem)' }}>
              {["Explore", "Beyond", "Borders"].map((word, i) => (
                <motion.span key={i} className="block md:inline-block md:mr-5"
                  initial={{ opacity: 0, y: 80, skewY: 6 }} animate={{ opacity: 1, y: 0, skewY: 0 }}
                  transition={{ duration: 1.1, delay: 0.5 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}>
                  {i === 0 ? (
                    <RollingTitle text={word} />
                  ) : (
                    <span
                      className={
                        i === 1
                          ? 'text-[#E1AD45] drop-shadow-[0_6px_24px_rgba(0,0,0,0.75)] [-webkit-text-stroke:1px_rgba(0,0,0,0.32)]'
                          : 'text-white'
                      }
                    >
                      {word}
                    </span>
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p className="text-sm md:text-lg text-white/55 mb-10 max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1.1 }}>
              Curated journeys across India and the world. Premium experiences. Zero compromise.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.3 }}>
              <Link href="/destinations" className="w-full sm:w-auto bg-primary text-black px-10 py-4 text-xs tracking-[0.2em] uppercase font-bold hover:bg-white transition-colors duration-300 text-center">
                Discover Places
              </Link>
              <Link href="/plan" className="w-full sm:w-auto border border-white/25 text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:border-primary hover:text-primary transition-colors duration-300 text-center">
                Plan Journey
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
            <span className="text-white/25 text-[10px] tracking-[0.35em] uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent animate-pulse" />
          </motion.div>
        </section>

        {/* ── MARQUEE 1 ──────────────────────── */}
        <MarqueeStrip />

        {/* ── PHILOSOPHY SCROLLYTELLING ──────── */}
        <section
          ref={storyRef}
          className="relative bg-[#0A0D14]"
          style={{ height: '100vh', position: 'relative' }}
        >
          <div className="sticky top-0 h-screen overflow-hidden flex">

            {/* Left: crossfading images */}
            <div className="relative hidden md:block" style={{ width: '50%', flexShrink: 0 }}>
              {STORY_PANELS.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.image})`, opacity: imgOps[i], scale: imgScs[i] }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0D14]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/60 via-transparent to-transparent" />
              <ImmersivePhilosophyLayer progress={scrollYProgress} />
            </div>

            {/* Right: text panels */}
            <div className="flex-1 flex items-center bg-[#0A0D14] px-8 md:px-14 lg:px-20 relative">
              <div className="w-full">
                <div className="gold-line w-12 mb-8" />
                <p className="text-primary tracking-widest text-[10px] uppercase font-medium mb-8">Our Philosophy</p>

                {/* Panel container — fixed height so panels don't push each other */}
                <div className="relative" style={{ height: '260px' }}>
                  {STORY_PANELS.map((p, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      style={{ opacity: panelOps[i], y: panelYs[i] }}
                    >
                      <span className="block font-sans text-[100px] font-black text-white/[0.035] leading-none select-none -mt-4 -ml-2 absolute top-0 left-0">
                        {p.num}
                      </span>
                      <h2 className="relative font-sans text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight pr-4">
                        {p.title}
                      </h2>
                      <p className="relative text-white/45 text-base md:text-lg leading-relaxed pr-4 max-w-lg">{p.body}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Scroll progress dots */}
                <div className="flex gap-2 mt-10">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="h-[2px] bg-primary/30 rounded-full"
                      style={{ width: i === 0 ? 24 : 6 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DESTINATIONS ──────────────────── */}
        <section className="py-20 md:py-28 px-4 md:px-8 bg-[#080B11]">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20">
              <div>
                <motion.p className="text-primary tracking-widest text-xs uppercase font-medium mb-3"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
                  Where to go
                </motion.p>
                <motion.h2 className="font-sans text-4xl md:text-5xl lg:text-7xl font-bold text-white"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }} viewport={{ once: false }}>
                  Signature<br className="hidden md:block" /> Destinations
                </motion.h2>
              </div>
              <Link href="/destinations" className="text-primary text-xs tracking-widest uppercase font-medium hover:text-white transition-colors border-b border-primary/40 pb-1 mt-4 md:mt-0">
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {DESTINATIONS.map((dest, i) => (
                <motion.div key={dest.name}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  viewport={{ once: false }}>
                  <DestinationCard name={dest.name} country={dest.country} price={dest.price} imageSrc={dest.image} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE 2 ──────────────────────── */}
        <MarqueeStrip inverted speed={44} />

        {/* ── 3D EXPERIENCE CARDS ────────────── */}
        <section className="py-24 md:py-36 px-4 md:px-8 bg-[#0A0D14]">
          <div className="container mx-auto">
            <motion.p className="text-primary tracking-widest text-xs uppercase font-medium mb-3"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
              How you travel
            </motion.p>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
              <motion.h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: false }}>
                Travel Experiences
              </motion.h2>
              <Link href="/experiences" className="text-primary text-xs tracking-widest uppercase hover:text-white border-b border-primary/40 pb-1">
                Explore all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4" style={{ perspective: '1200px' }}>
              {EXPERIENCE_CARDS.map((cat, i) => (
                <motion.div key={cat.title}
                  className={`group relative overflow-hidden cursor-pointer bg-[#0F1420] ${cat.border} border`}
                  style={{ transformStyle: 'preserve-3d' }}
                  initial={{ opacity: 0, rotateX: -30, y: 60, scale: 0.92 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                  transition={{ duration: 0.85, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.03, rotateX: -4, boxShadow: `0 28px 70px ${cat.accent}18` }}
                  viewport={{ once: false, margin: '-60px' }}>

                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors duration-500" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${cat.accent}33, rgba(0,0,0,0.72))` }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600">
                    <div className="absolute -inset-6 rounded-full blur-3xl opacity-25" style={{ background: cat.accent }} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="relative p-8 md:p-10 h-52 md:h-60 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] tracking-[0.25em] uppercase mb-3 font-semibold" style={{ color: cat.accent }}>{cat.count}</div>
                      <h3 className="font-sans text-3xl md:text-4xl font-bold text-white leading-tight">{cat.title}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-px flex-1 mr-5" style={{ background: `linear-gradient(90deg, ${cat.accent}55, transparent)` }} />
                      <span className="text-xs uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: cat.accent }}>
                        Explore →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ─────────────────────────── */}
        <section className="py-24 md:py-36 bg-[#080B11] border-y border-white/5 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-[22vw] font-black text-white/[0.018] font-sans select-none whitespace-nowrap leading-none">JAABILI</div>
          </div>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
              {[
                { value: "120+", label: "Countries" },
                { value: "50K+", label: "Travelers" },
                { value: "4.9★", label: "Rating" },
                { value: "15yrs", label: "Excellence" },
              ].map((s, i) => (
                <Stat3D key={s.label} value={s.value} label={s.label} delay={i * 0.15} />
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY JAABILI ──────────────────── */}
        <section className="py-24 md:py-36 px-4 md:px-8 bg-[#0A0D14]">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div className="relative order-2 lg:order-1"
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }} viewport={{ once: false }}>
                <div className="relative h-[380px] md:h-[520px] overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${IMG.serengeti})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <motion.div
                  className="absolute -bottom-5 -right-0 md:-right-6 bg-primary text-black p-6 float-anim"
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} viewport={{ once: false }}>
                  <div className="text-3xl font-black font-sans">15</div>
                  <div className="text-xs tracking-widest uppercase font-semibold">Years of<br />Excellence</div>
                </motion.div>
              </motion.div>

              <div className="order-1 lg:order-2">
                <motion.p className="text-primary tracking-widest text-xs uppercase font-medium mb-4"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
                  Why Jaabili
                </motion.p>
                <motion.h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: false }}>
                  The Standard<br />You Deserve
                </motion.h2>
                <div className="space-y-6">
                  {WHY_ITEMS.map((item, i) => (
                    <motion.div key={item.title} className="flex gap-5 group"
                      initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: false }}>
                      <span className="text-primary text-lg mt-0.5 flex-shrink-0 w-6 font-mono">{item.icon}</span>
                      <div>
                        <h3 className="text-white font-semibold mb-1 group-hover:text-primary transition-colors text-sm md:text-base">{item.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL-BLEED FEATURE ────────────── */}
        <section className="relative h-[65vh] md:h-[85vh] overflow-hidden">
          <motion.div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG.borabora})` }}
            initial={{ scale: 1.12 }} whileInView={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: false }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          <div className="absolute bottom-12 md:bottom-20 left-8 md:left-20 right-8 md:right-20">
            <motion.p className="text-primary tracking-widest text-xs uppercase font-medium mb-3"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}>
              Featured Escape
            </motion.p>
            <motion.h2 className="font-sans font-extrabold text-white mb-4 leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }} viewport={{ once: false }}>
              Bora Bora
            </motion.h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8">
              <p className="text-white/55 text-sm md:text-base max-w-md">French Polynesia's jewel. Overwater bungalows, private lagoons, and seclusion that simply cannot be replicated.</p>
              <Link href="/destinations" className="flex-shrink-0 border border-white/30 text-white px-8 py-3.5 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 font-semibold text-center">
                Explore
              </Link>
            </div>
          </div>
        </section>

        {/* ── INDIA SPOTLIGHT ──────────────── */}
        <section className="py-24 md:py-32 px-4 md:px-8 bg-[#0A0D14] border-t border-white/5">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16">
              <div>
                <motion.p className="text-orange-400 tracking-widest text-xs uppercase font-medium mb-3"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
                  Incredible India
                </motion.p>
                <motion.h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: false }}>
                  Discover India's<br />Eternal Wonders
                </motion.h2>
              </div>
              <Link href="/destinations" className="text-orange-400 text-xs tracking-widest uppercase hover:text-white border-b border-orange-400/40 pb-1 mt-4 md:mt-0">
                All India destinations →
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: "Taj Mahal",   sub: "Agra",    price: "₹66,500",  img: IMG.tajmahal,   grad: "from-amber-600/60" },
                { name: "Rajasthan",   sub: "Jaipur",  price: "₹83,000",  img: IMG.rajasthan,  grad: "from-orange-600/60" },
                { name: "Kerala",      sub: "Kochi",   price: "₹74,900",  img: IMG.kerala,     grad: "from-green-600/60" },
                { name: "Leh-Ladakh", sub: "Ladakh",  price: "₹99,900",  img: IMG.ladakh,     grad: "from-blue-600/60" },
              ].map((dest, i) => (
                <motion.div key={dest.name}
                  className="group relative overflow-hidden cursor-pointer h-48 md:h-72"
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: false }}>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${dest.img})` }} />
                  <div className={`absolute inset-0 bg-gradient-to-t ${dest.grad} to-transparent opacity-70`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-orange-300 text-[9px] tracking-widest uppercase mb-1">{dest.sub}</div>
                    <div className="text-white font-bold font-sans text-sm md:text-base group-hover:text-orange-300 transition-colors">{dest.name}</div>
                    <div className="text-white/50 text-xs mt-0.5">{dest.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOURNAL PREVIEW ──────────────── */}
        <section className="py-24 md:py-36 px-4 md:px-8 bg-[#080B11] border-t border-white/5">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20">
              <div>
                <motion.p className="text-primary tracking-widest text-xs uppercase font-medium mb-3"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>Travel writing</motion.p>
                <motion.h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: false }}>
                  Stories from the Road
                </motion.h2>
              </div>
              <Link href="/journal" className="text-primary text-xs tracking-widest uppercase font-medium hover:text-white transition-colors border-b border-primary/40 pb-1 mt-4 md:mt-0">
                All stories →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {[
                { title: "The Silent Echoes of Kyoto's Bamboo Forest", cat: "Japan", time: "5 min", image: IMG.kyoto },
                { title: "Tracking Leopards in the Serengeti", cat: "Africa", time: "12 min", image: IMG.serengeti },
                { title: "The Last Light of Santorini", cat: "Europe", time: "4 min", image: IMG.santorini },
              ].map((a, i) => (
                <motion.article key={a.title} className="group cursor-pointer"
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: false }}>
                  <div className="relative overflow-hidden h-52 md:h-64 mb-5">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${a.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="text-primary text-[10px] tracking-[0.25em] uppercase mb-2">{a.cat} · {a.time} read</div>
                  <h3 className="font-sans text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors leading-snug">{a.title}</h3>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────── */}
        <section className="relative py-32 md:py-48 px-4 overflow-hidden bg-[#080B11]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="text-[30vw] font-black text-white/[0.022] font-sans select-none whitespace-nowrap leading-none">GO</div>
          </div>
          <motion.div className="max-w-3xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }} viewport={{ once: false }}>
            <p className="text-primary tracking-[0.3em] text-xs uppercase font-medium mb-6">Your journey awaits</p>
            <h2 className="font-sans font-extrabold text-white mb-6 leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
              Ready to<br />Explore?
            </h2>
            <p className="text-white/40 mb-12 text-base md:text-lg max-w-xl mx-auto">
              Join 50,000+ travelers who trust Jaabili to craft their most extraordinary journeys.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto">
              <input type="email" placeholder="Your email address"
                className="flex-1 bg-[#0F1420] border border-white/10 focus:border-primary px-6 py-4 text-white placeholder:text-white/25 outline-none transition-colors text-sm min-w-0" />
              <button className="bg-primary text-black px-8 py-4 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}
