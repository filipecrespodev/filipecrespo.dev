<template>
  <aside class="sidebar pixel-border">
    <div class="profile-section">
      <div class="avatar-container">
        <div class="avatar">
          <span class="avatar-text">FC</span>
        </div>
      </div>

      <h1 class="name glow-text">Filipe Crespo</h1>

      <div class="status">
        <span class="status-indicator blink">●</span>
        <span>ONLINE</span>
      </div>
    </div>

    <div class="divider"></div>

    <div class="bio-section">
      <h2 class="section-title">$ whoami</h2>
      <p class="bio-text">
        Desenvolvedor apaixonado por tecnologia, games e código.
        Bem-vindo ao meu diário digital!
      </p>
    </div>

    <div class="divider"></div>

    <div class="stats-section">
      <h2 class="section-title">$ stats</h2>
      <div class="stat-item">
        <span class="stat-label">LEVEL:</span>
        <span class="stat-value">{{ level }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">XP:</span>
        <span class="stat-value">{{ xp }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">POSTS:</span>
        <span class="stat-value">{{ totalPosts }}</span>
      </div>
    </div>

    <div class="divider"></div>

    <div class="links-section">
      <h2 class="section-title">$ links</h2>
      <a href="https://github.com" target="_blank" class="link-item">
        [GITHUB]
      </a>
      <a href="https://linkedin.com" target="_blank" class="link-item">
        [LINKEDIN]
      </a>
      <a href="mailto:contato@filipecrespo.dev" class="link-item">
        [EMAIL]
      </a>
    </div>

    <div class="footer">
      <p>&gt; Press START</p>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const level = ref(25)
const xp = ref(9999)
const totalPosts = ref(42)
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background-color: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(10px);
  padding: 30px 20px;
  overflow-y: auto;
  z-index: 100;
}

.profile-section {
  text-align: center;
  margin-bottom: 20px;
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border: 4px solid var(--retro-primary);
  background: linear-gradient(135deg, var(--retro-primary) 0%, var(--retro-accent) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 20px var(--retro-primary);
}

.avatar-text {
  font-size: 48px;
  color: var(--retro-bg);
  font-weight: bold;
}

.name {
  font-size: 16px;
  margin-bottom: 15px;
  color: var(--retro-primary);
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 10px;
  color: var(--retro-primary);
}

.status-indicator {
  font-size: 20px;
  color: var(--retro-primary);
}

.divider {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--retro-primary),
    transparent
  );
  margin: 20px 0;
}

.section-title {
  font-size: 12px;
  color: var(--retro-accent);
  margin-bottom: 15px;
  text-shadow: 0 0 10px var(--retro-accent);
}

.bio-section {
  margin-bottom: 20px;
}

.bio-text {
  font-size: 10px;
  line-height: 1.8;
  color: var(--retro-text);
}

.stats-section {
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 10px;
}

.stat-label {
  color: var(--retro-text);
}

.stat-value {
  color: var(--retro-secondary);
  text-shadow: 0 0 5px var(--retro-secondary);
}

.links-section {
  margin-bottom: 20px;
}

.link-item {
  display: block;
  margin-bottom: 10px;
  font-size: 10px;
  padding: 8px;
  border: 2px solid var(--retro-primary);
  text-align: center;
  transition: all 0.3s ease;
}

.link-item:hover {
  background-color: var(--retro-primary);
  color: var(--retro-bg);
  transform: translateX(5px);
}

.footer {
  text-align: center;
  font-size: 10px;
  color: var(--retro-secondary);
  margin-top: 30px;
  animation: blink 1.5s infinite;
}

@media (max-width: 768px) {
  .sidebar {
    position: relative;
    width: 100%;
    height: auto;
  }
}
</style>
