<script setup lang="ts">
const { id, number, label, title } = defineProps<{
  id: string;
  number: string;
  label: string;
  title: string;
}>();
</script>

<template>
  <section :id="id" v-choreo class="section" :aria-labelledby="`${id}-title`">
    <span aria-hidden="true" class="section-rule" />
    <span aria-hidden="true" class="tick tick--left" />
    <span aria-hidden="true" class="tick tick--right" />
    <div class="section-eyebrow">
      <p class="section-label">
        <span class="section-number">{{ number }}</span> / {{ label }}
      </p>
    </div>
    <div class="section-body">
      <h2 :id="`${id}-title`" v-reveal class="section-title">{{ title }}</h2>
      <slot />
    </div>
  </section>
</template>

<style scoped>
/* The section spans the framed column edge to edge. */
.section {
  position: relative;
  margin-inline: calc(-1 * var(--gutter));
}

/* Full-bleed horizontal rule above the eyebrow; main clips the overflow. */
.section-rule {
  position: absolute;
  top: 0;
  z-index: 11;
  left: calc(50% - 50vw);
  width: 100vw;
  height: 1px;
  background: var(--line);
  transform-origin: left;
}

/* Small "+" where the rule crosses the frame. */
.tick {
  display: none;
  position: absolute;
  top: -4px;
  z-index: 11;
  width: 9px;
  height: 9px;
}

.tick::before,
.tick::after {
  content: "";
  position: absolute;
  background: var(--muted);
}

.tick::before {
  top: 0;
  left: 4px;
  width: 1px;
  height: 9px;
}

.tick::after {
  top: 4px;
  left: 0;
  width: 9px;
  height: 1px;
}

.tick--left {
  left: -5px;
}

.tick--right {
  right: -5px;
}

@media (width >= 48rem) {
  .tick {
    display: block;
  }
}

.section-eyebrow {
  position: sticky;
  top: var(--header-h);
  z-index: 10;
  padding: 0.75rem var(--gutter);
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(12px);
}

.section-label {
  margin: 0;
  color: var(--muted);
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-number {
  color: var(--accent);
}

.section-body {
  padding: 3rem var(--gutter) 4rem;
}

.section-title {
  margin: 0 0 1.5rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 400;
  line-height: 1.1;
}

@media (prefers-reduced-motion: no-preference) {
  .choreo .section-rule {
    transform: scaleX(0);
    transition: transform 0.7s var(--ease-out);
  }

  .choreo .tick {
    opacity: 0;
    transform: scale(0);
    transition:
      opacity 0.35s var(--ease-out) 0.35s,
      transform 0.35s var(--ease-out) 0.35s;
  }

  .choreo .tick--right {
    transition-delay: 0.41s;
  }

  .choreo .section-label {
    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity 0.6s var(--ease-out) 0.15s,
      transform 0.6s var(--ease-out) 0.15s;
  }

  .choreo.is-visible .section-rule,
  .choreo.is-visible .tick,
  .choreo.is-visible .section-label {
    opacity: 1;
    transform: none;
  }
}
</style>
