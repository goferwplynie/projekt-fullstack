"use client";

import { useState } from "react";
import type { Project } from "@/types/portfolio";
import { isFeaturedProject } from "@/lib/portfolio-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IconExternalLink, IconBrandGithub, IconFilter } from "@tabler/icons-react";

interface ProjectsSectionProps {
  projects: Project[];
}

const statusConfig: Record<Project["status"], { label: string; variant: "default" | "secondary" | "outline" }> = {
  completed: { label: "Completed", variant: "default" },
  "in-progress": { label: "In Progress", variant: "secondary" },
  planned: { label: "Planned", variant: "outline" },
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterStatuses, setFilterStatuses] = useState<Set<Project["status"]>>(
    new Set(["completed", "in-progress", "planned"])
  );

  const filteredProjects = projects.filter((p) => filterStatuses.has(p.status));

  const toggleStatus = (status: Project["status"]) => {
    setFilterStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) {
        if (next.size > 1) next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  };

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Projects
          </h2>
          <div className="mt-2 h-1 w-12 bg-primary rounded-full mx-auto" />
          <p className="mt-4 text-muted-foreground">
            A selection of projects I&apos;ve built and contributed to
          </p>
        </div>

        {/* Filter dropdown */}
        <div className="flex justify-center mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconFilter className="size-4 mr-2" />
                Filter by Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Project Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(["completed", "in-progress", "planned"] as const).map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={filterStatuses.has(status)}
                  onCheckedChange={() => toggleStatus(status)}
                >
                  {statusConfig[status].label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Projects grid - uses group class for hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <TooltipProvider>
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group cursor-pointer hover:ring-primary/30 hover:ring-2 transition-all duration-200 hover:-translate-y-1"
                onClick={() => setSelectedProject(project)}
              >
                {/* Hover overlay reveal using group */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl pointer-events-none" />
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge variant={statusConfig[project.status].variant}>
                      {statusConfig[project.status].label}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Tooltip key={tech}>
                        <TooltipTrigger asChild>
                          <span>
                            <Badge variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          Technology: {tech}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="gap-2">
                  {project.repoUrl && (
                    <Button
                      variant="ghost"
                      size="xs"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <IconBrandGithub className="size-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="ghost"
                      size="xs"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <IconExternalLink className="size-4 mr-1" />
                        Live
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TooltipProvider>
        </div>

        {/* Project detail dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          {selectedProject && (
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription>
                  <Badge variant={statusConfig[selectedProject.status].variant} className="mt-1">
                    {statusConfig[selectedProject.status].label}
                  </Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isFeaturedProject(selectedProject)
                    ? selectedProject.longDescription
                    : selectedProject.description}
                </p>

                <div>
                  <p className="text-sm font-medium mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                {selectedProject.repoUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer">
                      <IconBrandGithub className="size-4 mr-1" />
                      Source Code
                    </a>
                  </Button>
                )}
                {selectedProject.liveUrl && (
                  <Button size="sm" asChild>
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <IconExternalLink className="size-4 mr-1" />
                      View Live
                    </a>
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}
