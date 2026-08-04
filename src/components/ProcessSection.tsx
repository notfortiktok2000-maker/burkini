import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const content = {
  eyebrow: { fr: "Savoir-faire", ar: "كيف نصنع أزياءنا" },
  heading: { fr: "Du tissu à votre porte", ar: "من القماش إلى باب منزلك" },
  subheading: { 
    fr: "Un aperçu de notre processus de création avant que la pièce n'arrive dans notre boutique.", 
    ar: "نظرة سريعة على ما يحدث قبل أن تصل القطعة إلى متجرنا." 
  },
  steps: [
    {
      num: "01",
      title: { fr: "Sélection", ar: "اختيار الأقمشة" },
      desc: { 
        fr: "Nous sélectionnons un crêpe respirant et un jersey doux de première qualité avant même la coupe de la moindre pièce.",
        ar: "نختار أقمشة الكريب المريحة والجيرسي الناعم بعناية فائقة قبل قص أي قطعة."
      }
    },
    {
      num: "02",
      title: { fr: "Prototypage", ar: "التصميم والتجربة" },
      desc: {
        fr: "Chaque design est d'abord cousu comme échantillon et testé sur de vraies morphologies avant d'être approuvé.",
        ar: "تُخاط كل قطعة كعينة أولاً وتُجرب على أجسام حقيقية قبل الموافقة على إنتاجها."
      }
    },
    {
      num: "03",
      title: { fr: "Production", ar: "الإنتاج" },
      desc: {
        fr: "Les modèles approuvés sont produits en petites séries contrôlées, loin de la production de masse.",
        ar: "تنتقل العينات المعتمدة إلى الإنتاج بكميات صغيرة ومدروسة — وليس بكميات ضخمة غير مراقبة."
      }
    },
    {
      num: "04",
      title: { fr: "Lancement", ar: "الإطلاق" },
      desc: {
        fr: "Chaque pièce est contrôlée, photographiée et mise en ligne — ce que vous voyez est exactement ce que vous recevez.",
        ar: "يتم فحص جودة كل قطعة وتصويرها وعرضها — لتصلك القطعة تماماً كما رأيتها."
      }
    }
  ]
};

export function ProcessSection() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Accessibility check: Reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(stepsRef.current, { opacity: 1, y: 0 });
      gsap.set('.animated-line', { scaleX: 1, scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. The connecting line "draws" itself using scale
      const line = gsap.utils.toArray('.animated-line');
      
      gsap.to(line, {
        scaleX: 1,
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 65%",
          scrub: 0.5,
        }
      });

      // 2. Each step card reveals
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        
        const marker = step.querySelector('.process-marker');
        const contentBlock = step.querySelector('.process-content');

        gsap.set(step, { opacity: 0, y: 30 });
        gsap.set(marker, { scale: 0.8 });
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });

        tl.to(step, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0)
          .to(marker, { scale: 1, duration: 0.5, ease: "back.out(1.5)" }, 0.2);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [language]); // Re-run animation if language changes just in case

  return (
    <section ref={sectionRef} className="process-section bg-white py-24 text-[#1D1D1F] border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4 text-gray-400">
            {content.eyebrow[language]}
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-wide mb-6 uppercase">
            {content.heading[language]}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            {content.subheading[language]}
          </p>
        </div>

        <div className="relative">
          {/* Desktop Line (Horizontal) */}
          <div className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[1px] bg-gray-100 z-0">
            <div className="animated-line bg-[#1D1D1F] w-full h-full transform origin-left rtl:origin-right scale-x-0" />
          </div>

          {/* Mobile Line (Vertical) */}
          <div className="block lg:hidden absolute top-[28px] bottom-[28px] left-[27px] rtl:left-auto rtl:right-[27px] w-[1px] bg-gray-100 z-0">
             <div className="animated-line bg-[#1D1D1F] w-full h-full transform origin-top scale-y-0" />
          </div>

          {/* Steps Grid */}
          <div className="relative z-10 flex flex-col lg:flex-row justify-between w-full">
            {content.steps.map((step, i) => {
              return (
                <div 
                  key={i} 
                  ref={el => stepsRef.current[i] = el}
                  className="process-step group flex flex-row lg:flex-col items-start lg:items-center text-left rtl:text-right lg:text-center rtl:lg:text-center w-full lg:w-1/4 mb-12 lg:mb-0 last:mb-0 relative"
                >
                  {/* Marker area */}
                  <div className="relative flex-shrink-0 flex items-center justify-center w-14 h-14 bg-white rounded-full border border-gray-200 group-hover:border-[#1D1D1F] transition-colors duration-500 z-10 mx-0 lg:mx-auto">
                     <span className="process-marker font-mono text-sm tracking-widest text-[#1D1D1F] transition-transform duration-500 group-hover:scale-110">
                        {step.num}
                     </span>
                  </div>

                  {/* Content area */}
                  <div className="process-content ml-8 rtl:mr-8 rtl:ml-0 lg:ml-0 lg:rtl:mr-0 lg:mt-8 flex-1">
                    <h3 className="text-sm font-medium tracking-widest uppercase mb-3 text-[#1D1D1F]">
                      {step.title[language]}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm lg:max-w-[240px] mx-auto">
                      {step.desc[language]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
