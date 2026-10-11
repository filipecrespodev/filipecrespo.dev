<script setup lang="ts">
const { t } = useI18n();
const paused = ref(false);

const items = [
  "TypeScript",
  "Vue",
  "Nuxt",
  "Laravel",
  "PHP",
  "Node.js",
  "Next.js",
  "Supabase",
  "Tailwind CSS",
  "LLMs",
];
</script>

<template>
  <div class="marquee" :class="{ 'is-paused': paused }">
    <div class="marquee-viewport">
      <ul class="marquee-track" :aria-label="t('marquee.label')">
        <li v-for="item in items" :key="item" class="marquee-item">
          {{ item }}
        </li>
      </ul>
      <ul class="marquee-track" aria-hidden="true">
        <li v-for="item in items" :key="item" class="marquee-item">
          {{ item }}
        </li>
      </ul>
    </div>
    <button
      type="button"
      :aria-pressed="paused"
      class="marquee-toggle"
      :aria-label="t('marquee.pause')"
      @click="paused = !paused"
    >
      <Icon :name="paused ? 'mdi:play' : 'mdi:pause'" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
/* Only a top border: the next section's rule closes the band. */
.marquee {
  display: flex;
  border-top: 1px solid var(--line);
}

.marquee-viewport {
  display: flex;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.marquee-track {
  display: flex;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.marquee-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.75rem 1.5rem 0.75rem 0;
  color: var(--muted);
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

.marquee-item::before {
  content: "";
  width: 5px;
  height: 5px;
  background: var(--accent);
}

.marquee-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  border: 0;
  border-left: 1px solid var(--line);
  background: var(--bg);
  color: var(--muted);
  cursor: pointer;
}

.marquee-toggle:hover {
  color: var(--fg);
}

.marquee-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

@media (prefers-reduced-motion: no-preference) {
  .marquee-track {
    animation: marquee 40s linear infinite;
  }

  .marquee:hover .marquee-track,
  .marquee.is-paused .marquee-track {
    animation-play-state: paused;
  }

  .marquee-toggle {
    display: flex;
  }
}

@keyframes marquee {
  to {
    transform: translateX(-100%);
  }
}
</style>
