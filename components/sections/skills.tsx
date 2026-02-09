"use client";

import { useMemo } from "react";
import type { Skill } from "@/types/portfolio";
import { groupSkillsByCategory, getCategoryAverages } from "@/lib/portfolio-utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryLabels: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools & DevOps",
  databases: "Databases",
  other: "Other",
};

const chartConfig = {
  value: {
    label: "Proficiency",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function SkillsSection({ skills }: SkillsSectionProps) {
  const grouped = useMemo(() => groupSkillsByCategory(skills), [skills]);
  const radarData = useMemo(() => getCategoryAverages(skills), [skills]);

  return (
    <section id="skills" className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Skills & Technologies
          </h2>
          <div className="mt-2 h-1 w-12 bg-primary rounded-full mx-auto" />
          <p className="mt-4 text-muted-foreground">
            Technologies I work with and my proficiency across different areas
          </p>
        </div>

        {/* Container query wrapper - chart + skills grid side by side on wide containers */}
        <div className="@container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 @3xl:grid-cols-[1fr_1.5fr] gap-8">
            {/* Radar chart */}
            <Card>
              <CardHeader>
                <CardTitle>Proficiency Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[280px] w-full">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Radar
                      name="Proficiency"
                      dataKey="value"
                      stroke="var(--color-value)"
                      fill="var(--color-value)"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Skills by category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TooltipProvider>
                {(Object.entries(grouped) as [string, Skill[]][])
                  .filter(([, items]) => items.length > 0)
                  .map(([category, items]) => (
                    <Card key={category} size="sm">
                      <CardHeader>
                        <CardTitle className="text-sm">
                          {categoryLabels[category] ?? category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {items.map((skill) => (
                            <Tooltip key={skill.name}>
                              <TooltipTrigger asChild>
                                <span>
                                  <Badge
                                    variant="secondary"
                                    className="cursor-default hover:bg-primary/10 transition-colors"
                                  >
                                    {skill.name}
                                  </Badge>
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                Proficiency: {skill.proficiency}%
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
