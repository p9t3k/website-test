
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const DARK_BG = "https://media.discordapp.net/attachments/688452602031112278/1443325440872808518/Senza_titolo_3.jpeg?ex=6928a910&is=69275790&hm=b2de8b8bce2f053dafd4ce45c9ac46178b8bb19a62a4df12c55a76640f2d4d1e&=&format=webp&width=3152&height=1774";
const LIGHT_BG = "https://media.discordapp.net/attachments/688452602031112278/1443325440487067869/Senza_titolo_4.jpeg?ex=6928a910&is=69275790&hm=6cf36c87d9f1d9951801e614d36c214e273e1677b77244b0ac446f310eefe811&=&format=webp&width=3152&height=1774";

const KEYWORDS = ["Best", "Fastest", "Tailor-Made", "Unstoppable"];

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const [text, setText] = useState(KEYWORDS[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const currentKeyword = KEYWORDS[keywordIndex];
    let timeoutDelay = isDeleting ? 50 : 75;

    if (!isDeleting && text === currentKeyword) {
      timeoutDelay = 2000;
    } else if (isDeleting && text === '') {
      timeoutDelay = 500;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentKeyword) {
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setKeywordIndex((prev) => (prev + 1) % KEYWORDS.length);
      } else {
        const nextText = isDeleting 
          ? currentKeyword.substring(0, text.length - 1) 
          : currentKeyword.substring(0, text.length + 1);
        setText(nextText);
      }
    }, timeoutDelay);

    return () => clearTimeout(timer);
  }, [text, isDeleting, keywordIndex]);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex flex-col justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
         {/* Light Mode Background */}
         <div 
             className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out opacity-100 dark:opacity-0"
             style={{ backgroundImage: `url('${LIGHT_BG}')` }}
         />
         
         {/* Dark Mode Background */}
         <div 
             className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out opacity-0 dark:opacity-100"
             style={{ backgroundImage: `url('${DARK_BG}')` }}
         />

         {/* Overlay for text contrast - Removed for Light Mode, Dark for Dark Mode */}
         <div className="absolute inset-0 bg-transparent dark:bg-black/60 transition-colors duration-300"></div>
      </div>
      
      {/* Bottom Fade to blend with Features Section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 dark:from-navy-950 to-transparent z-10 transition-colors duration-300"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* LEFT: Text & CTA */}
            <div className="text-left flex flex-col items-start opacity-0 animate-fade-in-up">
                
                {/* Operational Badge - Hidden on Mobile */}
                <div className="hidden md:inline-flex mb-6 items-center gap-3 px-4 py-2 rounded-full border border-blue-600/30 dark:border-blue-500/30 bg-blue-600/10 dark:bg-blue-500/10 text-xs font-bold tracking-wider text-blue-700 dark:text-blue-400 backdrop-blur-sm transition-colors duration-300">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 dark:bg-blue-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600 dark:bg-blue-500"></span>
                    </span>
                    OPERATIONAL
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-sans leading-[1.1] tracking-tight text-slate-950 dark:text-white mb-6 transition-colors duration-300 [text-shadow:0_0_80px_rgba(255,255,255,1),0_0_30px_rgba(255,255,255,0.8)] dark:[text-shadow:none]">
                    <span className="block">The <span className="font-melodrame text-blue-700 dark:text-blue-500 italic inline-block">{text}</span>
                    <span className="animate-pulse text-blue-700 dark:text-blue-500 font-light ml-0.5 inline-block align-top">|</span></span>
                    <span className="block">Solution on the</span>
                    <span className="block">Solana</span>
                    <span className="block">Blockchain</span>
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl text-slate-800 dark:text-slate-400 leading-relaxed font-light mb-10 max-w-xl transition-colors duration-300 [text-shadow:0_0_80px_rgba(255,255,255,0.9),0_0_30px_rgba(255,255,255,0.6)] dark:[text-shadow:none]">
                    RPC Nodes, gRPC streaming and the fastest shreds. Engineered with <strong className="text-blue-700 dark:text-blue-400 font-medium">Octopus Mode</strong> for increased bandwidth and ultra-low latency.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
                    <button 
                        onClick={onCtaClick}
                        className="group relative flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-navy-950 px-10 py-4 font-bold text-lg transition-all rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:bg-slate-800 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white"
                    >
                        Buy Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* RIGHT: Image (Bigger & Floating) */}
            <div className="relative flex justify-center items-center h-[300px] md:h-[500px] lg:h-[600px] opacity-0 animate-fade-in-up-delay">
                 
                 <img 
                    src="https://media.discordapp.net/attachments/688452602031112278/1442849009310896189/first_modal.png?ex=69283eda&is=6926ed5a&hm=bac90b2aafef7492bdff4aacf154a4bf71ca57b839d6fdf4b2c7b3c77ba42c7b&=&format=webp&quality=lossless&width=1816&height=1816"
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
