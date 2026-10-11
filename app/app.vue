<script setup lang="ts">
const { t } = useI18n();
const head = useLocaleHead({ dir: true, lang: true, seo: true });

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  link: head.value.link,
  meta: head.value.meta,
}));

useSeoMeta({
  title: () => t("meta.title"),
  description: () => t("meta.description"),
  ogTitle: () => t("meta.title"),
  ogDescription: () => t("meta.description"),
  ogType: "website",
  author: "Filipe Soares Crespo",
});
</script>

<template>
  <UApp>
    <!-- Scroll target for "back to top": the header is sticky, so it can't be one. -->
    <div id="top" />
    <a href="#main" class="skip-link">{{ t("a11y.skip") }}</a>
    <AppHeader />
    <main id="main" class="site-main">
      <NuxtPage />
    </main>
    <AppFooter />
  </UApp>
</template>
