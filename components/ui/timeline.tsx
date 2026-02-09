"use client";

import * as React from "react";
import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

// ── Compound Component: Timeline ──────────────────────────────────────────────
// Implements the Compound Components pattern with Timeline, TimelineItem,
// TimelineIndicator, TimelineContent, TimelineHeader, TimelineDescription

interface TimelineContextValue {
  orientation: "vertical";
}

const TimelineContext = createContext<TimelineContextValue>({
  orientation: "vertical",
});

// ── Root ──────────────────────────────────────────────────────────────────────

interface TimelineRootProps {
  children: React.ReactNode;
  className?: string;
}

function TimelineRoot({ children, className }: TimelineRootProps) {
  return (
    <TimelineContext.Provider value={{ orientation: "vertical" }}>
      <div className={cn("relative flex flex-col gap-0", className)}>
        {children}
      </div>
    </TimelineContext.Provider>
  );
}

// ── Item ──────────────────────────────────────────────────────────────────────

interface TimelineItemContextValue {
  isLast: boolean;
}

const TimelineItemContext = createContext<TimelineItemContextValue>({
  isLast: false,
});

interface TimelineItemProps {
  children: React.ReactNode;
  className?: string;
  isLast?: boolean;
}

function TimelineItem({ children, className, isLast = false }: TimelineItemProps) {
  useContext(TimelineContext); // ensure used inside Timeline
  return (
    <TimelineItemContext.Provider value={{ isLast }}>
      <div className={cn("relative flex gap-4 pb-8 last:pb-0", className)}>
        {children}
      </div>
    </TimelineItemContext.Provider>
  );
}

// ── Indicator ─────────────────────────────────────────────────────────────────

interface TimelineIndicatorProps {
  children?: React.ReactNode;
  className?: string;
}

function TimelineIndicator({ children, className }: TimelineIndicatorProps) {
  const { isLast } = useContext(TimelineItemContext);
  return (
    <div className="relative flex flex-col items-center">
      <div
        className={cn(
          "size-3 rounded-full bg-primary ring-4 ring-background z-10 shrink-0 mt-1.5",
          className
        )}
      >
        {children}
      </div>
      {!isLast && (
        <div className="w-px flex-1 bg-border" />
      )}
    </div>
  );
}

// ── Content ───────────────────────────────────────────────────────────────────

interface TimelineContentProps {
  children: React.ReactNode;
  className?: string;
}

function TimelineContent({ children, className }: TimelineContentProps) {
  return (
    <div className={cn("flex-1 min-w-0", className)}>
      {children}
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

interface TimelineHeaderProps {
  children: React.ReactNode;
  className?: string;
}

function TimelineHeader({ children, className }: TimelineHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3", className)}>
      {children}
    </div>
  );
}

// ── Description ───────────────────────────────────────────────────────────────

interface TimelineDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

function TimelineDescription({ children, className }: TimelineDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground mt-1", className)}>
      {children}
    </p>
  );
}

// ── Compound export using Object.assign ──────────────────────────────────────
// This creates the Timeline.Item, Timeline.Content, etc. pattern

const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  Indicator: TimelineIndicator,
  Content: TimelineContent,
  Header: TimelineHeader,
  Description: TimelineDescription,
});

// Named exports for use in server components
export {
  Timeline,
  TimelineRoot,
  TimelineItem,
  TimelineIndicator,
  TimelineContent,
  TimelineHeader,
  TimelineDescription,
};
