import React, { useState } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import { IMG } from '@/lib/images';

type Cat = 'All' | 'Asia' | 'Europe' | 'Africa' | 'Americas' | 'India' | 'Oceania' | 'Lifestyle';

const ARTICLES = [
  { title:"The Silent Echoes of Kyoto's Bamboo Forest",       excerpt:"Walking through Arashiyama feels like stepping into a different century. The bamboo creaks, the light filters green, and time genuinely stops.",                                                  category:"Asia" as Cat,     author:"Elena Rossi",      readTime:"5 min",  date:"May 12, 2026",   image: IMG.kyoto     },
  { title:"Tracking Leopards in the Serengeti",               excerpt:"Patience is the only currency that matters in the wild. Three days of silent tracking through Tanzania's golden grass led to a moment I will never forget.",                                         category:"Africa" as Cat,   author:"Sarah Jenkins",    readTime:"12 min", date:"April 28, 2026", image: IMG.serengeti },
  { title:"Lost in the Medinas of Morocco",                   excerpt:"Every alleyway in Marrakech leads somewhere unexpected — a spice merchant, a hidden courtyard, a master craftsman at work. This is a city that rewards getting lost.",                              category:"Africa" as Cat,   author:"Amir Khalil",      readTime:"7 min",  date:"April 10, 2026", image: IMG.morocco   },
  { title:"The Last Light of Santorini",                      excerpt:"There is a moment each evening when the caldera catches the light in a way no photograph can capture. We sat there for an hour, not speaking, just watching the sky burn orange.",                   category:"Europe" as Cat,   author:"Isabelle Fontaine",readTime:"4 min",  date:"March 22, 2026", image: IMG.santorini },
  { title:"Patagonia: At the Edge of the World",              excerpt:"Torres del Paine doesn't care about your plans. The wind, the weather, the sheer scale of it — this is a place that humbles you in the most magnificent way possible.",                             category:"Americas" as Cat, author:"Diego Reyes",      readTime:"10 min", date:"March 8, 2026",  image: IMG.patagonia },
  { title:"Midnight Sun in the Norwegian Fjords",             excerpt:"When the sun never truly sets, time loses its meaning. A journey through Norway's isolated waterways reveals a landscape that feels primordially unchanged.",                                          category:"Europe" as Cat,   author:"Marcus Chen",      readTime:"8 min",  date:"Feb 14, 2026",   image: IMG.switzerland },
  // India stories
  { title:"Varanasi at Dawn: A City That Never Sleeps",       excerpt:"The Ganges receives the prayers of millions each morning. Standing on the ghats as the fog lifts is to witness one of humanity's oldest, most moving rituals.",                                       category:"India" as Cat,    author:"Priya Nair",       readTime:"9 min",  date:"May 5, 2026",    image: IMG.varanasi  },
  { title:"Rajasthan's Painted Havelis and Desert Forts",     excerpt:"The Blue City of Jodhpur, the Pink City of Jaipur, the Golden City of Jaisalmer — each a masterpiece of a different hue, each hiding stories of Maharajas and merchants.",                         category:"India" as Cat,    author:"Aryan Kapoor",     readTime:"11 min", date:"April 20, 2026", image: IMG.rajasthan },
  { title:"Kerala's Backwaters: India at Its Most Serene",    excerpt:"On a kettuvallam (rice barge) drifting through the network of canals and lakes, the rest of the world ceases to exist. This is the India that stays with you.",                                      category:"India" as Cat,    author:"Meera Krishnan",   readTime:"6 min",  date:"April 1, 2026",  image: IMG.kerala    },
  { title:"Leh-Ladakh: A Ride Above the Clouds",             excerpt:"At 18,380 feet, Khardung La is one of the highest motorable roads on earth. The air is thin, the sky impossibly blue, and the landscape otherworldly in its desolate beauty.",                        category:"India" as Cat,    author:"Vikram Singh",     readTime:"14 min", date:"March 15, 2026", image: IMG.ladakh    },
  { title:"The Spice Coast: Eating Through Kerala",           excerpt:"There are 64 spices used in traditional Kerala cuisine. This is not a statistic — it's a philosophy. Food here is medicine, ritual, and love, all on one plate.",                                    category:"India" as Cat,    author:"Priya Nair",       readTime:"7 min",  date:"Feb 28, 2026",   image: IMG.kerala    },
  // More international
  { title:"48 Hours in Tokyo's Hidden Neighborhoods",         excerpt:"The Tokyo the guidebooks show you is extraordinary. The Tokyo only regulars know — the kissaten coffee shops, the basement izakayas, the market alleys — is transcendent.",                           category:"Asia" as Cat,     author:"Yuki Tanaka",      readTime:"8 min",  date:"May 8, 2026",    image: IMG.japan     },
  { title:"Bali Beyond the Beaches",                          excerpt:"Yes, Bali's beaches are extraordinary. But the real island lives in the rice paddies of Ubud, the temple smoke of Tirta Empul, and the silence of Mount Agung at sunrise.",                          category:"Asia" as Cat,     author:"Amanda Lee",       readTime:"9 min",  date:"April 17, 2026", image: IMG.bali      },
  { title:"Walking the Inca Trail at First Light",            excerpt:"Four days. 26 miles. 13,828 feet at the Sun Gate. When you walk through the mist and Machu Picchu appears below you, every step was worth it.",                                                        category:"Americas" as Cat, author:"Carlos Mendez",    readTime:"13 min", date:"March 30, 2026", image: IMG.machu     },
  { title:"A Week in Iceland's Ring Road",                    excerpt:"Waterfalls, glaciers, geysers, black sand beaches, and the aurora borealis — Iceland packs the impossible into 1,332 kilometers of road.",                                                             category:"Europe" as Cat,   author:"Sigrid Bjornsson", readTime:"11 min", date:"March 10, 2026", image: IMG.iceland   },
  { title:"How to Pack Light and Live Heavy",                 excerpt:"After a decade of travel across 80 countries, this is what I've learned fits in a carry-on, what stays behind, and why less is infinitely more.",                                                     category:"Lifestyle" as Cat,author:"Emma Wright",      readTime:"6 min",  date:"May 1, 2026",    image: IMG.maldives  },
  { title:"The Ethics of Luxury Travel",                      excerpt:"Can you spend ₹4,00,000 a night at a lodge and still sleep well knowing your footprint? The answer is yes — but only if you know what to look for.",                                                  category:"Lifestyle" as Cat,author:"James Okafor",     readTime:"8 min",  date:"April 5, 2026",  image: IMG.serengeti },
  { title:"Island-Hopping French Polynesia on a Budget",      excerpt:"Bora Bora gets all the glory, but Huahine, Fakarava, and Rangiroa offer equally extraordinary beauty — and a fraction of the crowds and cost.",                                                        category:"Oceania" as Cat,  author:"Sophie Lavall",    readTime:"10 min", date:"Feb 20, 2026",   image: IMG.borabora  },
  { title:"Road Tripping Through Banff and Jasper",           excerpt:"Turquoise lakes, glacier roads, pine valleys, and mountain lodges make the Canadian Rockies feel cinematic from the first turn of the highway.",                                               category:"Americas" as Cat, author:"Noah Brooks",      readTime:"9 min",  date:"Jan 22, 2026",   image: IMG.banff     },
  { title:"Havana After Midnight",                            excerpt:"Old cars glow under street lamps, salsa spills from balconies, and the Malecon turns into the city's longest conversation after dark.",                                                        category:"Americas" as Cat, author:"Lucia Moreno",     readTime:"7 min",  date:"Jan 10, 2026",   image: IMG.havana    },
  { title:"Amazon by Riverboat",                              excerpt:"The forest is never silent. Days on the river move slowly, but every bend brings birdsong, mist, and a sense of scale no city can teach.",                                                   category:"Americas" as Cat, author:"Rafael Costa",     readTime:"12 min", date:"Dec 18, 2025",   image: IMG.amazon    },
  { title:"Blue Ice and Wind in Patagonia",                   excerpt:"Glacier trails, sharp peaks, and sudden weather make Patagonia less like a destination and more like a test of attention.",                                                               category:"Americas" as Cat, author:"Diego Reyes",      readTime:"8 min",  date:"Dec 2, 2025",    image: IMG.patagonia },
  { title:"Diving the Great Barrier Reef",                    excerpt:"A reef trip is not just about color. It is about tides, guides who know the coral by name, and the quiet discipline of protecting what you came to see.",                                      category:"Oceania" as Cat,  author:"Mia Walker",       readTime:"8 min",  date:"Nov 21, 2025",   image: IMG.greatBarrier },
  { title:"Milford Sound in the Rain",                        excerpt:"New Zealand's fjords become more dramatic when the clouds drop low and every cliff turns into a temporary waterfall.",                                                                  category:"Oceania" as Cat,  author:"Liam Carter",      readTime:"6 min",  date:"Nov 8, 2025",    image: IMG.milford   },
  { title:"Fiji Without the Crowds",                          excerpt:"Small islands, village stays, reef picnics, and slow mornings show a softer version of Fiji beyond the resort postcard.",                                                             category:"Oceania" as Cat,  author:"Ava Singh",        readTime:"7 min",  date:"Oct 26, 2025",   image: IMG.fiji      },
  { title:"Angkor Wat at Blue Hour",                          excerpt:"Before sunrise, the temple is all silhouette and reflection. Then the stone warms, the carvings appear, and the scale begins to settle in.",                                               category:"Asia" as Cat,     author:"Maya Tran",        readTime:"7 min",  date:"Oct 14, 2025",   image: IMG.angkorWat },
  { title:"Venice Before the Day Begins",                     excerpt:"The best Venice happens before the crowds. Empty bridges, delivery boats, and quiet campos reveal the city as a living place again.",                                                     category:"Europe" as Cat,   author:"Isabelle Fontaine",readTime:"6 min",  date:"Sep 28, 2025",   image: IMG.venice    },
  { title:"Zanzibar's Tidal Villages",                        excerpt:"On the east coast, the ocean leaves and returns by the hour. The rhythm shapes fishing, food, markets, and the color of every day.",                                                     category:"Africa" as Cat,   author:"Amina Said",       readTime:"8 min",  date:"Sep 12, 2025",   image: IMG.zanzibar  },
  { title:"Hampi's Boulders and Broken Kingdoms",             excerpt:"Granite hills, temple ruins, banana fields, and coracle crossings make Hampi feel both ancient and strangely alive.",                                                                category:"India" as Cat,    author:"Vikram Singh",     readTime:"8 min",  date:"Aug 30, 2025",   image: IMG.hampi     },
  { title:"Rann of Kutch Under a White Moon",                 excerpt:"The salt desert is at its most unreal after sunset, when the ground turns silver and the horizon disappears into moonlight.",                                                         category:"India" as Cat,    author:"Meera Krishnan",   readTime:"6 min",  date:"Aug 16, 2025",   image: IMG.rannKutch },
];

const CATS: Cat[] = ['All', 'India', 'Asia', 'Europe', 'Africa', 'Americas', 'Oceania', 'Lifestyle'];

const CAT_COLORS: Record<Cat, string> = {
  All: 'text-primary', Asia: 'text-amber-400', Europe: 'text-blue-400',
  Africa: 'text-orange-400', Americas: 'text-emerald-400',
  India: 'text-rose-400', Oceania: 'text-cyan-400', Lifestyle: 'text-purple-400',
};

export default function Journal() {
  const [cat, setCat] = useState<Cat>('All');
  const [visibleCount, setVisibleCount] = useState(9);

  const filtered = cat === 'All' ? ARTICLES : ARTICLES.filter(a => a.category === cat);
  const visible = filtered.slice(0, visibleCount);
  const featured = filtered[0];

  return (
    <PageTransition>
      <div className="pt-36 md:pt-48 pb-24 container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.p className="text-primary tracking-widest text-xs uppercase font-medium mb-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Travel writing
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <motion.h1 className="font-sans font-bold text-white"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 7rem)' }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Travel Stories
          </motion.h1>
          <motion.p className="text-white/35 text-sm md:text-base max-w-sm leading-relaxed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Dispatches from the road, written by travelers who go deeper.
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div className="flex overflow-x-auto pb-4 mb-12 gap-6 border-b border-white/8 scrollbar-hide"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => { setCat(c); setVisibleCount(9); }}
              className={`pb-4 whitespace-nowrap text-xs tracking-[0.2em] uppercase transition-colors relative font-medium flex-shrink-0 ${
                cat === c ? CAT_COLORS[c] : 'text-white/30 hover:text-white'
              }`}
            >
              {c}
              {cat === c && (
                <motion.div className={`absolute bottom-[-1px] left-0 right-0 h-[2px] bg-current`} layoutId="journal-tab" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Featured */}
        {featured && (
          <AnimatePresence mode="wait">
            <motion.article
              key={featured.title}
              className="group relative overflow-hidden h-[400px] md:h-[520px] mb-8 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${featured.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl">
                <span className={`text-xs font-bold tracking-widest uppercase mb-4 block ${CAT_COLORS[featured.category]}`}>
                  {featured.category} · Featured
                </span>
                <h2 className="font-sans text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-white/55 leading-relaxed mb-6 hidden md:block text-sm">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-white/35 text-xs">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{featured.readTime} read</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        )}

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {visible.slice(1).map((article, i) => (
              <motion.article
                key={article.title}
                layout
                className="group bg-[#0F1420] border border-white/8 hover:border-primary/35 transition-all duration-500 flex flex-col cursor-pointer"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <div className="h-48 md:h-56 overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${article.image})` }} />
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <span className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${CAT_COLORS[article.category]}`}>
                    {article.category}
                  </span>
                  <h2 className="font-sans text-lg md:text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-snug flex-1">
                    {article.title}
                  </h2>
                  <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-white/8 pt-5">
                    <span className="text-white/55 text-sm font-medium">{article.author}</span>
                    <span className={`text-[10px] tracking-widest uppercase font-semibold ${CAT_COLORS[article.category]}`}>{article.readTime} read</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Load more */}
        {visibleCount < filtered.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount(v => v + 6)}
              className="border border-white/15 text-white/50 hover:border-primary hover:text-primary transition-all duration-300 px-12 py-4 text-xs tracking-widest uppercase"
            >
              Load More Stories — {filtered.length - visibleCount} remaining
            </button>
          </div>
        )}

        {/* Newsletter */}
        <motion.div
          className="mt-24 md:mt-32 border border-white/8 p-10 md:p-16 bg-[#0F1420] text-center"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}>
          <p className="text-primary tracking-widest text-xs uppercase font-medium mb-4">Never miss a story</p>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-white mb-4">Join the Jaabili Journal</h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Weekly dispatches from the world's most extraordinary destinations. No spam. Only the good stuff.
          </p>
          <div className="flex flex-col sm:flex-row max-w-sm mx-auto">
            <input type="email" placeholder="Your email"
              className="flex-1 bg-[#0A0D14] border border-white/10 focus:border-primary px-5 py-3.5 text-white placeholder:text-white/25 outline-none text-sm min-w-0" />
            <button className="bg-primary text-black px-8 py-3.5 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
