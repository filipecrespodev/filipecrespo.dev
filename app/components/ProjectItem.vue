<script setup lang="ts">
import type { Project } from "~/data/projects";

const { project, index } = defineProps<{ project: Project; index: number }>();
const { t } = useI18n();

const number = computed(() => String(index + 1).padStart(2, "0"));
const description = computed(() =>
  t(`projects.items.${project.id}.description`)
);
const status = computed(() => t(`projects.items.${project.id}.status`));
</script>

<template>
  <li class="project">
    <a
      v-if="project.url"
      :href="project.url"
      target="_blank"
      rel="noopener noreferrer"
      class="project-row project-row--link"
    >
      <span class="project-number">{{ number }}</span>
      <span class="project-body">
        <span class="project-name">{{ project.name }}</span>
        <span class="project-description">{{ description }}</span>
      </span>
      <span class="project-status">{{ status }}</span>
      <span class="project-arrow" aria-hidden="true">↗</span>
      <span class="sr-only">{{ t("a11y.newTab") }}</span>
    </a>
    <div v-else class="project-row">
      <span class="project-number">{{ number }}</span>
      <span class="project-body">
        <span class="project-name">{{ project.name }}</span>
        <span class="project-description">{{ description }}</span>
      </span>
      <span class="project-status">{{ status }}</span>
    </div>
  </li>
</template>

<style scoped>
.project + .project {
  border-top: 1px solid var(--line);
}

.project-row {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto 1.25rem;
  align-items: baseline;
  gap: 1rem;
  padding-block: 1.25rem;
  color: var(--fg);
  text-decoration: none;
}

.project-number,
.project-status {
  color: var(--muted);
  font-size: 0.8125rem;
}

.project-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.project-name {
  position: relative;
  align-self: flex-start;
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1.2;
}

.project-name::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: currentcolor;
  transform: scaleX(0);
  transform-origin: left;
}

.project-description {
  color: var(--muted);
  font-size: 0.9375rem;
}

.project-arrow {
  color: var(--accent);
}

@media (prefers-reduced-motion: no-preference) {
  .project-name::after {
    transition: transform 0.4s var(--ease-out);
  }

  .project-arrow {
    transition: transform 0.3s var(--ease-out);
  }
}

.project-row--link:hover .project-name::after,
.project-row--link:focus-visible .project-name::after {
  transform: scaleX(1);
}

.project-row--link:hover .project-arrow,
.project-row--link:focus-visible .project-arrow {
  transform: translate(3px, -3px);
}

@media (width <= 480px) {
  .project-row {
    grid-template-columns: 2rem 1fr 1.25rem;
  }

  .project-status {
    display: none;
  }
}
</style>
