<template>
  <UApp>
    <div class="app-layout">
      <Sidebar />
      <main class="main-content">
        <NuxtPage />
      </main>
    </div>
  </UApp>
</template>

<style>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
  width: 100%;
}

@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }

  .main-content {
    margin-left: 0;
    padding: 1.5rem;
  }
}
</style>
