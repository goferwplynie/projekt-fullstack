// ── Union types ──────────────────────────────────────────────────────────────

export type ProjectStatus = "completed" | "in-progress" | "planned";

export type SkillCategory = "languages" | "frameworks" | "tools" | "databases" | "other";

export type SectionId = "hero" | "about" | "skills" | "projects" | "experience" | "contact";

export type ContactSubject =
  | "collaboration"
  | "job-opportunity"
  | "freelance"
  | "question"
  | "other";

// ── Core interfaces ──────────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  location: string;
  avatarUrl?: string;
  resumeUrl?: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string; // tabler icon name
}

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  status: ProjectStatus;
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null; // null means "present"
  description: string;
  highlights: string[];
  type: "work" | "education";
}

// ── Intersection type ────────────────────────────────────────────────────────

export type FeaturedProject = Project & {
  featured: true;
  longDescription: string;
};

// ── Record type for skill categories ─────────────────────────────────────────

export type SkillsByCategory = Record<SkillCategory, Skill[]>;

// ── Pick / Omit types ────────────────────────────────────────────────────────

export type ProjectSummary = Pick<Project, "id" | "title" | "description" | "status" | "techStack">;

export type ProjectFormData = Omit<Project, "id">;

// ── Partial type ─────────────────────────────────────────────────────────────

export type PortfolioConfigOverrides = Partial<PortfolioConfig>;

// ── Full config ──────────────────────────────────────────────────────────────

export interface PortfolioConfig {
  personal: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: ExperienceEntry[];
  navItems: NavItem[];
}

export interface NavItem {
  label: string;
  sectionId: SectionId;
}

// ── Contact form types ───────────────────────────────────────────────────────

export interface ContactFormStep1 {
  name: string;
  email: string;
}

export interface ContactFormStep2 {
  subject: ContactSubject;
  message: string;
}

export interface ContactFormData extends ContactFormStep1, ContactFormStep2 {
  recaptchaToken?: string;
}

// ── Chart data type ──────────────────────────────────────────────────────────

export interface RadarChartDataPoint {
  category: string;
  value: number;
  fullMark: number;
}

// ── Generic component props ──────────────────────────────────────────────────

export interface DataListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  className?: string;
}

// ── Exclude type ─────────────────────────────────────────────────────────────

export type NonPlannerProjectStatus = Exclude<ProjectStatus, "planned">;
