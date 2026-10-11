<script setup lang="ts">
export interface InfoItem {
  key: string;
  title: string;
  body: string;
  meta?: string;
}

const { items, variant = "list" } = defineProps<{
  items: InfoItem[];
  variant?: "list" | "grid" | "rows";
}>();
</script>

<template>
  <ol class="info-list" :class="`info-list--${variant}`">
    <li
      v-for="(item, index) in items"
      :key="item.key"
      v-reveal
      class="info-item"
      :style="{ '--i': index }"
    >
      <span class="info-number">{{ String(index + 1).padStart(2, "0") }}</span>
      <div class="info-body">
        <h3 class="info-title">{{ item.title }}</h3>
        <p v-if="item.meta" class="info-meta">{{ item.meta }}</p>
        <p class="info-text">{{ item.body }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.info-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.info-item {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 1rem;
  padding-block: 1.25rem;
}

.info-item + .info-item {
  border-top: 1px solid var(--line);
}

.info-number,
.info-meta {
  color: var(--muted);
  font-size: 0.8125rem;
}

.info-number {
  padding-top: 0.4rem;
}

.info-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
}

.info-meta {
  margin: 0.25rem 0 0;
  letter-spacing: 0.04em;
}

.info-text {
  max-width: 34rem;
  margin: 0.5rem 0 0;
  color: var(--muted);
  font-size: 0.9375rem;
}

@media (width <= 480px) {
  .info-item {
    grid-template-columns: 2rem 1fr;
  }
}

@media (width >= 48rem) {
  /* Rows: name and role on the left, summary on the right. */
  .info-list--rows .info-item {
    grid-template-columns: 2.5rem minmax(12rem, 18rem) 1fr;
    gap: 1.5rem;
  }

  .info-list--rows .info-body {
    display: contents;
  }

  .info-list--rows .info-title {
    grid-column: 2;
  }

  .info-list--rows .info-meta {
    grid-row: 2;
    grid-column: 2;
    margin: 0;
  }

  .info-list--rows .info-text {
    grid-row: 1 / span 2;
    grid-column: 3;
    margin: 0;
    padding-top: 0.3rem;
  }

  /* Grid: cards side by side, split by hairlines. */
  @media (width >= 48rem) {
    .info-list--grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
      border-top: 1px solid var(--line);
    }

    .info-list--grid .info-item {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 1.5rem 1.5rem 2rem;
    }

    .info-list--grid .info-item + .info-item {
      border-top: 0;
      border-left: 1px solid var(--line);
    }

    .info-list--grid .info-item:first-child {
      padding-left: 0;
    }

    .info-list--grid .info-number {
      padding-top: 0;
    }
  }
}

@media (prefers-reduced-motion: no-preference) {
  .info-item {
    transition-delay: calc(var(--i) * 90ms);
  }
}
</style>
