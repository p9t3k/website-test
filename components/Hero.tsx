import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section id="hero" className="relative pt-32 pb-12 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] lg:min-h-screen flex items-center bg-slate-50 dark:bg-navy-950 transition-colors duration-300">
      {/* Cyber Grid Background - Adapted for modes in CSS */}
      <div className="absolute inset-0 bg-cyber-grid-light dark:bg-cyber-grid animate-grid pointer-events-none opacity-50 dark:opacity-30"></div>
      
      {/* Ambient Glows - Masked to fade out at the bottom */}
      <div className="absolute inset-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}>
        <div className="absolute top-0 left-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-blue-600/10 dark:bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-blue-500/10 dark:bg-blue-900/20 blur-[150px] rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 backdrop-blur-sm mx-auto lg:mx-0 opacity-0 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Operational
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans leading-[1.1] tracking-tight text-slate-900 dark:text-white opacity-0 animate-fade-in-up">
            The best solution on the Solana blockchain
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-gray-400 max-w-lg leading-relaxed font-light mx-auto lg:mx-0 opacity-0 animate-fade-in-up-delay">
            RPC Nodes, gRPC streaming and the fastest shreds. Engineered with <strong className="text-blue-600 dark:text-blue-400 font-medium">Octopus Mode</strong> for increased bandwith and ultra-low latency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start opacity-0 animate-fade-in-up-delay">
            <button 
              onClick={onCtaClick}
              className="group flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-navy-950 px-8 py-4 font-bold text-sm transition-all rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white"
            >
              Buy Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Visual: Solana RPC Topology (Tech/Monochrome Version) */}
        <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center perspective-1000">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent dark:to-white/5 blur-[60px] rounded-full"></div>
            
            {/* Main Network Container */}
            <div className="relative w-full h-full">
                <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                            <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Concentric Rings (Orbitals) - Using currentColor to adapt to text color */}
                    <g className="text-slate-300 dark:text-white/10">
                        <circle cx="250" cy="250" r="100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="animate-[spin_20s_linear_infinite]" />
                        <circle cx="250" cy="250" r="160" fill="none" stroke="currentColor" strokeWidth="1" className="animate-[spin_30s_linear_infinite_reverse] opacity-80" />
                        <circle cx="250" cy="250" r="220" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-[spin_60s_linear_infinite] opacity-60" />
                    </g>
                    
                    {/* Connecting Lines */}
                    <g className="text-slate-400 dark:text-white" stroke="url(#techGradient)" strokeWidth="1.5">
                        <path d="M250 250 L250 90" />
                        <path d="M250 250 L390 170" />
                        <path d="M250 250 L390 330" />
                        <path d="M250 250 L250 410" />
                        <path d="M250 250 L110 330" />
                        <path d="M250 250 L110 170" />
                    </g>

                    {/* Outer Nodes */}
                    <g className="animate-[spin_60s_linear_infinite] origin-center" style={{ transformOrigin: '250px 250px' }}>
                        <circle cx="250" cy="90" r="4" className="fill-slate-900 dark:fill-[#020408] stroke-slate-400 dark:stroke-white" strokeWidth="2" />
                        <circle cx="390" cy="170" r="4" className="fill-slate-900 dark:fill-[#020408] stroke-blue-500" strokeWidth="2" />
                        <circle cx="390" cy="330" r="4" className="fill-slate-900 dark:fill-[#020408] stroke-slate-400 dark:stroke-white" strokeWidth="2" />
                        <circle cx="250" cy="410" r="4" className="fill-slate-900 dark:fill-[#020408] stroke-blue-500" strokeWidth="2" />
                        <circle cx="110" cy="330" r="4" className="fill-slate-900 dark:fill-[#020408] stroke-slate-400 dark:stroke-white" strokeWidth="2" />
                        <circle cx="110" cy="170" r="4" className="fill-slate-900 dark:fill-[#020408] stroke-blue-500" strokeWidth="2" />
                    </g>

                    {/* Data Packets (Pulsing down the lines) - More active */}
                    <circle r="2.5" className="fill-slate-900 dark:fill-white" filter="url(#glow)">
                        <animateMotion dur="1s" repeatCount="indefinite" path="M250,250 L250,90" keyPoints="0;1" keyTimes="0;1" />
                        <animate attributeName="opacity" values="1;0" dur="1s" repeatCount="indefinite" />
                    </circle>
                    <circle r="2" fill="#3B82F6" filter="url(#glow)">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M250,250 L390,170" />
                        <animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle r="2" className="fill-slate-900 dark:fill-white" filter="url(#glow)">
                        <animateMotion dur="1.2s" repeatCount="indefinite" path="M250,250 L110,330" />
                        <animate attributeName="opacity" values="1;0" dur="1.2s" repeatCount="indefinite" />
                    </circle>
                    {/* Additional Reverse Packets for high traffic feel */}
                    <circle r="2" fill="#00F0FF" filter="url(#glow)">
                         <animateMotion dur="2s" repeatCount="indefinite" path="M390,330 L250,250" />
                         <animate attributeName="opacity" values="0;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                     <circle r="2" className="fill-slate-900 dark:fill-white" filter="url(#glow)">
                         <animateMotion dur="0.8s" repeatCount="indefinite" path="M250,250 L250,410" />
                         <animate attributeName="opacity" values="1;0" dur="0.8s" repeatCount="indefinite" />
                    </circle>
                </svg>
                
                {/* Central Content Overlay (Network Globe) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-28 h-28 flex items-center justify-center bg-white/80 dark:bg-navy-950/90 backdrop-blur-xl rounded-full border border-slate-200 dark:border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.15)] dark:shadow-[0_0_50px_rgba(59,130,246,0.3)] z-10 overflow-hidden">
                         {/* Pulsing Core */}
                         <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 animate-pulse-slow rounded-full"></div>
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.4),transparent)] z-0"></div>
                         
                         <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_12s_linear_infinite] opacity-80 z-10">
                            <g className="stroke-slate-400 dark:stroke-white/50" strokeWidth="0.5" fill="none">
                                {/* Longitude lines */}
                                <ellipse cx="50" cy="50" rx="15" ry="48" />
                                <ellipse cx="50" cy="50" rx="30" ry="48" />
                                <ellipse cx="50" cy="50" rx="45" ry="48" />
                                <line x1="50" y1="2" x2="50" y2="98" />
                                {/* Latitude lines */}
                                <path d="M6,50 L94,50" />
                                <path d="M10,30 Q50,35 90,30" />
                                <path d="M10,70 Q50,65 90,70" />
                            </g>
                            {/* Nodes on the globe */}
                            <circle cx="65" cy="30" r="1.5" fill="#3B82F6" />
                            <circle cx="35" cy="70" r="1.5" className="fill-slate-900 dark:fill-white" />
                            <circle cx="50" cy="50" r="2" fill="#3B82F6" className="animate-pulse" />
                         </svg>
                    </div>
                </div>
            </div>
            
            {/* Floating Stats Cards */}
            {/* Slot Landing - Updated with Green details */}
            <div className="absolute top-20 right-0 md:-right-8 bg-white/80 dark:bg-navy-900/80 backdrop-blur border border-slate-200 dark:border-green-500/20 px-5 py-3 rounded-xl shadow-lg dark:shadow-[0_0_30px_rgba(34,197,94,0.1)] animate-float-delayed z-20">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></div>
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <div>
                         <span className="block text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-bold">Slot Landing</span>
                         <span className="text-sm font-mono font-bold text-green-600 dark:text-green-400">0 block</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-24 left-0 md:-left-8 bg-white/80 dark:bg-navy-900/80 backdrop-blur border border-slate-200 dark:border-blue-500/30 px-5 py-3 rounded-xl shadow-xl animate-float z-20">
                <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    <div>
                        <span className="block text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-bold">Latency</span>
                        <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">&lt;1ms</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

     
    </section>
  );
};

export default Hero;