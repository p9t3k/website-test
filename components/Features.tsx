
import React, { useRef, useState, MouseEvent } from 'react';
import { FEATURES } from '../constants';
import { Zap, Activity, Database, Server, Network } from 'lucide-react';

const IconMap: Record<string, React.ElementType> = {
  Zap,
  Activity,
  Database,
  Server,
  Octopus: Network 
};

interface FeatureCardProps {
  feature: typeof FEATURES[0];
  className?: string;
}

// Enhanced Stylized Patterns
const CardPattern: React.FC<{ type: string }> = ({ type }) => {
  const commonClasses = "absolute inset-0 w-full h-full pointer-events-none transition-all duration-700 ease-out";

  switch (type) {
    case 'hardware':
      // Pattern: Stylized Server Racks (Light Blue Theme)
      return (
        <svg className={`${commonClasses} text-blue-400 dark:text-blue-500 opacity-[0.12] dark:opacity-[0.1] group-hover:opacity-30`} xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="server-pattern" x="0" y="0" width="40" height="24" patternUnits="userSpaceOnUse">
                <rect x="2" y="2" width="36" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="6" cy="12" r="1" fill="currentColor" />
                <circle cx="10" cy="12" r="1" fill="currentColor" />
                <line x1="18" y1="8" x2="34" y2="8" stroke="currentColor" strokeWidth="0.5" />
                <line x1="18" y1="12" x2="34" y2="12" stroke="currentColor" strokeWidth="0.5" />
                <line x1="18" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="0.5" />
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#server-pattern)" />
        </svg>
      );

    case 'octopus':
       // Pattern: Hub & Spoke Mesh (Purple Theme) - IMPROVED
       return (
        <svg className={`${commonClasses} text-purple-500 dark:text-purple-400 opacity-[0.2] dark:opacity-[0.15] group-hover:opacity-40`} viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4">
               <circle cx="5" cy="5" r="5" fill="currentColor" />
             </marker>
           </defs>
           
           {/* Perspective Plane Grid */}
           <path d="M0 100 L400 100 M0 150 L400 150 M0 200 L400 200 M0 250 L400 250" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
           <path d="M100 0 L50 300 M300 0 L350 300 M200 0 L200 300" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />

           {/* Central Hub (P9 Node) */}
           <g transform="translate(200, 150)">
              <circle r="30" fill="currentColor" opacity="0.1" className="animate-pulse" />
              <circle r="20" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle r="8" fill="currentColor" />
              
              {/* Orbiting Ring */}
              <circle r="50" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite]" />
           </g>

           {/* Satellite Nodes (Validators) & Connections */}
           <g>
              {/* Top Left */}
              <circle cx="80" cy="60" r="4" fill="currentColor" />
              <line x1="80" y1="60" x2="200" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              
              {/* Top Right */}
              <circle cx="320" cy="60" r="4" fill="currentColor" />
              <line x1="320" y1="60" x2="200" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              
              {/* Bottom Left */}
              <circle cx="60" cy="240" r="4" fill="currentColor" />
              <line x1="60" y1="240" x2="200" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              
              {/* Bottom Right */}
              <circle cx="340" cy="240" r="4" fill="currentColor" />
              <line x1="340" y1="240" x2="200" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.4" />
           </g>

           {/* Active Data Packets traveling to Hub */}
           <circle r="3" fill="currentColor">
             <animateMotion dur="1.5s" repeatCount="indefinite" path="M80,60 L200,150" />
           </circle>
           <circle r="3" fill="currentColor">
             <animateMotion dur="2s" repeatCount="indefinite" path="M320,60 L200,150" />
           </circle>
           <circle r="3" fill="currentColor">
             <animateMotion dur="1.8s" repeatCount="indefinite" path="M60,240 L200,150" />
           </circle>
           <circle r="3" fill="currentColor">
             <animateMotion dur="2.2s" repeatCount="indefinite" path="M340,240 L200,150" />
           </circle>
        </svg>
       );

    case 'shreds':
      // Pattern: Chevron Arrows >>> (Cyan Theme)
      return (
        <svg className={`${commonClasses} text-cyan-500 dark:text-cyan-400 opacity-[0.15] dark:opacity-[0.12] group-hover:opacity-40`} xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="chevron-pattern" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
                <g transform="translate(10, 10)">
                    <path d="M0 0 L10 10 L0 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 0 L25 10 L15 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                    <path d="M30 0 L40 10 L30 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                </g>
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#chevron-pattern)" />
        </svg>
      );

    case 'parsing':
      // Pattern: Binary Code (Light Blue Theme)
      return (
        <svg className={`${commonClasses} text-blue-400 dark:text-blue-500 opacity-[0.12] dark:opacity-[0.1] group-hover:opacity-30`} xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="binary-pattern" x="0" y="0" width="100" height="50" patternUnits="userSpaceOnUse">
               <text x="0" y="20" fontSize="14" fontFamily="monospace" fontWeight="bold" fill="currentColor" opacity="0.8">{`{ }`}</text>
               <text x="40" y="20" fontSize="14" fontFamily="monospace" fontWeight="bold" fill="currentColor" opacity="0.4">;</text>
               
               <text x="20" y="45" fontSize="14" fontFamily="monospace" fontWeight="bold" fill="currentColor" opacity="0.5">01</text>
               <text x="60" y="45" fontSize="14" fontFamily="monospace" fontWeight="bold" fill="currentColor" opacity="0.3">JSON</text>
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#binary-pattern)" />
        </svg>
      );

    default:
      return null;
  }
};

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, className = '' }) => {
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

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const maxTilt = 4; 
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setTilt({ x: 0, y: 0 });
  };

  const Icon = IconMap[feature.icon];

  // --- STYLING LOGIC ---
  
  const isOctopus = feature.id === 'octopus'; // Purple
  const isShreds = feature.id === 'shreds'; // Cyan

  let bgClass = "";
  let iconBoxClass = "";
  let textClass = "";
  let highlightColor = ""; // For shadow/border hover

  if (isOctopus) {
    // PURPLE THEME
    bgClass = "bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-navy-900/80 border-purple-200 dark:border-purple-500/30";
    iconBoxClass = "bg-purple-100 dark:bg-purple-500/20 border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400";
    textClass = "text-purple-900 dark:text-purple-100";
    highlightColor = "purple";
  } else if (isShreds) {
    // CYAN THEME
    bgClass = "bg-gradient-to-b from-cyan-50 to-white dark:from-cyan-900/20 dark:to-navy-900/80 border-cyan-200 dark:border-cyan-500/30";
    iconBoxClass = "bg-cyan-100 dark:bg-cyan-500/20 border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400";
    textClass = "text-cyan-900 dark:text-cyan-100";
    highlightColor = "cyan";
  } else {
    // LIGHT BLUE THEME (Hardware & Parsing)
    bgClass = "bg-gradient-to-b from-blue-50 to-white dark:from-navy-900/80 dark:to-blue-950/20 border-blue-200 dark:border-blue-500/30";
    iconBoxClass = "bg-blue-100 dark:bg-blue-500/20 border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400";
    textClass = "text-blue-900 dark:text-blue-100";
    highlightColor = "blue";
  }

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative overflow-hidden rounded-3xl border shadow-lg dark:shadow-2xl group 
        transition-all duration-500 ease-out cursor-default
        hover:-translate-y-2 hover:shadow-2xl 
        ${bgClass} ${className}
        ${highlightColor === 'purple' ? 'hover:shadow-purple-500/20 hover:border-purple-300 dark:hover:border-purple-400/50' : ''}
        ${highlightColor === 'cyan' ? 'hover:shadow-cyan-500/20 hover:border-cyan-300 dark:hover:border-cyan-400/50' : ''}
        ${highlightColor === 'blue' ? 'hover:shadow-blue-500/20 hover:border-blue-300 dark:hover:border-blue-400/50' : ''}
      `}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
      }}
    >
      {/* Internal Glow/Backlight */}
      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
          ${highlightColor === 'purple' ? 'from-purple-500/5 to-transparent' : ''}
          ${highlightColor === 'cyan' ? 'from-cyan-500/5 to-transparent' : ''}
          ${highlightColor === 'blue' ? 'from-blue-500/5 to-transparent' : ''}
      `} />

      {/* Spotlight Border Effect */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${
              highlightColor === 'purple' ? 'rgba(168, 85, 247, 0.25)' : 
              highlightColor === 'cyan' ? 'rgba(6, 182, 212, 0.25)' : 
              'rgba(59, 130, 246, 0.25)'
          }, transparent 40%)`,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1.5px',
        }}
      />

      {/* Specific Stylized Pattern */}
      <CardPattern type={feature.id} />

      {/* Readability Gradient (Darker at bottom) */}
      {/* This ensures text pops even when hovering over busy patterns */}
      <div className={`absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t opacity-100 pointer-events-none
          from-white via-white/80 to-transparent 
          dark:from-[#020408] dark:via-[#020408]/80 dark:to-transparent
          ${highlightColor === 'purple' ? 'dark:from-navy-950' : ''}
          ${highlightColor === 'cyan' ? 'dark:from-navy-950' : ''}
      `} />

      {/* Content */}
      <div className="relative h-full p-8 flex flex-col z-10 pointer-events-none">
        <div className="mb-6">
          <div className={`
            w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-all duration-500
            ${iconBoxClass}
            group-hover:scale-110 group-hover:text-white group-hover:shadow-lg
            ${highlightColor === 'purple' ? 'group-hover:bg-purple-500 group-hover:border-purple-400 group-hover:shadow-purple-500/40' : ''}
            ${highlightColor === 'cyan' ? 'group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-cyan-500/40' : ''}
            ${highlightColor === 'blue' ? 'group-hover:bg-blue-500 group-hover:border-blue-400 group-hover:shadow-blue-500/40' : ''}
          `}>
            <Icon className="w-7 h-7 transition-colors" />
          </div>
        </div>
        
        <div className="mt-auto">
            <h3 className={`text-xl font-bold mb-3 transition-colors ${textClass} group-hover:text-slate-900 dark:group-hover:text-white relative z-20`}>
                {feature.title}
            </h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed font-medium group-hover:text-slate-800 dark:group-hover:text-gray-200 transition-colors relative z-20">
                {feature.description}
            </p>
        </div>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const hardware = FEATURES.find(f => f.id === 'hardware')!;
  const octopus = FEATURES.find(f => f.id === 'octopus')!;
  const shreds = FEATURES.find(f => f.id === 'shreds')!;
  const parsing = FEATURES.find(f => f.id === 'parsing')!;

  return (
    <section id="features" className="py-20 md:py-32 bg-slate-50 dark:bg-navy-950 relative transition-colors duration-300">
      
      {/* Ambient Background Flares - Masked to prevent cutoff */}
      {/* The mask-image ensures the flares fade out before hitting the section boundaries */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-900/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 md:mb-16 gap-8">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">
              Proprietary <span className="text-blue-600 dark:text-blue-500">Infrastructure</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 max-w-xl text-base md:text-lg font-light">
              We don't resell cloud instances. We operate high-performance private metal optimized for heavy RPC calls and sniping.
            </p>
          </div>
          
         {/* Uptime Box */}
          <div className="bg-white/80 dark:bg-navy-950/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] rounded-full px-8 py-4 flex items-center gap-6 w-full md:w-auto justify-between md:justify-center cursor-default hover:border-blue-300 dark:hover:border-blue-500/30 transition-colors group">
             <div className="flex items-center gap-3">
                <div className="bg-green-500/10 p-1.5 rounded-full border border-green-500/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                </div>
                <span className="text-xs text-slate-500 dark:text-gray-300 font-bold tracking-widest uppercase group-hover:text-slate-700 dark:group-hover:text-white transition-colors">Uptime Guarantee</span>
             </div>
             <div className="h-6 w-px bg-slate-200 dark:bg-white/10"></div>
             <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">99.99%</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Row 1 */}
          <FeatureCard 
            feature={hardware} 
            className="md:col-span-2 md:min-h-[340px]" 
          />
          <FeatureCard 
            feature={octopus} 
            className="md:col-span-1 md:min-h-[340px]" 
          />
          
          {/* Row 2 */}
          <FeatureCard 
            feature={shreds} 
            className="md:col-span-1 md:min-h-[300px]" 
          />
          <FeatureCard 
            feature={parsing} 
            className="md:col-span-2 md:min-h-[300px]" 
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
