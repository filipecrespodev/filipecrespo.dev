<script setup lang="ts">
// SEO Meta Tags
useSeoMeta({
  title: "Blog - Filipe Soares Crespo",
  description:
    "Artigos sobre desenvolvimento web, tecnologia e boas práticas de programação. Conteúdo técnico sobre PHP, Laravel, Vue.js, DevOps e muito mais.",
  ogTitle: "Blog - Filipe Soares Crespo",
  ogDescription:
    "Artigos sobre desenvolvimento web, tecnologia e boas práticas de programação.",
  twitterCard: "summary",
});

// Busca todos os posts via API SSR
const { data: posts } = await useAsyncData("blog-posts", async () => {
  return await $fetch("/api/blog");
});

// Função para formatar data
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div class="blog-container">
    <!-- Header -->
    <header class="blog-header">
      <h1 class="page-title">Blog</h1>
      <p class="page-description">
        Artigos sobre desenvolvimento web, tecnologia e boas práticas de
        programação.
      </p>
    </header>

    <!-- Posts List -->
    <div v-if="posts && posts.length > 0" class="posts-list">
      <article v-for="post in posts" :key="post._path" class="post-card">
        <NuxtLink :to="post._path" class="post-link">
          <div class="post-content">
            <h2 class="post-title">{{ post.title }}</h2>
            <p class="post-description">{{ post.description }}</p>

            <div class="post-meta">
              <span class="post-date">
                <Icon name="heroicons-solid:calendar" />
                {{ formatDate(post.publishedAt) }}
              </span>
            </div>

            <div v-if="post.tags && post.tags.length > 0" class="post-tags">
              <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="post-arrow">
            <Icon name="heroicons-solid:arrow-right" />
          </div>
        </NuxtLink>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <Icon name="heroicons-solid:document-text" class="empty-icon" />
      <h2 class="empty-title">Nenhum post encontrado</h2>
      <p class="empty-description">Os posts aparecerão aqui em breve.</p>
    </div>
  </div>
</template>

<style scoped>
.blog-container {
  max-width: 900px;
  margin: 0 auto;
}

/* Header */
.blog-header {
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0 0 1rem;
}

@media (prefers-color-scheme: dark) {
  .page-title {
    color: var(--color-gray-50);
  }
}

.page-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-gray-600);
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  .page-description {
    color: var(--color-gray-300);
  }
}

/* Posts List */
.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Post Card */
.post-card {
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  overflow: hidden;
}

@media (prefers-color-scheme: dark) {
  .post-card {
    background: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgb(0 0 0 / 10%);
  border-color: var(--color-primary-500);
}

@media (prefers-color-scheme: dark) {
  .post-card:hover {
    box-shadow: 0 8px 16px rgb(0 0 0 / 30%);
  }
}

.post-link {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
}

.post-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0;
  transition: color 0.2s;
}

@media (prefers-color-scheme: dark) {
  .post-title {
    color: var(--color-gray-50);
  }
}

.post-card:hover .post-title {
  color: var(--color-primary-600);
}

@media (prefers-color-scheme: dark) {
  .post-card:hover .post-title {
    color: var(--color-primary-400);
  }
}

.post-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-gray-600);
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  .post-description {
    color: var(--color-gray-300);
  }
}

/* Post Meta */
.post-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-gray-500);
}

@media (prefers-color-scheme: dark) {
  .post-meta {
    color: var(--color-gray-400);
  }
}

.post-date,
.post-reading-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Post Tags */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: 9999px;
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .tag {
    background: var(--color-primary-900);
    color: var(--color-primary-300);
  }
}

/* Post Arrow */
.post-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-gray-100);
  color: var(--color-gray-600);
  transition: all 0.2s;
  flex-shrink: 0;
}

@media (prefers-color-scheme: dark) {
  .post-arrow {
    background: var(--color-gray-700);
    color: var(--color-gray-400);
  }
}

.post-card:hover .post-arrow {
  background: var(--color-primary-600);
  color: white;
  transform: translateX(4px);
}

@media (prefers-color-scheme: dark) {
  .post-card:hover .post-arrow {
    background: var(--color-primary-500);
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  color: var(--color-gray-300);
  margin-bottom: 1.5rem;
}

@media (prefers-color-scheme: dark) {
  .empty-icon {
    color: var(--color-gray-600);
  }
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin: 0 0 0.75rem;
}

@media (prefers-color-scheme: dark) {
  .empty-title {
    color: var(--color-gray-300);
  }
}

.empty-description {
  font-size: 1rem;
  color: var(--color-gray-500);
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  .empty-description {
    color: var(--color-gray-400);
  }
}

/* Responsive */
@media (width <= 768px) {
  .page-title {
    font-size: 2rem;
  }

  .post-link {
    padding: 1.5rem;
  }

  .post-title {
    font-size: 1.25rem;
  }

  .post-arrow {
    display: none;
  }

  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
