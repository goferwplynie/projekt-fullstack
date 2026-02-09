"use client";

import type { ExperienceEntry } from "@/types/portfolio";
import { formatDate, isWorkExperience } from "@/lib/portfolio-utils";
import { Timeline } from "@/components/ui/timeline";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBriefcase, IconSchool } from "@tabler/icons-react";

interface ExperienceSectionProps {
  experience: ExperienceEntry[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const sorted = [...experience].sort((a, b) => {
    const dateA = a.endDate ?? "9999-12";
    const dateB = b.endDate ?? "9999-12";
    return dateB.localeCompare(dateA);
  });

  return (
    <section id="experience" className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Experience
          </h2>
          <div className="mt-2 h-1 w-12 bg-primary rounded-full mx-auto" />
          <p className="mt-4 text-muted-foreground">
            My professional journey and education
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Timeline>
            {sorted.map((entry, index) => (
              <Timeline.Item key={entry.id} isLast={index === sorted.length - 1}>
                <Timeline.Indicator />
                <Timeline.Content>
                  <Card className="hover:ring-primary/20 hover:ring-1 transition-all">
                    <CardContent className="space-y-3">
                      <Timeline.Header>
                        <div className="flex items-center gap-2">
                          {isWorkExperience(entry) ? (
                            <IconBriefcase className="size-4 text-primary shrink-0" />
                          ) : (
                            <IconSchool className="size-4 text-primary shrink-0" />
                          )}
                          <h3 className="font-semibold">{entry.role}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{entry.company}</Badge>
                        </div>
                      </Timeline.Header>

                      <p className="text-xs text-muted-foreground">
                        {formatDate(entry.startDate)} &mdash;{" "}
                        {entry.endDate ? formatDate(entry.endDate) : "Present"}
                      </p>

                      <Timeline.Description>
                        {entry.description}
                      </Timeline.Description>

                      {entry.highlights.length > 0 && (
                        <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                          {entry.highlights.map((highlight, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-primary mt-1.5 shrink-0">&#8226;</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  );
}
