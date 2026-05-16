import React, { useRef, useState } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMG } from '@/lib/images';

const EXPERIENCES = [
  {
    title: "Adventure",
    desc: "Push boundaries in the world's most untouched landscapes. Summit legendary peaks, dive into crystal cenotes, navigate uncharted rivers. For those who find comfort in discomfort.",
    image: IMG.patagonia,
    count: "48 Experiences",
    accent: "#ff7c3a",
    gradient: "from-orange-950 via-red-950 to-slate-950",
    highlights: ["Rock Climbing — Patagonia", "Kite Surfing — Zanzibar", "Heli-Skiing — Alps", "Canyoneering — Utah"],
  },
  {
    title: "Luxury",
    desc: "Uncompromising comfort in the world's most remote locations. Bespoke itineraries, private villas, and unparalleled service that anticipates your every need before you realize it.",
    image: IMG.maldives,
    count: "32 Experiences",
    accent: "#C4933F",
    gradient: "from-amber-950 via-yellow-950 to-slate-950",
    highlights: ["Overwater Villas — Maldives", "Private Safari — Serengeti", "Yacht Charter — Amalfi", "Castle Stay — Scotland"],
  },
  {
    title: "Wildlife",
    desc: "Track the Big Five across Tanzania, witness wildebeest migrations, observe snow leopards in the Himalayas. Our wildlife specialists know nature's schedule better than anyone.",
    image: IMG.serengeti,
    count: "27 Experiences",
    accent: "#22c55e",
    gradient: "from-green-950 via-emerald-950 to-slate-950",
    highlights: ["Big 5 Safari — Kenya", "Gorilla Trek — Rwanda", "Whale Watch — Azores", "Snow Leopard — Ladakh"],
  },
  {
    title: "Culture",
    desc: "Immerse yourself in living history. Learn to cook alongside a Moroccan grandmother, participate in a Japanese tea ceremony, or study Kathakali dance in Kerala.",
    image: IMG.kyoto,
    count: "54 Experiences",
    accent: "#a855f7",
    gradient: "from-purple-950 via-violet-950 to-slate-950",
    highlights: ["Tea Ceremony — Kyoto", "Flamenco — Seville", "Holi Festival — Mathura", "Sufi Music — Istanbul"],
  },
  {
    title: "Food & Wine",
    desc: "Taste the world one plate at a time. From street food crawls in Bangkok to Michelin-starred omakase in Tokyo, our culinary journeys transform every meal into a memory.",
    image: IMG.japan,
    count: "41 Experiences",
    accent: "#fb7185",
    gradient: "from-rose-950 via-pink-950 to-slate-950",
    highlights: ["Ramen Schools — Tokyo", "Wine Harvest — Tuscany", "Spice Markets — Marrakech", "Street Food — Hanoi"],
  },
  {
    title: "Road Trips",
    desc: "The journey is the destination. Wind through the Amalfi Coast, trace Route 66, discover the dramatic landscapes of the Scottish Highlands — all at your own unhurried pace.",
    image: IMG.switzerland,
    count: "19 Experiences",
    accent: "#60a5fa",
    gradient: "from-blue-950 via-indigo-950 to-slate-950",
    highlights: ["Pacific Coast Hwy — USA", "Ring Road — Iceland", "Amalfi Drive — Italy", "Manali-Leh — India"],
  },
];

const VIDEO_STORIES = [
  { title: "The Serengeti Migration", location: "Tanzania, Africa", duration: "3:24", image: "/img/dest-serengeti.png", youtubeQuery: "serengeti great migration aerial" },
  { title: "Kyoto: Ancient Meets Modern", location: "Japan", duration: "4:12", image: "/img/dest-kyoto.png", youtubeQuery: "kyoto japan travel cinematic" },
  { title: "Santorini Blue Horizons", location: "Greece", duration: "2:58", image: "/img/dest-santorini.png", youtubeQuery: "santorini greece drone cinematic" },
  { title: "Maldives: Below the Surface", location: "Indian Ocean", duration: "5:03", image: "/img/dest-maldives.png", youtubeQuery: "maldives underwater coral reef" },
  { title: "Rajasthan: Land of Kings", location: "India", duration: "6:18", image: IMG.rajasthan, youtubeQuery: "rajasthan india travel cinematic" },
  { title: "Patagonia at the Edge", location: "Chile & Argentina", duration: "4:47", image: "/img/dest-patagonia.png", youtubeQuery: "patagonia torres del paine aerial" },
];

function VideoCard({ v, index }: { v: typeof VIDEO_STORIES[0]; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden cursor-pointer flex-shrink-0 w-72 md:w-80"
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      viewport={{ once: false }}
    >
      <div className="relative h-48 md:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${v.image})` }} />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-[10px] px-2 py-1 tracking-widest">
          {v.duration}
        </div>

        {/* Play button */}
        <button
          className="absolute inset-0 flex items-center justify-center"
          onClick={() => {
            const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(v.youtubeQuery)}`;
            window.open(url, '_blank');
          }}
        >
          <motion.div
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
          {/* Pulsing ring */}
          <motion.div
            className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-primary/50"
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          />
        </button>
      </div>

      <div className="p-5 bg-[#0F1420] border border-white/8 group-hover:border-primary/30 transition-colors duration-300">
        <p className="text-primary text-[10px] tracking-widest uppercase mb-1.5">{v.location}</p>
        <h3 className="font-sans font-bold text-white text-sm md:text-base group-hover:text-primary transition-colors">{v.title}</h3>
      </div>
    </motion.div>
  );
}

export default function Experiences() {
  const videoRailRef = useRef<HTMLDivElement>(null);
  const [videoProgress, setVideoProgress] = useState(0);

  const updateVideoProgress = () => {
    const rail = videoRailRef.current;
    if (!rail) return;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    setVideoProgress(maxScroll <= 0 ? 100 : (rail.scrollLeft / maxScroll) * 100);
  };

  const moveVideoRail = (direction: -1 | 1) => {
    const rail = videoRailRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.min(420, rail.clientWidth * 0.82), behavior: 'smooth' });
  };

  return (
    <PageTransition>
      <div className="pt-36 md:pt-48 pb-0">

        {/* Header */}
        <div className="container mx-auto px-4 md:px-8 mb-16 md:mb-24">
          <motion.p className="text-primary tracking-widest text-xs uppercase font-medium mb-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Types of travel
          </motion.p>
          <motion.h1 className="font-sans font-bold text-white mb-6"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 7rem)' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Your Style.<br />Your Journey.
          </motion.h1>
          <motion.p className="text-white/40 text-base md:text-xl max-w-xl leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Six categories. Hundreds of curated experiences. One shared truth: life is too short for ordinary travel.
          </motion.p>
        </div>

        {/* Experience Sections */}
        <div className="space-y-0">
          {EXPERIENCES.map((exp, i) => (
            <motion.section
              key={exp.title}
              className={`relative flex items-center bg-gradient-to-br ${exp.gradient} md:min-h-[80vh]`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, margin: "-80px" }}
            >
              <div className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${exp.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

              <div className={`relative z-10 container mx-auto px-4 md:px-8 flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16 py-20 md:py-28`}>
                {/* Image */}
                <div className="flex-1 overflow-hidden w-full">
                  <motion.div
                    className="w-full h-[280px] md:h-[450px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${exp.image})` }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: exp.accent }}>{exp.count}</p>
                  <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">{exp.title}</h2>
                  <p className="text-white/55 text-base md:text-lg mb-8 leading-relaxed max-w-lg">{exp.desc}</p>

                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {exp.highlights.map(h => (
                      <div key={h} className="flex items-center gap-2 text-sm text-white/50">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.accent }} />
                        {h}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/plan"
                    className="inline-block border px-8 py-4 text-xs tracking-widest uppercase font-semibold transition-all duration-300 hover:text-black"
                    style={{ borderColor: exp.accent, color: exp.accent }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = exp.accent)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    Explore {exp.title} →
                  </Link>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Video Stories */}
        <section className="py-24 md:py-36 bg-[#0A0D14] border-t border-white/5 overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: 'linear-gradient(90deg, rgba(196,147,63,0.08) 1px, transparent 1px)', backgroundSize: '120px 100%' }} />
          <div className="container mx-auto px-4 md:px-8 mb-10 md:mb-14 relative z-10">
            <motion.p className="text-primary tracking-widest text-xs uppercase font-medium mb-3"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
              Video stories
            </motion.p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <motion.h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: false }}>
                Watch &<br />Be Inspired
              </motion.h2>
              <div className="flex flex-col items-start md:items-end gap-5">
                <p className="text-white/35 text-sm max-w-xs leading-relaxed md:text-right">Cinematic travel films from around the world. Press play. Let the wanderlust take over.</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveVideoRail(-1)}
                    className="w-11 h-11 border border-white/12 bg-white/[0.03] text-white/55 hover:text-black hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center"
                    aria-label="Previous video stories"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveVideoRail(1)}
                    className="w-11 h-11 border border-white/12 bg-white/[0.03] text-white/55 hover:text-black hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center"
                    aria-label="Next video stories"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pl-4 md:pl-8 lg:pl-16">
            <div
              ref={videoRailRef}
              onScroll={updateVideoProgress}
              className="scrollbar-hide flex gap-4 overflow-x-auto pb-8 pr-8 snap-x snap-mandatory"
            >
              {VIDEO_STORIES.map((v, i) => (
                <div key={v.title} className="snap-start">
                  <VideoCard v={v} index={i} />
                </div>
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 md:px-8 mt-2 relative z-10">
            <div className="flex items-center gap-4">
              <span className="text-primary text-[10px] tracking-[0.25em] uppercase font-semibold">Reel</span>
              <div className="relative h-px flex-1 bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-primary shadow-[0_0_18px_rgba(196,147,63,0.65)]"
                  style={{ width: `${Math.max(14, videoProgress)}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <span className="text-white/25 text-[10px] tracking-[0.25em] uppercase">{String(Math.round(videoProgress)).padStart(2, '0')}%</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-[#080B11] border-t border-white/5 text-center px-4">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <p className="text-primary tracking-[0.3em] text-xs uppercase font-medium mb-6">Ready to experience it?</p>
            <h2 className="font-sans text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Tell us what moves you.
            </h2>
            <p className="text-white/40 mb-10 text-base leading-relaxed">
              Our travel architects will craft a bespoke itinerary around the experiences that matter most to you.
            </p>
            <Link href="/plan" className="inline-block bg-primary text-black px-12 py-5 text-xs tracking-[0.25em] uppercase font-bold hover:bg-white transition-colors duration-300">
              Start Planning
            </Link>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}
