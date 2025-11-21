
import React from 'react';
import { Server, Zap, Globe } from 'lucide-react';

// --- SVG Flags ---

const FlagDE = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 5 3" className={`${className} rounded-sm shadow-sm inline-block`}>
    <rect width="5" height="3" fill="#000"/>
    <rect width="5" height="2" y="1" fill="#D00"/>
    <rect width="5" height="1" y="2" fill="#FFCE00"/>
  </svg>
);

const FlagUS = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 19 10" className={`${className} rounded-sm shadow-sm inline-block`}>
    <rect width="19" height="10" fill="#bf0a30"/>
    <line y1="1" x2="19" y2="1" stroke="white" strokeWidth="1" />
    <line y1="3" x2="19" y2="3" stroke="white" strokeWidth="1" />
    <line y1="5" x2="19" y2="5" stroke="white" strokeWidth="1" />
    <line y1="7" x2="19" y2="7" stroke="white" strokeWidth="1" />
    <line y1="9" x2="19" y2="9" stroke="white" strokeWidth="1" />
    <rect width="7.6" height="5.4" fill="#002868"/>
  </svg>
);

const FlagNL = ({ className = "w-5 h-3.5" }) => (
    <svg viewBox="0 0 3 2" className={`${className} rounded-sm shadow-sm inline-block`}>
      <rect width="3" height="2" fill="#21468B"/>
      <rect width="3" height="1.33" fill="white"/>
      <rect width="3" height="0.66" fill="#AE1C28"/>
    </svg>
);

const FlagIE = ({ className = "w-5 h-3.5" }) => (
    <svg viewBox="0 0 3 2" className={`${className} rounded-sm shadow-sm inline-block`}>
      <rect width="1" height="2" fill="#169b62"/>
      <rect width="1" height="2" x="1" fill="#ffffff"/>
      <rect width="1" height="2" x="2" fill="#ff883e"/>
    </svg>
);

const FlagSG = ({ className = "w-5 h-3.5" }) => (
    <svg viewBox="0 0 3 2" className={`${className} rounded-sm shadow-sm inline-block`}>
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

// --- Map Data ---

// Adjusted coordinates for the Wikimedia world map projection
// X/Y are percentages from Top/Left
const LOCATIONS = [
    // CORE (Full RPC + gRPC + Shreds)
   { id: 'nyc', x: 25, y: 24, name: 'New York', type: 'core', Flag: FlagUS },
    { id: 'fra', x: 46, y: 27, name: 'Frankfurt', type: 'core', Flag: FlagDE },
    
    // EDGE (Shreds Only)
    { id: 'slc', x: 14, y: 27, name: 'Salt Lake City', type: 'edge', Flag: FlagUS },
    { id: 'dub', x: 43, y: 21, name: 'Dublin', type: 'edge', Flag: FlagIE },
    { id: 'ams', x: 47, y: 22, name: 'Amsterdam', type: 'edge', Flag: FlagNL },
    { id: 'sgp', x: 78, y: 58, name: 'Singapore', type: 'edge', Flag: FlagSG },
];

const LocationDot: React.FC<{ 
    x: number; 
    y: number; 
    label: string; 
    type: string;
    Flag: React.FC<{ className?: string }>;
}> = ({ x, y, label, type, Flag }) => {
    const isCore = type === 'core';
    // Core: Blue (Full Endpoint), Edge: Cyan (Shreds)
    const mainColor = isCore ? 'bg-blue-500' : 'bg-cyan-400';
    const ringColor = isCore ? 'border-blue-500' : 'border-cyan-400';
    const textColor = isCore ? 'text-blue-400' : 'text-cyan-400';

    // Random delay for the pulse to make them look less synchronized
    const pulseDelay = React.useMemo(() => `${Math.random() * 2}s`, []);

    return (
        <div 
            className="absolute group z-20" 
            style={{ top: `${y}%`, left: `${x}%` }}
        >
            <div className="relative flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2">
                {/* Interactive Area */}
                <div className="w-8 h-8 flex items-center justify-center cursor-crosshair">
                    {/* Pulse Animation - Continuous Pop-up Effect */}
                    <div 
                        className={`absolute w-full h-full rounded-full border ${ringColor} opacity-40 animate-ping`}
                        style={{ animationDuration: '3s', animationDelay: pulseDelay }}
                    ></div>
                    
                    {/* Core Glow */}
                    <div className={`absolute w-3 h-3 rounded-full ${mainColor} blur-[4px] opacity-60 ${isCore ? 'animate-pulse' : ''}`}></div>

                    {/* The Dot */}
                    <div className={`w-2.5 h-2.5 rounded-full ${mainColor} shadow-lg relative z-10 ring-2 ring-black/50 transition-transform duration-300 group-hover:scale-125`}></div>
                </div>
                
                {/* Label - Hover Only */}
                <div className={`absolute top-6 whitespace-nowrap transition-all duration-300 z-30 pointer-events-none flex flex-col items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0`}>
                    <div className={`bg-black/90 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg shadow-2xl flex items-center gap-2`}>
                        <Flag className="w-4 h-3 shadow-sm" />
                        <span className={`text-xs font-bold tracking-wide uppercase ${textColor}`}>
                            {label}
                        </span>
                    </div>
                    {/* Connecting line for tooltip */}
                    <div className="h-2 w-px bg-gradient-to-b from-transparent to-white/20 absolute -top-2"></div>
                </div>
            </div>
        </div>
    );
};

// A component to draw a beaming curve
const DataBeam = ({ d, color = "#3B82F6", speed = "6s", reverse = false, delay = "0s" }: { d: string, color?: string, speed?: string, reverse?: boolean, delay?: string }) => {
    return (
        <>
            {/* Base faint wire path */}
            <path 
                d={d} 
                fill="none" 
                stroke={color} 
                strokeWidth="0.3" 
                opacity="0.15" 
            />
            {/* Moving Packet - Thinner & Sharper & Slower */}
            <path 
                d={d} 
                fill="none" 
                stroke={color} 
                strokeWidth="0.5" 
                strokeLinecap="round"
                filter="url(#glow)"
                strokeDasharray="20 100"
            >
                <animate 
                    attributeName="stroke-dashoffset" 
                    from={reverse ? "-120" : "120"} 
                    to={reverse ? "0" : "0"} 
                    dur={speed} 
                    begin={delay}
                    repeatCount="indefinite" 
                />
                <animate 
                    attributeName="opacity" 
                    values="0;1;1;0" 
                    keyTimes="0;0.1;0.9;1"
                    dur={speed}
                    begin={delay}
                    repeatCount="indefinite" 
                />
            </path>
        </>
    );
};

const ConnectionArcs: React.FC = () => {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    {/* Reduced blur for sharper beam */}
                    <feGaussianBlur stdDeviation="0.4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* --- BACKBONE: NYC <-> FRA --- */}
            {/* NYC (25, 24) <-> FRA (46, 27) */}
            <DataBeam d="M 25 24 Q 35 15 46 27" color="#3B82F6" speed="8s" />
            <DataBeam d="M 25 24 Q 35 15 46 27" color="#60A5FA" speed="9s" delay="2s" reverse />

            {/* --- SPOKES FROM NYC --- */}
            {/* NYC (25, 24) -> SLC (14, 27) */}
            <DataBeam d="M 25 24 Q 19.5 20 14 27" color="#22D3EE" speed="8s" />
            <DataBeam d="M 25 24 Q 19.5 20 14 27" color="#22D3EE" speed="8s" delay="0.5s" reverse/>
            
            {/* --- SPOKES FROM FRA --- */}
            {/* FRA (46, 27) -> DUB (43, 21) */}
            <DataBeam d="M 46 27 Q 43 25 43 21" color="#22D3EE" speed="5s" delay="0.5s" />
            
            {/* FRA (46, 27) -> AMS (47, 22) */}
            <DataBeam d="M 46 27 Q 48 26 47 22" color="#22D3EE" speed="5s" delay="0.5s" />
            
            {/* FRA (46, 27) -> SGP (78, 58) */}
            <DataBeam d="M 46 27 Q 62 30 78 58" color="#22D3EE" speed="5s" delay="0.2s" />
            <DataBeam d="M 46 27 Q 62 30 78 58" color="#22D3EE" speed="9s" delay="2s" reverse />
        </svg>
    )
}

const GlobalNetwork: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-slate-50 dark:bg-navy-950 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Information (2/5 width) */}
            <div className="space-y-10 order-2 lg:order-1 lg:col-span-2">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 mb-4">
                        <Globe className="w-3 h-3" />
                        P9 NODES ENDPOINTS
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        Global <span className="text-blue-600 dark:text-blue-500">Infrastructure</span>
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 text-base leading-relaxed font-light max-w-lg">
                        Private infrastructure deployed strategically where stake is concentrated and latency is key. We don't rely on public clouds; we own the metal.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                    {/* Full Endpoint Definitions */}
                    <div className="space-y-4">
                        <div className="border-l-2 border-blue-500 pl-4">
                             <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Server className="w-4 h-4 text-blue-500" />
                                Full Endpoints
                            </h3>
                            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-mono uppercase tracking-wider mt-1">RPC + gRPC + Shreds</p>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex items-center justify-between bg-white dark:bg-navy-900/50 px-4 py-3 rounded-lg border border-slate-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors shadow-sm">
                                <span className="text-sm font-medium text-slate-700 dark:text-gray-200">Frankfurt</span>
                                <FlagDE />
                            </div>
                            <div className="flex items-center justify-between bg-white dark:bg-navy-900/50 px-4 py-3 rounded-lg border border-slate-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors shadow-sm">
                                <span className="text-sm font-medium text-slate-700 dark:text-gray-200">New York</span>
                                <FlagUS />
                            </div>
                        </div>
                    </div>

                    {/* Shreds List */}
                    <div className="space-y-4">
                         <div className="border-l-2 border-cyan-400 pl-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                Decoded Shreds
                            </h3>
                            <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono uppercase tracking-wider mt-1">Turbine Protocol</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between bg-white dark:bg-navy-900/50 px-4 py-3 rounded-lg border border-slate-200 dark:border-white/5 hover:border-cyan-300 dark:hover:border-cyan-400/30 transition-colors shadow-sm">
                                <span className="text-sm font-medium text-slate-700 dark:text-gray-200">Amsterdam</span>
                                <FlagNL />
                            </div>
                            <div className="flex items-center justify-between bg-white dark:bg-navy-900/50 px-4 py-3 rounded-lg border border-slate-200 dark:border-white/5 hover:border-cyan-300 dark:hover:border-cyan-400/30 transition-colors shadow-sm">
                                <span className="text-sm font-medium text-slate-700 dark:text-gray-200">Dublin</span>
                                <FlagIE />
                            </div>
                             <div className="flex items-center justify-between bg-white dark:bg-navy-900/50 px-4 py-3 rounded-lg border border-slate-200 dark:border-white/5 hover:border-cyan-300 dark:hover:border-cyan-400/30 transition-colors shadow-sm">
                                <span className="text-sm font-medium text-slate-700 dark:text-gray-200">Salt Lake City</span>
                                <FlagUS />
                            </div>
                             <div className="flex items-center justify-between bg-white dark:bg-navy-900/50 px-4 py-3 rounded-lg border border-slate-200 dark:border-white/5 hover:border-cyan-300 dark:hover:border-cyan-400/30 transition-colors shadow-sm">
                                <span className="text-sm font-medium text-slate-700 dark:text-gray-200">Singapore</span>
                                <FlagSG />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Map (3/5 width) */}
            <div className="order-1 lg:order-2 lg:col-span-3 flex items-center justify-center w-full">
                 <div className="relative w-full select-none pointer-events-none">
                    {/* Map Image Layer - Simplified Dark Mode Logic */}
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a0/World_map_with_points.svg" 
                        alt="Global Network Map" 
                        className="w-full h-auto object-contain opacity-50 dark:opacity-60 dark:invert transition-all duration-500 relative z-0" 
                    />
                    
                    {/* Animated Connection Arcs Layer */}
                    <ConnectionArcs />
                    
                    {/* Locations Layer (Pointer events re-enabled for interaction) */}
                    <div className="absolute inset-0 pointer-events-auto">
                        {LOCATIONS.map((loc) => (
                            <LocationDot 
                                key={loc.id}
                                x={loc.x} 
                                y={loc.y} 
                                label={loc.name} 
                                type={loc.type}
                                Flag={loc.Flag}
                            />
                        ))}
                    </div>
                 </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalNetwork;
