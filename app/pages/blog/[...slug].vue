<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug?.[0] || "";

const { data: post } = await useAsyncData(`blog-${slug}`, async () => {
  return await $fetch(`/api/blog/${slug}`);
});

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post não encontrado",
    fatal: true,
  });
}

// Função para calcular tempo de leitura
const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

// Função para formatar data
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Navegação entre posts
const { data: allPosts } = await useAsyncData("all-blog-posts", async () => {
  return await $fetch("/api/blog");
});

const currentIndex =
  allPosts.value?.findIndex((p) => p._path === post.value?._path) ?? -1;
const prevPost = currentIndex > 0 ? allPosts.value?.[currentIndex - 1] : null;
const nextPost =
  currentIndex < (allPosts.value?.length ?? 0) - 1
    ? allPosts.value?.[currentIndex + 1]
    : null;
</script>

<template>
  <article v-if="post" class="post-container">
    <!-- Header -->
    <header class="post-header">
      <NuxtLink to="/blog" class="back-link">
        <Icon name="heroicons-solid:arrow-left" />
        <span>Voltar para o blog</span>
      </NuxtLink>

      <h1 class="post-title">{{ post.title }}</h1>
      <p v-if="post.description" class="post-description">
        {{ post.description }}
      </p>

      <div class="post-meta">
        <span class="meta-item">
          <Icon name="heroicons-solid:calendar" />
          {{ formatDate(post.publishedAt) }}
        </span>
        <span class="meta-item">
          <Icon name="heroicons-solid:clock" />
          {{ calculateReadingTime(post.rawContent || "") }} min de leitura
        </span>
      </div>

      <div v-if="post.tags && post.tags.length > 0" class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </header>

    <!-- Content -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="post-content" v-html="post.body" />

    <!-- Navigation -->
    <nav v-if="prevPost || nextPost" class="post-navigation">
      <NuxtLink v-if="prevPost" :to="prevPost._path" class="nav-link nav-prev">
        <Icon name="heroicons-solid:arrow-left" />
        <div class="nav-content">
          <span class="nav-label">Post anterior</span>
          <span class="nav-title">{{ prevPost.title }}</span>
        </div>
      </NuxtLink>

      <NuxtLink v-if="nextPost" :to="nextPost._path" class="nav-link nav-next">
        <div class="nav-content">
          <span class="nav-label">Próximo post</span>
          <span class="nav-title">{{ nextPost.title }}</span>
        </div>
        <Icon name="heroicons-solid:arrow-right" />
      </NuxtLink>
    </nav>
  </article>
</template>

<style scoped>
.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 4rem;
}

/* Header */
.post-header {
  margin-bottom: 3rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-gray-600);
  text-decoration: none;
  font-size: 0.9375rem;
  margin-bottom: 2rem;
  transition: color 0.2s;
}

@media (prefers-color-scheme: dark) {
  .back-link {
    color: var(--color-gray-400);
  }
}

.back-link:hover {
  color: var(--color-primary-600);
}

@media (prefers-color-scheme: dark) {
  .back-link:hover {
    color: var(--color-primary-400);
  }
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0 0 1rem;
  line-height: 1.2;
}

@media (prefers-color-scheme: dark) {
  .post-title {
    color: var(--color-gray-50);
  }
}

.post-description {
  font-size: 1.25rem;
  color: var(--color-gray-600);
  margin: 0 0 1.5rem;
  line-height: 1.6;
}

@media (prefers-color-scheme: dark) {
  .post-description {
    color: var(--color-gray-300);
  }
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9375rem;
  color: var(--color-gray-500);
}

@media (prefers-color-scheme: dark) {
  .post-meta {
    color: var(--color-gray-400);
  }
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-gray-200);
}

@media (prefers-color-scheme: dark) {
  .post-tags {
    border-top-color: var(--color-gray-700);
  }
}

.tag {
  font-size: 0.875rem;
  padding: 0.375rem 1rem;
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

/* Content */
.post-content {
  margin-bottom: 4rem;
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
  color: var(--color-gray-900);
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

@media (prefers-color-scheme: dark) {
  .post-content :deep(h1),
  .post-content :deep(h2),
  .post-content :deep(h3),
  .post-content :deep(h4),
  .post-content :deep(h5),
  .post-content :deep(h6) {
    color: var(--color-gray-50);
  }
}

.post-content :deep(h1) {
  font-size: 2rem;
}

.post-content :deep(h2) {
  font-size: 1.75rem;
}

.post-content :deep(h3) {
  font-size: 1.5rem;
}

.post-content :deep(p) {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--color-gray-700);
  margin-bottom: 1.5rem;
}

@media (prefers-color-scheme: dark) {
  .post-content :deep(p) {
    color: var(--color-gray-300);
  }
}

.post-content :deep(a) {
  color: var(--color-primary-600);
  text-decoration: underline;
}

@media (prefers-color-scheme: dark) {
  .post-content :deep(a) {
    color: var(--color-primary-400);
  }
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
  color: var(--color-gray-700);
}

@media (prefers-color-scheme: dark) {
  .post-content :deep(ul),
  .post-content :deep(ol) {
    color: var(--color-gray-300);
  }
}

.post-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.8;
}

.post-content :deep(pre) {
  background: var(--color-gray-900);
  color: var(--color-gray-100);
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  font-size: 0.9375rem;
  line-height: 1.6;
}

@media (prefers-color-scheme: dark) {
  .post-content :deep(pre) {
    background: var(--color-gray-950);
  }
}

.post-content :deep(code) {
  font-family: Monaco, "Courier New", monospace;
}

.post-content :deep(p code) {
  background: var(--color-gray-100);
  color: var(--color-primary-700);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
}

@media (prefers-color-scheme: dark) {
  .post-content :deep(p code) {
    background: var(--color-gray-800);
    color: var(--color-primary-300);
  }
}

.post-content :deep(blockquote) {
  border-left: 4px solid var(--color-primary-500);
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--color-gray-600);
}

@media (prefers-color-scheme: dark) {
  .post-content :deep(blockquote) {
    color: var(--color-gray-400);
  }
}

/* Navigation */
.post-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-top: 3rem;
  border-top: 2px solid var(--color-gray-200);
}

@media (prefers-color-scheme: dark) {
  .post-navigation {
    border-top-color: var(--color-gray-700);
  }
}

@media (width <= 768px) {
  .post-navigation {
    grid-template-columns: 1fr;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.2s;
}

@media (prefers-color-scheme: dark) {
  .nav-link {
    background: var(--color-gray-800);
    border-color: var(--color-gray-700);
  }
}

.nav-link:hover {
  border-color: var(--color-primary-500);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
}

.nav-prev {
  justify-content: flex-start;
}

.nav-next {
  justify-content: flex-end;
  text-align: right;
  grid-column: 2;
}

@media (width <= 768px) {
  .nav-next {
    grid-column: 1;
  }
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-label {
  font-size: 0.875rem;
  color: var(--color-gray-500);
  font-weight: 500;
}

@media (prefers-color-scheme: dark) {
  .nav-label {
    color: var(--color-gray-400);
  }
}

.nav-title {
  font-size: 1rem;
  color: var(--color-gray-900);
  font-weight: 600;
}

@media (prefers-color-scheme: dark) {
  .nav-title {
    color: var(--color-gray-50);
  }
}

.nav-link:hover .nav-title {
  color: var(--color-primary-600);
}

@media (prefers-color-scheme: dark) {
  .nav-link:hover .nav-title {
    color: var(--color-primary-400);
  }
}

/* Responsive */
@media (width <= 768px) {
  .post-title {
    font-size: 2rem;
  }

  .post-description {
    font-size: 1.125rem;
  }

  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .post-content :deep(h1) {
    font-size: 1.75rem;
  }

  .post-content :deep(h2) {
    font-size: 1.5rem;
  }

  .post-content :deep(h3) {
    font-size: 1.25rem;
  }
}
</style>
