export interface Experience {
  id: string;
  company: string;
  period: string;
}

// Role and summary live in i18n/locales under experience.items.<id>.
export const experience: Experience[] = [
  { id: "saudetrevo", company: "Saúde Trevo", period: "2023 —" },
  { id: "facily", company: "Facily", period: "2021 — 2023" },
  { id: "locaweb", company: "Locaweb", period: "2019 — 2021" },
  { id: "novax", company: "Novax Telecom", period: "2017 — 2019" },
  {
    id: "bc",
    company: "BC Marketing & Desenvolvimento",
    period: "2014 — 2017",
  },
];
