<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <header id="top" class="site-header container">
    <NuxtLink :to="localePath('/')" class="site-name">
      Filipe Crespo
      <span class="site-role">— {{ t("hero.role") }}</span>
    </NuxtLink>
    <LangSwitcher />
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1.5rem;
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
