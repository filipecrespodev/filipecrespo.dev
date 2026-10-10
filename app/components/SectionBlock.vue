<script setup lang="ts">
const { id, number, label, title } = defineProps<{
  id: string;
  number: string;
  label: string;
  title: string;
}>();
</script>

<template>
  <section :id="id" v-reveal class="section" :aria-labelledby="`${id}-title`">
    <p class="section-label">
      <span class="section-number">{{ number }}</span> / {{ label }}
    </p>
    <h2 :id="`${id}-title`" class="section-title">{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
.section {
  padding-block: 4rem;
  border-top: 1px solid var(--line);
}

.section-label {
  margin: 0 0 1rem;
  color: var(--muted);
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-number {
  color: var(--accent);
}

.section-title {
  margin: 0 0 1.5rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 400;
  line-height: 1.1;
}
</style>
