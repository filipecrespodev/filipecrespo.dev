<script setup lang="ts">
interface Props {
  variant?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
}

const { variant = "horizontal", size = "md" } = defineProps<Props>();

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://pt.linkedin.com/in/filipescrespo",
    icon: "mdi:linkedin",
    color: "#0A66C2",
  },
  {
    name: "GitHub",
    url: "https://github.com/filipecrespodev",
    icon: "mdi:github",
    color: "#181717",
  },
];

const sizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};
</script>

<template>
  <div :class="['social-links', `social-links--${variant}`]">
    <a
      v-for="social in socialLinks"
      :key="social.name"
      :href="social.url"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link"
      :title="social.name"
      :aria-label="social.name"
    >
      <Icon :name="social.icon" :class="sizeClasses[size]" />
    </a>
  </div>
</template>

<style scoped>
.social-links {
  display: flex;
  gap: 1rem;
}

.social-links--horizontal {
  flex-direction: row;
  align-items: center;
}

.social-links--vertical {
  flex-direction: column;
  align-items: flex-start;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  color: var(--color-gray-700);
  background-color: var(--color-gray-100);
  transition: all 0.2s ease;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  .social-link {
    color: var(--color-gray-400);
    background-color: var(--color-gray-800);
  }
}

.social-link:hover {
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
  transform: translateY(-2px);
}

@media (prefers-color-scheme: dark) {
  .social-link:hover {
    color: var(--color-primary-400);
    background-color: var(--color-primary-900);
  }
}
</style>
