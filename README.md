# Jaabili

Premium travel experiences website for curated journeys across India and the world.

Jaabili is a cinematic, responsive tourism website built around immersive motion, rich destination imagery, polished mobile navigation, and a luxury travel brand feel. The experience includes animated hero typography, 3D/VR-inspired visual elements, destination filters, travel stories, a gallery, video story cards, and a journey planning flow.

## Features

- Cinematic home page with animated hero titles, luxury travel messaging, and immersive visual effects
- Responsive navigation with desktop links and a mobile-friendly hamburger menu
- Destination explorer with regional filters, search, image-rich cards, and fallback empty states
- Experiences page with premium travel categories and custom-designed video story rail
- Gallery page optimized for desktop and mobile layouts
- Journal page with travel stories across India, Asia, Europe, Africa, Americas, Oceania, and Lifestyle
- Planning page for journey inquiry and trip intent capture
- Smooth page transitions, scroll-triggered reveals, and reversible scroll animations
- Custom cursor, preloader, polished footer, favicon, and brand assets
- Standalone Vite setup ready for GitHub and Vercel deployment

## Tech Stack

- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- Framer Motion
- GSAP
- Lenis smooth scrolling
- Three.js with React Three Fiber and Drei
- Radix UI primitives
- Lucide React icons
- Wouter routing

## Pages

- `Home` - immersive landing experience, hero animation, philosophy section, featured journeys
- `Destinations` - searchable and filterable destination catalog
- `Experiences` - curated travel styles and cinematic video stories
- `Gallery` - image-led visual travel gallery
- `Plan` - journey planning form and trip prompt flow
- `Journal` - editorial travel stories and regional articles

## Getting Started

### Prerequisites

- Node.js 20 or newer
- pnpm 10

### Install

```bash
pnpm install
```

### Start Development Server

```bash
pnpm dev
```

The app runs on `http://localhost:5173` by default.

### Typecheck

```bash
pnpm typecheck
```

### Production Build

```bash
pnpm build
```

The production output is generated in:

```text
dist/public
```

### Preview Production Build

```bash
pnpm serve
```

## Deployment

This repository includes `vercel.json` for Vercel deployment.

Vercel settings:

- Framework preset: `Vite`
- Build command: `pnpm build`
- Output directory: `dist/public`

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   ├── jaabili-logo*.png
│   ├── sk-logo.png
│   └── opengraph.jpg
├── src/
│   ├── components/
│   │   ├── HeroCanvas.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PageTransition.tsx
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   │   ├── images.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Destinations.tsx
│   │   ├── Experiences.tsx
│   │   ├── Gallery.tsx
│   │   ├── Plan.tsx
│   │   └── Journal.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

## Brand Notes

The interface uses a dark luxury palette with gold accents, large editorial typography, travel photography, and restrained motion. The design is intended to feel premium, cinematic, and modern while staying usable across mobile and desktop screens.

## Credits

Designed and developed by SK.
