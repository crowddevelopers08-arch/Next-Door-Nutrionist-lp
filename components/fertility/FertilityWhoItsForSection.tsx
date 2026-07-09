'use client';

import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { fertilityWhoItsForItems } from '@/components/fertility/fertilityContent';
import { FertilityCtaButton } from '@/components/fertility/FertilityCtaButton';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function FertilityWhoItsForSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % fertilityWhoItsForItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + fertilityWhoItsForItems.length) % fertilityWhoItsForItems.length);
  };

  // For desktop: first 3 in first row, remaining 2 in second row (centered)
  const firstRowItems = fertilityWhoItsForItems.slice(0, 3);
  const secondRowItems = fertilityWhoItsForItems.slice(3);

  return (
    <section id="who-is-this-for" className="relative scroll-mt-24 overflow-hidden bg-[#fffaf7] px-4 py-12 sm:px-6 md:px-[60px] md:py-16 lg:py-20">
      <div className="pointer-events-none absolute -right-24 top-20 h-[360px] w-[360px] rounded-full bg-[#FF92A5]/12 blur-[120px] blob-float" />
      <div className="relative mx-auto max-w-[1280px]">
        <AnimateOnScroll animation="fade-down" className="mx-auto max-w-[900px] text-center">
          <h2 className="font-outfit text-[26px] font-extrabold leading-[1.2] text-[#1A1A1A] sm:text-[30px] md:text-[36px]">
            Who Is This Fertility Clinical Nutrition{' '}
            <span className="premium-shine">Treatment For?</span>
          </h2>
          <p className="mt-4 font-outfit text-[14px] leading-[1.85] text-[#2B2B2B]/75 sm:text-[15px]">
            This core program is designed for those who need deeper clarity on what may be affecting conception, with clinical lab report review, symptom analysis, root-cause nutrition, and lifestyle planning for natural pregnancy or IVF/IUI preparation
          </p>
        </AnimateOnScroll>

        {/* Desktop View */}
        <div className="hidden md:block">
          {/* First Row - 3 cards centered */}
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-[1240px] mx-auto">
            {firstRowItems.map((item, index) => (
              <AnimateOnScroll
                key={item.title}
                animation="fade-up"
                delay={index * 80}
                className="premium-card group overflow-hidden rounded-[20px] border border-[#F0E6DC] bg-white shadow-[0_4px_20px_rgba(11,74,53,0.06)]"
              >
                {/* Image Container - Increased height */}
                <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl bg-[#F4E8DE] md:h-[210px]">
                  <Image
                    src={item.image || `/fertility-card-${index + 1}.jpg`}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0B4A35] to-[#146347] text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(11,74,53,0.25)] ring-2 ring-[#C9A24B]/30">
                      {index + 1}
                    </span>
                    <h3 className="font-outfit text-[17px] font-bold leading-[1.3] text-[#1A1A1A]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 font-outfit text-[14px] leading-[1.7] text-[#2B2B2B]/70">
                    {item.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Second Row - 2 cards centered - Increased width */}
          {secondRowItems.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-6 max-w-[860px] mx-auto">
              {secondRowItems.map((item, index) => {
                const actualIndex = index + 3;
                return (
                  <AnimateOnScroll
                    key={item.title}
                    animation="fade-up"
                    delay={actualIndex * 80}
                    className="premium-card group overflow-hidden rounded-[20px] border border-[#F0E6DC] bg-white shadow-[0_4px_20px_rgba(11,74,53,0.06)]"
                  >
                    {/* Image Container - Increased height */}
                    <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl bg-[#F4E8DE] md:h-[210px]">
                      <Image
                        src={item.image || `/fertility-card-${actualIndex + 1}.jpg`}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0B4A35] to-[#146347] text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(11,74,53,0.25)] ring-2 ring-[#C9A24B]/30">
                          {actualIndex + 1}
                        </span>
                        <h3 className="font-outfit text-[17px] font-bold leading-[1.3] text-[#1A1A1A]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-3 font-outfit text-[14px] leading-[1.7] text-[#2B2B2B]/70">
                        {item.description}
                      </p>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden mt-8 relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {fertilityWhoItsForItems.map((item, index) => (
                <div key={item.title} className="min-w-full px-2">
                  <div className="group rounded-2xl bg-white shadow-[0_4px_20px_rgba(11,74,53,0.06)]">
                    <div className="relative h-[200px] w-full overflow-hidden rounded-t-2xl bg-[#F4E8DE] md:h-[210px]">
                      <Image
                        src={item.image || `/fertility-card-${index + 1}.jpg`}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B4A35]/10 text-[13px] font-bold text-[#0B4A35]">
                          {index + 1}
                        </span>
                        <h3 className="font-outfit text-[17px] font-bold leading-[1.3] text-[#1A1A1A]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-3 font-outfit text-[14px] leading-[1.7] text-[#2B2B2B]/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-[#0B4A35] hover:text-white transition-colors duration-300"
              aria-label="Previous slide"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {fertilityWhoItsForItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'w-8 bg-[#0B4A35]' 
                      : 'w-2 bg-[#0B4A35]/30 hover:bg-[#0B4A35]/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-[#0B4A35] hover:text-white transition-colors duration-300"
              aria-label="Next slide"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <AnimateOnScroll animation="fade-up" delay={240} className="mt-12 flex justify-center">
          <FertilityCtaButton className="btn-primary font-outfit rounded-full bg-[#0B4A35] px-10 py-4 text-[14px] font-semibold text-white shadow-lg sm:text-[15px]">
            Book Your Initial Discovery Call
          </FertilityCtaButton>
        </AnimateOnScroll>
      </div>
    </section>
  );
}