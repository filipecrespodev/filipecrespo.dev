<template>
  <aside class="sidebar">
    <!-- Logo Section -->
    <div class="logo-section">
      <div class="logo">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer Circle -->
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2" />

          <!-- Spokes -->
          <line x1="50" y1="5" x2="50" y2="20" stroke="currentColor" stroke-width="2" />
          <line x1="50" y1="80" x2="50" y2="95" stroke="currentColor" stroke-width="2" />
          <line x1="5" y1="50" x2="20" y2="50" stroke="currentColor" stroke-width="2" />
          <line x1="80" y1="50" x2="95" y2="50" stroke="currentColor" stroke-width="2" />
          <line x1="17" y1="17" x2="28" y2="28" stroke="currentColor" stroke-width="2" />
          <line x1="72" y1="72" x2="83" y2="83" stroke="currentColor" stroke-width="2" />
          <line x1="83" y1="17" x2="72" y2="28" stroke="currentColor" stroke-width="2" />
          <line x1="28" y1="72" x2="17" y2="83" stroke="currentColor" stroke-width="2" />

          <!-- Inner Circle -->
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2" />

          <!-- FC Text -->
          <text x="50" y="58" font-size="20" font-weight="bold" text-anchor="middle" fill="currentColor" font-family="sans-serif">FC</text>
        </svg>
      </div>

      <!-- Name and Title -->
      <div class="profile-info">
        <h1 class="name">Filipe Crespo</h1>
        <p class="title">Software Engineer</p>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="nav-menu">
      <NuxtLink to="/" class="nav-link">
        <Icon name="heroicons-solid:home" />
        <span>Home</span>
      </NuxtLink>
      <NuxtLink to="/blog" class="nav-link">
        <Icon name="heroicons-solid:document-text" />
        <span>Posts</span>
      </NuxtLink>
      <NuxtLink to="/projetos" class="nav-link">
        <Icon name="heroicons-solid:code-bracket" />
        <span>Projetos</span>
      </NuxtLink>
    </nav>

    <!-- Social Links -->
    <div class="social-section">
      <SocialLinks variant="horizontal" size="md" />
    </div>

    <!-- Footer -->
    <footer class="sidebar-footer">
      <p class="copyright">&copy; {{ new Date().getFullYear() }} Filipe Crespo</p>
    </footer>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 100vh;
  background-color: var(--color-gray-50);
  border-right: 1px solid var(--color-gray-200);
  padding: 2rem 1.5rem;
  position: fixed;
  left: 0;
  top: 0;
}

@media (prefers-color-scheme: dark) {
  .sidebar {
    background-color: var(--color-gray-900);
    border-right-color: var(--color-gray-800);
  }
}

/* Logo Section */
.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.logo {
  width: 80px;
  height: 80px;
  color: var(--color-primary-500);
}

.logo svg {
  width: 100%;
  height: 100%;
}

.profile-info {
  text-align: center;
}

.name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0;
  margin-bottom: 0.25rem;
}

@media (prefers-color-scheme: dark) {
  .name {
    color: var(--color-gray-50);
  }
}

.title {
  font-size: 0.875rem;
  color: var(--color-gray-600);
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  .title {
    color: var(--color-gray-400);
  }
}

/* Navigation Menu */
.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: var(--color-gray-700);
  text-decoration: none;
  transition: all 0.2s;
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .nav-link {
    color: var(--color-gray-300);
  }
}

.nav-link:hover {
  background-color: var(--color-gray-100);
  color: var(--color-primary-600);
}

@media (prefers-color-scheme: dark) {
  .nav-link:hover {
    background-color: var(--color-gray-800);
    color: var(--color-primary-400);
  }
}

.nav-link.router-link-active {
  background-color: var(--color-primary-50);
  color: var(--color-primary-600);
}

@media (prefers-color-scheme: dark) {
  .nav-link.router-link-active {
    background-color: var(--color-primary-900);
    color: var(--color-primary-400);
  }
}

/* Social Links */
.social-section {
  margin-top: auto;
  padding-top: 1.5rem;
  display: flex;
  justify-content: center;
}

/* Footer */
.sidebar-footer {
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-gray-200);
}

@media (prefers-color-scheme: dark) {
  .sidebar-footer {
    border-top-color: var(--color-gray-800);
  }
}

.copyright {
  font-size: 0.75rem;
  color: var(--color-gray-500);
  text-align: center;
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  .copyright {
    color: var(--color-gray-500);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid var(--color-gray-200);
  }

  @media (prefers-color-scheme: dark) {
    .sidebar {
      border-bottom-color: var(--color-gray-800);
    }
  }

  .nav-menu {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }

  .logo-section {
    margin-bottom: 1.5rem;
  }
}
</style>
