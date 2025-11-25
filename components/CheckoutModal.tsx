import React from 'react';
import { X, ExternalLink, ShoppingCart, Key, Check, RefreshCw } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: any;
}

const TensorLogo = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 400 400" 
    className="w-full h-full fill-current"
  >
    <path d="M200,60 L340,60 L320,120 L230,120 L230,340 L170,340 L170,120 L80,120 L60,60 Z" />
  </svg>
);

const MagicEdenLogo = () => (
  <svg viewBox="0 0 174 105" className="w-full h-full fill-current">
     <path d="M122.81,26.5l10.15,11.93c1.17,1.34,2.19,2.44,2.62,3.07,3.04,3.02,4.74,7.09,4.74,11.34-.28,5.02-3.56,8.43-6.57,12.09l-7.1,8.34-3.71,4.32c-.13.15-.22.33-.25.53s0,.4.09.58c.08.18.22.33.4.44.18.11.38.15.58.14h37.04c5.65,0,12.78,4.76,12.37,11.97,0,3.27-1.34,6.42-3.69,8.74-2.36,2.32-5.55,3.63-8.87,3.64h-58c-3.82,0-14.08.41-16.95-8.34-.61-1.83-.69-3.79-.24-5.67.84-2.77,2.16-5.37,3.9-7.69,2.92-4.32,6.08-8.65,9.19-12.84,4.02-5.49,8.14-10.8,12.19-16.4.14-.18.22-.41.22-.64s-.08-.46-.22-.64l-14.74-17.29c-.09-.13-.22-.22-.37-.29-.14-.07-.29-.11-.46-.11s-.32.04-.46.11-.27.18-.37.29c-3.95,5.25-21.23,28.51-24.91,33.22s-12.76,4.97-17.79,0l-23.05-22.81c-.14-.14-.33-.25-.54-.28-.2-.04-.41-.02-.61.06-.19.08-.35.21-.47.39s-.18.38-.18.58v43.84c.06,3.11-.88,6.16-2.67,8.73-1.79,2.56-4.36,4.51-7.33,5.56-1.9.65-3.92.85-5.91.57-1.99-.28-3.89-1.02-5.52-2.17-1.64-1.14-2.98-2.66-3.9-4.42-.92-1.76-1.41-3.71-1.41-5.69V12.87c.13-2.84,1.17-5.57,2.97-7.8C4.76,2.84,7.22,1.23,10,.47c2.38-.62,4.89-.62,7.27.02,2.38.64,4.55,1.88,6.28,3.62l35.43,34.96c.11.11.24.19.38.24s.29.07.45.06c.15-.01.29-.06.42-.13s.25-.18.33-.29L85.73,4.59c1.17-1.39,2.63-2.52,4.28-3.3,1.65-.78,3.45-1.19,5.29-1.21h65.48c1.79,0,3.56.39,5.19,1.12,1.63.73,3.09,1.8,4.26,3.13,1.18,1.33,2.06,2.9,2.58,4.58.52,1.7.66,3.47.42,5.22-.46,3.04-2.03,5.81-4.41,7.79-2.38,1.99-5.4,3.06-8.52,3.02h-36.67c-.19,0-.37.06-.52.15-.15.09-.28.24-.37.39-.08.16-.13.34-.12.52,0,.18.07.35.18.51h-.01Z"/>
  </svg>
);

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, plan }) => {
  if (!isOpen) return null;

  const handleTensorClick = () => {
    window.open('https://www.tensor.trade/trade/p9nodes', '_blank');
  };

  const handleMagicEdenClick = () => {
    window.open('https://magiceden.io/marketplace/p9_nodes', '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="absolute inset-0 bg-slate-900/80 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#050A14] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 grid grid-cols-1 md:grid-cols-2 my-auto">
        
        {/* COLUMN 1: LICENSE LOGIC */}
        <div className="p-6 md:p-8 bg-slate-50 dark:bg-[#020408] border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/5 flex flex-col justify-center relative overflow-hidden">
            
             {/* Subtle Background Pattern */}
             <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid-modal" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="currentColor" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-modal)" />
            </svg>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        How it works
                    </h3>
                    <button 
                        onClick={onClose}
                        className="md:hidden p-2 -mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-400 dark:text-gray-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="relative flex flex-col gap-8">
                    {/* Timeline Line */}
                    <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-white/10"></div>

                    {/* Step 1 */}
                    <div className="flex gap-6 relative z-10 group">
                         <div className="w-8 h-8 rounded-full bg-white dark:bg-navy-900 border-2 border-blue-500 dark:border-blue-500 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-white shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.3)]">1</div>
                         <div>
                             <p className="text-base font-bold text-slate-900 dark:text-white mb-1">Buy NFT</p>
                             <p className="text-sm text-slate-600 dark:text-gray-400 leading-snug">Purchase a P9 Node from the secondary market (Tensor or Magic Eden).</p>
                         </div>
                    </div>

                    {/* Step 2 */}
                     <div className="flex gap-6 relative z-10 group">
                         <div className="w-8 h-8 rounded-full bg-white dark:bg-navy-900 border-2 border-slate-200 dark:border-white/20 group-hover:border-blue-400 transition-colors flex items-center justify-center shrink-0">
                             <Check className="w-4 h-4 text-slate-400 dark:text-gray-400 group-hover:text-blue-500" />
                         </div>
                         <div>
                             <p className="text-base font-bold text-slate-900 dark:text-white mb-1">Check Status</p>
                             <p className="text-sm text-slate-600 dark:text-gray-400 leading-snug">
                                <span className="text-blue-600 dark:text-blue-400 font-medium">/checkrenewal </span> command on our Discord reveals if the node is active. <span className="text-blue-600 dark:text-blue-400 font-medium">Active nodes work instantly.</span>
                             </p>
                         </div>
                    </div>

                    {/* Step 3 */}
                     <div className="flex gap-6 relative z-10 group">
                         <div className="w-8 h-8 rounded-full bg-white dark:bg-navy-900 border-2 border-slate-200 dark:border-white/20 group-hover:border-blue-400 transition-colors flex items-center justify-center shrink-0">
                             <RefreshCw className="w-4 h-4 text-slate-400 dark:text-gray-400 group-hover:text-blue-500" />
                         </div>
                         <div>
                             <p className="text-base font-bold text-slate-900 dark:text-white mb-1">Activate / Renew</p>
                             <p className="text-sm text-slate-600 dark:text-gray-400 leading-snug">If frozen, pay renewal via our systems to activate access until the next expiration date.</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* COLUMN 2: MARKETPLACE ACTIONS */}
        <div className="p-6 md:p-8 flex flex-col h-full bg-white dark:bg-[#050A14] relative">
             <button 
                onClick={onClose}
                className="hidden md:block absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-400 dark:text-gray-500"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="mb-6 md:mb-8 mt-2">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white">Acquire Access</h3>
                 <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">Select a verified marketplace</p>
            </div>

            <div className="space-y-4 flex-1">
                {/* Tensor Button */}
                <button 
                    onClick={handleTensorClick}
                    className="group w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0A0E17] hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-300"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1a1d1f] text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors shadow-inner shrink-0">
                            <div className="w-6 h-6">
                                <TensorLogo />
                            </div>
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-base">Tensor</div>
                            <div className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-wider">NFT Marketplace</div>
                        </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
                </button>

                {/* Magic Eden Button */}
                <button 
                    onClick={handleMagicEdenClick}
                    className="group w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0A0E17] hover:border-pink-500 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-all duration-300"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1a1d1f] text-white group-hover:text-pink-500 transition-colors shadow-inner shrink-0">
                                <div className="w-6 h-6">
                                <MagicEdenLogo />
                            </div>
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-slate-900 dark:text-white group-hover:text-pink-500 transition-colors text-base">Magic Eden</div>
                            <div className="text-[10px] text-slate-500 dark:text-gray-500 uppercase tracking-wider">NFT Marketplace</div>
                        </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-pink-500 transition-colors shrink-0" />
                </button>
            </div>
            
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5">
                <div className="flex gap-3">
                     <ShoppingCart className="w-5 h-5 text-slate-400 dark:text-gray-500 shrink-0" />
                     <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
                        Verify the NFT status on our discord before purchasing to confirm it is active.
                     </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;