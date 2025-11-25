
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OctopusSection from './components/OctopusSection';
import DecodedShreds from './components/DecodedShreds';
import Features from './components/Features';
import GlobalNetwork from './components/GlobalNetwork';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CheckoutModal from './components/CheckoutModal';
import PlansPage from './components/PlansPage';
import Logo from './components/Logo';
import FooterText from './components/FooterText';
import { PageState, Plan } from './types';

const App: React.FC = () => {
  const [pageState, setPageState] = useState<PageState>(PageState.HOME);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  // Default to dark mode
  const [isDark, setIsDark] = useState(true);

  // Apply dark mode class to html element
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  // Handle Manual Scroll Restoration to prevent browser interference
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Routing Logic
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === '/pricing') {
        setPageState(PageState.PLANS);
      } else {
        setPageState(PageState.HOME);
      }
    };

    // Check on initial mount
    handleLocationChange();

    // Listen for back/forward navigation
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Helper to scroll to a section with offset
  const scrollToSection = (id: string, behavior: ScrollBehavior = 'smooth') => {
      if (id === 'hero') {
           window.scrollTo({ top: 0, behavior });
           return;
      }
      
      const el = document.getElementById(id);
      if (el) {
           const navHeight = 80; // approximate navbar height
           const elementPosition = el.getBoundingClientRect().top + window.scrollY;
           const offsetPosition = elementPosition - navHeight;

           window.scrollTo({
                top: offsetPosition,
                behavior
           });
      }
  };

  // Immediate Scroll Reset when switching pages (Page Level)
  useLayoutEffect(() => {
    // If we are switching to PLANS, always top.
    // If we are switching to HOME and have NO pending target (e.g. clicked Logo or Back Button), always top.
    // If we have a pending target, we DO NOT scroll to top here, we let the useEffect handle the jump.
    // NOTE: We intentionally exclude 'pendingScroll' from the dependency array to prevent
    // this effect from running when 'pendingScroll' is reset to null after a successful scroll.
    if (pageState === PageState.PLANS) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (pageState === PageState.HOME && !pendingScroll) {
       window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pageState]);

  // Robust Pending Scroll Handler (Section Level)
  useEffect(() => {
    if (pageState === PageState.HOME && pendingScroll) {
       // Wait a tick for React to render the Home components
       const timer = setTimeout(() => {
           const element = document.getElementById(pendingScroll);
           if (element) {
               // For cross-page navigation, use 'instant' (auto) to jump directly to content
               // This avoids the visual glitch of scrolling from top/bottom
               scrollToSection(pendingScroll, 'auto');
               setPendingScroll(null);
           } else {
               // Fallback Polling if element takes longer (e.g. heavy render)
               let attempts = 0;
               const intervalId = setInterval(() => {
                   const el = document.getElementById(pendingScroll);
                   if (el) {
                       scrollToSection(pendingScroll, 'auto');
                       setPendingScroll(null);
                       clearInterval(intervalId);
                   } else {
                       attempts++;
                       if (attempts >= 20) { // Stop after ~1 second
                           clearInterval(intervalId);
                           setPendingScroll(null);
                           // Last resort fallback to top if 'hero' was intended but not found (unlikely)
                           if (pendingScroll === 'hero') window.scrollTo(0, 0);
                       }
                   }
               }, 50);
           }
       }, 50); // Initial delay

       return () => clearTimeout(timer);
    }
  }, [pageState, pendingScroll]);

  const handleNavigate = (sectionId: string) => {
    // 1. Navigate to PlansPage
    if (sectionId === 'plans' || sectionId === 'pricing') {
        if (pageState !== PageState.PLANS) {
            setPageState(PageState.PLANS);
            window.history.pushState(null, '', '/pricing');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
    }

    // 2. Navigate to Home Page Sections
    if (pageState === PageState.HOME) {
        // Already on Home: Scroll smoothly
        scrollToSection(sectionId, 'smooth');
        
        if (window.location.pathname !== '/') {
            window.history.pushState(null, '', '/');
        }
    } else {
        // On another page: Switch first, then scroll (handled by useEffect)
        setPageState(PageState.HOME);
        setPendingScroll(sectionId);
        window.history.pushState(null, '', '/');
    }
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  const handleCloseModal = () => {
    setIsCheckoutOpen(false);
    setSelectedPlan(null);
  };

  const renderContent = () => {
      if (pageState === PageState.PLANS) {
          return <PlansPage onBuyClick={handleSelectPlan} />;
      }

      return (
        <main>
            <Hero onCtaClick={() => handleNavigate('plans')} />
            <Features />
            <GlobalNetwork />
            <OctopusSection />
            <DecodedShreds />
            {/* Note: The main Pricing component on Home is distinct from the Plans page. 
                We keep it here as part of the landing page content. */}
            <Pricing onSelectPlan={handleSelectPlan} />
            <FAQ />
        </main>
      );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 font-sans text-slate-900 dark:text-white selection:bg-blue-400 selection:text-white transition-colors duration-300 overflow-x-hidden">
      
      <Navbar 
        onNavigate={handleNavigate} 
        isDark={isDark} 
        toggleTheme={() => setIsDark(!isDark)} 
      />
      
      {renderContent()}
      
      <footer className="bg-white dark:bg-navy-950 border-t border-slate-200 dark:border-white/5 pt-16 relative z-10 transition-colors duration-300 text-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pb-0">
            {/* Main Footer Container - Flex Layout with Categories */}
            <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 relative z-20">
                
                {/* CATEGORY 1: Company Information (P9 + TideBlock) */}
                <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
                    
                    {/* P9 Nodes Brand */}
                    <div className="flex flex-col gap-6 max-w-xs">
                        <div className="flex items-center gap-3">
                            <Logo className="h-10 w-auto text-black dark:text-white" />
                            <span className="font-bold tracking-tight text-slate-900 dark:text-white text-xl mt-1">P9 Nodes</span>
                        </div>
                        
                        <div className="text-slate-500 dark:text-gray-500 text-xs font-light -mt-4 ml-1">
                            Powered by TideBlock
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                                <p className="text-slate-500 dark:text-gray-500 text-xs font-mono">All systems operational</p>
                            </div>
                            <p className="text-slate-400 dark:text-gray-600 text-xs">© 2025 P9 Nodes. All rights reserved.</p>
                        </div>
                    </div>

                    {/* TideBlock Info */}
                    <div className="flex flex-col gap-4 max-w-xs">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">TideBlock LTD</h4>
                        <div className="text-slate-500 dark:text-gray-400 leading-tight text-sm space-y-0.5">
                            <p>Office A, RAK DAO Centre</p>
                            <p>Ground Floor, SMZ Rd</p>
                            <p>Ras Al Khaimah, 5300</p>
                            <p>United Arab Emirates</p>
                            <p className="pt-2 opacity-60 font-mono text-xs">TRN: 104876524000001</p>
                        </div>
                    </div>
                </div>

                {/* CATEGORY 2: Links Block (Product + Resources + Connect) */}
                <div className="flex flex-wrap gap-10 lg:gap-16">
                    
                    {/* Product */}
                    <div className="min-w-[100px]">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-5 text-base">Product</h4>
                        <ul className="space-y-3 text-slate-500 dark:text-gray-400">
                            <li><button onClick={() => handleNavigate('features')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Features</button></li>
                            <li><button onClick={() => handleNavigate('octopus')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Octopus Mode</button></li>
                            <li><button onClick={() => handleNavigate('plans')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Pricing</button></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="min-w-[100px]">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-5 text-base">Resources</h4>
                        <ul className="space-y-3 text-slate-500 dark:text-gray-400">
                            <li><button onClick={() => handleNavigate('faq')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">FAQ</button></li>
                            <li><button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left">Guides</button></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="min-w-[100px]">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-5 text-base">Connect</h4>
                        <div className="flex flex-col gap-3">
                                <a href="mailto:admin@tideblock.io" className="flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>Email Us</span>
                            </a>
                            <a href="https://x.com/P9Solutions" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                <span>X (Twitter)</span>
                            </a>
                                <a href="https://discord.gg/p9nodes" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                                <span>Discord</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Large P9 Nodes Typography - SVG Version */}
            <div className="w-full flex justify-center pointer-events-none select-none mt-24 pb-0">
                <FooterText className="w-full h-auto max-h-[250px]" />
            </div>
        </div>
      </footer>
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={handleCloseModal} 
        plan={selectedPlan} 
      />
    </div>
  );
};

export default App;
    