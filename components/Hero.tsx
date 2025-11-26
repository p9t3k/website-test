
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex flex-col justify-center bg-slate-950 transition-colors duration-300">
      
      {/* Background: Animated Circuit Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Deep Base */}
        <div className="absolute inset-0 bg-[#020408] z-0"></div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-900/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        {/* Pattern SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    {/* Circuit Lines */}
                    <path d="M10 10 L40 10 L40 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
                    <path d="M60 60 L90 60 L90 90" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
                    <path d="M10 90 L10 60 L40 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
                    <path d="M90 10 L90 40 L60 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
                    
                    {/* Connection Dots */}
                    <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-blue-400" />
                    <circle cx="40" cy="40" r="1.5" fill="currentColor" className="text-blue-400" />
                    <circle cx="60" cy="60" r="1.5" fill="currentColor" className="text-blue-400" />
                    <circle cx="90" cy="90" r="1.5" fill="currentColor" className="text-blue-400" />
                </pattern>
                
                {/* Gradient for Pulse */}
                <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                    <stop offset="50%" stopColor="rgba(59, 130, 246, 1)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
            </defs>
            
            {/* Static Grid */}
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            
            {/* Animated Data Lines - Horizontal */}
            <rect x="-100%" y="10" width="100%" height="1" fill="url(#pulse-grad)" className="animate-beam" style={{ animationDuration: '3s' }} />
            <rect x="-100%" y="60" width="100%" height="1" fill="url(#pulse-grad)" className="animate-beam" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <rect x="-100%" y="40" width="100%" height="1" fill="url(#pulse-grad)" className="animate-beam" style={{ animationDuration: '4s', animationDelay: '2s' }} />
             <rect x="-100%" y="90" width="100%" height="1" fill="url(#pulse-grad)" className="animate-beam" style={{ animationDuration: '6s', animationDelay: '0.5s' }} />
        </svg>

         {/* Vertical Animated Lines */}
         <div className="absolute inset-0">
             <div className="absolute left-[20%] top-[-100%] w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-float" style={{ animationDuration: '4s' }}></div>
             <div className="absolute left-[60%] top-[-100%] w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
             <div className="absolute left-[85%] top-[-100%] w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent animate-float" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
         </div>
      </div>
      
      {/* Bottom Fade to blend with Features Section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 dark:from-navy-950 to-transparent z-10 transition-colors duration-300"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* LEFT: Text & CTA */}
            <div className="text-left flex flex-col items-start opacity-0 animate-fade-in-up order-2 lg:order-1">
                
                {/* Operational Badge - MOVED TO TOP */}
                <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold tracking-wider text-blue-400 backdrop-blur-sm">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                    </span>
                    OPERATIONAL
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-sans leading-[1.1] tracking-tight text-white mb-6">
                    The <span className="font-melodrame text-blue-500 italic pr-2">Best</span> solution on the Solana blockchain
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl text-slate-400 leading-relaxed font-light mb-10 max-w-xl">
                    RPC Nodes, gRPC streaming and the fastest shreds. Engineered with <strong className="text-blue-400 font-medium">Octopus Mode</strong> for increased bandwidth and ultra-low latency.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
                    <button 
                        onClick={onCtaClick}
                        className="group relative flex items-center justify-center gap-3 bg-white text-navy-950 px-10 py-4 font-bold text-lg transition-all rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:bg-blue-500 hover:text-white"
                    >
                        Buy Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* RIGHT: Image (Bigger & Floating) */}
            <div className="relative order-1 lg:order-2 flex justify-center items-center h-[300px] md:h-[500px] lg:h-[600px] opacity-0 animate-fade-in-up-delay">
                 {/* Glow behind image */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/20 blur-[100px] rounded-full"></div>
                 
                 <img 
                    src="https://media.discordapp.net/attachments/688452602031112278/1442849009310896189/first_modal.png?ex=6926ed5a&is=69259bda&hm=5e27594322e005cf132f2b9ba4a0831b6bbed9959cf4a12a769ebe7d49651869&=&format=webp&quality=lossless&width=1816&height=1816"
                    alt="P9 Nodes Infrastructure"
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-float lg:scale-125 origin-center"
                />
            </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
