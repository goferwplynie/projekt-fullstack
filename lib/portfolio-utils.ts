import type {
  Project,
  FeaturedProject,
  Skill,
  SkillsByCategory,
  SkillCategory,
  SectionId,
  ExperienceEntry,
} from "@/types/portfolio";

// ── Type predicate ───────────────────────────────────────────────────────────
// Narrows a Project to FeaturedProject using a type guard

export function isFeaturedProject(project: Project): project is FeaturedProject {
  return project.featured === true && typeof project.longDescription === "string";
}

// ── Type predicate for experience type ───────────────────────────────────────

export function isWorkExperience(
  entry: ExperienceEntry
): entry is ExperienceEntry & { type: "work" } {
  return entry.type === "work";
}

// ── Function overloads ───────────────────────────────────────────────────────
// scrollToSection can accept either a SectionId or an HTMLElement

export function scrollToSection(target: SectionId): void;
export function scrollToSection(target: HTMLElement): void;
export function scrollToSection(target: SectionId | HTMLElement): void {
  if (typeof target === "string") {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ── Function overloads for formatting dates ──────────────────────────────────

export function formatDate(date: string): string;
export function formatDate(date: string, format: "short"): string;
export function formatDate(date: string, format: "long"): string;
export function formatDate(date: string, format?: "short" | "long"): string {
  const [year, month] = date.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const monthNamesFull = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const monthIndex = parseInt(month, 10) - 1;

  if (format === "long") {
    return `${monthNamesFull[monthIndex]} ${year}`;
  }
  return `${monthNames[monthIndex]} ${year}`;
}

// ── Utility: Group skills by category ────────────────────────────────────────
// Uses Record<SkillCategory, Skill[]>

export function groupSkillsByCategory(skills: Skill[]): SkillsByCategory {
  const categories: SkillCategory[] = ["languages", "frameworks", "tools", "databases", "other"];
  const grouped: SkillsByCategory = {
    languages: [],
    frameworks: [],
    tools: [],
    databases: [],
    other: [],
  };

  for (const skill of skills) {
    if (categories.includes(skill.category)) {
      grouped[skill.category].push(skill);
    }
  }

  return grouped;
}

// ── Utility: Get skill proficiency average per category ──────────────────────

export function getCategoryAverages(
  skills: Skill[]
): { category: string; value: number; fullMark: number }[] {
  const grouped = groupSkillsByCategory(skills);

  return (Object.entries(grouped) as [SkillCategory, Skill[]][])
    .filter(([, items]) => items.length > 0)
    .map(([category, items]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      value: Math.round(items.reduce((sum, s) => sum + s.proficiency, 0) / items.length),
      fullMark: 100,
    }));
}

// ── Utility: Filter projects by status ───────────────────────────────────────

export function getProjectsByStatus<S extends Project["status"]>(
  projects: Project[],
  status: S
): Project[] {
  return projects.filter((p) => p.status === status);
}
