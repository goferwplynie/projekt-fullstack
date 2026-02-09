import type { PersonalInfo } from "@/types/portfolio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";

interface FooterProps {
  personal: PersonalInfo;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  IconBrandGithub: IconBrandGithub,
  IconBrandLinkedin: IconBrandLinkedin,
  IconBrandX: IconBrandX,
};

export function Footer({ personal }: FooterProps) {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social links */}
          <div className="flex items-center gap-2">
            {personal.socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <Button key={link.label} variant="ghost" size="icon-sm" asChild>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {Icon ? <Icon className="size-4" /> : <span>{link.label}</span>}
                  </a>
                </Button>
              );
            })}
          </div>

          <Separator orientation="vertical" className="hidden sm:block h-6" />

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {personal.name}. Built with Next.js & Shadcn.
          </p>
        </div>
      </div>
    </footer>
  );
}
