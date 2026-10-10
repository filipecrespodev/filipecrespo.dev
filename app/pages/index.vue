<script setup lang="ts">
import { projects } from "~/data/projects";

const { t } = useI18n();
</script>

<template>
  <div class="container">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-text">
        <h1 id="hero-title" class="hero-name">
          <span class="hero-line">Filipe</span>
          <span class="hero-line">Crespo</span>
        </h1>
        <p class="hero-role">{{ t("hero.role") }}</p>
        <p class="hero-bio">{{ t("hero.bio") }}</p>
      </div>
      <img
        src="/profile.jpeg"
        :alt="t('hero.photoAlt')"
        width="200"
        height="200"
        class="hero-photo"
      />
    </section>

    <SectionBlock
      id="about"
      number="01"
      :label="t('about.label')"
      :title="t('about.title')"
    >
      <p class="prose">{{ t("about.body") }}</p>
    </SectionBlock>

    <SectionBlock
      id="projects"
      number="02"
      :label="t('projects.label')"
      :title="t('projects.title')"
    >
      <ol class="project-list">
        <ProjectItem
          v-for="(project, index) in projects"
          :key="project.id"
          :project="project"
          :index="index"
        />
      </ol>
    </SectionBlock>

    <SectionBlock
      id="contact"
      number="03"
      :label="t('contact.label')"
      :title="t('contact.title')"
    >
      <p class="prose">{{ t("contact.body") }}</p>
      <AppSocialLinks />
    </SectionBlock>
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 2rem;
  padding-block: 5rem 4rem;
}

.hero-name {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 12vw, 6.5rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.02em;
}

.hero-line {
  display: block;
}

.hero-role {
  margin: 1.25rem 0 0;
  color: var(--accent);
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-bio {
  max-width: 32rem;
  margin: 1rem 0 0;
  color: var(--muted);
  font-size: 1.125rem;
}

.hero-photo {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 2px;
  filter: grayscale(1);
}

.hero-photo:hover {
  filter: grayscale(0);
}

.prose {
  max-width: 36rem;
  margin: 0 0 1.5rem;
  color: var(--muted);
  font-size: 1.0625rem;
}

.project-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (width <= 640px) {
  .hero {
    grid-template-columns: 1fr;
    padding-block: 3rem;
  }

  .hero-photo {
    grid-row: 1;
    width: 112px;
    height: 112px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  /* The name is the LCP element: slide it in without ever hiding it. */
  .hero-line {
    animation: hero-slide 0.8s var(--ease-out) both;
  }

  .hero-role,
  .hero-bio,
  .hero-photo {
    animation: hero-rise 0.8s var(--ease-out) both;
  }

  .hero-line:nth-child(2) {
    animation-delay: 0.08s;
  }

  .hero-role {
    animation-delay: 0.16s;
  }

  .hero-bio {
    animation-delay: 0.24s;
  }

  .hero-photo {
    animation-delay: 0.32s;
    transition: filter 0.5s ease;
  }
}

@keyframes hero-slide {
  from {
    transform: translateY(24px);
  }

  to {
    transform: none;
  }
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
