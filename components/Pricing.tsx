
import React, { useState, useEffect, useRef } from 'react';
import { PLANS } from '../constants';
import { Zap, Server, Shield, Activity, ArrowRight, Database, Cpu, Network } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: any) => void;
}

// --- Internal SVG Flags for this component ---
const FlagUS = ({ className = "w-4 h-3" }) => (
  <svg viewBox="0 0 19 10" className={`${className} rounded-[1px] shadow-sm inline-block`}>
    <rect width="19" height="10" fill="#bf0a30"/>
    <line y1="1" x2="19" y2="1" stroke="white" strokeWidth="1" />
    <line y1="3" x2="19" y2="3" stroke="white" strokeWidth="1" />
    <line y1="5" x2="19" y2="5" stroke="white" strokeWidth="1" />
    <line y1="7" x2="19" y2="7" stroke="white" strokeWidth="1" />
    <line y1="9" x2="19" y2="9" stroke="white" strokeWidth="1" />
    <rect width="7.6" height="5.4" fill="#002868"/>
  </svg>
);

const FlagDE = ({ className = "w-4 h-3" }) => (
  <svg viewBox="0 0 5 3" className={`${className} rounded-[1px] shadow-sm inline-block`}>
    <rect width="5" height="3" fill="#000"/>
    <rect width="5" height="2" y="1" fill="#D00"/>
    <rect width="5" height="1" y="2" fill="#FFCE00"/>
  </svg>
);

const FlagNL = ({ className = "w-4 h-3" }) => (
    <svg viewBox="0 0 3 2" className={`${className} rounded-[1px] shadow-sm inline-block`}>
      <rect width="3" height="2" fill="#21468B"/>
      <rect width="3" height="1.33" fill="white"/>
      <rect width="3" height="0.66" fill="#AE1C28"/>
    </svg>
);

const FlagIE = ({ className = "w-4 h-3" }) => (
    <svg viewBox="0 0 3 2" className={`${className} rounded-[1px] shadow-sm inline-block`}>
      <rect width="1" height="2" fill="#169b62"/>
      <rect width="1" height="2" x="1" fill="#ffffff"/>
      <rect width="1" height="2" x="2" fill="#ff883e"/>
    </svg>
);

const FlagSG = ({ className = "w-4 h-3" }) => (
    <svg viewBox="0 0 3 2" className={`${className} rounded-[1px] shadow-sm inline-block`}>
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

const FeatureItem = ({ text, icon: Icon }: { text: string, icon: any }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-navy-900/40 border border-slate-200 dark:border-white/5 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 group/card backdrop-blur-sm hover:bg-blue-50/50 dark:hover:bg-blue-900/10 cursor-default">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 group-hover/card:scale-110 transition-transform shadow-sm border border-blue-100 dark:border-transparent group-hover/card:bg-blue-500 group-hover/card:text-white dark:group-hover/card:bg-blue-500 dark:group-hover/card:text-white">
      <Icon className="w-4 h-4 group-hover/card:animate-pulse" />
    </div>
    <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-gray-300 leading-snug group-hover/card:text-slate-900 dark:group-hover/card:text-white transition-colors flex-1">{text}</span>
  </div>
);

const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const plan = PLANS[0];
  const [highlightStep, setHighlightStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
          setIsHovering(true);
      }
  };

  const handleMouseLeave = () => {
      setIsHovering(false);
  };

  // Specific visual features map
  const CORE_FEATURES = [
    { text: 'Low-Latency Octopus Routing', icon: Network },
    { text: 'MEV-Protected SendTx', icon: Shield },
    { text: 'Yellowstone gRPC & Indexes', icon: Database },
    { text: 'Global Infrastructure', icon: Cpu },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 relative bg-slate-50 dark:bg-navy-950 transition-colors duration-300 overflow-hidden">
      
      {/* Background Decorations - Masked to prevent cuts */}
      <div className="absolute inset-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl mx-auto">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold mb-6 tracking-wider">Limited License Allocation</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">Secure your <span className="text-blue-600 dark:text-blue-500">allocation</span></h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto font-light text-base md:text-lg">
            Access is decentralized. Acquire a P9 Node NFT on the secondary market to initialize your private RPC endpoint.
          </p>
        </div>

        {/* Main Dashboard Card - Compacted Size */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-[#050A14] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col lg:flex-row">
            
            {/* LEFT COLUMN: SYSTEM CONFIGURATION */}
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative p-6 md:p-8 bg-slate-50 dark:bg-[#020408] border-r border-slate-200 dark:border-white/5 w-full lg:w-7/12 overflow-hidden flex flex-col group"
            >
                {/* Spotlight Pattern Effect */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M10 10h40v40h-40z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-700" />
                        <path d="M20 20h20v20h-20z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-700" />
                        <rect x="28" y="28" width="4" height="4" fill="currentColor" className="text-slate-400 dark:text-slate-600" />
                        <path d="M30 10v10M30 40v10M10 30h10M40 30h10" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-700" />
                    </pattern>
                    
                    {/* Base faint pattern */}
                    <rect width="100%" height="100%" fill="url(#circuit)" className="opacity-[0.03] dark:opacity-[0.05]" />
                    
                    {/* Spotlight reveal mask */}
                    <defs>
                         <radialGradient id="spotlightGrad" cx={mousePosition.x} cy={mousePosition.y} r="350" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="white" stopOpacity="1" />
                            <stop offset="1" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                        <mask id="spotlightMask">
                             <rect width="100%" height="100%" fill="url(#spotlightGrad)" />
                        </mask>
                    </defs>
                    
                    {/* Illuminated pattern layer */}
                    <rect 
                        width="100%" 
                        height="100%" 
                        fill="url(#circuit)" 
                        mask="url(#spotlightMask)" 
                        className="text-blue-500 opacity-20 dark:opacity-30 transition-opacity duration-300"
                        style={{ opacity: isHovering ? undefined : 0 }}
                    />
                </svg>

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                            CLUSTER CONFIGURATION
                        </h3>
                    </div>
                    
                    {/* Visual Network Specs - COMPACT LAYOUT */}
                    <div className="mb-8 flex-grow space-y-4">
                        
                        {/* ROW 1: FULL RPC */}
                        <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm backdrop-blur-sm hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.05)] cursor-default">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="p-1 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                                            <Server className="w-3.5 h-3.5" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">Full RPC/gRPC</h4>
                                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white text-[10px] font-bold rounded-full">2x</span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium pl-8">
                                        Bidirectional. Full history & tx submission.
                                    </p>
                                </div>
                            </div>

                            {/* Allocations - Compact & Centered */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="h-11 flex items-center justify-center gap-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg transition-all hover:bg-white dark:hover:bg-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 group/item hover:scale-[1.02] cursor-default">
                                    <FlagDE className="w-5 h-3.5 shadow-sm opacity-80 group-hover/item:opacity-100 transition-opacity" />
                                    <span className="text-sm font-bold text-slate-700 dark:text-white">Frankfurt</span>
                                </div>
                                <div className="h-11 flex items-center justify-center gap-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg transition-all hover:bg-white dark:hover:bg-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 group/item hover:scale-[1.02] cursor-default">
                                    <FlagUS className="w-5 h-3.5 shadow-sm opacity-80 group-hover/item:opacity-100 transition-opacity" />
                                    <span className="text-sm font-bold text-slate-700 dark:text-white">New York</span>
                                </div>
                            </div>
                        </div>

                        {/* ROW 2: SHREDS */}
                        <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm backdrop-blur-sm hover:border-cyan-400/50 dark:hover:border-cyan-500/50 transition-all duration-300 hover:shadow-md dark:hover:shadow-[0_0_15px_rgba(6,182,212,0.05)] cursor-default">
                             {/* Header */}
                             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="p-1 rounded bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                                            <Zap className="w-3.5 h-3.5" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">Decoded Shreds</h4>
                                        <span className="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-600 text-cyan-700 dark:text-white text-[10px] font-bold rounded-full">4x</span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium pl-8">
                                        Inbound-only. Ultra-low latency Turbine stream.
                                    </p>
                                </div>
                            </div>

                            {/* Allocations Grid - Compact & Centered */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <div className="h-10 flex items-center justify-center gap-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg transition-all hover:border-cyan-400/50 hover:bg-white dark:hover:bg-white/10 group/item hover:scale-[1.02] cursor-default">
                                    <FlagNL className="w-4 h-3" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-gray-200">Amsterdam</span>
                                </div>
                                <div className="h-10 flex items-center justify-center gap-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg transition-all hover:border-cyan-400/50 hover:bg-white dark:hover:bg-white/10 group/item hover:scale-[1.02] cursor-default">
                                    <FlagIE className="w-4 h-3" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-gray-200">Dublin</span>
                                </div>
                                <div className="h-10 flex items-center justify-center gap-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg transition-all hover:border-cyan-400/50 hover:bg-white dark:hover:bg-white/10 group/item hover:scale-[1.02] cursor-default">
                                    <FlagUS className="w-4 h-3" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-gray-200">SLC</span>
                                </div>
                                <div className="h-10 flex items-center justify-center gap-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg transition-all hover:border-cyan-400/50 hover:bg-white dark:hover:bg-white/10 group/item hover:scale-[1.02] cursor-default">
                                    <FlagSG className="w-4 h-3" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-gray-200">Singapore</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Core Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-3 mt-auto">
                        {CORE_FEATURES.map((feature, i) => (
                            <FeatureItem key={i} text={feature.text} icon={feature.icon} />
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: PRICING & ACTIONS */}
            <div className="p-6 md:p-8 bg-white dark:bg-[#050A14] w-full lg:w-5/12 flex flex-col">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-200 dark:bg-white/10 rounded-lg">
                        <Cpu className="w-5 h-5 text-slate-700 dark:text-white" />
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                        Acquisition
                    </h3>
                </div>

                {/* Pricing Logic Display - Animated */}
                <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-5 border border-slate-100 dark:border-white/5 mb-6 relative cursor-default">
                    
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

                {/* Specs - SEPARATED CARDS */}
                <div className="space-y-3 mb-8">
                    
                    {/* Card 1: RPC Limits */}
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0A0E17] relative overflow-hidden cursor-default">
                         <div className="flex items-center justify-between mb-2">
                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-2">
                                <Zap className="w-3 h-3" /> RPC Rate limits
                            </div>
                         </div>
                         <div className="flex items-center justify-between">
                             <div>
                                 <span className="text-xs text-slate-400 block">SendTx</span>
                                 <span className="font-mono font-bold text-slate-900 dark:text-white text-base">300 TPS</span>
                             </div>
                             <div className="h-8 w-px bg-slate-200 dark:bg-white/10"></div>
                             <div className="text-right">
                                 <span className="text-xs text-slate-400 block">Monitoring</span>
                                 <span className="font-mono font-bold text-slate-900 dark:text-white text-base">1500 RPS</span>
                             </div>
                         </div>
                    </div>

                    {/* Card 2: Geyser Limits */}
                    <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/20 bg-blue-50/50 dark:bg-blue-500/5 relative overflow-hidden cursor-default">
                         <div className="absolute top-0 right-0 p-2 opacity-10">
                             <Database className="w-10 h-10 text-blue-500" />
                         </div>
                         <div className="flex items-center justify-between mb-2 relative z-10">
                            <div className="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider flex items-center gap-2">
                                <Database className="w-3 h-3" /> Yellowstone Geyser
                            </div>
                         </div>
                         <div className="space-y-1 relative z-10">
                             <div className="flex justify-between items-center">
                                 <span className="text-xs text-slate-500 dark:text-gray-400">Pubkeys monitored</span>
                                 <span className="font-mono font-bold text-blue-700 dark:text-blue-300 text-sm">Max 600</span>
                             </div>
                             <div className="flex justify-between items-center">
                                 <span className="text-xs text-slate-500 dark:text-gray-400">Simultaneous Connections</span>
                                 <span className="font-mono font-bold text-blue-700 dark:text-blue-300 text-sm">Max 3</span>
                             </div>
                         </div>
                    </div>

                </div>

                {/* Single CTA Button */}
                <div className="mt-auto">
                    <button 
                        onClick={() => onSelectPlan(plan)}
                        className="w-full group relative flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-navy-950 px-6 py-4 font-bold text-sm md:text-base transition-all rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                             Acquire Access
                             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
