
import React, { useRef, useState, MouseEvent } from 'react';
import { Globe, Shield, Network, Zap, Check, X } from 'lucide-react';

// Simple SVG Flags components
const FlagDE = () => (
  <svg viewBox="0 0 5 3" className="w-5 h-3.5 rounded-sm inline-block mr-2 shadow-sm">
    <rect width="5" height="3" fill="#000"/>
    <rect width="5" height="2" y="1" fill="#D00"/>
    <rect width="5" height="1" y="2" fill="#FFCE00"/>
  </svg>
);
const FlagUS = () => (
  <svg viewBox="0 0 19 10" className="w-5 h-3.5 rounded-sm inline-block mr-2 shadow-sm">
    <rect width="19" height="10" fill="#bf0a30"/>
    <line y1="1" x2="19" y2="1" stroke="white" strokeWidth="1" />
    <line y1="3" x2="19" y2="3" stroke="white" strokeWidth="1" />
    <line y1="5" x2="19" y2="5" stroke="white" strokeWidth="1" />
    <line y1="7" x2="19" y2="7" stroke="white" strokeWidth="1" />
    <line y1="9" x2="19" y2="9" stroke="white" strokeWidth="1" />
    <rect width="7.6" height="5.4" fill="#002868"/>
  </svg>
);
const FlagNL = () => (
    <svg viewBox="0 0 3 2" className="w-5 h-3.5 rounded-sm inline-block mr-2 shadow-sm">
      <rect width="3" height="2" fill="#21468B"/>
      <rect width="3" height="1.33" fill="white"/>
      <rect width="3" height="0.66" fill="#AE1C28"/>
    </svg>
);
const FlagGB = () => (
    <svg viewBox="0 0 60 30" className="w-5 h-3.5 rounded-sm inline-block mr-2 shadow-sm">
      <rect width="60" height="30" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="white" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2"/>
      <path d="M30,0 L30,30 M0,15 L60,15" stroke="white" strokeWidth="10"/>
      <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6"/>
    </svg>
);
const FlagJP = () => (
    <svg viewBox="0 0 3 2" className="w-5 h-3.5 rounded-sm inline-block mr-2 shadow-sm">
      <rect width="3" height="2" fill="white"/>
      <circle cx="1.5" cy="1" r="0.6" fill="#BC002D"/>
    </svg>
);

// Background Pattern Component
const OctopusPattern: React.FC<{ type: string }> = ({ type }) => {
    // Reduced opacity from 0.4 to 0.25 for clearer text
    const baseClass = "absolute inset-0 text-slate-400 dark:text-white opacity-[0.1] dark:opacity-[0.05] transition-all duration-500 ease-out group-hover:opacity-25 group-hover:text-blue-500 dark:group-hover:text-blue-400 pointer-events-none";

    if (type === 'network') {
        // Schematic / Circuit Flow
        return (
            <svg className={baseClass} viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-sm" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.2" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-sm)" />

                <path d="M50,50 L100,50 L120,80 L150,80" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
                <path d="M50,150 L100,150 L120,120 L150,120" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
                
                <rect x="160" y="60" width="80" height="80" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7" />
                <path d="M200,60 L200,140" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <path d="M160,100 L240,100" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <circle cx="200" cy="100" r="8" fill="currentColor" opacity="0.8" />
                <circle cx="200" cy="100" r="20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />

                <path d="M240,100 L350,100" stroke="currentColor" strokeWidth="2.5" />
                <path d="M240,80 L260,80 L270,90" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M240,120 L260,120 L270,110" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
                
                <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.5" />
                <circle cx="50" cy="150" r="2" fill="currentColor" opacity="0.5" />
                <circle cx="350" cy="100" r="3" fill="currentColor" />
            </svg>
        );
    }

    if (type === 'shield') {
        return null;
    }

    if (type === 'radar') {
        // New Pattern: World Dot Grid
        return (
            <svg className={baseClass} viewBox="0 0 400 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.3"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots)" />
                
                <path d="M100,0 Q150,300 100,600" stroke="currentColor" strokeWidth="1" opacity="0.1" />
                <path d="M300,0 Q250,300 300,600" stroke="currentColor" strokeWidth="1" opacity="0.1" />
            </svg>
        );
    }

    return null;
};

// Card Wrapper with Spotlight & Pattern & Tilt
const OctopusCard = ({ children, className = "", patternType }: { children: React.ReactNode, className?: string, patternType: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setPosition({ x, y });
        setOpacity(1);

        // Calculate Tilt logic
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const maxTilt = 5; 
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        setTilt({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setOpacity(0);
        setTilt({ x: 0, y: 0 });
    };

    // Only 'radar' (Global Distribution) keeps the strong blue tint. 
    // Others use a more neutral navy/slate look.
    const isHighlightCard = patternType === 'radar';
    
    // More Electric look for highlight card
    const bgClass = isHighlightCard 
        ? "bg-gradient-to-b from-blue-50 to-white dark:from-navy-900/80 dark:to-blue-950/20 border-blue-200 dark:border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)] dark:shadow-[0_0_50px_rgba(59,130,246,0.15)] hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_60px_rgba(59,130,246,0.25)] hover:border-blue-300 dark:hover:border-blue-400/50" 
        : "bg-white dark:bg-navy-900/30 border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-navy-900/50 hover:border-slate-300 dark:hover:border-white/10";

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-3xl border shadow-lg group transition-all duration-300 ease-out cursor-default ${bgClass} ${className}`}
             style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
            }}
        >
            {/* Spotlight Border Effect - Toned up for highlight */}
            <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${isHighlightCard ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.1)'}, transparent 40%)`,
                    maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1.5px',
                }}
            />

             {/* Electric Ambient Glow for Highlight Card */}
             {isHighlightCard && (
                <div className="absolute inset-0 bg-blue-500/5 animate-pulse-slow pointer-events-none"></div>
            )}

            {/* Pattern */}
            <OctopusPattern type={patternType} />

            {/* Content Wrapper */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};

const OctopusSection: React.FC = () => {
  const [protectionEnabled, setProtectionEnabled] = useState(true);

  return (
    <section id="octopus" className="py-20 md:py-32 bg-slate-50 dark:bg-navy-950 relative overflow-hidden transition-colors duration-300">
      
      {/* Ambient Background - Masked to prevent cut */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
        <div className="w-[70%] h-[70%] bg-blue-200/20 dark:bg-blue-900/10 blur-[120px] rounded-full opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
            Octopus Mode
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 font-light leading-relaxed">
            An architectural framework designed to minimize transactions landing time on the Solana blockchain. 
            Think of it like <span className="text-blue-600 dark:text-blue-500 font-medium">Cloudflare, built on Solana</span>.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12 items-stretch">
          
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
            
            {/* Card 1: Problems Solved - Darker */}
            <OctopusCard patternType="network" className="p-6 md:p-8 flex-1">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">What problems does it solve?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-2 rounded-full group-hover:border-blue-500/30 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-colors">
                        <Network className="w-5 h-5 text-slate-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Network limitations</h4>
                    <p className="text-sm text-slate-600 dark:text-gray-400 font-medium leading-relaxed">
                       Direct connections to TPU leaders suffer from jitter. Octopus Mode shifts latency to our fully controlled internal network.
                    </p>
                 </div>
                 <div className="space-y-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-2 rounded-full group-hover:border-blue-500/30 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-colors">
                        <Zap className="w-5 h-5 text-slate-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Stake efficiency</h4>
                    <p className="text-sm text-slate-600 dark:text-gray-400 font-medium leading-relaxed">
                       Your transaction connects to all stake under P9 Nodes' control simultaneously, regardless of where you send from.
                    </p>
                 </div>
              </div>
            </OctopusCard>

            {/* Card 2: Anti-MEV - Darker unless active */}
            <OctopusCard patternType="shield" className="p-6 md:p-8 flex-1">
                <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:scale-110 duration-700 pointer-events-none">
                    <Shield className="w-32 h-32 text-slate-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white flex items-center gap-3">
                    <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    Anti-MEV blacklist protection <span className="text-xs bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/20 text-slate-600 dark:text-gray-300 px-2 py-0.5 ml-2 rounded-full">Beta</span>
                </h3>
                <p className="text-slate-600 dark:text-gray-400 font-medium mb-8 max-w-xl relative z-10">
                    Defend against sandwich-labeled validators. Our system dynamically skips them or limits exposure based on your selected port configuration.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    <button 
                        onClick={() => setProtectionEnabled(true)}
                        className={`p-4 rounded-xl flex items-center gap-4 relative overflow-hidden transition-all duration-300 border text-left ${
                            protectionEnabled 
                            ? "bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/40 dark:to-navy-900 border-blue-200 dark:border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                            : "bg-slate-50 dark:bg-navy-900/30 border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-navy-900/50 opacity-60 hover:opacity-100"
                        }`}
                    >
                        {protectionEnabled && <div className="absolute inset-0 bg-blue-500/5 animate-pulse-slow"></div>}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                            protectionEnabled ? "bg-blue-100 dark:bg-blue-500/20 border-blue-200 dark:border-blue-500/30" : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10"
                        }`}>
                             <Check className={`w-5 h-5 ${protectionEnabled ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-gray-500"}`} />
                        </div>
                        <div>
                            <span className={`block text-[10px] mb-0.5 tracking-wider font-bold uppercase transition-colors ${
                                protectionEnabled ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-gray-500"
                            }`}>Protection On</span>
                            <span className={`text-sm font-bold transition-colors ${
                                protectionEnabled ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-gray-400"
                            }`}>Skip sandwich validators</span>
                        </div>
                    </button>

                    <button 
                        onClick={() => setProtectionEnabled(false)}
                        className={`p-4 rounded-xl flex items-center gap-4 relative overflow-hidden transition-all duration-300 border text-left ${
                            !protectionEnabled 
                            ? "bg-white dark:bg-navy-800 border-slate-200 dark:border-white/20 shadow-lg" 
                            : "bg-slate-50 dark:bg-navy-900/30 border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-navy-900/50 opacity-60 hover:opacity-100"
                        }`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                            !protectionEnabled ? "bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/20" : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10"
                        }`}>
                             <X className={`w-5 h-5 ${!protectionEnabled ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-gray-500"}`} />
                        </div>
                        <div>
                            <span className={`block text-[10px] mb-0.5 tracking-wider font-bold uppercase transition-colors ${
                                !protectionEnabled ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-gray-500"
                            }`}>Protection Off</span>
                            <span className={`text-sm font-medium transition-colors ${
                                !protectionEnabled ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-gray-400"
                            }`}>Standard routing</span>
                        </div>
                    </button>
                </div>
            </OctopusCard>
          </div>

          {/* Right Column - Global Distribution - KEPT BLUE AS REQUESTED */}
          <OctopusCard patternType="radar" className="h-full flex flex-col justify-between p-6 md:p-8">
             <div>
                 <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Global distribution</h3>
                 <p className="text-slate-600 dark:text-gray-400 text-sm mb-8">
                     Extending the octopus tentacles to where the stake is concentrated.
                 </p>
                 
                 <div className="space-y-8 relative z-10">
                    <div>
                        <h4 className="text-[10px] font-bold text-blue-600 dark:text-blue-500 tracking-widest mb-3 flex items-center gap-2 uppercase">
                           <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full"></span> Europe
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-default rounded-lg flex items-center font-medium shadow-lg"><FlagDE /> Frankfurt</span>
                            <span className="px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-default rounded-lg flex items-center font-medium shadow-lg"><FlagNL /> Amsterdam</span>
                            <span className="px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-default rounded-lg flex items-center font-medium shadow-lg"><FlagGB /> London</span>
                        </div>
                    </div>
                    <div>
                         <h4 className="text-[10px] font-bold text-blue-600 dark:text-blue-500 tracking-widest mb-3 flex items-center gap-2 uppercase">
                           <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full"></span> North America
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-default rounded-lg flex items-center font-medium shadow-lg"><FlagUS /> NYC</span>
                            <span className="px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-default rounded-lg flex items-center font-medium shadow-lg"><FlagUS /> Miami</span>
                            <span className="px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-default rounded-lg flex items-center font-medium shadow-lg"><FlagUS /> Chicago</span>
                            <span className="px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-default rounded-lg flex items-center font-medium shadow-lg"><FlagUS /> LA</span>
                        </div>
                    </div>
                    <div>
                         <h4 className="text-[10px] font-bold text-blue-600 dark:text-blue-500 tracking-widest mb-3 flex items-center gap-2 uppercase">
                           <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-500 rounded-full"></span> Asia
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-default rounded-lg flex items-center font-medium shadow-lg"><FlagJP /> Tokyo</span>
                        </div>
                    </div>
                 </div>
             </div>
             <div className="mt-8 pt-8 border-t border-blue-200 dark:border-blue-500/20 flex items-center gap-3 text-xs text-blue-600 dark:text-blue-400/80 font-mono">
                <Globe className="w-4 h-4" />
                14 SUB-LOCATIONS OPERATIONAL
             </div>
          </OctopusCard>
        </div>
      </div>
    </section>
  );
};

export default OctopusSection;
