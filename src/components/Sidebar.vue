<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <div class="logo">
        <h2 class="logo-text">FC</h2>
      </div>

      <nav class="nav">
        <a href="#" class="nav-item active">Posts</a>
        <a href="#" class="nav-item">Sobre</a>
        <a href="#" class="nav-item">Contato</a>
      </nav>

      <div class="profile-info">
        <h3 class="profile-name">Filipe Crespo</h3>
        <p class="profile-role">Desenvolvedor Full Stack</p>
        <p class="profile-bio">
          Apaixonado por tecnologia, código limpo e boas práticas.
          Compartilhando aprendizados e experiências.
        </p>
      </div>

      <div class="social-links">
        <a href="https://github.com" target="_blank" class="social-link">
          GitHub
        </a>
        <a href="https://linkedin.com" target="_blank" class="social-link">
          LinkedIn
        </a>
        <a href="mailto:contato@filipecrespo.dev" class="social-link">
          Email
        </a>
      </div>

      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">{{ totalPosts }}</div>
          <div class="stat-label">Posts</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ totalViews }}</div>
          <div class="stat-label">Views</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const totalPosts = ref(5)
const totalViews = ref('2.5k')
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background-color: var(--primary-bg);
  border-right: 1px solid var(--border-color);
  z-index: 100;
  overflow-y: auto;
}

.sidebar-content {
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

/* Navigation */
.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  padding: 12px 16px;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: var(--secondary-bg);
  color: var(--text-primary);
}

.nav-item.active {
  background-color: var(--secondary-bg);
  color: var(--text-primary);
}

/* Profile Info */
.profile-info {
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.profile-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.profile-role {
  font-size: 14px;
  color: var(--accent-color);
  margin-bottom: 16px;
  font-weight: 500;
}

.profile-bio {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* Social Links */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.social-link {
  font-size: 14px;
  color: var(--text-secondary);
  padding: 8px 0;
  font-weight: 500;
  transition: color 0.2s ease;
}

.social-link:hover {
  color: var(--accent-color);
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .sidebar {
    position: relative;
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }

  .sidebar-content {
    padding: 24px 20px;
    gap: 32px;
  }
}
</style>
