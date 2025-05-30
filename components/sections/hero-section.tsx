"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/animation/animated-text";
import FadeIn from "@/components/animation/fade-in";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const rect = container.getBoundingClientRect();

      // Normalize mouse position to -1 to 1
      mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((clientY - rect.top) / rect.height) * 2 - 1;
    };

    const animateBackground = () => {
      if (!container) return;

      // Subtle parallax effect on background
      const moveX = mouseX * 20; // max 20px movement
      const moveY = mouseY * 20; // max 20px movement

      container.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;

      animationFrameId = requestAnimationFrame(animateBackground);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(animateBackground);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-secondary/5 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <FadeIn direction="up" duration={0.8}>
            <h1 className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Mountain West Web Development
            </h1>
          </FadeIn>

          {/* <FadeIn direction="up" duration={0.8}>
            <div className="mb-6 flex justify-center">
              <img
                src="/mw_mountain.png"
                alt="Mountain West Web Development"
                className="h-24 sm:h-28 w-auto"
              />
            </div>
          </FadeIn> */}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <AnimatedText
              text="Create a digital"
              className="block"
              delay={0.1}
            />
            <AnimatedText
              text="experience that"
              className="block"
              delay={0.3}
            />
            <AnimatedText
              text="matters"
              className="block"
              delay={0.5}
            />
          </h1>

          <FadeIn delay={0.8} duration={0.8}>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Web development and creative strategy — built solo, delivered with precision, for brands ready to level up.
            </p>
          </FadeIn>

          <FadeIn delay={1} duration={0.8} className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button size="lg" variant="outline">
              <Link href="#contact">Get Started</Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}