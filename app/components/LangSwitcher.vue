<script setup lang="ts">
const { locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const labels: Record<string, string> = { "pt-BR": "PT", en: "EN", es: "ES" };
</script>

<template>
  <nav :aria-label="t('a11y.language')">
    <ul class="lang-switcher">
      <li v-for="item in locales" :key="item.code">
        <NuxtLink
          :to="switchLocalePath(item.code)"
          :lang="item.language"
          :hreflang="item.language"
          class="lang-link"
        >
          {{ labels[item.code] }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.lang-switcher {
  display: flex;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
}

.lang-switcher li + li::before {
  content: "·";
  margin-right: 0.25rem;
  color: var(--muted);
}

.lang-link {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.lang-link:hover,
.lang-link[aria-current="page"] {
  color: var(--fg);
}
</style>
