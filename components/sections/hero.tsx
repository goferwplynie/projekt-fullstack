"use client";

import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/portfolio-utils";
import type { PersonalInfo } from "@/types/portfolio";
import { IconArrowDown, IconMail } from "@tabler/icons-react";

interface HeroSectionProps {
  personal: PersonalInfo;
}

export function HeroSection({ personal }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Greeting */}
          <p className="text-sm sm:text-base text-muted-foreground font-medium tracking-wider uppercase animate-fade-in-up">
            Hello, I&apos;m
          </p>

          {/* Name */}
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight animate-fade-in-up animation-delay-100">
            {personal.name}
          </h1>

          {/* Title */}
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-primary font-semibold animate-fade-in-up animation-delay-200">
            {personal.title}
          </p>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-in-up animation-delay-300">
            {personal.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="group"
            >
              <IconMail className="size-4 mr-2 group-hover:scale-110 transition-transform" />
              Get in Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce focus:outline-none"
        aria-label="Scroll to about"
      >
        <IconArrowDown className="size-6" />
      </button>
    </section>
  );
}
