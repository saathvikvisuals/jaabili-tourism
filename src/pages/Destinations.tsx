import React, { useState } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { IMG } from '@/lib/images';

type Region = 'All' | 'India' | 'Asia' | 'Europe' | 'Africa' | 'Americas' | 'Oceania' | 'Middle East';

interface Dest {
  name: string;
  country: string;
  price: string;
  region: Region;
  image?: string;
  gradient?: string;
  tag?: string;
}

const ALL: Dest[] = [
  // Real images
  { name:"Kyoto",       country:"Japan",            price:"From ₹1,58,000", region:"Asia",     image: IMG.kyoto,        tag:"Cultural"  },
  { name:"Santorini",   country:"Greece",           price:"From ₹1,25,000", region:"Europe",   image: IMG.santorini,    tag:"Romantic"  },
  { name:"Serengeti",   country:"Tanzania",         price:"From ₹2,74,000", region:"Africa",   image: IMG.serengeti,    tag:"Wildlife"  },
  { name:"Patagonia",   country:"Chile",            price:"From ₹1,83,000", region:"Americas", image: IMG.patagonia,    tag:"Adventure" },
  { name:"Bora Bora",   country:"French Polynesia", price:"From ₹3,83,000", region:"Oceania",  image: IMG.borabora,     tag:"Luxury"    },
  { name:"Swiss Alps",  country:"Switzerland",      price:"From ₹1,08,000", region:"Europe",   image: IMG.switzerland,  tag:"Nature"    },
  { name:"Marrakech",   country:"Morocco",          price:"From ₹99,900",   region:"Africa",   image: IMG.morocco,      tag:"Cultural"  },
  { name:"Maldives",    country:"Maldives",         price:"From ₹2,08,000", region:"Asia",     image: IMG.maldives,     tag:"Luxury"    },

  // India — real photos
  { name:"Taj Mahal",         country:"India", price:"From ₹66,500",  region:"India", image: IMG.tajmahal,  tag:"Heritage"  },
  { name:"Kerala Backwaters", country:"India", price:"From ₹74,900",  region:"India", image: IMG.kerala,    tag:"Nature"    },
  { name:"Rajasthan",         country:"India", price:"From ₹83,000",  region:"India", image: IMG.rajasthan, tag:"Cultural"  },
  { name:"Varanasi",          country:"India", price:"From ₹58,000",  region:"India", image: IMG.varanasi,  tag:"Spiritual" },
  { name:"Leh-Ladakh",        country:"India", price:"From ₹99,900",  region:"India", image: IMG.ladakh,    tag:"Adventure" },
  { name:"Andaman Islands",   country:"India", price:"From ₹91,500",  region:"India", image: IMG.andaman,   tag:"Beach"     },
  { name:"Goa",               country:"India", price:"From ₹74,900",  region:"India", image: IMG.goa,       tag:"Beach"     },
  { name:"Kashmir",           country:"India", price:"From ₹91,500",  region:"India", image: IMG.kashmir,   tag:"Nature"    },
  { name:"Hampi",             country:"India", price:"From ₹49,900",  region:"India", image: IMG.hampi,     tag:"Heritage"  },
  { name:"Munnar",            country:"India", price:"From ₹66,500",  region:"India", image: IMG.munnar,    tag:"Nature"    },
  { name:"Rann of Kutch",     country:"India", price:"From ₹66,500",  region:"India", image: IMG.rannKutch, tag:"Unique"    },
  { name:"Mysore",            country:"India", price:"From ₹49,900",  region:"India", image: IMG.mysore,    tag:"Cultural"  },

  // Asia
  { name:"Bali",          country:"Indonesia",  price:"From ₹99,900",   region:"Asia", image: IMG.bali,    tag:"Nature"    },
  { name:"Angkor Wat",    country:"Cambodia",   price:"From ₹91,500",   region:"Asia",  image: IMG.angkorWat,    tag:"Heritage"  },
  { name:"Ha Long Bay",   country:"Vietnam",    price:"From ₹83,000",   region:"Asia",  image: IMG.halongBay,    tag:"Nature"    },
  { name:"Bangkok",       country:"Thailand",   price:"From ₹66,500",   region:"Asia",  image: IMG.bangkok,      tag:"Cultural"  },
  { name:"Bhutan",        country:"Bhutan",     price:"From ₹2,08,000", region:"Asia",  image: IMG.bhutan,       tag:"Spiritual" },
  { name:"Nepal",         country:"Nepal",      price:"From ₹1,16,000", region:"Asia",  image: IMG.nepal,        tag:"Adventure" },
  { name:"Singapore",     country:"Singapore",  price:"From ₹1,33,000", region:"Asia",  image: IMG.singapore,    tag:"Urban"     },
  { name:"Phuket",        country:"Thailand",   price:"From ₹74,900",   region:"Asia",  image: IMG.phuket,       tag:"Beach"     },
  { name:"Luang Prabang", country:"Laos",       price:"From ₹83,000",   region:"Asia",  image: IMG.luangPrabang, tag:"Cultural"  },
  { name:"Jeju Island",   country:"South Korea",price:"From ₹91,500",   region:"Asia",  image: IMG.jeju,         tag:"Nature"    },

  // Europe
  { name:"Paris",           country:"France",          price:"From ₹1,16,000", region:"Europe", image: IMG.paris,   tag:"Romantic"  },
  { name:"Amalfi Coast",    country:"Italy",            price:"From ₹1,33,000", region:"Europe", image: IMG.amalfi,  tag:"Luxury"    },
  { name:"Prague",          country:"Czech Republic",   price:"From ₹83,000",   region:"Europe", image: IMG.prague,  tag:"Cultural"  },
  { name:"Iceland",         country:"Iceland",           price:"From ₹1,58,000", region:"Europe", image: IMG.iceland, tag:"Nature"    },
  { name:"Norwegian Fjords",country:"Norway",            price:"From ₹1,74,500", region:"Europe", image: IMG.norway,    tag:"Nature"    },
  { name:"Amsterdam",       country:"Netherlands",       price:"From ₹99,900",   region:"Europe", image: IMG.amsterdam, tag:"Urban"     },
  { name:"Barcelona",       country:"Spain",             price:"From ₹91,500",   region:"Europe", image: IMG.barcelona, tag:"Cultural"  },
  { name:"Venice",          country:"Italy",             price:"From ₹1,08,000", region:"Europe", image: IMG.venice,    tag:"Romantic"  },
  { name:"Dubrovnik",       country:"Croatia",           price:"From ₹91,500",   region:"Europe", image: IMG.dubrovnik, tag:"Scenic"    },
  { name:"Edinburgh",       country:"Scotland",          price:"From ₹83,000",   region:"Europe", image: IMG.edinburgh, tag:"Heritage"  },
  { name:"Capri",           country:"Italy",             price:"From ₹1,50,000", region:"Europe", image: IMG.capri,     tag:"Luxury"    },
  { name:"Tuscany",         country:"Italy",             price:"From ₹99,900",   region:"Europe", image: IMG.tuscany,   tag:"Nature"    },

  // Africa
  { name:"Cape Town",       country:"South Africa",  price:"From ₹1,08,000", region:"Africa", image: IMG.capetown, tag:"Scenic"   },
  { name:"Sahara Desert",   country:"Morocco",       price:"From ₹1,25,000", region:"Africa", image: IMG.sahara,        tag:"Adventure" },
  { name:"Victoria Falls",  country:"Zimbabwe",      price:"From ₹1,58,000", region:"Africa", image: IMG.victoriaFalls, tag:"Nature"    },
  { name:"Zanzibar",        country:"Tanzania",      price:"From ₹1,33,000", region:"Africa", image: IMG.zanzibar,      tag:"Beach"     },
  { name:"Masai Mara",      country:"Kenya",         price:"From ₹2,91,000", region:"Africa", image: IMG.masaiMara,     tag:"Wildlife"  },
  { name:"Pyramids of Giza",country:"Egypt",         price:"From ₹91,500",   region:"Africa", image: IMG.pyramids,      tag:"Heritage"  },
  { name:"Madagascar",      country:"Madagascar",    price:"From ₹1,83,000", region:"Africa", image: IMG.madagascar,    tag:"Unique"    },

  // Americas
  { name:"Machu Picchu",    country:"Peru",             price:"From ₹1,33,000", region:"Americas", image: IMG.machu,  tag:"Heritage"  },
  { name:"New York City",   country:"USA",              price:"From ₹91,500",   region:"Americas", image: IMG.nyc,    tag:"Urban"     },
  { name:"Rio de Janeiro",  country:"Brazil",           price:"From ₹1,08,000", region:"Americas", image: IMG.rio,       tag:"Vibrant"   },
  { name:"Banff",           country:"Canada",           price:"From ₹1,25,000", region:"Americas", image: IMG.banff,     tag:"Nature"    },
  { name:"Patagonia",       country:"Argentina",        price:"From ₹1,58,000", region:"Americas", image: IMG.patagonia, tag:"Adventure" },
  { name:"Galápagos",       country:"Ecuador",          price:"From ₹2,49,000", region:"Americas", image: IMG.galapagos, tag:"Wildlife"  },
  { name:"Havana",          country:"Cuba",             price:"From ₹99,900",   region:"Americas", image: IMG.havana,    tag:"Cultural"  },
  { name:"Iguazu Falls",    country:"Brazil/Argentina", price:"From ₹1,41,000", region:"Americas", image: IMG.iguazu,    tag:"Nature"    },

  { name:"Yellowstone",     country:"USA",              price:"From ₹1,24,000", region:"Americas", image: IMG.banff,     tag:"Wildlife"  },
  { name:"Grand Canyon",    country:"USA",              price:"From ₹1,08,000", region:"Americas", image: IMG.sahara,    tag:"Scenic"    },
  { name:"Alaska",          country:"USA",              price:"From ₹1,91,000", region:"Americas", image: IMG.iceland,   tag:"Adventure" },
  { name:"Costa Rica",      country:"Costa Rica",       price:"From ₹1,16,000", region:"Americas", image: IMG.amazon,    tag:"Wildlife"  },
  { name:"Cartagena",       country:"Colombia",         price:"From ₹99,900",   region:"Americas", image: IMG.havana,    tag:"Cultural"  },
  { name:"Atacama Desert",  country:"Chile",            price:"From ₹1,41,000", region:"Americas", image: IMG.sahara,    tag:"Unique"    },

  // Oceania
  { name:"Great Barrier Reef",country:"Australia",   price:"From ₹1,91,000", region:"Oceania", image: IMG.greatBarrier, tag:"Nature"    },
  { name:"Sydney",            country:"Australia",   price:"From ₹1,33,000", region:"Oceania", image: IMG.sydney,       tag:"Urban"     },
  { name:"Milford Sound",     country:"New Zealand", price:"From ₹1,66,000", region:"Oceania", image: IMG.milford,      tag:"Nature"    },
  { name:"Fiji",              country:"Fiji",        price:"From ₹2,16,000", region:"Oceania", image: IMG.fiji,         tag:"Beach"     },
  { name:"Queenstown",        country:"New Zealand", price:"From ₹1,50,000", region:"Oceania", image: IMG.queenstown,   tag:"Adventure" },
  { name:"Uluru",             country:"Australia",   price:"From ₹1,58,000", region:"Oceania", image: IMG.uluru,        tag:"Spiritual" },

  // Middle East
  { name:"Dubai",      country:"UAE",           price:"From ₹1,58,000", region:"Middle East", image: IMG.dubai,  tag:"Luxury"    },
  { name:"Petra",      country:"Jordan",        price:"From ₹99,900",   region:"Middle East", image: IMG.petra,      tag:"Heritage"  },
  { name:"Cappadocia", country:"Türkiye",       price:"From ₹1,08,000", region:"Middle East", image: IMG.cappadocia, tag:"Unique"    },
  { name:"Istanbul",   country:"Türkiye",       price:"From ₹83,000",   region:"Middle East", image: IMG.istanbul,   tag:"Cultural"  },
  { name:"Muscat",     country:"Oman",          price:"From ₹1,16,000", region:"Middle East", image: IMG.muscat,     tag:"Luxury"    },
  { name:"Dead Sea",   country:"Jordan/Israel", price:"From ₹91,500",   region:"Middle East", image: IMG.deadSea,    tag:"Unique"    },
  { name:"Wadi Rum",   country:"Jordan",        price:"From ₹99,900",   region:"Middle East", image: IMG.wadiRum,    tag:"Adventure" },
];

const TABS: Region[] = ['All', 'India', 'Asia', 'Europe', 'Africa', 'Americas', 'Oceania', 'Middle East'];

const TAG_COLORS: Record<string, string> = {
  Heritage: 'text-amber-400', Cultural: 'text-purple-400', Nature: 'text-emerald-400',
  Luxury: 'text-yellow-400', Adventure: 'text-orange-400', Wildlife: 'text-green-400',
  Beach: 'text-cyan-400', Spiritual: 'text-violet-400', Urban: 'text-blue-400',
  Romantic: 'text-rose-400', Unique: 'text-pink-400', Scenic: 'text-sky-400',
  Vibrant: 'text-orange-400',
};

function DestCard({ dest, index }: { dest: Dest; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.88, filter: 'blur(8px)' }}
      transition={{ duration: 0.45, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden h-64 md:h-80 cursor-pointer"
    >
      {dest.image ? (
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${dest.image})` }} />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${dest.gradient}`}>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 40% 30%, rgba(255,255,255,0.06) 0%, transparent 65%)' }} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute inset-0 border border-transparent group-hover:border-primary/30 transition-all duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <span className={`text-[10px] tracking-widest uppercase font-medium mb-1 block ${TAG_COLORS[dest.tag || ''] || 'text-primary'}`}>
          {dest.tag} · {dest.country}
        </span>
        <h3 className="font-sans text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{dest.name}</h3>
        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
          <span className="text-white/50 text-sm">{dest.price}</span>
          <Link href="/plan" className="text-primary text-xs tracking-widest uppercase font-semibold hover:text-white transition-colors">
            Explore →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Destinations() {
  const [activeTab, setActiveTab] = useState<Region>('All');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(24);

  const filtered = ALL
    .filter(d => activeTab === 'All' || d.region === activeTab)
    .filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase()));

  const visible = filtered.slice(0, visibleCount);

  return (
    <PageTransition>
      <div className="pt-36 md:pt-48 pb-24 px-4 md:px-8 container mx-auto">
        {/* Header */}
        <motion.p className="text-primary tracking-widest text-xs uppercase font-medium mb-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Explore the world
        </motion.p>
        <motion.h1 className="font-sans font-bold text-white mb-4"
          style={{ fontSize: 'clamp(2.8rem, 9vw, 7rem)' }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {filtered.length} Destinations
        </motion.h1>
        <motion.p className="text-white/40 text-base md:text-xl max-w-2xl mb-10 md:mb-14"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Every corner of the world. Handpicked for extraordinary experiences.
        </motion.p>

        {/* Search */}
        <motion.div className="relative mb-8 max-w-md"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#0F1420] border border-white/10 focus:border-primary px-6 py-3.5 text-white placeholder:text-white/25 outline-none text-sm"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 text-xs">⌕</span>
        </motion.div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-12 gap-6 md:gap-8 border-b border-white/8 scrollbar-hide">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setVisibleCount(24); }}
              className={`pb-4 whitespace-nowrap text-xs tracking-[0.2em] uppercase transition-colors relative font-medium flex-shrink-0 ${
                activeTab === tab ? 'text-primary' : 'text-white/35 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary" layoutId="dest-tab" />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((dest, i) => (
              <DestCard key={`${dest.name}-${dest.country}`} dest={dest} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <motion.div
            className="mt-6 border border-white/10 bg-[#0F1420] px-6 py-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-primary tracking-widest text-xs uppercase font-semibold mb-3">No matches</p>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-3">No destinations found</h2>
            <p className="text-white/40 text-sm max-w-md mx-auto mb-7">
              Clear the search or reset the region filter to see the full destination collection again.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveTab('All'); setVisibleCount(24); }}
              className="bg-primary text-black px-8 py-3.5 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors"
            >
              Reset filters
            </button>
          </motion.div>
        )}

        {visibleCount < filtered.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount(v => v + 16)}
              className="border border-white/15 text-white/50 hover:border-primary hover:text-primary transition-all duration-300 px-12 py-4 text-xs tracking-widest uppercase"
            >
              Show More — {filtered.length - visibleCount} remaining
            </button>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
