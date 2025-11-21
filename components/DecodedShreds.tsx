
import React, { useRef, useState, MouseEvent } from 'react';
import { Zap, FileCode, Cpu, Layers } from 'lucide-react';

// Background Pattern: Speed Lines
const ShredsPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="speed-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0,40 L40,0" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#speed-grid)" className="text-blue-500" />
    
    {/* Fast Arrows */}
    {[...Array(5)].map((_, i) => (
      <path
        key={i}
        d={`M-20,${20 + i * 60} L20,${i * 60} L60,${20 + i * 60}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-blue-600 dark:text-blue-400 animate-pulse"
        style={{ 
            opacity: 0.3,
            transform: `translate(${i * 30}px, 0)` 
        }}
      />
    ))}
  </svg>
);

// Advanced Card Wrapper with Tilt & Spotlight
const ShredsCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
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

        // Calculate Tilt
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

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900/40 shadow-lg group transition-all duration-300 ease-out hover:border-blue-300 dark:hover:border-white/20 cursor-default ${className}`}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
            }}
        >
             {/* Spotlight Border Effect - Subtle White */}
             <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                    maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1.5px',
                }}
            />
            
            {/* Pattern */}
            <ShredsPattern />

            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
};

const DecodedShreds: React.FC = () => {
  return (
    <section id="shreds" className="py-20 md:py-32 bg-slate-50 dark:bg-navy-950 relative overflow-hidden transition-colors duration-300">
       {/* Ambient Background - Masked to prevent cut */}
       <div className="absolute inset-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
           <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-200/20 dark:bg-blue-900/10 blur-[120px] rounded-full -translate-y-1/2"></div>
       </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex-1 space-y-8">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 mb-6">
                        <Zap className="w-3 h-3" />
                        TURBINE PROTOCOL
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                        Decoded <span className="text-blue-600 dark:text-blue-500">Shreds</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed font-light">
                        Stop waiting for blocks to be built. Access raw data straight from the Turbine protocol. We intercept shreds, decode them instantly, and stream them to you before the rest of the network even sees the block.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Toned down secondary cards */}
                    <div className="bg-white dark:bg-navy-900/30 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center gap-5 hover:bg-slate-50 dark:hover:bg-navy-900/50 hover:border-slate-300 dark:hover:border-white/10 transition-colors shadow-sm cursor-default">
                        <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-xl shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 group-hover:border-blue-200 dark:group-hover:border-blue-500/20 transition-colors">
                            <FileCode className="w-6 h-6 text-slate-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">Zero-Copy Parsing</h4>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-snug">Pre-parsed data structures ready for your bot logic.</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-navy-900/30 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center gap-5 hover:bg-slate-50 dark:hover:bg-navy-900/50 hover:border-slate-300 dark:hover:border-white/10 transition-colors shadow-sm cursor-default">
                        <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-xl shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 group-hover:border-blue-200 dark:group-hover:border-blue-500/20 transition-colors">
                            <Cpu className="w-6 h-6 text-slate-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">Latency Elimination</h4>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-snug">Bypass the ~400ms block building time entirely.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Visuals */}
            <div className="flex-1 w-full">
                <ShredsCard className="w-full min-h-[400px] p-8 flex flex-col justify-between">
                    
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            Global Propagation
                        </h3>
                        <p className="text-slate-500 dark:text-gray-400 text-sm">Speed comparison across network layers.</p>
                    </div>

                    {/* Comparison Visualization */}
                    <div className="space-y-6">
                        
                        {/* P9 Shreds */}
                        <div className="relative group/bar">
                            <div className="flex justify-between text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">
                                <span className="flex items-center gap-2"><Zap className="w-3 h-3 fill-blue-600 dark:fill-blue-400" /> P9 Decoded Shreds</span>
                                <span>12ms</span>
                            </div>
                            <div className="h-14 bg-slate-100 dark:bg-navy-950/50 rounded-xl border border-blue-300 dark:border-blue-500/50 relative overflow-hidden flex items-center px-4 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover/bar:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-shadow duration-500">
                                <div className="absolute inset-0 w-full bg-blue-500/5"></div>
                                
                                {/* Reverted Simple Beam */}
                                <div className="absolute top-0 bottom-0 left-[-50%] w-full h-full bg-gradient-to-r from-transparent via-blue-400/40 to-transparent -skew-x-12 animate-beam blur-md"></div>
                                
                                {/* The Bar Itself */}
                                <div className="w-full h-1.5 bg-slate-200 dark:bg-navy-800 rounded-full overflow-hidden relative z-10">
                                    <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-white w-[98%] shadow-[0_0_15px_#3b82f6]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Standard RPC */}
                        <div className="relative opacity-90 group/bar">
                            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                                <span>Standard gRPC</span>
                                <span>240ms</span>
                            </div>
                            <div className="h-12 bg-slate-100 dark:bg-navy-950/50 rounded-xl border border-slate-200 dark:border-white/20 relative overflow-hidden flex items-center px-4">
                                <div className="w-full h-1.5 bg-slate-200 dark:bg-navy-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-400 dark:bg-gray-400 w-[40%]"></div>
                                </div>
                            </div>
                        </div>

                         {/* Public RPC */}
                         <div className="relative opacity-60 group/bar">
                            <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-gray-500 mb-2 uppercase tracking-wider">
                                <span>Public RPC</span>
                                <span>800ms+</span>
                            </div>
                            <div className="h-12 bg-slate-50 dark:bg-navy-950/50 rounded-xl border border-slate-200 dark:border-white/10 relative overflow-hidden flex items-center px-4">
                                <div className="w-full h-1.5 bg-slate-200 dark:bg-navy-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-400 dark:bg-gray-600 w-[15%]"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </ShredsCard>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DecodedShreds;
