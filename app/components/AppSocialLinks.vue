<script setup lang="ts">
const { t } = useI18n();

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://pt.linkedin.com/in/filipescrespo",
    icon: "mdi:linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/filipecrespodev",
    icon: "mdi:github",
  },
];
</script>

<template>
  <ul class="social-links" :aria-label="t('a11y.social')">
    <li v-for="social in socialLinks" :key="social.name">
      <a
        :href="social.url"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
      >
        <Icon :name="social.icon" class="social-icon" aria-hidden="true" />
        <span>{{ social.name }}</span>
        <span class="sr-only">{{ t("a11y.newTab") }}</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--fg);
  text-decoration: underline;
  text-decoration-color: var(--line);
  text-underline-offset: 4px;
}

.social-link:hover {
  text-decoration-color: var(--accent);
}

.social-icon {
  font-size: 1.25rem;
}

@media (prefers-reduced-motion: no-preference) {
  .social-link {
    transition: text-decoration-color 0.2s ease;
  }
}
</style>
