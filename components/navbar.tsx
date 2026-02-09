"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/portfolio-utils";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import type { NavItem, SectionId } from "@/types/portfolio";
import {
  IconSun,
  IconMoon,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

interface NavbarProps {
  navItems: NavItem[];
  name: string;
}

export function Navbar({ navItems, name }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId as SectionId);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Name */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-lg font-bold tracking-tight hover:text-primary transition-colors focus:outline-none focus:text-primary"
          >
            {name}
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.sectionId)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground active:text-primary focus:text-primary focus:outline-none transition-colors rounded-md hover:bg-accent"
              >
                {item.label}
              </button>
            ))}
            <div className="ml-4 flex items-center gap-2">
              <IconSun className="size-4 text-muted-foreground" />
              <Switch checked={isDark} onCheckedChange={toggleTheme} size="sm" />
              <IconMoon className="size-4 text-muted-foreground" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center gap-2">
              <IconSun className="size-3.5 text-muted-foreground" />
              <Switch checked={isDark} onCheckedChange={toggleTheme} size="sm" />
              <IconMoon className="size-3.5 text-muted-foreground" />
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <IconX className="size-5" /> : <IconMenu2 className="size-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu - uses media query via md:hidden */}
      <div
        className={cn(
          "md:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => handleNavClick(item.sectionId)}
              className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground active:text-primary transition-colors rounded-md hover:bg-accent text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
