import { portfolioConfig } from "@/data/portfolio";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Page() {
  const { personal, skills, projects, experience, navItems } = portfolioConfig;

  return (
    <>
      <Navbar navItems={navItems} name={personal.name} />
      <main>
        <HeroSection personal={personal} />
        <AboutSection personal={personal} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experience={experience} />
        <ContactSection />
      </main>
      <Footer personal={personal} />
    </>
  );
}
