<template>
  <div class="post-list">
    <div class="header">
      <h2 class="title">Posts recentes</h2>
      <p class="subtitle">{{ posts.length }} artigos publicados</p>
    </div>

    <div class="posts-grid">
      <article
        v-for="post in posts"
        :key="post.id"
        class="post-card"
        @click="$emit('select-post', post)"
      >
        <div class="post-date">{{ formatDate(post.date) }}</div>
        <h3 class="post-title">{{ post.title }}</h3>
        <p class="post-excerpt">{{ getExcerpt(post.content) }}</p>
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
        <div class="post-footer">
          <span class="read-more">Ler mais →</span>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
defineProps({
  posts: {
    type: Array,
    required: true
  }
})

defineEmits(['select-post'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const getExcerpt = (content) => {
  if (!content || !content.length) return ''
  const text = content[0]
  return text.length > 120 ? text.substring(0, 120) + '...' : text
}
</script>

<style scoped>
.post-list {
  flex: 1;
  padding: 0;
}

.header {
  margin-bottom: 48px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
}

.post-card {
  background: var(--primary-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  border-color: var(--text-secondary);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.post-date {
  font-size: 13px;
  color: var(--text-light);
  font-weight: 500;
  margin-bottom: 16px;
  text-transform: capitalize;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.post-excerpt {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 20px;
  flex: 1;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  font-size: 12px;
  color: var(--text-secondary);
  background-color: var(--secondary-bg);
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tag:hover {
  background-color: var(--accent-color);
  color: white;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.read-more {
  font-size: 14px;
  color: var(--accent-color);
  font-weight: 600;
  transition: transform 0.2s ease;
  display: inline-block;
}

.post-card:hover .read-more {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .title {
    font-size: 2rem;
  }

  .post-card {
    padding: 24px;
  }
}
</style>
