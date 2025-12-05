<template>
  <article class="post-viewer">
    <div class="post-container">
      <header class="post-header">
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span class="separator">•</span>
          <span class="reading-time">{{ readingTime }} min de leitura</span>
        </div>

        <h1 class="post-title">{{ post.title }}</h1>

        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </header>

      <div class="post-content">
        <p v-for="(paragraph, index) in post.content" :key="index" class="paragraph">
          {{ paragraph }}
        </p>
      </div>

      <footer class="post-footer">
        <div class="divider"></div>
        <div class="author-section">
          <div class="author-info">
            <div class="author-avatar">FC</div>
            <div class="author-details">
              <div class="author-name">Filipe Crespo</div>
              <div class="author-role">Desenvolvedor Full Stack</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const readingTime = computed(() => {
  if (!props.post.content) return 1
  const words = props.post.content.join(' ').split(' ').length
  return Math.ceil(words / 200)
})
</script>

<style scoped>
.post-viewer {
  flex: 1;
  background-color: var(--primary-bg);
  overflow-y: auto;
}

.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 32px;
}

.post-header {
  margin-bottom: 64px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  font-size: 14px;
  color: var(--text-light);
}

.separator {
  color: var(--border-color);
}

.post-date,
.reading-time {
  font-weight: 500;
}

.post-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 32px;
  letter-spacing: -0.02em;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag {
  font-size: 13px;
  color: var(--text-secondary);
  background-color: var(--secondary-bg);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tag:hover {
  background-color: var(--accent-color);
  color: white;
}

.post-content {
  font-size: 18px;
  line-height: 1.8;
  color: var(--text-primary);
}

.paragraph {
  margin-bottom: 32px;
  text-align: left;
}

.paragraph:first-letter {
  font-size: 1.2em;
  font-weight: 600;
  color: var(--accent-color);
}

.post-footer {
  margin-top: 80px;
}

.divider {
  height: 1px;
  background-color: var(--border-color);
  margin-bottom: 40px;
}

.author-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-color), #FF8A65);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.author-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.author-role {
  font-size: 14px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .post-container {
    padding: 48px 24px;
  }

  .post-title {
    font-size: 2rem;
  }

  .post-content {
    font-size: 16px;
  }

  .paragraph {
    margin-bottom: 24px;
  }
}
</style>
