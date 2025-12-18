<script setup lang="ts">
const experiences = [
  {
    company: "Saúde Trevo",
    role: "Software Engineer",
    period: "Atual",
    description: "Desenvolvimento de soluções para o setor de saúde",
  },
  {
    company: "Locaweb",
    role: "Speaker",
    period: "2020",
    description: "Palestrante em PHP Summit 2020 e TheDevConference SP",
  },
  {
    company: "Inclusão Digital/UNISUAM",
    role: "Professor",
    period: "jun - dez 2013",
    description: "Montagem e Manutenção de Micros e Internet & Office",
  },
];

const education = [
  {
    institution: "PUCRS",
    course: "Pontifícia Universidade Católica do Rio Grande do Sul",
    period: "nov 2023",
  },
];

const skills = [
  "PHP",
  "Laravel",
  "Vue.js",
  "Docker",
  "DevOps",
  "Scrum",
  "JavaScript",
  "TypeScript",
];

const certifications = [
  "DevOps Essentials Professional Certificate",
  "Scrum Foundation Professional Certificate",
  "SPA com Vue JS e API com Laravel",
  "Reconhecimento de Voz e Sintetização de Fala com Python",
];
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="profile-image">
        <img src="/profile.jpeg" alt="Filipe Soares Crespo" class="avatar" />
      </div>
      <h1 class="hero-title">Filipe Soares Crespo</h1>
      <p class="hero-subtitle">Software Engineer</p>
      <p class="hero-description">
        Pai, marido e engenheiro de software com mais de 10 anos de experiência
        na criação de soluções tecnológicas. Apaixonado por desenvolvimento web,
        arquitetura de software e metodologias ágeis.
      </p>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-value">10+</span>
          <span class="stat-label">Anos de Experiência</span>
        </div>
        <div class="stat">
          <span class="stat-value">500+</span>
          <span class="stat-label">Conexões</span>
        </div>
      </div>

      <!-- Social Links -->
      <div class="hero-social">
        <SocialLinks variant="horizontal" size="lg" />
      </div>
    </section>

    <!-- Experience Section -->
    <section class="section">
      <h2 class="section-title">Experiência Profissional</h2>
      <div class="timeline">
        <div
          v-for="exp in experiences"
          :key="exp.company"
          class="timeline-item"
        >
          <div class="timeline-marker" />
          <div class="timeline-content">
            <h3 class="timeline-title">{{ exp.role }}</h3>
            <p class="timeline-company">{{ exp.company }}</p>
            <p class="timeline-period">{{ exp.period }}</p>
            <p class="timeline-description">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="section">
      <h2 class="section-title">Formação Acadêmica</h2>
      <div class="education-list">
        <div
          v-for="edu in education"
          :key="edu.institution"
          class="education-item"
        >
          <h3 class="education-institution">{{ edu.institution }}</h3>
          <p class="education-course">{{ edu.course }}</p>
          <p class="education-period">{{ edu.period }}</p>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="section">
      <h2 class="section-title">Competências Técnicas</h2>
      <div class="skills-grid">
        <span v-for="skill in skills" :key="skill" class="skill-badge">
          {{ skill }}
        </span>
      </div>
    </section>

    <!-- Certifications Section -->
    <section class="section">
      <h2 class="section-title">Certificações</h2>
      <ul class="certifications-list">
        <li
          v-for="cert in certifications"
          :key="cert"
          class="certification-item"
        >
          <Icon name="heroicons-solid:badge-check" class="certification-icon" />
          <span>{{ cert }}</span>
        </li>
      </ul>
    </section>

    <!-- Projects Section -->
    <section class="section">
      <h2 class="section-title">Projetos Destacados</h2>
      <div class="projects-grid">
        <div class="project-card">
          <h3 class="project-title">DevAgil</h3>
          <p class="project-description">
            Iniciativa comunitária sobre metodologias ágeis
          </p>
        </div>
        <div class="project-card">
          <h3 class="project-title">Fenix</h3>
          <p class="project-description">
            ERP desenvolvido em PHP/Laravel com Vue.js
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 900px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 3rem 0;
  margin-bottom: 4rem;
}

.profile-image {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--color-primary-500);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: block;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0 0 0.5rem 0;
}

@media (prefers-color-scheme: dark) {
  .hero-title {
    color: var(--color-gray-50);
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-primary-600);
  margin: 0 0 1.5rem 0;
  font-weight: 600;
}

@media (prefers-color-scheme: dark) {
  .hero-subtitle {
    color: var(--color-primary-400);
  }
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-gray-600);
  max-width: 700px;
  margin: 0 auto 2rem auto;
}

@media (prefers-color-scheme: dark) {
  .hero-description {
    color: var(--color-gray-300);
  }
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary-600);
}

@media (prefers-color-scheme: dark) {
  .stat-value {
    color: var(--color-primary-400);
  }
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin-top: 0.25rem;
}

@media (prefers-color-scheme: dark) {
  .stat-label {
    color: var(--color-gray-400);
  }
}

.hero-social {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
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

/* Timeline */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-gray-200);
}

@media (prefers-color-scheme: dark) {
  .timeline::before {
    background: var(--color-gray-700);
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
}

.timeline-marker {
  position: absolute;
  left: -2.375rem;
  top: 0.375rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-primary-500);
  border: 2px solid var(--color-gray-50);
}

@media (prefers-color-scheme: dark) {
  .timeline-marker {
    border-color: var(--color-gray-900);
  }
}

.timeline-content {
  background: var(--color-gray-50);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-gray-200);
}

@media (prefers-color-scheme: dark) {
  .timeline-content {
    background: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0 0 0.25rem 0;
}

@media (prefers-color-scheme: dark) {
  .timeline-title {
    color: var(--color-gray-50);
  }
}

.timeline-company {
  font-size: 1rem;
  color: var(--color-primary-600);
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .timeline-company {
    color: var(--color-primary-400);
  }
}

.timeline-period {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  margin: 0 0 0.75rem 0;
}

.timeline-description {
  font-size: 0.9375rem;
  color: var(--color-gray-700);
  margin: 0;
  line-height: 1.6;
}

@media (prefers-color-scheme: dark) {
  .timeline-description {
    color: var(--color-gray-300);
  }
}

/* Education */
.education-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.education-item {
  background: var(--color-gray-50);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-gray-200);
}

@media (prefers-color-scheme: dark) {
  .education-item {
    background: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.education-institution {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0 0 0.5rem 0;
}

@media (prefers-color-scheme: dark) {
  .education-institution {
    color: var(--color-gray-50);
  }
}

.education-course {
  font-size: 1rem;
  color: var(--color-gray-700);
  margin: 0 0 0.5rem 0;
}

@media (prefers-color-scheme: dark) {
  .education-course {
    color: var(--color-gray-300);
  }
}

.education-period {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  margin: 0;
}

/* Skills */
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--color-primary-50);
  color: var(--color-primary-700);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid var(--color-primary-200);
}

@media (prefers-color-scheme: dark) {
  .skill-badge {
    background: var(--color-primary-900);
    color: var(--color-primary-300);
    border-color: var(--color-primary-800);
  }
}

/* Certifications */
.certifications-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.certification-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-gray-50);
  border-radius: 0.5rem;
  border: 1px solid var(--color-gray-200);
  color: var(--color-gray-700);
}

@media (prefers-color-scheme: dark) {
  .certification-item {
    background: var(--color-gray-800);
    border-color: var(--color-gray-700);
    color: var(--color-gray-300);
  }
}

.certification-icon {
  color: var(--color-primary-500);
  font-size: 1.25rem;
  flex-shrink: 0;
}

/* Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: var(--color-gray-50);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-gray-200);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

@media (prefers-color-scheme: dark) {
  .project-card {
    background: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0 0 0.5rem 0;
}

@media (prefers-color-scheme: dark) {
  .project-title {
    color: var(--color-gray-50);
  }
}

.project-description {
  font-size: 0.9375rem;
  color: var(--color-gray-600);
  margin: 0;
  line-height: 1.6;
}

@media (prefers-color-scheme: dark) {
  .project-description {
    color: var(--color-gray-400);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-stats {
    gap: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline-item {
    padding-left: 1rem;
  }
}
</style>
