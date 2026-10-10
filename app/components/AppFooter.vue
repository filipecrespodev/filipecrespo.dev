<script setup lang="ts">
const { t } = useI18n();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer container">
    <p>© {{ year }} Filipe Soares Crespo</p>
    <a href="#top" class="back-to-top">
      {{ t("footer.backToTop") }} <span aria-hidden="true">↑</span>
    </a>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 3rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.875rem;
}

.site-footer p {
  margin: 0;
}

.back-to-top {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-to-top:hover {
  color: var(--fg);
}
</style>
