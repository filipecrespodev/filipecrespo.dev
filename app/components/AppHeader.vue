<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <header class="site-header">
    <div class="site-header-inner frame container">
      <NuxtLink :to="localePath('/')" class="site-name">
        Filipe Crespo
        <span class="site-role">— {{ t("hero.role") }}</span>
      </NuxtLink>
      <LangSwitcher />
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(12px);
}

.site-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: var(--header-h);
}

.site-name {
  color: var(--fg);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
}

.site-role {
  color: var(--muted);
  font-weight: 400;
}

@media (width <= 480px) {
  .site-role {
    display: none;
  }
}
</style>
