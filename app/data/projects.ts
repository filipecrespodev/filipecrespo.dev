export interface Project {
  id: string;
  name: string;
  url?: string;
}

// Descriptions and status live in i18n/locales under projects.items.<id>.
export const projects: Project[] = [
  {
    id: "inline",
    name: "Inline Projetos",
    url: "https://www.inlineprojetos.com",
  },
  { id: "larabordalo", name: "Lara Bordalo", url: "https://larabordalo.com" },
  { id: "virginiaory", name: "Virginia Ory", url: "https://virginiaory.com" },
  {
    id: "meusprompts",
    name: "Meus Prompts",
    url: "https://meusprompts.com.br",
  },
  {
    id: "brincaki",
    name: "Brincaki",
    url: "https://meus-prompts.github.io/brincaki/",
  },
];
