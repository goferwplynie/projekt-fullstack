import type { PersonalInfo } from "@/types/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconMapPin, IconMail } from "@tabler/icons-react";

interface AboutSectionProps {
  personal: PersonalInfo;
}

export function AboutSection({ personal }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            About Me
          </h2>
          <div className="mt-2 h-1 w-12 bg-primary rounded-full mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar placeholder */}
              <div className="shrink-0 mx-auto md:mx-0">
                <div className="size-32 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-4xl font-bold text-primary">
                  {personal.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {personal.bio}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="gap-1.5">
                    <IconMapPin className="size-3" />
                    {personal.location}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    <IconMail className="size-3" />
                    {personal.email}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
