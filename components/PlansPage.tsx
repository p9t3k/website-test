
import React, { useState, useEffect, useRef } from 'react';
import { Key, Check, RefreshCw, ExternalLink, Info, ArrowRight, Activity, Cpu, Server, Zap, Database, Terminal, HelpCircle, ShoppingCart, Shield } from 'lucide-react';

interface PlansPageProps {
  onBuyClick: (plan: any) => void;
}

const networkImg = '/assets/network.png';
const bannerP9 = '/assets/banner_p9.png';

// --- Icons & Logos ---

const TensorLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className || "w-5 h-5"} fill="currentColor">
    <path d="M200,60 L340,60 L320,120 L230,120 L230,340 L170,340 L170,120 L80,120 L60,60 Z" />
  </svg>
);

const MagicEdenLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 174 105" className={className || "w-5 h-5"} fill="currentColor">
     <path d="M122.81,26.5l10.15,11.93c1.17,1.34,2.19,2.44,2.62,3.07,3.04,3.02,4.74,7.09,4.74,11.34-.28,5.02-3.56,8.43-6.57,12.09l-7.1,8.34-3.71,4.32c-.13.15-.22.33-.25.53s0,.4.09.58c.08.18.22.33.4.44.18.11.38.15.58.14h37.04c5.65,0,12.78,4.76,12.37,11.97,0,3.27-1.34,6.42-3.69,8.74-2.36,2.32-5.55,3.63-8.87,3.64h-58c-3.82,0-14.08.41-16.95-8.34-.61-1.83-.69-3.79-.24-5.67.84-2.77,2.16-5.37,3.9-7.69,2.92-4.32,6.08-8.65,9.19-12.84,4.02-5.49,8.14-10.8,12.19-16.4.14-.18.22-.41.22-.64s-.08-.46-.22-.64l-14.74-17.29c-.09-.13-.22-.22-.37-.29-.14-.07-.29-.11-.46-.11s-.32.04-.46.11-.27.18-.37.29c-3.95,5.25-21.23,28.51-24.91,33.22s-12.76,4.97-17.79,0l-23.05-22.81c-.14-.14-.33-.25-.54-.28-.2-.04-.41-.02-.61.06-.19.08-.35.21-.47.39s-.18.38-.18.58v43.84c.06,3.11-.88,6.16-2.67,8.73-1.79,2.56-4.36,4.51-7.33,5.56-1.9.65-3.92.85-5.91.57-1.99-.28-3.89-1.02-5.52-2.17-1.64-1.14-2.98-2.66-3.9-4.42-.92-1.76-1.41-3.71-1.41-5.69V12.87c.13-2.84,1.17-5.57,2.97-7.8C4.76,2.84,7.22,1.23,10,.47c2.38-.62,4.89-.62,7.27.02,2.38.64,4.55,1.88,6.28,3.62l35.43,34.96c.11.11.24.19.38.24s.29.07.45.06c.15-.01.29-.06.42-.13s.25-.18.33-.29L85.73,4.59c1.17-1.39,2.63-2.52,4.28-3.3,1.65-.78,3.45-1.19,5.22-1.21h65.48c1.79,0,3.56.39,5.19,1.12,1.63.73,3.09,1.8,4.26,3.13,1.18,1.33,2.06,2.9,2.58,4.58.52,1.7.66,3.47.42,5.22-.46,3.04-2.03,5.81-4.41,7.79-2.38,1.99-5.4,3.06-8.52,3.02h-36.67c-.19,0-.37.06-.52.15-.15.09-.28.24-.37.39-.08.16-.13.34-.12.52,0,.18.07.35.18.51h-.01Z"/>
  </svg>
);

const FlagDE = ({ className = "w-5 h-3.5" }) => (
    <svg viewBox="0 0 5 3" className={`${className} rounded-sm inline-block shadow-sm`}>
      <rect width="5" height="3" fill="#000"/>
      <rect width="5" height="2" y="1" fill="#D00"/>
      <rect width="5" height="1" y="2" fill="#FFCE00"/>
    </svg>
  );
  
  const FlagUS = ({ className = "w-5 h-3.5" }) => (
    <svg viewBox="0 0 19 10" className={`${className} rounded-sm inline-block shadow-sm`}>
      <rect width="19" height="10" fill="#bf0a30"/>
      <line y1="1" x2="19" y2="1" stroke="white" strokeWidth="1" />
      <line y1="3" x2="19" y2="3" stroke="white" strokeWidth="1" />
      <line y1="5" x2="19" y2="5" stroke="white" strokeWidth="1" />
      <line y1="7" x2="19" y2="7" stroke="white" strokeWidth="1" />
      <line y1="9" x2="19" y2="9" stroke="white" strokeWidth="1" />
      <rect width="7.6" height="5.4" fill="#002868"/>
    </svg>
  );
  
  const FlagNL = ({ className = "w-4 h-3" }) => (
      <svg viewBox="0 0 3 2" className={`${className} rounded-sm inline-block shadow-sm`}>
        <rect width="3" height="2" fill="#21468B"/>
        <rect width="3" height="1.33" fill="white"/>
        <rect width="3" height="0.66" fill="#AE1C28"/>
      </svg>
  );
  
  const FlagIE = ({ className = "w-4 h-3" }) => (
      <svg viewBox="0 0 3 2" className={`${className} rounded-sm inline-block shadow-sm`}>
        <rect width="1" height="2" fill="#169b62"/>
        <rect width="1" height="2" x="1" fill="#ffffff"/>
        <rect width="1" height="2" x="2" fill="#ff883e"/>
      </svg>
  );

  const FlagSG = ({ className = "w-4 h-3" }) => (
      <svg viewBox="0 0 3 2" className={`${className} rounded-sm inline-block shadow-sm`}>
         <rect width="3" height="2" fill="white"/>
         <rect width="3" height="1" fill="#EE2536"/>
         <circle cx="0.8" cy="0.4" r="0.35" fill="white" />
         <circle cx="0.9" cy="0.4" r="0.3" fill="#EE2536" />
         <circle cx="1.0" cy="0.4" r="0.05" fill="white" />
         <circle cx="0.75" cy="0.25" r="0.05" fill="white" />
         <circle cx="0.75" cy="0.55" r="0.05" fill="white" />
         <circle cx="0.6" cy="0.4" r="0.05" fill="white" />
         <circle cx="0.85" cy="0.25" r="0.05" fill="white" />
      </svg>
  );

// Background Pattern
const HeroBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial Gradient Base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20 dark:via-[#020408] dark:to-[#020408] h-[800px]"></div>
        
        {/* Circuit Pattern Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circuit-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10 10h80v80h-80z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M30 30h40v40h-40z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <rect x="45" y="45" width="10" height="10" fill="currentColor" opacity="0.5" />
                <path d="M50 10v20M50 70v20M10 50h20M70 50h20" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit-bg)" />
        </svg>
    </div>
  );

const PlansPage: React.FC<PlansPageProps> = ({ onBuyClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [highlightStep, setHighlightStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightStep((prev) => (prev === 0 ? 1 : 0));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleTensorClick = () => window.open('https://www.tensor.trade/trade/p9nodes', '_blank');
  const handleMagicEdenClick = () => window.open('https://magiceden.io/marketplace/p9_nodes', '_blank');

  return (
    <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="min-h-screen bg-slate-50 dark:bg-navy-950 font-sans transition-colors duration-300 relative overflow-hidden"
    >
      <HeroBackground />

      {/* Interactive Background Glow */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
            background: `radial-gradient(1200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 45%)`
        }}
      ></div>
      
      {/* 1. HERO SECTION - Full Screen Min-Height to push other content down */}
      <section className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
            
            {/* Main Text Content */}
            <div className="max-w-4xl mx-auto mb-16 relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight opacity-0 animate-fade-in-up">
                    <span className="font-melodrame italic text-blue-600 dark:text-blue-500">Enterprise-grade</span> <br />
                    Infrastructure
                </h1>
                <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 font-light leading-relaxed max-w-xl mx-auto opacity-0 animate-fade-in-up-delay">
                    Predictable pricing for high-performance Solana nodes. <br className="hidden md:block" />
                    Own your access key as an asset, pay only for hosting.
                </p>
            </div>

            {/* UNIFIED PREMIUM CARD DESIGN */}
            <div className="w-full max-w-5xl mx-auto opacity-0 animate-fade-in-up-delay relative mt-12">
                
                {/* Floating Label - Moved outside for overflow-hidden fix */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-4 py-1 bg-blue-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full shadow-lg border border-blue-400 whitespace-nowrap flex items-center gap-2">
                        <Key className="w-3 h-3" />
                        <span>Access P9 Nodes NFT</span>
                    </div>
                </div>

                {/* Card Container */}
                <div className="
                    rounded-[24px] md:rounded-[32px] overflow-hidden
                    bg-white/60 dark:bg-[#050A14]/60
                    backdrop-blur-2xl backdrop-saturate-150
                    border border-slate-200 dark:border-white/10
                    shadow-2xl relative group
                ">
                    <div className="flex flex-col lg:flex-row items-stretch">
                        
                        {/* LEFT SIDE: ANIMATED PRICING & BUTTONS (WIDER 7/12) */}
                        <div className="lg:w-7/12 p-6 md:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200/60 dark:border-white/10">
                             
                             <div className="mb-6 text-center lg:text-left">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    Acquire License
                                </h3>
                             </div>

                             {/* ANIMATED PRICING BOX */}
                             <div className="bg-slate-50 dark:bg-black/20 rounded-2xl p-5 border border-slate-200 dark:border-white/10 mb-6 relative overflow-hidden">
                                  {/* Step 1: Market Price */}
                                  <div className={`flex justify-between items-end mb-4 pb-4 border-b border-slate-200 dark:border-white/10 relative transition-all duration-500 ${highlightStep === 0 ? 'opacity-100 translate-x-0' : 'opacity-50'}`}>
                                      <div>
                                          <span className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider mb-1 transition-colors duration-500 ${highlightStep === 0 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-gray-400'}`}>
                                              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] transition-colors duration-500 ${highlightStep === 0 ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-white/10'}`}>1</span>
                                              Entry Cost
                                          </span>
                                          <div className={`text-xl font-bold transition-colors duration-500 ${highlightStep === 0 ? 'text-blue-600 dark:text-blue-400 scale-105 origin-left' : 'text-slate-900 dark:text-white'}`}>Market Price</div>
                                      </div>
                                      <span className="px-2 py-1 bg-slate-200 dark:bg-white/10 rounded text-[10px] font-mono font-bold text-slate-600 dark:text-gray-400">NFT</span>
                                  </div>
                                  
                                  {/* Step 2: Monthly Renewal */}
                                  <div className={`flex justify-between items-end transition-all duration-500 ${highlightStep === 1 ? 'opacity-100 translate-x-0' : 'opacity-50'}`}>
                                      <div>
                                          <span className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider mb-1 transition-colors duration-500 ${highlightStep === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-gray-400'}`}>
                                              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] transition-colors duration-500 ${highlightStep === 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-white/10'}`}>2</span>
                                              Monthly Renewal
                                          </span>
                                          <div className={`text-3xl font-bold transition-colors duration-500 ${highlightStep === 1 ? 'text-blue-600 dark:text-blue-400 scale-105 origin-left' : 'text-slate-500 dark:text-gray-400'}`}>400 <span className="text-sm">USDC</span></div>
                                      </div>
                                      <span className={`px-2 py-1 rounded text-[10px] font-mono font-bold border transition-colors duration-500 ${highlightStep === 1 ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-500 border-transparent'}`}>RENEWAL</span>
                                  </div>
                             </div>

                             {/* BUTTONS - Row Layout */}
                             <div className="flex flex-col sm:flex-row gap-3">
                                <button 
                                    onClick={handleTensorClick}
                                    className="flex-1 group/btn relative flex items-center justify-between px-4 py-3 rounded-xl bg-white dark:bg-[#0A0E17] border border-[#5865F2] hover:bg-[#5865F2]/10 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#5865F2]/20 hover:-translate-y-0.5"
                                >
                                    <div className="flex items-center gap-3">
                                         <div className="p-1.5 bg-[#5865F2]/10 rounded-lg group-hover/btn:bg-[#5865F2]/20 transition-colors shrink-0">
                                            <TensorLogo className="w-5 h-5 text-[#5865F2] transition-colors" />
                                         </div>
                                         <div className="text-left">
                                            <span className="block text-sm md:text-base font-bold text-slate-900 dark:text-white group-hover/btn:text-[#5865F2] transition-colors whitespace-nowrap">Buy on Tensor</span>
                                         </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover/btn:text-[#5865F2] transition-colors ml-2" />
                                </button>

                                <button 
                                    onClick={handleMagicEdenClick}
                                    className="flex-1 group/btn relative flex items-center justify-between px-4 py-3 rounded-xl bg-white dark:bg-[#0A0E17] border border-[#E42575] hover:bg-[#E42575]/10 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#E42575]/20 hover:-translate-y-0.5"
                                >
                                    <div className="flex items-center gap-3">
                                         <div className="p-1.5 bg-[#E42575]/10 rounded-lg group-hover/btn:bg-[#E42575]/20 transition-colors shrink-0">
                                            <MagicEdenLogo className="w-5 h-5 text-[#E42575] transition-colors" />
                                         </div>
                                         <div className="text-left">
                                            <span className="block text-sm md:text-base font-bold text-slate-900 dark:text-white group-hover/btn:text-[#E42575] transition-colors whitespace-nowrap">Buy on Magic Eden</span>
                                         </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover/btn:text-[#E42575] transition-colors ml-2" />
                                </button>
                             </div>
                        </div>

                        {/* RIGHT SIDE: HOW IT WORKS (SMALLER 5/12) */}
                        <div className="lg:w-5/12 p-6 md:p-8 bg-slate-50/50 dark:bg-black/20 flex flex-col justify-center relative">
                            
                             <div className="mb-8">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    How it works
                                </h3>
                             </div>

                             <div className="relative flex flex-col gap-8">
                                {/* Timeline Line */}
                                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-white/10"></div>

                                {/* Step 1 */}
                                <div className="flex gap-6 relative z-10">
                                    <div className="w-8 h-8 rounded-full bg-white dark:bg-navy-900 border-2 border-blue-500 dark:border-blue-500 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-white shrink-0 shadow-sm">1</div>
                                    <div>
                                        <p className="text-base font-bold text-slate-900 dark:text-white mb-1">Buy NFT</p>
                                        <p className="text-sm text-slate-600 dark:text-gray-400 leading-snug">Purchase a P9 Node from the secondary market (Tensor or Magic Eden).</p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex gap-6 relative z-10">
                                    <div className="w-8 h-8 rounded-full bg-white dark:bg-navy-900 border-2 border-slate-200 dark:border-white/20 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 text-slate-400 dark:text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-slate-900 dark:text-white mb-1">Check Status</p>
                                        <p className="text-sm text-slate-600 dark:text-gray-400 leading-snug">
                                            <span className="text-blue-600 dark:text-blue-400 font-medium">/checkrenewal </span> command on our Discord reveals if the node is active. <span className="text-blue-600 dark:text-blue-400 font-medium">Active nodes work instantly.</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex gap-6 relative z-10">
                                    <div className="w-8 h-8 rounded-full bg-white dark:bg-navy-900 border-2 border-slate-200 dark:border-white/20 flex items-center justify-center shrink-0">
                                        <RefreshCw className="w-4 h-4 text-slate-400 dark:text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-slate-900 dark:text-white mb-1">Activate / Renew</p>
                                        <p className="text-sm text-slate-600 dark:text-gray-400 leading-snug">If frozen, pay renewal via our systems to activate access until the next expiration date.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
      </section>

      {/* 2. ENDPOINTS & RATE LIMITS */}
      <section className="max-w-6xl mx-auto px-6 mb-32 relative z-10">
        <div className="flex items-center gap-4 mb-10">
             <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
                <Activity className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-widest">Endpoints and rate limits</h2>
            <div className="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-6">
            
            {/* 1. FULL ENDPOINTS */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#050A14] border border-slate-200 dark:border-white/5 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300 shadow-sm group flex flex-col justify-between h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                            <Server className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg uppercase tracking-wide">Full Endpoints</h4>
                            <p className="text-sm text-slate-500 dark:text-gray-400">RPC, Geyser & Decoded Shreds</p>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white text-xs font-bold rounded-full whitespace-nowrap">2x LOCATIONS</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-auto">
                        <div className="h-14 flex items-center justify-center gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl transition-all hover:bg-white dark:hover:bg-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 group/item cursor-default">
                        <FlagDE className="w-6 h-4" />
                        <span className="text-base font-bold text-slate-700 dark:text-white">Frankfurt</span>
                    </div>
                    <div className="h-14 flex items-center justify-center gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl transition-all hover:bg-white dark:hover:bg-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 group/item cursor-default">
                        <FlagUS className="w-6 h-4" />
                        <span className="text-base font-bold text-slate-700 dark:text-white">New York</span>
                    </div>
                </div>
            </div>

            {/* 2. RPC RATE LIMITS */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#050A14] border border-slate-200 dark:border-white/5 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-300 shadow-sm group flex flex-col justify-between h-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-slate-100 dark:bg-white/10 rounded-xl">
                        <Cpu className="w-6 h-6 text-slate-600 dark:text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg uppercase tracking-wide">RPC Rate Limits</h4>
                </div>
                
                <div className="space-y-4 mt-auto">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500 dark:text-gray-400 font-medium">SendTx</span>
                        <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white">300 TPS</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-gray-400 font-medium">Monitoring</span>
                        <span className="font-mono text-2xl font-bold text-slate-900 dark:text-white">1500 RPS</span>
                    </div>
                </div>
            </div>

            {/* 3. SHREDS ENDPOINTS */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#050A14] border border-slate-200 dark:border-white/5 hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-all duration-300 shadow-sm group flex flex-col justify-between h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg uppercase tracking-wide">Decoded Shreds Endpoints</h4>
                            <p className="text-sm text-slate-500 dark:text-gray-400">Ultra-low latency streams</p>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-600 text-cyan-700 dark:text-white text-xs font-bold rounded-full whitespace-nowrap">4x LOCATIONS</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="h-12 flex items-center justify-center gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl transition-all hover:border-cyan-400/50 hover:bg-white dark:hover:bg-white/10 cursor-default">
                        <FlagNL className="w-5 h-3.5" />
                        <span className="text-sm font-bold text-slate-700 dark:text-gray-200">Amsterdam</span>
                    </div>
                    <div className="h-12 flex items-center justify-center gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl transition-all hover:border-cyan-400/50 hover:bg-white dark:hover:bg-white/10 cursor-default">
                        <FlagIE className="w-5 h-3.5" />
                        <span className="text-sm font-bold text-slate-700 dark:text-gray-200">Dublin</span>
                    </div>
                    <div className="h-12 flex items-center justify-center gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl transition-all hover:border-cyan-400/50 hover:bg-white dark:hover:bg-white/10 cursor-default">
                        <FlagUS className="w-5 h-3.5" />
                        <span className="text-sm font-bold text-slate-700 dark:text-gray-200">SLC</span>
                    </div>
                    <div className="h-12 flex items-center justify-center gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl transition-all hover:border-cyan-400/50 hover:bg-white dark:hover:bg-white/10 cursor-default">
                        <FlagSG className="w-5 h-3.5" />
                        <span className="text-sm font-bold text-slate-700 dark:text-gray-200">Singapore</span>
                    </div>
                </div>
            </div>

             {/* 4. GEYSER LIMITS */}
             <div className="p-8 rounded-3xl bg-blue-50/50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 hover:border-blue-300 dark:hover:border-blue-400/40 transition-all duration-300 shadow-sm relative overflow-hidden group flex flex-col justify-between h-full">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Database className="w-24 h-24 text-blue-500" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl">
                                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="font-bold text-blue-900 dark:text-white text-lg uppercase tracking-wide">Yellowstone Geyser</h4>
                        </div>
                        
                        <div className="space-y-4 mt-auto">
                            <div className="flex justify-between items-center pb-4 border-b border-blue-200/50 dark:border-white/5">
                                <span className="text-slate-600 dark:text-gray-300 font-medium">Max Pubkeys</span>
                                <span className="font-mono text-2xl font-bold text-blue-700 dark:text-blue-300">600</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600 dark:text-gray-300 font-medium">Simultaneous Conns</span>
                                <span className="font-mono text-2xl font-bold text-blue-700 dark:text-blue-300">3</span>
                            </div>
                        </div>
                    </div>
            </div>

        </div>
      </section>

      {/* 3. TAILOR-MADE NETWORK */}
      <section className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative flex justify-center">
                   <img 
                       src={networkImg}
                       alt="Tailor-made Network Cluster" 
                       className="relative z-10 w-full max-w-sm h-auto drop-shadow-2xl animate-float"
                   />
              </div>
              <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                        Tailor-made <span className="text-cyan-500">Network</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Our infrastructure isn't just a set of servers; it's a meticulously designed cluster optimized for Solana's unique architecture. 
                        Every connection is tuned for minimal latency and maximum throughput.
                    </p>
                  </div>
                  
                  <ul className="space-y-6 max-w-md mx-auto lg:mx-0 text-left">
                      <li className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#050A14] border border-slate-200 dark:border-white/5 shadow-sm">
                          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-600 dark:text-cyan-400 shrink-0"><Zap className="w-5 h-5"/></div>
                          <div>
                             <span className="block text-slate-900 dark:text-white font-bold">Direct validator peering</span>
                             <span className="text-xs text-slate-500 dark:text-gray-400">Lowest possible latency path</span>
                          </div>
                      </li>
                      <li className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#050A14] border border-slate-200 dark:border-white/5 shadow-sm">
                          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-600 dark:text-cyan-400 shrink-0"><Shield className="w-5 h-5"/></div>
                           <div>
                             <span className="block text-slate-900 dark:text-white font-bold">DDoS resilient architecture</span>
                             <span className="text-xs text-slate-500 dark:text-gray-400">Always online availability</span>
                          </div>
                      </li>
                      <li className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#050A14] border border-slate-200 dark:border-white/5 shadow-sm">
                          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-600 dark:text-cyan-400 shrink-0"><Activity className="w-5 h-5"/></div>
                           <div>
                             <span className="block text-slate-900 dark:text-white font-bold">Real-time cluster monitoring</span>
                             <span className="text-xs text-slate-500 dark:text-gray-400">Instant health checks</span>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
      </section>

      {/* 4. COMPREHENSIVE FEATURES */}
      <section className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
          
          <div className="max-w-2xl mx-auto relative z-10">
                {/* Banner Image - Positioned to blend */}
                <div className="rounded-t-3xl overflow-hidden relative z-0 mb-[-20px] opacity-90 mx-4 border border-b-0 border-cyan-400/50">
                    <img 
                        src={bannerP9}
                        alt="P9 Nodes Features Banner" 
                        className="w-full h-auto object-cover"
                    />
                    {/* Light Overlay gradient to blend bottom - Updated Logic for Light/Dark Mode */}
                    <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-slate-100 from-20% via-slate-100/80 via-50% to-transparent dark:from-[#050A14] dark:from-30% dark:via-[#050A14]/90 dark:via-60% dark:to-transparent"></div>
                </div>

                {/* Improved Liquid Glass Card - Divided List */}
                <div className="backdrop-blur-3xl bg-white/40 dark:bg-[#050A14]/40 border border-cyan-400/50 rounded-3xl shadow-2xl overflow-hidden relative z-10">
                    
                    {/* Header */}
                    <div className="p-6 md:p-8 text-center border-b border-cyan-400/20 bg-white/40 dark:bg-white/5 backdrop-blur-md">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Technical Specifications</h3>
                    </div>
                    
                    {/* Glossy sheen overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent pointer-events-none"></div>
                    
                    <div className="flex flex-col w-full divide-y divide-cyan-400/20 dark:divide-cyan-400/20"> 
                        {[
                            { name: "2x Full RPC/gRPC Endpoints", desc: "Access full history and state with minimal latency." },
                            { name: "4x Decoded Shreds Locations", desc: "Global coverage ensuring you get data first." },
                            { name: "300 TPS SendTx Limit", desc: "High throughput for demanding trading bots." },
                            { name: "1500 RPS Monitoring Limit", desc: "Aggressive request limits for real-time tracking." },
                            { name: "Bare Metal Isolation", desc: "No noisy neighbors, guaranteed resources." },
                            { name: "Anti-MEV Protection", desc: "Smart routing to avoid predatory validators." },
                            { name: "Zero-Latency Octopus Routing", desc: "Proprietary networking stack for speed." },
                            { name: "Yellowstone gRPC Support", desc: "Stream account updates in real-time." },
                            { name: "Jito Bundle Support", desc: "Compatible with advanced block building strategies." },
                            { name: "Advanced Analytics Dashboard", desc: "Monitor your node performance in real-time." }
                        ].map((feature, i) => (
                            <div key={i} className="p-5 flex flex-col items-center text-center hover:bg-cyan-50/80 dark:hover:bg-cyan-900/20 transition-colors duration-300 cursor-default group/row">
                                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 group-hover/row:text-cyan-600 dark:group-hover/row:text-cyan-400 transition-colors">{feature.name}</h4>
                                <p className="text-xs md:text-sm text-slate-600 dark:text-gray-400 font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
         </div>
      </section>

      {/* 5. CTA (Buy Now) */}
      <section className="max-w-4xl mx-auto px-6 mb-32 relative z-10 flex justify-center">
        <button 
            onClick={() => window.open('https://magiceden.io/marketplace/p9_nodes', '_blank')}
            className="group relative flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-navy-950 px-10 py-5 font-bold text-lg rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:scale-105 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all duration-300"
        >
            <span className="relative z-10">Buy P9 Node NFT</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
        </button>
      </section>

      {/* 6. FAQ */}
       <section className="max-w-4xl mx-auto px-6 pb-24 relative z-10">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 text-center">FAQs</h3>
            <div className="grid gap-4">
                 <div className="bg-white dark:bg-[#050A14] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 hover:border-blue-400 dark:hover:border-blue-500/30 transition-colors shadow-sm">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3 text-base md:text-lg">
                        <Terminal className="w-5 h-5 text-blue-500" />
                        How do I verify a license before buying?
                    </h4>
                    <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed">
                        It is crucial to check the status of an NFT before purchasing it on a secondary market. Join our Discord and use the <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono text-xs">/checkrenewal</code> command. Input the NFT ID to see if it has an active subscription or if it is frozen/expired.
                    </p>
                 </div>

                 <div className="bg-white dark:bg-[#050A14] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 hover:border-blue-400 dark:hover:border-blue-500/30 transition-colors shadow-sm">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3 text-base md:text-lg">
                        <HelpCircle className="w-5 h-5 text-purple-500" />
                        Can I resell my license?
                    </h4>
                    <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed">
                        Yes. P9 Node Licenses are standard Solana NFTs. You can list them on Tensor or Magic Eden at any time. The new owner will inherit the renewal rights and the ability to access the node infrastructure.
                    </p>
                 </div>

                 <div className="bg-white dark:bg-[#050A14] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 hover:border-blue-400 dark:hover:border-blue-500/30 transition-colors shadow-sm">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3 text-base md:text-lg">
                        <ShoppingCart className="w-5 h-5 text-green-500" />
                        What happens if I don't renew?
                    </h4>
                    <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed">
                        If the monthly fee is not paid, access to the endpoints is automatically suspended. You can reactivate it at any time by paying the renewal fee. There are no penalties for late renewal, but the service will remain inaccessible until paid.
                    </p>
                 </div>
            </div>
       </section>
      
    </div>
  );
};

export default PlansPage;
