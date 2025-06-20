"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { testimonials, type Testimonial } from "@/lib/testimonials-data";

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  }, []);

  const goToTestimonial = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, nextTestimonial]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
      />
    ));
  };

  // Get visible testimonials (current, previous, and next)
  const getVisibleTestimonials = () => {
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const next = (currentIndex + 1) % testimonials.length;
    return [prev, currentIndex, next];
  };

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hear from students, teachers, and parents who have experienced the
            transformative power of LearnFun SL
          </p>
        </motion.div>

        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div className="relative h-64 sm:h-56">
              <AnimatePresence initial={false} mode="popLayout">
                {getVisibleTestimonials().map((index, i) => {
                  const testimonial = testimonials[index];
                  const position = i - 1; // -1 = left, 0 = center, 1 = right

                  return (
                    <motion.div
                      key={testimonial.id}
                      initial={{
                        opacity: 0,
                        x: position > 0 ? 300 : position < 0 ? -300 : 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: position === 0 ? 1 : 0.5,
                        x: position * 300,
                        scale: position === 0 ? 1 : 0.9,
                        zIndex: position === 0 ? 10 : 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: position < 0 ? -300 : position > 0 ? 300 : 0,
                        scale: 0.8,
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-0 left-0 right-0 mx-auto w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                      style={{
                        transformOrigin: "center",
                        pointerEvents: position === 0 ? "auto" : "none",
                      }}
                    >
                      <div className="flex items-start">
                        {/* Quote Icon */}
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                            <Quote className="w-5 h-5 text-white" />
                          </div>
                        </div>

                        <div className="flex-1">
                          {/* Rating */}
                          <div className="flex mb-2">
                            {renderStars(testimonial.rating)}
                          </div>

                          {/* Testimonial Text */}
                          <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic text-sm sm:text-base leading-relaxed">
                            &quot;{testimonial.text}&quot;
                          </blockquote>

                          {/* Author Info */}
                          <div className="flex items-center">
                            <div className="mr-3 w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 font-semibold text-sm">
                              {testimonial.author.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                                {testimonial.author}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {testimonial.title}, {testimonial.affiliation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  index === currentIndex
                    ? "bg-blue-600 dark:bg-blue-400 w-6"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              5,000+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Happy Students
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              4.9/5
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Average Rating
            </div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              95%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Success Rate
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
