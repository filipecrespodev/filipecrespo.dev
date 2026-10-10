export interface Project {
  id: string;
  name: string;
  url?: string;
}

// Descriptions and status live in i18n/locales under projects.items.<id>.
export const projects: Project[] = [
  {
    id: "meusprompts",
    name: "Meus Prompts",
    url: "https://meusprompts.vercel.app",
  },
  { id: "brincaki", name: "Brincaki" },
];
