import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Home from "@/pages/Home";
import Destinations from "@/pages/Destinations";
import Experiences from "@/pages/Experiences";
import Gallery from "@/pages/Gallery";
import Plan from "@/pages/Plan";
import Journal from "@/pages/Journal";

import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";

gsap.registerPlugin(ScrollTrigger);

const queryClient = new QueryClient();
let lenisInstance: Lenis | null = null;

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const resetScroll = () => {
      lenisInstance?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      ScrollTrigger.refresh();
    };

    resetScroll();
    requestAnimationFrame(resetScroll);
    const timeout = window.setTimeout(resetScroll, 120);
    return () => window.clearTimeout(timeout);
  }, [location]);

  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/experiences" component={Experiences} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/plan" component={Plan} />
          <Route path="/journal" component={Journal} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisInstance = null;
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Preloader onComplete={() => setPreloaderDone(true)} />
        <div style={{ opacity: preloaderDone ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <CustomCursor />
            <Router />
          </WouterRouter>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
