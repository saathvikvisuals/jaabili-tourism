import React from 'react';

const ITEMS = [
  { text: "Switzerland", icon: "❄" },
  { text: "Maldives", icon: "🌊" },
  { text: "Japan", icon: "⛩" },
  { text: "Morocco", icon: "✦" },
  { text: "Patagonia", icon: "🏔" },
  { text: "Santorini", icon: "○" },
  { text: "Bora Bora", icon: "◈" },
  { text: "Serengeti", icon: "△" },
  { text: "New Zealand", icon: "✦" },
  { text: "Iceland", icon: "◇" },
  { text: "Peru", icon: "▲" },
  { text: "Portugal", icon: "●" },
];

interface MarqueeStripProps {
  inverted?: boolean;
  speed?: number;
}

export function MarqueeStrip({ inverted = false, speed = 35 }: MarqueeStripProps) {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="w-full overflow-hidden py-5 border-y border-white/5 bg-[#080B11]"
      aria-hidden="true"
    >
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${speed}s linear infinite ${inverted ? 'reverse' : ''}`,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-8 whitespace-nowrap">
            <span className="text-primary text-xs">{item.icon}</span>
            <span className="text-white/30 text-xs tracking-[0.25em] uppercase font-medium">{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
