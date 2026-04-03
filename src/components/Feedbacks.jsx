import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  isActive,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      initial={{ opacity: 0, x: 100 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        x: isActive ? 0 : 50,
        scale: isActive ? 1 : 0.95
      }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`bg-tertiary p-5 rounded-2xl xs:w-[320px] w-full h-full flex flex-col justify-between shadow-card hover:-translate-y-1 transition-all duration-300 ${isActive ? 'ring-2 ring-violet-600/20' : ''}`}
      role="article"
      itemScope
      itemType="http://schema.org/Review"
    >
      <div>
        <div className="flex items-center mb-4">
          <span className="text-violet-400 text-4xl font-serif">"</span>
          <div className="ml-2 flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
        </div>
        
        <blockquote className="text-white text-lg leading-relaxed mb-6" itemProp="reviewBody">
          {testimonial}
        </blockquote>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt={`Photo of ${name}`}
            className="w-12 h-12 rounded-full object-cover border-2 border-black-200"
            itemProp="image"
          />
          <div>
            <div className="text-white font-semibold" itemProp="author" itemScope itemType="http://schema.org/Person">
              <span itemProp="name">{name}</span>
            </div>
            <div className="text-secondary text-sm" itemProp="publisher" itemScope itemType="http://schema.org/Organization">
              <span itemProp="name">{designation}</span> at <span itemProp="name">{company}</span>
            </div>
          </div>
        </div>
      </div>
      
      <meta itemProp="datePublished" content="2024-01-01" />
    </motion.div>
  );
};

const Feedbacks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [screenSize, setScreenSize] = useState('lg');
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);
  
  // Auto-scroll interval
  const AUTO_SCROLL_INTERVAL = 5000; // 5 seconds
  
  // Minimum swipe distance
  const minSwipeDistance = 50;
  
  // Number of cards to display at once based on screen size
  const getCardsPerPage = () => {
    switch(screenSize) {
      case 'lg': return 3;
      case 'md': return 2;
      case 'sm': return 1;
      default: return 1;
    }
  };
  
  const CARDS_PER_PAGE = getCardsPerPage();
  
  // Calculate the maximum starting index for the carousel
  const maxStartIndex = Math.max(0, testimonials.length - CARDS_PER_PAGE);
  
  // Update screen size on mount and resize
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setScreenSize('lg');
      else if (width >= 768) setScreenSize('md');
      else setScreenSize('sm');
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);
  
  // Reset current index when screen size changes
  useEffect(() => {
    if (currentIndex > maxStartIndex) {
      setCurrentIndex(0);
    }
  }, [screenSize, currentIndex, maxStartIndex]);

  // Intersection Observer for performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (isVisible && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          // If we're at the end, loop back to the beginning
          if (prevIndex >= maxStartIndex) {
            return 0;
          }
          return prevIndex + 1;
        });
      }, AUTO_SCROLL_INTERVAL);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, isPaused, maxStartIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isVisible) return;
      
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? maxStartIndex : prevIndex - 1
        );
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= maxStartIndex) {
            return 0;
          }
          return prevIndex + 1;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, maxStartIndex]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= maxStartIndex) {
          return 0;
        }
        return prevIndex + 1;
      });
    }
    if (isRightSwipe) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? maxStartIndex : prevIndex - 1
      );
    }
  };

  // Manual navigation functions
  const goToTestimonial = useCallback((index) => {
    // Ensure we don't go beyond the maximum start index
    if (index <= maxStartIndex) {
      setCurrentIndex(index);
    }
  }, [maxStartIndex]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxStartIndex : prevIndex - 1
    );
  }, [maxStartIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxStartIndex) {
        return 0;
      }
      return prevIndex + 1;
    });
  }, [maxStartIndex]);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>Client feedback</p>
        <h2 id="testimonials-heading" className={`${styles.sectionHeadText} text-center`}>
          Testimonials.
        </h2>
      </motion.div>

      <div
        className={`mt-20 flex flex-col ${styles.paddingX}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        ref={sectionRef}
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
          <AnimatePresence mode="wait">
            {testimonials.slice(currentIndex, currentIndex + CARDS_PER_PAGE).map((testimonial, index) => (
              <FeedbackCard
                key={`${currentIndex}-${index}`}
                index={currentIndex + index}
                {...testimonial}
                isActive={true}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Hidden navigation buttons for keyboard accessibility */}
        <button
          onClick={goToPrevious}
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-1/2 focus:-translate-y-1/2 bg-violet-gradient text-white p-3 rounded-full z-10"
          aria-label="Previous testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-1/2 focus:-translate-y-1/2 bg-violet-gradient text-white p-3 rounded-full z-10"
          aria-label="Next testimonial"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress indicators */}
        <div className="w-full flex justify-center items-center space-x-2 mt-8">
          {Array.from({ length: maxStartIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-violet-600'
                  : 'w-2 h-2 bg-black-200 hover:bg-black-100'
              }`}
              aria-label={`Go to testimonial set ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Auto-scroll progress bar */}
        <div className="w-full mt-4 max-w-md mx-auto">
          <div className="h-1 bg-black-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-violet-600"
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "0%" : "100%" }}
              transition={{
                duration: AUTO_SCROLL_INTERVAL / 1000,
                ease: "linear",
                repeat: isVisible && !isPaused ? Infinity : 0,
                repeatType: "loop"
              }}
            />
          </div>
        </div>

        {/* Instructions for screen readers */}
        <div className="sr-only">
          <p>Testimonials carousel showing 3 cards at a time. Use left and right arrow keys to navigate. Auto-advances every 5 seconds.</p>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Feedbacks, "");
