import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const DiscordLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 127.14 96.36" className={className} fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.09,105.09,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c1.24-18.87-2.95-37.64-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ onNavigate, isDark, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTechMobileOpen, setIsTechMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      if (currentScrollY > 50) {
        setIsCompact(true);
      } else if (currentScrollY < 20) {
        setIsCompact(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    setIsTechMobileOpen(false);
  };

  const handleDiscordClick = () => {
      window.open('https://discord.gg/p9nodes', '_blank');
  };

  const transitionClass = "transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]";

  // Calculate positions to keep elements inline
  const navTop = isVisible ? (isCompact ? 'top-4' : 'top-6') : '-translate-y-32';
  
  return (
    <>
      <nav 
        className={`fixed left-0 right-0 z-40 mx-auto flex justify-center ${transitionClass} ${navTop}`}
      >
        <div 
            className={`
                flex items-center justify-between
                ${transitionClass} relative
                h-16 md:h-20
                /* Liquid Glass Effect */
                bg-white/70 dark:bg-[#050A14]/70
                backdrop-blur-2xl
                backdrop-saturate-150
                border border-white/40 dark:border-white/10
                shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                rounded-full
                /* Adjusted Padding: px-6 in compact mode prevents logo from hitting the edge */
                ${isCompact 
                  ? 'w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] max-w-3xl px-6 gap-3' 
                  : 'w-[95%] md:w-[96%] lg:w-[94%] xl:w-[90%] max-w-5xl px-4 md:px-6 lg:px-8 gap-2 md:gap-4 lg:gap-8'
                }
            `}
        >
          
          <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => handleNavClick('hero')}>
            <img 
              src="https://media.discordapp.net/attachments/688452602031112278/1441165958168182875/p9_logo.png?ex=692176a3&is=69202523&hm=45f4bb2dfefac4f5a403a092c8b3028f44af5582535c9cb586f866f1ef708bc3&=&format=webp&quality=lossless&width=2000&height=2000" 
              alt="P9 Nodes Logo" 
              className={`${transitionClass} h-8 md:h-10 w-auto object-contain ${!isDark ? 'invert' : ''}`}
            />
            
            <div 
                className={`
                    overflow-hidden ${transitionClass}
                    /* Hide text earlier on tablet compact mode to save space */
                    ${isCompact ? 'w-0 opacity-0 hidden xl:block' : 'w-[80px] md:w-[100px] opacity-100'}
                `}
            >
                <span className="font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap text-base md:text-xl block">
                 P9 Nodes
                </span>
            </div>
          </div>

          <div className={`hidden md:flex items-center font-medium text-sm md:text-base text-slate-600 dark:text-gray-300 h-full ${transitionClass} ${isCompact ? 'gap-4 lg:gap-6' : 'gap-4 md:gap-6 lg:gap-8'}`}>
            <button onClick={() => onNavigate('features')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</button>
            
            <div className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors h-full py-2">
                    Technology
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform translate-y-2 group-hover:translate-y-0">
                     <div className="bg-white/80 dark:bg-navy-950/90 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl rounded-2xl p-2 w-56 overflow-hidden ring-1 ring-black/5">
                        <button onClick={() => handleNavClick('octopus')} className="w-full text-left px-3 py-3 hover:bg-white/60 dark:hover:bg-white/5 rounded-xl text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex flex-col gap-0.5 group/item">
                            <span className="font-bold text-sm text-slate-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400">Octopus Mode</span>
                            <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-wider">Network Layer</span>
                        </button>
                        <button onClick={() => handleNavClick('shreds')} className="w-full text-left px-3 py-3 hover:bg-white/60 dark:hover:bg-white/5 rounded-xl text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex flex-col gap-0.5 group/item">
                            <span className="font-bold text-sm text-slate-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400">Decoded Shreds</span>
                            <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-wider">Data Layer</span>
                        </button>
                     </div>
                </div>
            </div>
            
            <button onClick={() => onNavigate('pricing')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Plans</button>
            <button onClick={() => onNavigate('faq')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</button>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
              
              {/* Desktop Theme Toggle - Moved inside navbar */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle Theme"
              >
                 {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Discord Button - Enhanced Integration */}
              <button 
                onClick={handleDiscordClick}
                className={`
                  relative group flex items-center justify-center overflow-hidden
                  border border-[#5865F2]
                  bg-[#5865F2]/5 dark:bg-[#5865F2]/10
                  text-[#5865F2] dark:text-[#8CA3FF]
                  hover:bg-[#5865F2] hover:text-white dark:hover:text-white
                  font-bold text-xs md:text-sm 
                  ${transitionClass} rounded-full 
                  ${isCompact ? 'w-10 h-10 p-0' : 'px-5 py-2 md:px-6 md:py-2 gap-2'}
                `}
                title="Join Discord"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                
                <div className={`relative z-10 flex items-center justify-center ${isCompact ? 'w-full h-full' : ''}`}>
                   <DiscordLogo className={`${isCompact ? 'w-[20px] h-[20px]' : 'w-4 h-4 md:w-5 md:h-5'} transition-transform duration-300 group-hover:scale-110 fill-current`} />
                </div>
                
                <span className={`relative z-10 ${transitionClass} overflow-hidden whitespace-nowrap ${isCompact ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100 block'}`}>
                    Join Discord
                </span>
              </button>
          </div>

          {/* Mobile Toggle & Menu Button */}
          <div className="flex md:hidden items-center gap-2">
             <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                 {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                className="text-slate-900 dark:text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white/95 dark:bg-navy-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 animate-in fade-in duration-200">
             <button 
                className="absolute top-8 right-8 text-slate-900 dark:text-white p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
            
            <button onClick={() => handleNavClick('features')} className="text-2xl text-slate-700 dark:text-gray-300 hover:text-blue-500 font-medium">Features</button>
            
            <div className="flex flex-col items-center w-full">
                <button 
                    onClick={() => setIsTechMobileOpen(!isTechMobileOpen)} 
                    className="text-2xl text-slate-700 dark:text-gray-300 hover:text-blue-500 font-medium flex items-center gap-2"
                >
                    Technology <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isTechMobileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`flex flex-col items-center gap-4 overflow-hidden transition-all duration-300 ${isTechMobileOpen ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <button onClick={() => handleNavClick('octopus')} className="text-lg text-slate-600 dark:text-gray-400 hover:text-blue-500">Octopus Mode</button>
                    <button onClick={() => handleNavClick('shreds')} className="text-lg text-slate-600 dark:text-gray-400 hover:text-blue-500">Decoded Shreds</button>
                </div>
            </div>

            <button onClick={() => handleNavClick('pricing')} className="text-2xl text-slate-700 dark:text-gray-300 hover:text-blue-500 font-medium">Plans</button>
            <button onClick={() => handleNavClick('faq')} className="text-2xl text-slate-700 dark:text-gray-300 hover:text-blue-500 font-medium">FAQ</button>
            
            {/* Mobile Discord Button - Optimized Size */}
            <button 
                onClick={handleDiscordClick}
                className="flex items-center justify-center gap-2 bg-[#5865F2] text-white px-6 py-3 font-bold text-base rounded-full shadow-[0_0_20px_rgba(88,101,242,0.4)] mt-4 hover:bg-[#4752C4] transition-colors"
            >
                <DiscordLogo className="w-5 h-5" />
                Join Discord
            </button>
        </div>
      )}
    </>
  );
};

export default Navbar;