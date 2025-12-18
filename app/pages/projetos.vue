<script setup lang="ts">
interface Project {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  url: string;
  topics?: string[];
}

const projects: Project[] = [
  {
    name: "fenix_system",
    description:
      "Sistema de gestão empresarial (ERP) focado no fluxo da empresa. Desenvolvido com PHP/Laravel e Vue.js para oferecer uma solução completa de gestão.",
    language: "PHP",
    languageColor: "#4F5D95",
    stars: 1,
    url: "https://github.com/filipecrespodev/fenix_system",
    topics: ["php", "laravel", "vuejs", "erp"],
  },
  {
    name: "speech-switch",
    description:
      "Interface Python para serviços que realizam conversão de voz para texto e texto para voz. Projeto focado em acessibilidade e automação.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 3,
    url: "https://github.com/filipecrespodev/speech-switch",
    topics: ["python", "speech-recognition", "text-to-speech"],
  },
  {
    name: "game-vue-socket-io",
    description:
      "Jogo multiplayer em tempo real desenvolvido com VueJS, NodeJs e Socket.io. Demonstra comunicação em tempo real e interatividade.",
    language: "Vue",
    languageColor: "#41B883",
    stars: 0,
    url: "https://github.com/filipecrespodev/game-vue-socket-io",
    topics: ["vuejs", "nodejs", "socketio", "game"],
  },
  {
    name: "dotfiles",
    description:
      "Coleção de arquivos de configuração pessoal para ambiente de desenvolvimento. Scripts e configurações para produtividade máxima.",
    language: "Shell",
    languageColor: "#89e051",
    stars: 4,
    url: "https://github.com/filipecrespodev/dotfiles",
    topics: ["dotfiles", "shell", "configuration"],
  },
  {
    name: "dev_study",
    description:
      "Repositório de estudos e experimentos com Python. Contém diversos projetos de aprendizado e prática de conceitos.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    url: "https://github.com/filipecrespodev/dev_study",
    topics: ["python", "learning", "studies"],
  },
  {
    name: "criptografia-ransomwares",
    description:
      "Estudos sobre criptografia e ransomwares em Python. Projeto educacional para entender segurança e criptografia.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    url: "https://github.com/filipecrespodev/criptografia-ransomwares",
    topics: ["python", "cryptography", "security"],
  },
];

const featuredProjects = projects.filter(
  (p) =>
    p.stars > 0 ||
    ["fenix_system", "speech-switch", "game-vue-socket-io"].includes(p.name)
);
const otherProjects = projects.filter((p) => !featuredProjects.includes(p));
</script>

<template>
  <div class="projects-container">
    <!-- Header -->
    <header class="projects-header">
      <h1 class="page-title">Projetos</h1>
      <p class="page-description">
        Uma seleção dos meus projetos open source e experimentos pessoais. Todos
        os projetos estão disponíveis no
        <a
          href="https://github.com/filipecrespodev"
          target="_blank"
          rel="noopener noreferrer"
          class="github-link"
        >
          GitHub
          <Icon name="heroicons-solid:arrow-top-right-on-square" />
        </a>
      </p>
    </header>

    <!-- Featured Projects -->
    <section class="section">
      <h2 class="section-title">Projetos em Destaque</h2>
      <div class="projects-grid">
        <div
          v-for="project in featuredProjects"
          :key="project.name"
          class="project-card featured"
        >
          <div class="project-header">
            <div class="project-icon">
              <Icon name="heroicons-solid:folder" />
            </div>
            <a
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
              :title="`Ver ${project.name} no GitHub`"
              :aria-label="`Ver ${project.name} no GitHub`"
            >
              <Icon name="mdi:github" />
            </a>
          </div>

          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-description">{{ project.description }}</p>

          <div class="project-footer">
            <div class="project-meta">
              <span class="language">
                <span
                  class="language-dot"
                  :style="{ backgroundColor: project.languageColor }"
                />
                {{ project.language }}
              </span>
              <span v-if="project.stars > 0" class="stars">
                <Icon name="heroicons-solid:star" />
                {{ project.stars }}
              </span>
            </div>
            <div v-if="project.topics" class="project-topics">
              <span
                v-for="topic in project.topics.slice(0, 3)"
                :key="topic"
                class="topic"
              >
                {{ topic }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Projects -->
    <section v-if="otherProjects.length > 0" class="section">
      <h2 class="section-title">Outros Projetos</h2>
      <div class="projects-grid">
        <div
          v-for="project in otherProjects"
          :key="project.name"
          class="project-card"
        >
          <div class="project-header">
            <div class="project-icon">
              <Icon name="heroicons-solid:folder" />
            </div>
            <a
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
              :title="`Ver ${project.name} no GitHub`"
              :aria-label="`Ver ${project.name} no GitHub`"
            >
              <Icon name="mdi:github" />
            </a>
          </div>

          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-description">{{ project.description }}</p>

          <div class="project-footer">
            <div class="project-meta">
              <span class="language">
                <span
                  class="language-dot"
                  :style="{ backgroundColor: project.languageColor }"
                />
                {{ project.language }}
              </span>
            </div>
            <div v-if="project.topics" class="project-topics">
              <span
                v-for="topic in project.topics.slice(0, 3)"
                :key="topic"
                class="topic"
              >
                {{ topic }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Quer ver mais?</h2>
        <p class="cta-description">
          Confira todos os meus 30+ repositórios públicos no GitHub
        </p>
        <a
          href="https://github.com/filipecrespodev?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-button"
        >
          Ver todos os projetos
          <Icon name="heroicons-solid:arrow-right" />
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.projects-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.projects-header {
  margin-bottom: 4rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0 0 1rem;
}

@media (prefers-color-scheme: dark) {
  .page-title {
    color: var(--color-gray-50);
  }
}

.page-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-gray-700);
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  .page-description {
    color: var(--color-gray-300);
  }
}

.github-link {
  color: var(--color-primary-600);
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s;
}

@media (prefers-color-scheme: dark) {
  .github-link {
    color: var(--color-primary-400);
  }
}

.github-link:hover {
  color: var(--color-primary-700);
}

@media (prefers-color-scheme: dark) {
  .github-link:hover {
    color: var(--color-primary-300);
  }
}

/* Section */
.section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 2rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--color-primary-500);
}

@media (prefers-color-scheme: dark) {
  .section-title {
    color: var(--color-gray-50);
  }
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

@media (width <= 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

/* Project Card */
.project-card {
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  position: relative;
}

@media (prefers-color-scheme: dark) {
  .project-card {
    background: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgb(0 0 0 / 10%);
  border-color: var(--color-primary-500);
}

@media (prefers-color-scheme: dark) {
  .project-card:hover {
    box-shadow: 0 12px 24px rgb(0 0 0 / 30%);
  }
}

.project-card.featured {
  border-color: var(--color-primary-300);
  background: linear-gradient(
    135deg,
    var(--color-gray-50) 0%,
    var(--color-primary-50) 100%
  );
}

@media (prefers-color-scheme: dark) {
  .project-card.featured {
    background: linear-gradient(
      135deg,
      var(--color-gray-800) 0%,
      var(--color-primary-950) 100%
    );
    border-color: var(--color-primary-700);
  }
}

/* Project Header */
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: var(--color-gray-200);
  color: var(--color-gray-700);
  font-size: 1.5rem;
}

@media (prefers-color-scheme: dark) {
  .project-icon {
    background: var(--color-gray-700);
    color: var(--color-gray-400);
  }
}

.project-link {
  color: var(--color-gray-600);
  transition: all 0.2s;
  font-size: 1.25rem;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  .project-link {
    color: var(--color-gray-400);
  }
}

.project-link:hover {
  color: var(--color-primary-600);
  transform: scale(1.1);
}

@media (prefers-color-scheme: dark) {
  .project-link:hover {
    color: var(--color-primary-400);
  }
}

/* Project Content */
.project-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
  font-family: monospace;
}

@media (prefers-color-scheme: dark) {
  .project-name {
    color: var(--color-gray-50);
  }
}

.project-description {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-gray-800);
  margin: 0;
  flex: 1;
}

@media (prefers-color-scheme: dark) {
  .project-description {
    color: var(--color-gray-300);
  }
}

/* Project Footer */
.project-footer {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
}

.language {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-gray-800);
}

@media (prefers-color-scheme: dark) {
  .language {
    color: var(--color-gray-400);
  }
}

.language-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.stars {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-gray-800);
}

@media (prefers-color-scheme: dark) {
  .stars {
    color: var(--color-gray-400);
  }
}

/* Topics */
.project-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: 9999px;
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .topic {
    background: var(--color-primary-900);
    color: var(--color-primary-300);
  }
}

/* CTA Section */
.cta-section {
  margin-top: 5rem;
  margin-bottom: 3rem;
}

.cta-content {
  background: linear-gradient(
    135deg,
    var(--color-primary-50) 0%,
    var(--color-primary-100) 100%
  );
  border: 1px solid var(--color-primary-200);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
}

@media (prefers-color-scheme: dark) {
  .cta-content {
    background: linear-gradient(
      135deg,
      var(--color-primary-950) 0%,
      var(--color-primary-900) 100%
    );
    border-color: var(--color-primary-800);
  }
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0 0 1rem;
}

@media (prefers-color-scheme: dark) {
  .cta-title {
    color: var(--color-gray-50);
  }
}

.cta-description {
  font-size: 1.125rem;
  color: var(--color-gray-800);
  margin: 0 0 2rem;
}

@media (prefers-color-scheme: dark) {
  .cta-description {
    color: var(--color-gray-300);
  }
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: var(--color-primary-600);
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

@media (prefers-color-scheme: dark) {
  .cta-button {
    background: var(--color-primary-500);
  }
}

.cta-button:hover {
  background: var(--color-primary-700);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgb(0 0 0 / 20%);
}

@media (prefers-color-scheme: dark) {
  .cta-button:hover {
    background: var(--color-primary-400);
  }
}

/* Responsive */
@media (width <= 768px) {
  .page-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .cta-content {
    padding: 2rem;
  }

  .cta-title {
    font-size: 1.5rem;
  }
}
</style>
