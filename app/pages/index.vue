<script setup lang="ts">
import { experience } from "~/data/experience";
import { projects } from "~/data/projects";

const { t } = useI18n();
const { contactFormEndpoint } = useRuntimeConfig().public;

const services = computed(() =>
  ["agencies", "web", "automation"].map((key) => ({
    key,
    title: t(`services.items.${key}.name`),
    body: t(`services.items.${key}.description`),
  }))
);

const steps = computed(() =>
  ["briefing", "proposal", "delivery", "support"].map((key) => ({
    key,
    title: t(`process.items.${key}.name`),
    body: t(`process.items.${key}.description`),
  }))
);

const navSections = computed(() =>
  ["about", "services", "process", "projects", "experience", "contact"].map(
    (id) => ({ id, label: t(`${id}.label`) })
  )
);

const jobs = computed(() =>
  experience.map(({ id, company, period }) => ({
    key: id,
    title: company,
    meta: `${t(`experience.items.${id}.role`)} · ${period}`,
    body: t(`experience.items.${id}.summary`),
  }))
);
</script>

<template>
  <div>
    <div class="frame container">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-text">
          <h1 id="hero-title" class="hero-name">
            <span class="hero-line">Filipe</span>
            <span class="hero-line">Crespo</span>
          </h1>
          <p class="hero-role">{{ t("hero.role") }}</p>
          <p class="hero-availability">
            <span class="hero-dot" aria-hidden="true" />
            {{ t("hero.availability") }}
          </p>
          <p class="hero-bio">{{ t("hero.bio") }}</p>
          <div class="hero-actions">
            <a href="#contact" class="button">{{ t("hero.cta") }}</a>
            <a href="#projects" class="button button--ghost">
              {{ t("hero.ctaSecondary") }}
            </a>
          </div>
        </div>
        <img
          src="/profile.jpeg"
          :alt="t('hero.photoAlt')"
          width="200"
          height="200"
          class="hero-photo"
        />
      </section>
    </div>

    <AppMarquee />

    <div class="page-grid container">
      <div class="frame page-content">
        <SectionBlock
          id="about"
          number="01"
          :label="t('about.label')"
          :title="t('about.title')"
        >
          <p v-reveal class="prose prose--lead">{{ t("about.body") }}</p>
        </SectionBlock>

        <SectionBlock
          id="services"
          number="02"
          :label="t('services.label')"
          :title="t('services.title')"
        >
          <InfoList :items="services" variant="grid" />
        </SectionBlock>

        <SectionBlock
          id="process"
          number="03"
          :label="t('process.label')"
          :title="t('process.title')"
        >
          <InfoList :items="steps" variant="grid" />
        </SectionBlock>

        <SectionBlock
          id="projects"
          number="04"
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
          id="experience"
          number="05"
          :label="t('experience.label')"
          :title="t('experience.title')"
        >
          <InfoList :items="jobs" variant="rows" />
        </SectionBlock>

        <SectionBlock
          id="contact"
          number="06"
          :label="t('contact.label')"
          :title="t('contact.title')"
        >
          <div class="contact-grid">
            <div>
              <p v-reveal class="prose">{{ t("contact.body") }}</p>
              <ContactForm
                v-if="contactFormEndpoint"
                :endpoint="contactFormEndpoint"
              />
            </div>
            <div>
              <p v-reveal class="prose">{{ t("contact.linkedin") }}</p>
              <AppSocialLinks v-reveal />
            </div>
          </div>
        </SectionBlock>
      </div>
      <TerminalNav :sections="navSections" />
    </div>
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
  font-size: clamp(3.5rem, 11vw, 10rem);
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

.hero-availability {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
  color: var(--fg);
  font-size: 0.875rem;
}

.hero-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #16a34a;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.hero-bio {
  max-width: 40rem;
  margin: 1rem 0 0;
  color: var(--muted);
  font-size: 1.125rem;
}

.hero-photo {
  width: clamp(160px, 18vw, 260px);
  height: clamp(160px, 18vw, 260px);
  object-fit: cover;
  border-radius: 2px;
  filter: grayscale(1);
}

.hero-photo:hover {
  filter: grayscale(0);
}

.page-grid {
  padding-inline: 0;
}

.page-content {
  min-width: 0;
  padding-inline: var(--gutter);
}

@media (width >= 64rem) {
  .page-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 22rem;
  }
}

.contact-grid {
  display: grid;
  gap: 2rem;
}

@media (width >= 56rem) {
  .contact-grid {
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    gap: 4rem;
  }
}

.prose--lead {
  max-width: 48rem;
  color: var(--fg);
  font-size: clamp(1.125rem, 1.6vw, 1.375rem);
  line-height: 1.55;
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
  .hero-availability,
  .hero-bio,
  .hero-actions,
  .hero-photo {
    animation: hero-rise 0.8s var(--ease-out) both;
  }

  .hero-line:nth-child(2) {
    animation-delay: 0.08s;
  }

  .hero-role,
  .hero-availability {
    animation-delay: 0.16s;
  }

  .hero-bio {
    animation-delay: 0.24s;
  }

  .hero-actions {
    animation-delay: 0.32s;
  }

  .hero-photo {
    animation-delay: 0.4s;
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
