import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { IMG } from '@/lib/images';

type Region = 'all' | 'india' | 'asia' | 'europe' | 'africa' | 'americas' | 'middleeast' | 'oceania';

interface GalleryItem {
  id: number;
  src?: string;
  gradient?: string;
  title: string;
  location: string;
  region: Region;
  size: 'normal' | 'tall' | 'wide';
}

const GALLERY: GalleryItem[] = [
  // Real images
  { id:1,  src: IMG.switzerland, title:"Swiss Alps",          location:"Switzerland",         region:"europe",    size:"tall"   },
  { id:2,  src: IMG.maldives,   title:"Turquoise Lagoon",    location:"Maldives",            region:"asia",      size:"wide"   },
  { id:3,  src: IMG.kyoto,      title:"Bamboo Forest",       location:"Kyoto, Japan",        region:"asia",      size:"normal" },
  { id:4,  src: IMG.morocco,    title:"Riad Courtyard",      location:"Marrakech, Morocco",  region:"africa",    size:"tall"   },
  { id:5,  src: IMG.patagonia,  title:"Torres del Paine",    location:"Patagonia, Chile",    region:"americas",  size:"wide"   },
  { id:6,  src: IMG.santorini,  title:"Clifftop Sunset",     location:"Santorini, Greece",   region:"europe",    size:"normal" },
  { id:7,  src: IMG.japan,      title:"Mount Fuji",          location:"Fuji, Japan",         region:"asia",      size:"normal" },
  { id:8,  src: IMG.borabora,   title:"Overwater Paradise",  location:"Bora Bora",           region:"oceania",   size:"tall"   },
  { id:9,  src: IMG.serengeti,  title:"Golden Savanna",      location:"Serengeti, Tanzania", region:"africa",    size:"wide"   },
  { id:10, src: IMG.hero,       title:"Mountain Dawn",       location:"Swiss Alps, Europe",  region:"europe",    size:"normal" },

  // India — real photos + vibrant cards
  { id:11, src: IMG.tajmahal,   title:"Taj Mahal",           location:"Agra, India",         region:"india",     size:"wide"   },
  { id:12, src: IMG.kerala,     title:"Kerala Backwaters",   location:"Kerala, India",       region:"india",     size:"tall"   },
  { id:13, src: IMG.rajasthan,  title:"Rajasthan Forts",     location:"Jaipur, India",       region:"india",     size:"normal" },
  { id:14, src: IMG.varanasi,   title:"Varanasi Ghats",      location:"Varanasi, India",     region:"india",     size:"normal" },
  { id:15, src: IMG.ladakh,     title:"Leh-Ladakh Peaks",    location:"Ladakh, India",       region:"india",     size:"tall"   },
  { id:16, src: IMG.andaman,    title:"Andaman Islands",     location:"Andaman, India",      region:"india",     size:"wide"   },
  { id:17, src: IMG.goa,        title:"Goa Beaches",         location:"Goa, India",          region:"india",     size:"normal" },
  { id:18, src: IMG.kashmir,    title:"Dal Lake Kashmir",    location:"Kashmir, India",      region:"india",     size:"normal" },
  { id:19, src: IMG.holi,      title:"Holi Festival",      location:"Mathura, India",         region:"india", size:"normal" },
  { id:20, src: IMG.rannKutch, title:"Rann of Kutch",      location:"Gujarat, India",         region:"india", size:"wide"   },
  { id:21, src: IMG.munnar,    title:"Munnar Tea Gardens", location:"Kerala, India",          region:"india", size:"normal" },
  { id:22, src: IMG.mysore,    title:"Mysore Palace",      location:"Karnataka, India",       region:"india", size:"tall"   },

  // Asia
  { id:23, src: IMG.bali,        title:"Bali Rice Terraces", location:"Bali, Indonesia",        region:"asia",  size:"normal" },
  { id:24, src: IMG.angkorWat,   title:"Angkor Wat",         location:"Siem Reap, Cambodia",    region:"asia",  size:"wide"   },
  { id:25, src: IMG.halongBay,   title:"Ha Long Bay",        location:"Vietnam",                region:"asia",  size:"normal" },
  { id:26, src: IMG.bangkok,     title:"Bangkok Temples",    location:"Bangkok, Thailand",      region:"asia",  size:"tall"   },
  { id:27, src: IMG.bhutan,      title:"Bhutan Monasteries", location:"Paro, Bhutan",           region:"asia",  size:"normal" },
  { id:28, src: IMG.nepal,       title:"Nepal Himalayas",    location:"Pokhara, Nepal",         region:"asia",  size:"wide"   },
  { id:29, src: IMG.halongBay,   title:"Mekong Delta",       location:"Vietnam",                region:"asia",  size:"normal" },
  { id:30, src: IMG.singapore,   title:"Singapore Marina",   location:"Singapore",              region:"asia",  size:"normal" },

  // Europe
  { id:31, src: IMG.paris,     title:"Paris at Twilight",  location:"Paris, France",          region:"europe",size:"wide"   },
  { id:32, src: IMG.amalfi,    title:"Amalfi Coast",       location:"Italy",                  region:"europe",size:"normal" },
  { id:33, src: IMG.prague,    title:"Prague Old Town",    location:"Prague, Czech Republic", region:"europe",size:"normal" },
  { id:34, src: IMG.iceland,   title:"Northern Lights",    location:"Reykjavik, Iceland",     region:"europe",size:"tall"   },
  { id:35, src: IMG.norway,    title:"Norwegian Fjords",   location:"Norway",                 region:"europe",size:"wide"   },
  { id:36, src: IMG.amsterdam, title:"Amsterdam Canals",   location:"Amsterdam",              region:"europe",size:"normal" },
  { id:37, src: IMG.venice,    title:"Venice at Dusk",     location:"Venice, Italy",          region:"europe",size:"normal" },
  { id:38, src: IMG.dubrovnik, title:"Dubrovnik Walls",    location:"Dubrovnik, Croatia",     region:"europe",size:"normal" },

  // Africa
  { id:39, src: IMG.capetown,      title:"Cape Town",          location:"Cape Town, South Africa",region:"africa",size:"wide"   },
  { id:40, src: IMG.sahara,        title:"Sahara Desert",      location:"Morocco",                region:"africa",size:"normal" },
  { id:41, src: IMG.victoriaFalls, title:"Victoria Falls",     location:"Zimbabwe/Zambia",        region:"africa",size:"tall"   },
  { id:42, src: IMG.zanzibar,      title:"Zanzibar Beaches",   location:"Zanzibar, Tanzania",     region:"africa",size:"normal" },
  { id:43, src: IMG.sahara,        title:"Saharan Dunes",      location:"Sahara, Algeria",        region:"africa",size:"normal" },

  // Americas
  { id:44, src: IMG.machu,   title:"Machu Picchu",       location:"Cusco, Peru",            region:"americas",size:"wide"  },
  { id:45, src: IMG.nyc,     title:"New York City",      location:"New York, USA",          region:"americas",size:"normal"},
  { id:46, src: IMG.rio,     title:"Rio de Janeiro",     location:"Brazil",                 region:"americas",size:"tall"  },
  { id:47, src: IMG.banff,   title:"Canadian Rockies",   location:"Banff, Canada",          region:"americas",size:"normal"},
  { id:48, src: IMG.niagara, title:"Niagara Falls",      location:"Canada/USA",             region:"americas",size:"normal"},
  { id:49, src: IMG.amazon,  title:"Amazon Rainforest",  location:"Brazil",                 region:"americas",size:"wide"  },

  // Middle East & Oceania
  { id:50, src: IMG.dubai,        title:"Dubai Skyline",      location:"Dubai, UAE",             region:"middleeast",size:"wide"  },
  { id:51, src: IMG.petra,        title:"Petra, Jordan",      location:"Wadi Musa, Jordan",      region:"middleeast",size:"tall"  },
  { id:52, src: IMG.cappadocia,   title:"Cappadocia",         location:"Türkiye",                region:"middleeast",size:"normal"},
  { id:53, src: IMG.greatBarrier, title:"Great Barrier Reef", location:"Queensland, Australia",  region:"oceania",   size:"wide"  },
  { id:54, src: IMG.sydney,       title:"Sydney Opera House", location:"Sydney, Australia",      region:"oceania",   size:"normal"},
  { id:55, src: IMG.milford,      title:"New Zealand Fjords", location:"Milford Sound, NZ",      region:"oceania",   size:"tall"  },
];

const REGIONS: { key: Region; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'india', label: 'India' },
  { key: 'asia', label: 'Asia' },
  { key: 'europe', label: 'Europe' },
  { key: 'africa', label: 'Africa' },
  { key: 'americas', label: 'Americas' },
  { key: 'middleeast', label: 'Middle East' },
  { key: 'oceania', label: 'Oceania' },
];

function CursorFollower() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { stiffness: 130, damping: 24 });
  const springY = useSpring(y, { stiffness: 130, damping: 24 });
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  useEffect(() => {
    const enter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      setLabel(el.dataset.title || '');
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const cards = document.querySelectorAll('[data-gallery-item]');
    cards.forEach(c => { c.addEventListener('mouseenter', enter); c.addEventListener('mouseleave', leave); });
    return () => {
      cards.forEach(c => { c.removeEventListener('mouseenter', enter); c.removeEventListener('mouseleave', leave); });
    };
  });

  return (
    <motion.div className="fixed z-[300] pointer-events-none hidden md:flex" style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="w-24 h-24 rounded-full bg-primary text-black flex items-center justify-center text-[9px] tracking-widest uppercase font-bold text-center leading-tight px-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * 12, y: ((e.clientX - r.left) / r.width - 0.5) * -12 });
  };

  const heights: Record<string, string> = {
    tall: 'h-[260px] sm:h-[400px] md:h-[500px]',
    wide: 'h-[170px] sm:h-[250px] md:h-[300px]',
    normal: 'h-[210px] sm:h-[280px] md:h-[340px]',
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden group cursor-pointer md:cursor-none ${heights[item.size]}`}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)' }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onClick}
      data-gallery-item
      data-title={item.title}
    >
      {item.src ? (
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.src})` }} />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Top tag */}
      <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-black/40 backdrop-blur-sm px-2.5 md:px-3 py-1 text-[9px] md:text-[10px] tracking-widest uppercase text-white/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
        {item.location.split(',').pop()?.trim()}
      </div>

      {/* Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 translate-y-0 opacity-100 md:translate-y-2 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-350">
        <div className="w-6 h-px bg-primary mb-2" />
        <p className="text-white font-semibold text-xs md:text-sm font-sans leading-tight">{item.title}</p>
        <p className="text-primary/80 text-[9px] md:text-[10px] tracking-wider mt-0.5 line-clamp-1">{item.location}</p>
      </div>

      {/* Corner accent */}
      <motion.div className="absolute top-0 right-0 w-0 h-0 border-l-[32px] border-l-transparent border-t-[32px] border-t-primary/0 group-hover:border-t-primary/80 transition-all duration-300" />
    </motion.div>
  );
}

export default function Gallery() {
  const [region, setRegion] = useState<Region>('all');
  const [selected, setSelected] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);

  const filtered = region === 'all' ? GALLERY : GALLERY.filter(g => g.region === region);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const navigate = useCallback((dir: 1 | -1) => {
    if (selected === null) return;
    const idx = filtered.findIndex(g => g.id === selected);
    const next = (idx + dir + filtered.length) % filtered.length;
    setSelected(filtered[next].id);
  }, [selected, filtered]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  const selectedItem = GALLERY.find(g => g.id === selected);

  return (
    <PageTransition>
      <CursorFollower />

      <div className="pt-24 md:pt-48 pb-14 md:pb-16 px-4 md:px-8 container mx-auto">
        {/* Header */}
        <motion.div className="flex flex-row items-end justify-between mb-7 md:mb-16 gap-4"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div>
            <p className="text-primary tracking-[0.28em] text-[10px] md:text-xs uppercase font-medium mb-3 md:mb-4">Visual journey</p>
            <h1 className="font-sans font-extrabold text-white leading-none tracking-tight" style={{ fontSize: 'clamp(2.6rem, 12vw, 9rem)' }}>
              Gallery
            </h1>
          </div>
          <div className="text-right">
            <div className="text-4xl md:text-6xl font-black text-white/[0.07] font-sans">{filtered.length}</div>
            <div className="text-[9px] md:text-xs tracking-widest uppercase text-white/25 -mt-1 md:-mt-2">Photos</div>
          </div>
        </motion.div>

        {/* Region filter */}
        <motion.div className="scrollbar-hide -mx-4 px-4 flex gap-2 md:gap-3 mb-7 md:mb-14 overflow-x-auto md:flex-wrap"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {REGIONS.map(r => (
            <button
              key={r.key}
              onClick={() => { setRegion(r.key); setVisibleCount(24); }}
              className={`flex-shrink-0 px-3.5 md:px-5 py-2 text-[9px] md:text-xs tracking-[0.18em] md:tracking-[0.2em] uppercase transition-all duration-300 font-medium ${
                region === r.key
                  ? 'bg-primary text-black'
                  : 'border border-white/12 text-white/35 hover:border-primary/50 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-2 md:gap-3 space-y-2 md:space-y-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.div
                key={item.id}
                className="break-inside-avoid"
                layout
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              >
                <GalleryCard item={item} onClick={() => setSelected(item.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load more */}
        {hasMore && (
          <motion.div className="mt-12 text-center"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}>
            <button
              onClick={() => setVisibleCount(v => v + 16)}
              className="border border-white/15 text-white/50 hover:border-primary hover:text-primary transition-all duration-300 px-12 py-4 text-xs tracking-widest uppercase font-medium"
            >
              Load More — {filtered.length - visibleCount} remaining
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && selectedItem && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-8 text-white/40 hover:text-primary transition-colors text-[10px] tracking-[0.3em] uppercase z-10 font-medium"
              onClick={() => setSelected(null)}>Close ✕</button>

            <div className="absolute top-6 left-8 text-white/25 text-xs font-sans">
              <span className="text-white">{String(GALLERY.findIndex(g => g.id === selected) + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              {String(GALLERY.length).padStart(2, '0')}
            </div>

            <button className="absolute left-4 md:left-8 text-white/30 hover:text-primary transition-colors p-4 z-10"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <motion.div
              key={selected}
              className="flex flex-col items-center gap-5 max-h-[85vh] max-w-[85vw] md:max-w-[72vw]"
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.src ? (
                <img src={selectedItem.src} alt={selectedItem.title} className="max-h-[74vh] max-w-full object-contain" />
              ) : (
                <div className={`w-[70vw] h-[55vh] bg-gradient-to-br ${selectedItem.gradient} flex items-end p-10`}>
                  <div>
                    <p className="text-primary text-xs tracking-widest uppercase mb-2">{selectedItem.location}</p>
                    <h2 className="font-sans text-4xl md:text-6xl font-bold text-white">{selectedItem.title}</h2>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="h-px w-6 bg-primary" />
                <div className="text-center">
                  <p className="text-white font-semibold font-sans text-sm">{selectedItem.title}</p>
                  <p className="text-primary text-[10px] tracking-[0.25em] uppercase">{selectedItem.location}</p>
                </div>
                <div className="h-px w-6 bg-primary" />
              </div>
            </motion.div>

            <button className="absolute right-4 md:right-8 text-white/30 hover:text-primary transition-colors p-4 z-10"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
