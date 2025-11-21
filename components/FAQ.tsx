import React, { useState } from 'react';
import { FAQS } from '../constants';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-32 bg-slate-50 dark:bg-navy-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center tracking-tight text-slate-900 dark:text-white">
          FAQs
        </h2>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`transition-all duration-300 overflow-hidden rounded-3xl ${
                openIndex === index 
                  ? 'bg-white dark:bg-navy-900 shadow-lg dark:shadow-[0_0_20px_rgba(59,130,246,0.05)]' 
                  : 'bg-transparent hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-medium text-sm md:text-base transition-colors ${openIndex === index ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-gray-400'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0 ml-4">
                    <Minus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center shrink-0 ml-4">
                    <Plus className="w-4 h-4 text-slate-600 dark:text-gray-600" />
                  </div>
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-600 dark:text-gray-400 text-sm leading-relaxed font-light">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;