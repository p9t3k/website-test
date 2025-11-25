
import React, { useState } from 'react';
import { FAQS } from '../constants';
import { Plus, Minus, MessageCircle, ArrowRight, Mail } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const FAQCard = ({ faq, index }: { faq: typeof FAQS[0], index: number }) => {
    const isOpen = openIndex === index;
    
    return (
      <div 
        className={`group transition-all duration-500 ease-out overflow-hidden rounded-3xl border ${
          isOpen 
            ? 'bg-white dark:bg-navy-900 shadow-lg dark:shadow-[0_0_20px_rgba(59,130,246,0.05)] border-slate-200 dark:border-white/10' 
            : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-white/5'
        }`}
      >
        <button
          onClick={() => setOpenIndex(isOpen ? null : index)}
          className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
        >
          <span className={`font-medium text-sm md:text-base transition-colors duration-300 ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
            {faq.question}
          </span>
          
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-500 ${
              isOpen 
                ? 'bg-blue-100 dark:bg-blue-500/20 rotate-0' 
                : 'bg-slate-200 dark:bg-white/5 group-hover:rotate-90'
            }`}>
              {isOpen ? (
                <Minus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              ) : (
                <Plus className="w-4 h-4 text-slate-600 dark:text-gray-600" />
              )}
          </div>
        </button>
        
        {/* Smoother Grid Animation for Height + Opacity + Transform */}
        <div 
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className={`p-6 pt-0 text-slate-600 dark:text-gray-400 text-sm leading-relaxed font-light transition-all duration-500 ease-out ${
                isOpen 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 -translate-y-4 scale-[0.98]'
            }`}>
              {faq.answer}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-slate-50 dark:bg-navy-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center tracking-tight text-slate-900 dark:text-white">
          FAQs
        </h2>
        
        <div className="space-y-4">
            {FAQS.map((faq, i) => (
                <FAQCard key={i} faq={faq} index={i} />
            ))}
        </div>

        {/* CTAs */}
        <div className="mt-20 flex flex-col items-center">
            <p className="text-slate-600 dark:text-gray-400 text-lg font-medium mb-8">
                Still have questions?
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
                {/* Discord - Primary & Highly Visible */}
                <a 
                    href="https://discord.gg/p9nodes" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm transition-all shadow-lg hover:shadow-[#5865F2]/40 ring-4 ring-[#5865F2]/20 hover:ring-[#5865F2]/40 group transform hover:-translate-y-0.5"
                >
                    <MessageCircle className="w-5 h-5" />
                    <span>Ask in our Discord</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Email Support - Secondary & Subtle */}
                 <a 
                  href="mailto:admin@tideblock.io" 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-slate-300/50 dark:border-white/10 text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  <Mail className="w-5 h-5 opacity-70" />
                  <span>Contact Support</span>
                </a>
            </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
