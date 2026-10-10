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
    <NuxtPage />
  </UApp>
</template>
